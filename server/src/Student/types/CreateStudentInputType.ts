import { Field, InputType } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { CreateStudentInput } from '../services/CreateStudentService'

// registerEnumType(StudentCivicIntegrationRequirementReasonEnum, { name: 'StudentCivicIntegrationRequirementReasonEnum' })
// registerEnumType(StudentGenderEnum, { name: 'StudentGenderEnum' })

@InputType()
export class CreateStudentInputType implements CreateStudentInput {
    @Field()
    @IsUrl()
    public taalhuisId!: string

    // @Field()
    // public civicIntegrationRequirement!: boolean

    // @Field(() => StudentCivicIntegrationRequirementReasonEnum, { nullable: true })
    // @IsIn(Object.values(StudentCivicIntegrationRequirementReasonEnum))
    // public civicIntegrationRequirementReason?: StudentCivicIntegrationRequirementReasonEnum

    // @Field({ nullable: true })
    // @MinDate(new Date()) // Date should be in the future
    // public civicIntegrationRequirementFinishDate?: Date

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    // @Field(() => StudentGenderEnum)
    // @IsIn(Object.values(StudentGenderEnum))
    // public gender!: StudentGenderEnum

    @Field()
    public email!: string

    @Field()
    public telephone!: string
}
