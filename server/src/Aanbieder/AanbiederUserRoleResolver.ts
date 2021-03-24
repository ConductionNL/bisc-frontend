import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql'
import { assertNotNil } from 'src/AssertNotNil'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { AanbiederUserRoleType } from './types/AanbiederUserRoleType'

@ArgsType()
export class UserRolesByAanbiederIdArgs {
    @Field()
    public aanbiederId!: string
}

@Resolver(() => AanbiederUserRoleType)
export class AanbiederUserRoleResolver {
    public constructor(private groupRepository: GroupRepository, private organizationRepository: OrganizationRepository) {}

    @Query(() => [AanbiederUserRoleType])
    public async userRolesByAanbiederId(
        @CurrentUser() user: UserEntity,
        @Args() args: UserRolesByAanbiederIdArgs
    ): Promise<AanbiederUserRoleType[]> {
        // TODO: Authorization checks (user type, user role, can user see given Aanbieder?)
        const aanbieder = await this.organizationRepository.getOne(args.aanbiederId, OrganizationTypesEnum.AANBIEDER)
        assertNotNil(
            aanbieder.sourceOrganization,
            `Aanbieder ${args.aanbiederId} should have a sourceOrganization, but it doesn't`
        )

        return this.groupRepository.findByOrganizationId(aanbieder.sourceOrganization)
    }
}
