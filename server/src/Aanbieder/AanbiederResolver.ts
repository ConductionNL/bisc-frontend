import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { CreateAanbiederService } from './CreateAanbiederService'
import { AanbiederType } from './types/AanbiederType'
import { CreateAanbiederInputType } from './types/CreateAanbiederInputType'

@Resolver(() => AanbiederType)
export class AanbiederResolver {
    public constructor(
        private organizationRepository: OrganizationRepository,
        private createAanbiederService: CreateAanbiederService
    ) {}

    @Query(() => [AanbiederType])
    public async aanbieders(@CurrentUser() user: UserEntity): Promise<AanbiederType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.organizationRepository.findAll(OrganizationTypesEnum.AANBIEDER)
    }

    @Query(() => AanbiederType)
    public async aanbieder(@Args('id') id: string): Promise<AanbiederType> {
        // TODO: Authorization checks (user type, user role)
        return this.organizationRepository.getOne(id)
    }

    @Mutation(() => AanbiederType)
    public async createAanbieder(@Args() args: CreateAanbiederInputType): Promise<AanbiederType> {
        return this.createAanbiederService.createAanbieder(args)
    }
}
