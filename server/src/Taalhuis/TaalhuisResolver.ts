import { Args, ArgsType, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { CreateTaalhuisService } from './CreateTaalhuisService'

@ObjectType()
export class TaalhuisType {
    @Field()
    public id!: string

    @Field()
    public street!: string

    @Field()
    public postalCode!: string

    @Field()
    public locality!: string
}

@ArgsType()
class CreateTaalhuisInputType {
    @Field()
    public street!: string

    @Field()
    public postalCode!: string

    @Field()
    public locality!: string
}

@Resolver()
export class TaalhuisResolver {
    public constructor(private createTaalhuisService: CreateTaalhuisService) {}

    @Mutation(() => TaalhuisType)
    public async createTaalhuis(@Args() args: CreateTaalhuisInputType): Promise<TaalhuisType> {
        return this.createTaalhuisService.createTaalhuis(args)
    }
}
