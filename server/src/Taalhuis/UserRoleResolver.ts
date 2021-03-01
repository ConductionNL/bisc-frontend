import { Args, ArgsType, Field, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { GroupRepository } from './GroupRepository'

@ObjectType()
export class UserRoleType {
    @Field()
    public id!: string

    @Field()
    public name!: string
}

@ArgsType()
export class UserRolesByTaalhuisIdArgs {
    @Field()
    public taalhuisId!: string
}

@Resolver(() => UserRoleType)
export class UserRoleResolver {
    public constructor(private groupRepository: GroupRepository) {}

    @Query(() => [UserRoleType])
    public async userRolesByTaalhuisId(
        @CurrentUser() user: UserEntity,
        @Args() args: UserRolesByTaalhuisIdArgs
    ): Promise<UserRoleType[]> {
        // TODO: Authorization checks (user type, user role, can user see given Taalhuis?)

        return this.groupRepository.findByOrganisationId(args.taalhuisId)
    }
}
