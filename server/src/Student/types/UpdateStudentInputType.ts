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

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    public email!: string

    @Field()
    public telephone!: string
}
