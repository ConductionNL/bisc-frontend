import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantStatusEnum'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { MemoRepository } from 'src/CommonGroundAPI/memo/MemoRepository'

interface RegisterStudentAddressInput {
    street?: string
    postalCode?: string
    locality?: string
    houseNumber?: string
    houseNumberSuffix?: string
}

export interface RegisterStudentInput {
    taalhuisId: string
    registrar: {
        organisationName: string
        givenName: string
        additionalName?: string
        familyName: string
        email: string
        telephone: string
    }
    student: {
        givenName: string
        additionalName?: string
        familyName: string
        email: string
        telephone: string
        address?: RegisterStudentAddressInput
    }
    memo?: string
}

@Injectable()
export class RegisterStudentService {
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

    public async registerStudent(input: RegisterStudentInput) {
        const taalhuis = await this.organizationRepository.getOne(input.taalhuisId, OrganizationTypesEnum.TAALHUIS)
        const sourceOrganizationId = taalhuis.sourceOrganization

        const programsForTaalhuis = await this.programRepository.findPrograms({ provider: sourceOrganizationId })

        if (programsForTaalhuis.length === 0) {
            throw new Error(`No Program found for wrc/organisation ${sourceOrganizationId}`)
        }
        if (programsForTaalhuis.length > 1) {
            throw new Error(
                `Expected only 1 Program for wrc/organisation ${sourceOrganizationId}, but got ${programsForTaalhuis.length}`
            )
        }

        const program = programsForTaalhuis.pop()
        assertNotNil(program)

        // cc/address
        const address = await this.addressRepository.createAddress(input.student?.address ? input.student?.address : {})
        // cc/email
        const email = await this.emailRepository.createEmail(input.student.email)
        // cc/telephone
        const telephone = await this.telephoneRepository.createTelephone(input.student.telephone)
        // cc/person
        const person = await this.personRepository.createPerson({
            givenName: input.student.givenName,
            additionalName: input.student.additionalName,
            familyName: input.student.familyName,
            telephoneId: telephone.id,
            emailId: email.id,
            addressIds: [address.id],
        })

        // cc/email for aanmelder
        const aanmelderEmail = await this.emailRepository.createEmail(input.registrar.email)
        // cc/telephone for aanmelder
        const aanmelderTelephone = await this.telephoneRepository.createTelephone(input.registrar.telephone)
        // cc/person for aanmelder
        const aanmelderPerson = await this.personRepository.createPerson({
            givenName: input.registrar.givenName,
            additionalName: input.registrar.additionalName,
            familyName: input.registrar.familyName,
            telephoneId: aanmelderTelephone.id,
            emailId: aanmelderEmail.id,
        })
        // cc/organization for aanmelder
        const aanmelderOrganization = await this.organizationRepository.createOrganization({
            name: input.registrar.organisationName,
            type: OrganizationTypesEnum.AANMELDER,
            personIds: [aanmelderPerson.id],
        })

        // edu/participant
        const participant = await this.participantRepository.createParticipant({
            status: ParticipantStatusEnum.pending,
            personId: person.id,
            programId: program.id,
            referredById: aanmelderOrganization.id,
        })

        // TODO: Add toelichting veld (memo) (author is person.id & topic is participant.id)
        if (input.memo) {
            await this.memoRepository.createMemo({
                name: 'Toelichting',
                description: input.memo,
                topic: participant.id,
                author: person.id,
            })
        }

        return true
    }
}
