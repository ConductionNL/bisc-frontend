import { Args, ArgsType, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { CreateTaalhuisInput, CreateTaalhuisService } from './CreateTaalhuisService'

@ObjectType()
export class TaalhuisType {
    @Field()
    public id!: string

    @Field()
    public name!: string

    @Field()
    public dateCreated!: Date

    @Field()
    public dateModified!: Date

    @Field()
    public address?: TaalhuisAddressType
}

@ObjectType()
class TaalhuisAddressType {
    @Field()
    public street!: string

    @Field()
    public postalCode!: string

    @Field()
    public locality!: string
}

@ArgsType()
class CreateTaalhuisAddressInputType {
    @Field()
    public street!: string

    @Field()
    public postalCode!: string

    @Field()
    public locality!: string
}

@ArgsType()
class CreateTaalhuisInputType implements CreateTaalhuisInput {
    @Field()
    public address!: CreateTaalhuisAddressInputType

    @Field()
    public name!: string
}
@Resolver()
export class TaalhuisResolver {
    public constructor(private createTaalhuisService: CreateTaalhuisService) {}

    @Mutation(() => TaalhuisType)
    public async createTaalhuis(@Args() args: CreateTaalhuisInputType): Promise<TaalhuisType> {
        return this.createTaalhuisService.createTaalhuis(args)
    }
}
