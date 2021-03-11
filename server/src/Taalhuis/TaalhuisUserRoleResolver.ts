import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { TaalhuisUserRoleType } from './types/TaalhuisUserRoleType'

@ArgsType()
export class UserRolesByTaalhuisIdArgs {
    @Field()
    public taalhuisId!: string
}

@Resolver(() => TaalhuisUserRoleType)
export class TaalhuisUserRoleResolver {
    public constructor(private groupRepository: GroupRepository) {}

    @Query(() => [TaalhuisUserRoleType])
    public async userRolesByTaalhuisId(
        @CurrentUser() user: UserEntity,
        @Args() args: UserRolesByTaalhuisIdArgs
    ): Promise<TaalhuisUserRoleType[]> {
        // TODO: Authorization checks (user type, user role, can user see given Taalhuis?)

        return this.groupRepository.findByOrganizationId(args.taalhuisId)
    }
}
