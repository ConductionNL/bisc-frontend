import { Field, InputType } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'

// TODO: Should implement UpdateStudentInput
@InputType()
export class UpdateStudentInputType {
    @Field()
    @IsUrl()
    public studentId!: string

    @Field()
    public givenName!: string

    @Field(() => String, { nullable: true })
    public additionalName?: string | null

    @Field()
    public familyName!: string

    @Field(() => String, { nullable: true })
    public email?: string | null

    @Field(() => String, { nullable: true })
    public telephone?: string | null
}
