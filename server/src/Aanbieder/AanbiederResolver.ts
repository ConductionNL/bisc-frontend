import { Resolver, Query } from '@nestjs/graphql'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { AanbiederType } from './types/AanbiederType'

@Resolver(() => AanbiederType)
export class AanbiederResolver {
    public constructor(private organizationRepository: OrganizationRepository) {}

    @Query(() => [AanbiederType])
    public async taalhuizen(@CurrentUser() user: UserEntity): Promise<AanbiederType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.organizationRepository.findAll(OrganizationTypesEnum.AANBIEDER)
    }
}
