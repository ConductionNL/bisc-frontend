import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsOptional, IsPostalCode, IsUrl, ValidateNested } from 'class-validator'
import { CreateAanbiederEmployeeInput } from '../CreateAanbiederEmployeeService'

@InputType()
class CreateAanbiederEmployeeAvailabilityDayInputType {
    @Field()
    public morning?: boolean

    @Field()
    public afternoon?: boolean

    @Field()
    public evening?: boolean
}

@InputType()
class CreateAanbiederEmployeeAvailabilityInputType {
    @Field()
    @ValidateNested()
    public monday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public tuesday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public wednesday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public thursday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public friday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public saturday?: CreateAanbiederEmployeeAvailabilityDayInputType

    @Field()
    @ValidateNested()
    public sunday?: CreateAanbiederEmployeeAvailabilityDayInputType
}

@InputType()
class CreateAanbiederEmployeeCurrentEducationYesInputType {
    @Field()
    public date?: Date

    @Field()
    public name?: string

    @Field()
    public certificateOffered?: boolean
}

@InputType()
class CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType {
    @Field()
    public date?: Date

    @Field()
    public level?: string

    @Field()
    public certificate?: boolean
}

@InputType()
class AanbiederEmployeeAddressInputType {
    @Field()
    public street!: string

    @Field()
    public houseNumber!: string

    @Field({ nullable: true })
    @IsOptional()
    public houseNumberSuffix?: string

    @Field()
    @IsPostalCode('NL')
    public postalCode!: string

    @Field()
    public locality!: string
}

@ArgsType()
export class AanbiederEmployeeInputType implements CreateAanbiederEmployeeInput {
    @Field()
    @IsUrl() // TODO make custom ID validator
    public aanbiederId!: string

    //
    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    public telephone!: string

    //
    @Field()
    @ValidateNested()
    public availability?: CreateAanbiederEmployeeAvailabilityInputType

    @Field()
    public availabilityNotes?: string

    //
    @Field()
    @IsEmail()
    public email!: string

    @Field()
    public userGroupIds!: string[]

    //
    @Field() // validate as enum? not very progressive i know
    public gender?: string

    @Field()
    public dateOfBirth?: Date

    @Field()
    public countryOfOrigin?: string

    //
    @Field()
    @ValidateNested()
    public address?: AanbiederEmployeeAddressInputType

    @Field()
    public contactTelephone?: string

    @Field()
    public contactContactPrefence?: string

    @Field()
    public contactContactPrefenceOtherReason?: string

    //
    @Field() // enum for nt1, nt2
    public targetGroupPreference?: string

    @Field()
    public volunteringPreference?: string

    @Field()
    public gotHereVia?: string

    @Field()
    public experienceWithTargetGroup?: boolean

    @Field()
    public experienceWithTargetGroupYesReason?: boolean

    //
    @Field()
    public currentEducation?: string // [ yes, no, no but did follow ]

    @Field()
    @ValidateNested()
    public currentEducationYes?: CreateAanbiederEmployeeCurrentEducationYesInputType

    @Field()
    @ValidateNested()
    public currentEdicationNoButDidFollow?: CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType

    //
    @Field()
    public training?: boolean // yes no but optional?

    @Field()
    public trainingName?: string

    @Field()
    public trainingTeacherType?: string

    @Field()
    public trainingTrainingType?: string

    @Field()
    public trainingCertificateOffered?: boolean

    //
    @Field()
    public trainingOther?: string
}
