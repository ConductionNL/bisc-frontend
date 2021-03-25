import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { ParticipantEntity, ParticipantRepository } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantStatusEnum'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { MemoRepository } from 'src/CommonGroundAPI/memo/MemoRepository'

export type StudentEntity = {
    id: string
    status: ParticipantStatusEnum
    dateCreated: string
    givenName: string
    additionalName?: string
    familyName: string
    memo?: string
    registrar?: {
        id: string
        organisationName: string
        givenName: string
        additionalName?: string
        familyName: string
        email: string
        telephone: string
    }
    taalhuis: {
        id: string
        name: string
    }
}

@Injectable()
export class StudentService {
    public constructor(
        private organizationRepository: OrganizationRepository,
        private programRepository: ProgramRepository,
        private personRepository: PersonRepository,
        private participantRepository: ParticipantRepository,
        private memoRepository: MemoRepository
    ) {}

    public async findByTaalhuisId(taalhuisId: string, status: ParticipantStatusEnum) {
        const taalhuis = await this.organizationRepository.getOne(taalhuisId, OrganizationTypesEnum.TAALHUIS)
        assertNotNil(
            taalhuis.sourceOrganization,
            `Taalhuis ${taalhuisId} should have a sourceOrganization, but it doesn't`
        )
        const program = await this.programRepository.findBySourceOrganizationId(taalhuis.sourceOrganization)
        assertNotNil(program, `Program not found for Taalhuis ${taalhuis.id}`)

        const participants = await this.participantRepository.findByProgramIdAndStatus(program.id, status)

        const students: StudentEntity[] = await Promise.all(
            participants.map(async participant => {
                const person = await this.personRepository.findById(participant.person)
                assertNotNil(person, `Person ${participant.person} not found for Participant ${participant.id}`)

                const registrarOrganizationId = participant.referredBy
                const registrar = registrarOrganizationId
                    ? await this.findRegistrar(registrarOrganizationId, participant.id)
                    : undefined

                const memo = await this.findMemo(participant.id, person.id)

                const taalhuis = await this.findTaalhuis(participant)

                return {
                    id: participant.id,
                    status: participant.status,
                    dateCreated: participant.dateCreated,
                    givenName: person.givenName,
                    additionalName: person.additionalName,
                    familyName: person.familyName,
                    registrar,
                    memo,
                    taalhuis,
                }
            })
        )

        return students
    }

    public async findByStudentId(studentId: string) {
        const participant = await this.participantRepository.findById(studentId)
        assertNotNil(participant, `Participant not found for ID ${studentId}`)

        const person = await this.personRepository.findById(participant.person)
        assertNotNil(person, `Person ${participant.person} not found for Participant ${participant.id}`)

        const registrarOrganizationId = participant.referredBy
        const registrar = registrarOrganizationId
            ? await this.findRegistrar(registrarOrganizationId, studentId)
            : undefined

        const memo = await this.findMemo(participant.id, person.id)

        const taalhuis = await this.findTaalhuis(participant)

        const student: StudentEntity = {
            id: participant.id,
            status: participant.status,
            dateCreated: participant.dateCreated,
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
            registrar,
            memo,
            taalhuis,
        }

        return student
    }

    private async findRegistrar(organizationId: string, studentId: string): Promise<StudentEntity['registrar']> {
        const organization = await this.organizationRepository.getOne(organizationId, OrganizationTypesEnum.AANMELDER)
        assertNotNil(organization, `Registrar Org ${organizationId} not found for Student ${studentId}`)

        const personIds = organization.personIds
        if (!personIds || personIds.length === 0 || personIds.length > 1) {
            throw new Error(`Something wrong with Registrar Org ${organizationId} for Student ${studentId}`)
        }

        const personId = organization.personIds?.pop()
        assertNotNil(personId)

        const person = await this.personRepository.findById(personId)
        assertNotNil(person, `Person ${personId} not found for Registrar Org ${organizationId}`)
        assertNotNil(person.telephone)

        return {
            id: organization.id,
            organisationName: organization.name,
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
            email: person.email,
            telephone: person.telephone,
        }
    }

    private async findMemo(participantId: string, personId: string) {
        const memos = await this.memoRepository.findByTopicAndAuthor(participantId, personId)

        if (memos.length === 0) {
            return undefined
        }

        if (memos.length > 1) {
            throw new Error(
                `Expected only 1 memo but got ${memos.length} for Participant ${participantId} and Person ${personId}`
            )
        }

        const memo = memos.pop()
        assertNotNil(memo)

        return memo.description
    }

    private async findTaalhuis(participant: ParticipantEntity) {
        const program = participant.program
        assertNotNil(program, `Participant ${participant.id} should have a Program, but it hasn't`)

        const taalhuis = await this.organizationRepository.findBySourceOrganizationId(
            OrganizationTypesEnum.TAALHUIS,
            program.provider
        )
        assertNotNil(taalhuis, `Taalhuis not found for Participant ${participant.id}`)

        return taalhuis
    }
}
