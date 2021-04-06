import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserRoleEnum } from 'src/CommonGroundAPI/uc/GroupRepository'

registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' })

@ObjectType()
export class TaalhuisUserRoleType {
    @Field()
    public id!: string

    @Field(() => UserRoleEnum)
    public name!: UserRoleEnum
}
