import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CreateTaalhuisInputType } from './types/CreateTaalhuisInputType'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { TaalhuisType } from './types/TaalhuisType'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { TaalhuisRepository } from './TaalhuisRepository'
// import { GetDataloaders as Dataloaders } from 'src/GetDataloadersDecorator'
// import { GetDataLoaders } from 'src/DataloaderInterceptor'

@Resolver(() => TaalhuisType)
export class TaalhuisResolver {
    public constructor(
        private createTaalhuisService: CreateTaalhuisService,
        private taalhuisRepository: TaalhuisRepository
    ) {}

    @Query(() => [TaalhuisType])
    public async taalhuizen(@CurrentUser() user: UserEntity): Promise<TaalhuisType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.taalhuisRepository.findAll()
    }

    @Mutation(() => TaalhuisType)
    public async createTaalhuis(@Args() args: CreateTaalhuisInputType): Promise<TaalhuisType> {
        return this.createTaalhuisService.createTaalhuis(args) as any
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
