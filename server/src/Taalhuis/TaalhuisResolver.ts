import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateTaalhuisInputType } from './types/CreateTaalhuisInputType'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { TaalhuisType } from './types/TaalhuisType'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { TaalhuisRepository } from '../CommonGroundAPI/cc/TaalhuisRepository'
import { UpdateTaalhuisInputType } from './types/UpdateTaalhuisInputType'
import { UpdateTaalhuisService } from './UpdateTaalhuisService'
// import { GetDataloaders as Dataloaders } from 'src/GetDataloadersDecorator'
// import { GetDataLoaders } from 'src/DataloaderInterceptor'

@Resolver(() => TaalhuisType)
export class TaalhuisResolver {
    public constructor(
        private createTaalhuisService: CreateTaalhuisService,
        private updateTaalhuisService: UpdateTaalhuisService,
        private taalhuisRepository: TaalhuisRepository
    ) {}

    @Query(() => [TaalhuisType])
    public async taalhuizen(@CurrentUser() user: UserEntity): Promise<TaalhuisType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.taalhuisRepository.findAll()
    }

    @Mutation(() => TaalhuisType)
    public async createTaalhuis(@Args() args: CreateTaalhuisInputType): Promise<TaalhuisType> {
        return this.createTaalhuisService.createTaalhuis(args)
    }

    @Mutation(() => TaalhuisType)
    public async updateTaalhuis(@Args() args: UpdateTaalhuisInputType): Promise<TaalhuisType> {
        return this.updateTaalhuisService.updateTaalhuis(args)
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
