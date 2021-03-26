import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { FindParticipantByIdQuery, Participant } from 'src/generated/edu-graphql'
import { EDURepository } from '../EDURepository'
import { ParticipantStatusEnum } from './ParticipantStatusEnum'

interface CreateParticipantInput {
    personId: string
    programId: string
    referredById?: string
    status: ParticipantStatusEnum
}

interface ParticipantsParams {
    ccPersonUrl?: string
    ccPersonUrls?: string[]
    programId?: string
    status?: ParticipantStatusEnum
}

export type ParticipantEntity = Pick<Participant, 'id' | 'person'> & {
    status: ParticipantStatusEnum
    dateCreated: string
    referredBy?: string
    program?: {
        id: string
        name: string
        provider: string
    }
}

@Injectable()
export class ParticipantRepository extends EDURepository {
    public async createParticipant(input: CreateParticipantInput) {
        const result = await this.sdk.createParticipant({
            input: {
                status: input.status,
                person: input.personId,
                referredBy: input.referredById,
                program: this.stripURLfromID(input.programId),
            },
        })

        const participantObject = result?.createParticipant?.participant
        assertNotNil(participantObject, `Failed to create participant`)

        participantObject.id = this.makeURLfromID(participantObject.id)

        return this.returnNonNullable(participantObject)
    }

    public async updateParticipantStatus(participantId: string, newStatus: ParticipantStatusEnum) {
        const result = await this.sdk.updateParticipant({
            input: {
                id: this.stripURLfromID(participantId),
                status: newStatus,
            },
        })

        const participantObject = result?.updateParticipant?.participant
        assertNotNil(participantObject, `Failed to update participant`)

        participantObject.id = this.makeURLfromID(participantObject.id)

        return this.returnNonNullable(participantObject)
    }

    public async findById(participantId: string) {
        const result = await this.sdk.findParticipantById({ id: this.stripURLfromID(participantId) })

        const participantNode = result.participant
        assertNotNil(participantNode, `Participant with id ${participantId} not found`)

        return this.parseParticipantNode(participantNode)
    }

    public async findByProgramId(programId: string) {
        return this.findByParams({ programId: this.stripURLfromID(programId) })
    }

    public async findByProgramIdAndStatus(programId: string, status: ParticipantStatusEnum) {
        return this.findByParams({ programId: this.stripURLfromID(programId), status })
    }

    public async findByPersonIds(personIds: string[]) {
        return this.findByParams({ ccPersonUrls: personIds })
    }

    private async findByParams(params: ParticipantsParams) {
        const result = await this.sdk.participants(params)

        const participantEdges = result.participants?.edges

        if (!participantEdges) {
            return []
        }

        const participantEntities: ParticipantEntity[] = participantEdges.map(participantEdge => {
            const participantNode = participantEdge?.node
            assertNotNil(participantNode)

            return this.parseParticipantNode(participantNode)
        })

        return participantEntities
    }

    public async deleteParticipant(id: string) {
        const result = await this.sdk.deleteParticipant({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }

    private parseParticipantNode(
        participantNode: NonNullable<NonNullable<FindParticipantByIdQuery>['participant']>
    ): ParticipantEntity {
        const id = participantNode.id
        assertNotNil(id)

        const person = participantNode.person
        assertNotNil(person)

        const status = participantNode.status
        assertNotNil(status)

        const dateCreated = participantNode.dateCreated
        assertNotNil(dateCreated)

        const referredBy = participantNode.referredBy || undefined

        const program = this.parseProgram(participantNode.program)

        const participantEntity = {
            id: this.makeURLfromID(id),
            person,
            status: this.parseStringToParticipantStatus(status),
            dateCreated,
            referredBy,
            program,
        }

        return participantEntity
    }

    private parseProgram(
        program: NonNullable<NonNullable<FindParticipantByIdQuery>['participant']>['program']
    ): ParticipantEntity['program'] {
        if (!program) {
            return undefined
        }

        const id = program.id
        const name = program.name
        const provider = program.provider
        assertNotNil(provider, `Program ${id} should have a provider, but it doesn't`)

        return { id, name, provider }
    }

    // TODO: Maybe make this generic, because we do the same in OrganizationRepository
    private parseStringToParticipantStatus(input: string) {
        for (const val of Object.values(ParticipantStatusEnum)) {
            if (input.toUpperCase() === val.toUpperCase()) {
                // case insensitive match just in case
                return val
            }
        }

        throw new Error(`Unsupported participant status: ${input}`)
    }
}
