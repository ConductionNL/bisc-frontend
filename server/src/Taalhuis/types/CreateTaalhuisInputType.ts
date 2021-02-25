import { ArgsType, Field } from '@nestjs/graphql'
import { IsEmail, IsPhoneNumber, IsPostalCode } from 'class-validator'
import { CreateTaalhuisInput } from '../CreateTaalhuisService'

@ArgsType()
class CreateTaalhuisAddressInputType {
    @Field()
    public street!: string

    @Field()
    public houseNumber!: string

    @Field()
    public houseNumberSuffix?: string

    @Field()
    @IsPostalCode('NL')
    public postalCode!: string

    @Field()
    public locality!: string
}

@ArgsType()
export class CreateTaalhuisInputType implements CreateTaalhuisInput {
    @Field()
    public address!: CreateTaalhuisAddressInputType

    @Field()
    public name!: string

    @Field()
    @IsEmail()
    public email!: string

    @Field()
    @IsPhoneNumber('NL')
    public phoneNumber!: string
}
