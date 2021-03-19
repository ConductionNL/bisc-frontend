import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CreateAanbiederEmployeeAddressInput } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { PasswordHashingService } from 'src/User/services/PasswordHashingService'

interface CreateAanbiederEmployeeAvailabilityDayInput {
    morning?: boolean
    afternoon?: boolean
    evening?: boolean
}

interface CreateAanbiederEmployeeAvailabilityInput {
    monday?: CreateAanbiederEmployeeAvailabilityDayInput
    tuesday?: CreateAanbiederEmployeeAvailabilityDayInput
    wednesday?: CreateAanbiederEmployeeAvailabilityDayInput
    thursday?: CreateAanbiederEmployeeAvailabilityDayInput
    friday?: CreateAanbiederEmployeeAvailabilityDayInput
    saturday?: CreateAanbiederEmployeeAvailabilityDayInput
    sunday?: CreateAanbiederEmployeeAvailabilityDayInput
}

interface CreateAanbiederEmployeeCurrentEducationYesInput {
    date?: Date
    name?: string
    certificateOffered?: boolean
}

interface CreateAanbiederEmployeeCurrentEducationNoButDidFollowInput {
    date?: Date
    level?: string
    certificate?: boolean
}

export interface CreateAanbiederEmployeeInput {
    aanbiederId: string

    givenName: string
    additionalName?: string
    familyName: string
    telephone?: string

    availability?: CreateAanbiederEmployeeAvailabilityInput
    availabilityNotes?: string

    email: string
    userGroupIds: string[] // aka role

    gender?: string
    dateOfBirth?: Date
    countryOfOrigin?: string

    address?: CreateAanbiederEmployeeAddressInput
    contactTelephone?: string
    contactContactPrefence?: string
    contactContactPrefenceOtherReason?: string

    targetGroupPreference?: string // [ nt1, nt2 ]
    volunteringPreference?: string
    gotHereVia?: string
    experienceWithTargetGroup?: boolean
    experienceWithTargetGroupYesReason?: boolean

    currentEducation?: string // [ yes, no, no but did follow ]
    currentEducationYes?: CreateAanbiederEmployeeCurrentEducationYesInput
    currentEdicationNoButDidFollow?: CreateAanbiederEmployeeCurrentEducationNoButDidFollowInput

    training?: boolean // yes no but optional?
    trainingName?: string
    trainingTeacherType?: string
    trainingTrainingType?: string
    trainingCertificateOffered?: boolean

    trainingOther?: string
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
        private passwordHashingService: PasswordHashingService
    ) {}

    public async createAanbiederEmployee(input: CreateAanbiederEmployeeInput) {
        const aanbieder = await this.organizationRepository.getOne(input.aanbiederId, OrganizationTypesEnum.AANBIEDER)
        assertNotNil(aanbieder, `Aanbieder with id ${input.aanbiederId} not found`)

        // const groups = await this.groupRepository.findByOrganizationId(aanbieder.id)

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

        // eav for person for contact bij voorkeur

        // uc/user
        const randomPasswordHash = await this.passwordHashingService.hash(this.passwordHashingService.randomPassword())

        const user = await this.userRepository.createUser(
            input.email,
            person.id,
            input.userGroupIds,
            randomPasswordHash
        )

        // arc/calendar

        // meme/memo
        return {
            id: user.id,
            email: email.email,
            telephone: telephone ? telephone.telephone : undefined,
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
            dateCreated: user.dateCreated,
            dateModified: user.dateModified,
            userRoles: [], // TODO: add userRoles
        }
    }
}
