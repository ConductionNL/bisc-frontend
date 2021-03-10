import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { Participant } from 'src/generated/edu-graphql'
import { EDURepository } from '../EDURepository'

interface ParticipantsParams {
    ccPersonUrl?: string
    ccPersonUrls?: string[]
    programId?: string
}

type ParticipantEntity = Pick<Participant, 'id' | 'person' | 'status'>

@Injectable()
export class ParticipantRepository extends EDURepository {
    public async findByProgramId(programId: string) {
        return this.findByParams({ programId: this.stripURLfromID(programId) })
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
            const id = participantEdge?.node?.id
            assertNotNil(id)

            const person = participantEdge?.node?.person
            assertNotNil(person)

            const status = participantEdge?.node?.status
            assertNotNil(status)

            return {
                id: this.makeURLfromID(id),
                person,
                status,
            }
        })

        return participantEntities
    }

    public async deleteParticipant(id: string) {
        const result = await this.sdk.deleteParticipant({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }
}
