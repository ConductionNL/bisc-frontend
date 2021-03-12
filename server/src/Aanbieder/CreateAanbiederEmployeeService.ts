import { Injectable, Logger } from '@nestjs/common'
import { CreateAanbiederEmployeeAddressInput } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'

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
    userGroupId: string // aka role

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

    public constructor(private emailRepository: EmailRepository) {}

    public createAanbiederEmployee(input: CreateAanbiederEmployeeInput) {
        return !!input
    }
}
