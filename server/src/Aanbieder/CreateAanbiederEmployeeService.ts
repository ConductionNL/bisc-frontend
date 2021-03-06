import { Injectable, Logger } from '@nestjs/common'
import { AppError } from 'src/AppError'
import { assertNotNil } from 'src/AssertNotNil'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { ErrorCode } from 'src/ErrorCodes'
import { PasswordHashingService } from 'src/User/services/PasswordHashingService'
import { PasswordResetService } from 'src/User/services/PasswordResetService'
import { AanbiederEmployeeEntity, AanbiederEmployeeService } from './AanbiederEmployeeService'

// interface CreateAanbiederEmployeeAvailabilityDayInput {
//     morning?: boolean
//     afternoon?: boolean
//     evening?: boolean
// }

// interface CreateAanbiederEmployeeAvailabilityInput {
//     monday?: CreateAanbiederEmployeeAvailabilityDayInput
//     tuesday?: CreateAanbiederEmployeeAvailabilityDayInput
//     wednesday?: CreateAanbiederEmployeeAvailabilityDayInput
//     thursday?: CreateAanbiederEmployeeAvailabilityDayInput
//     friday?: CreateAanbiederEmployeeAvailabilityDayInput
//     saturday?: CreateAanbiederEmployeeAvailabilityDayInput
//     sunday?: CreateAanbiederEmployeeAvailabilityDayInput
// }

// interface CreateAanbiederEmployeeCurrentEducationYesInput {
//     date?: Date
//     name?: string
//     certificateOffered?: boolean
// }

// interface CreateAanbiederEmployeeCurrentEducationNoButDidFollowInput {
//     date?: Date
//     level?: string
//     certificate?: boolean
// }

export interface CreateAanbiederEmployeeInput {
    aanbiederId: string

    givenName: string
    additionalName?: string
    familyName: string
    telephone?: string | null

    // availability?: CreateAanbiederEmployeeAvailabilityInput
    // availabilityNotes?: string

    email: string
    userGroupIds: string[] // aka role

    // gender?: string
    // dateOfBirth?: Date
    // countryOfOrigin?: string

    // address?: CreateAanbiederEmployeeAddressInput
    // contactTelephone?: string
    // contactContactPrefence?: string
    // contactContactPrefenceOtherReason?: string

    // targetGroupPreference?: string // [ nt1, nt2 ]
    // volunteringPreference?: string
    // gotHereVia?: string
    // experienceWithTargetGroup?: boolean
    // experienceWithTargetGroupYesReason?: boolean

    // currentEducation?: string // [ yes, no, no but did follow ]
    // currentEducationYes?: CreateAanbiederEmployeeCurrentEducationYesInput
    // currentEdicationNoButDidFollow?: CreateAanbiederEmployeeCurrentEducationNoButDidFollowInput

    // training?: boolean // yes no but optional?
    // trainingName?: string
    // trainingTeacherType?: string
    // trainingTrainingType?: string
    // trainingCertificateOffered?: boolean

    // trainingOther?: string
}

@Injectable()
export class CreateAanbiederEmployeeService {
    private readonly logger = new Logger()

    public constructor(
        private emailRepository: EmailRepository,
        private organizationRepository: OrganizationRepository,
        private groupRepository: GroupRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private userRepository: UserRepository,
        private passwordHashingService: PasswordHashingService,
        private passwordResetService: PasswordResetService,
        private employeeRepository: EmployeeRepository,
        private aanbiederEmployeeService: AanbiederEmployeeService
    ) {}

    public async createAanbiederEmployee(input: CreateAanbiederEmployeeInput): Promise<AanbiederEmployeeEntity> {
        const aanbieder = await this.organizationRepository.getOne(input.aanbiederId, OrganizationTypesEnum.AANBIEDER)
        assertNotNil(aanbieder, `Aanbieder with id ${input.aanbiederId} not found`)
        assertNotNil(
            aanbieder.sourceOrganization,
            `Aanbieder ${aanbieder.id} should have a sourceOrganization, but it doesn't`
        )

        const existingUser = await this.userRepository.findByEmail(input.email)
        if (existingUser) {
            throw new AppError(ErrorCode.EntityAlreadyExists, {
                entity: 'User',
                field: 'email',
                value: input.email,
            })
        }

        const groups = await this.groupRepository.findByOrganizationId(aanbieder.sourceOrganization)
        for (const inputGroupId of input.userGroupIds) {
            const groupExists = groups.find(group => group.id === inputGroupId)

            if (!groupExists) {
                throw new Error(`Given UserGroup ${inputGroupId} does not exist for Aanbieder ${input.aanbiederId}`)
            }
        }

        // cc/telephone
        const telephone = input.telephone ? await this.telephoneRepository.createTelephone(input.telephone) : undefined

        // cc/email
        const email = await this.emailRepository.createEmail(input.email)

        // cc/person
        const person = await this.personRepository.createPerson({
            givenName: input.givenName,
            additionalName: input.additionalName ?? undefined,
            familyName: input.familyName,
            telephoneId: telephone ? this.telephoneRepository.stripURLfromID(telephone.id) : undefined,
            emailId: this.emailRepository.stripURLfromID(email.id),
        })

        // mrc/employee (link cc/person and cc/organization)
        const employee = await this.employeeRepository.createEmployee(person.id, aanbieder.id)

        // eav for person for contact bij voorkeur

        // uc/user
        const randomPasswordHash = await this.passwordHashingService.hash(this.passwordHashingService.randomPassword())

        await this.userRepository.createUser(input.email, person.id, input.userGroupIds, randomPasswordHash)

        // TODO: Send welcome email instead of password reset email
        await this.passwordResetService.requestPasswordReset(input.email)

        // arc/calendar

        // meme/memo

        return this.aanbiederEmployeeService.findById(employee.id)
    }
}
