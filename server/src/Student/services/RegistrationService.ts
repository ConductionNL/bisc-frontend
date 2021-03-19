import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository, ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { MemoRepository } from 'src/CommonGroundAPI/memo/MemoRepository'

type StudentEntity = {
    id: string
    status: ParticipantStatusEnum
    dateCreated: string
    givenName: string
    additionalName?: string
    familyName: string
    memo?: string
    registrar?: {
        organisationName: string
        givenName: string
        additionalName?: string
        familyName: string
        email: string
        telephone: string
    }
}

@Injectable()
export class RegistrationService {
    public constructor(
        private organizationRepository: OrganizationRepository,
        private programRepository: ProgramRepository,
        private addressRepository: AddressRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private participantRepository: ParticipantRepository,
        private memoRepository: MemoRepository
    ) {}

    public async findByTaalhuisId(taalhuisId: string) {
        const taalhuis = await this.organizationRepository.getOne(taalhuisId, OrganizationTypesEnum.TAALHUIS)
        assertNotNil(
            taalhuis.sourceOrganization,
            `Taalhuis ${taalhuisId} should have a sourceOrganization, but it doesn't`
        )
        const program = await this.programRepository.findBySourceOrganizationId(taalhuis.sourceOrganization)
        const participants = await this.participantRepository.findByProgramId(program.id)

        const students: StudentEntity[] = await Promise.all(
            participants.map(async participant => {
                const person = await this.personRepository.findById(participant.person)
                assertNotNil(person, `Person ${participant.person} not found for Participant ${participant.id}`)

                const registrarOrganizationId = participant.referredBy
                const registrar = registrarOrganizationId
                    ? await this.findRegistrar(registrarOrganizationId, participant.id)
                    : undefined

                const memo = await this.findMemo(participant.id, person.id)

                return {
                    id: participant.id,
                    status: participant.status,
                    dateCreated: participant.dateCreated,
                    givenName: person.givenName,
                    additionalName: person.additionalName,
                    familyName: person.familyName,
                    registrar,
                    memo,
                }
            })
        )

        return students
    }

    public async findByStudentId(studentId: string) {
        const participant = await this.participantRepository.findById(studentId)

        const person = await this.personRepository.findById(participant.person)
        assertNotNil(person, `Person ${participant.person} not found for Participant ${participant.id}`)

        const registrarOrganizationId = participant.referredBy
        const registrar = registrarOrganizationId
            ? await this.findRegistrar(registrarOrganizationId, studentId)
            : undefined

        const memo = await this.findMemo(participant.id, person.id)

        const student: StudentEntity = {
            id: participant.id,
            status: participant.status,
            dateCreated: participant.dateCreated,
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
            registrar,
            memo,
        }

        return student
    }

    public async deleteRegistration(studentId: string) {
        const student = await this.participantRepository.findById(studentId)
        if (student.status !== ParticipantStatusEnum.pending) {
            throw new Error(
                `Registration can only be deleted when status = pending, student ${studentId} has status ${student.status}`
            )
        }

        const person = await this.personRepository.findById(student.person)
        assertNotNil(person, `Person ${student.person} not found for Participant ${student.id}`)

        await this.participantRepository.deleteParticipant(student.id)

        for (const addressId of person.addressIds) {
            await this.addressRepository.deleteAddress(addressId)
        }

        await this.emailRepository.deleteEmail(person.emailId)

        if (person.telephoneId) {
            await this.telephoneRepository.deleteTelephone(person.telephoneId)
        }

        await this.personRepository.deletePerson(person.id)

        // TODO: Delete registrar + memo

        return true
    }

    public async acceptRegistration(studentId: string) {
        const student = await this.participantRepository.findById(studentId)
        if (student.status !== ParticipantStatusEnum.pending) {
            throw new Error(
                `Registration can only be accepted when status = pending, student ${studentId} has status ${student.status}`
            )
        }

        await this.participantRepository.updateParticipantStatus(student.id, ParticipantStatusEnum.accepted)

        return true
    }

    private async findRegistrar(organizationId: string, studentId: string): Promise<StudentEntity['registrar']> {
        const organization = await this.organizationRepository.getOne(organizationId)
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
}
