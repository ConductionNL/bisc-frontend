import { Args, ArgsType, Field, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateTaalhuisInputType } from './types/CreateTaalhuisInputType'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { TaalhuisType } from './types/TaalhuisType'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { ContextUser } from 'src/User/entities/UserEntity'
import { UpdateTaalhuisInputType } from './types/UpdateTaalhuisInputType'
import { UpdateTaalhuisService } from './UpdateTaalhuisService'
import { DeleteTaalhuisService } from './DeleteTaalhuisService'
import { DeleteTaalhuisInputType } from './types/DeleteTaalhuisInputType'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { IsUrl } from 'class-validator'
import { TaalhuisPolicyService } from './TaalhuisPolicyService'
import { UnauthorizedException } from '@nestjs/common'
// import { GetDataloaders as Dataloaders } from 'src/GetDataloadersDecorator'
// import { GetDataLoaders } from 'src/DataloaderInterceptor'

@ArgsType()
class TaalhuisArgs {
    @Field()
    @IsUrl()
    public taalhuisId!: string
}

@Resolver(() => TaalhuisType)
export class TaalhuisResolver {
    public constructor(
        private createTaalhuisService: CreateTaalhuisService,
        private updateTaalhuisService: UpdateTaalhuisService,
        private deleteTaalhuisService: DeleteTaalhuisService,
        private organizationRepository: OrganizationRepository,
        private taalhuisPolicyService: TaalhuisPolicyService
    ) {}

    @Query(() => [TaalhuisType])
    public async taalhuizen(@CurrentUser() contextUser: ContextUser): Promise<TaalhuisType[]> {
        const isAuthorized = this.taalhuisPolicyService.canList(contextUser)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.organizationRepository.findAll(OrganizationTypesEnum.TAALHUIS)
    }

    @Query(() => TaalhuisType)
    public async taalhuis(@CurrentUser() contextUser: ContextUser, @Args() args: TaalhuisArgs): Promise<TaalhuisType> {
        const isAuthorized = this.taalhuisPolicyService.canView(contextUser)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.organizationRepository.getOne(args.taalhuisId, OrganizationTypesEnum.TAALHUIS)
    }

    @Mutation(() => TaalhuisType)
    public async createTaalhuis(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: CreateTaalhuisInputType
    ): Promise<TaalhuisType> {
        const isAuthorized = this.taalhuisPolicyService.canCreate(contextUser)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.createTaalhuisService.createTaalhuis(args)
    }

    @Mutation(() => TaalhuisType)
    public async updateTaalhuis(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: UpdateTaalhuisInputType
    ): Promise<TaalhuisType> {
        const isAuthorized = this.taalhuisPolicyService.canUpdate(contextUser)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return this.updateTaalhuisService.updateTaalhuis(args)
    }

    @Mutation(() => Boolean)
    public async deleteTaalhuis(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: DeleteTaalhuisInputType
    ): Promise<boolean> {
        const isAuthorized = this.taalhuisPolicyService.canDelete(contextUser)
        if (isAuthorized !== true) {
            throw new UnauthorizedException()
        }

        return !!(await this.deleteTaalhuisService.deleteTaalhuis(args.id))
    }

    // TODO: Taalhuis type (perhaps TaalhuisEntity?)
    // @ResolveField()
    // public async address(
    //     @Parent() taalhuis: { addresses: { id: string }[] },
    //     @Dataloaders() getDataloaders: GetDataLoaders
    // ) {
    //     return this.postsService.findAll({ authorId: id })
    // }
}
