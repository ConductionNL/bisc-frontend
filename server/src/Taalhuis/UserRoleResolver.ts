import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { UserRoleType } from './types/UserRoleType'

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

        return this.groupRepository.findByOrganizationId(args.taalhuisId)
    }
}
