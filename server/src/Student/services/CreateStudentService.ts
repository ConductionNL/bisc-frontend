import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { MemoRepository } from 'src/CommonGroundAPI/memo/MemoRepository'
import { RegistrationService } from './RegistrationService'

export enum StudentCivicIntegrationRequirementReasonEnum {
    FINISHED = 'FINISHED',
    FROM_EU_COUNTRY = 'FROM_EU_COUNTRY',
    EXEMPTED_OR_ZROUTE = 'EXEMPTED_OR_ZROUTE',
}

export enum StudentGenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    X = 'X',
}

export interface CreateStudentInput {
    taalhuisId: string

    civicIntegrationRequirement: boolean
    civicIntegrationRequirementReason?: StudentCivicIntegrationRequirementReasonEnum
    civicIntegrationRequirementFinishDate?: Date

    givenName: string
    additionalName?: string
    familyName: string

    gender: StudentGenderEnum

    email?: string
    telephone?: string
}

@Injectable()
export class CreateStudentService {
    public constructor(
        private organizationRepository: OrganizationRepository,
        private programRepository: ProgramRepository,
        private addressRepository: AddressRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private participantRepository: ParticipantRepository,
        private memoRepository: MemoRepository,
        private registrationService: RegistrationService
    ) {}

    public async createStudent(input: CreateStudentInput) {
        const taalhuis = await this.organizationRepository.getOne(input.taalhuisId, OrganizationTypesEnum.TAALHUIS)
        const sourceOrganizationId = taalhuis.sourceOrganization
        assertNotNil(sourceOrganizationId)

        const program = await this.programRepository.findBySourceOrganizationId(sourceOrganizationId)

        // cc/email
        const email = input.email ? await this.emailRepository.createEmail(input.email) : undefined
        // cc/telephone
        const telephone = input.telephone ? await this.telephoneRepository.createTelephone(input.telephone) : undefined
        // cc/person
        const person = await this.personRepository.createPerson({
            givenName: input.givenName,
            additionalName: input.additionalName,
            familyName: input.familyName,
            telephoneId: telephone ? telephone.id : undefined,
            emailId: email ? email.id : undefined,
        })

        return this.registrationService.findByStudentId('123123')
    }
}
