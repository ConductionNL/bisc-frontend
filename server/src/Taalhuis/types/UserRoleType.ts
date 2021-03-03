import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserRoleType {
    @Field()
    public id!: string

    @Field()
    public name!: string
}
