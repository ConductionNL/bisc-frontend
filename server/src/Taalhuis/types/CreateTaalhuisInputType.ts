import { ArgsType, Field } from '@nestjs/graphql'
import { CreateTaalhuisInput } from '../CreateTaalhuisService'

@ArgsType()
class CreateTaalhuisAddressInputType {
    @Field()
    public street?: string

    @Field()
    public houseNumber!: string

    @Field()
    public houseNumberSuffix?: string

    @Field()
    public postalCode!: string

    @Field()
    public locality?: string
}

@ArgsType()
export class CreateTaalhuisInputType implements CreateTaalhuisInput {
    @Field()
    public address!: CreateTaalhuisAddressInputType

    @Field()
    public name!: string

    @Field()
    public email!: string

    @Field()
    public phoneNumber!: string
}
