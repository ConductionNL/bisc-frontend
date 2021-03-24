import { Field, ObjectType } from '@nestjs/graphql'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantStatusEnum'

@ObjectType()
class StudentRegistrarType {
    @Field()
    public id!: string
    
    @Field()
    public organisationName!: string

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

@ObjectType()
export class StudentType {
    @Field()
    public id!: string

    @Field()
    public dateCreated!: string

    @Field(() => ParticipantStatusEnum)
    public status!: ParticipantStatusEnum

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field({ nullable: true })
    public memo?: string

    @Field(() => StudentRegistrarType, { nullable: true })
    public registrar?: StudentRegistrarType
}
