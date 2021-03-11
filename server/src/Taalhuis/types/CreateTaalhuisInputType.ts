import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsEmail, IsOptional, IsPostalCode, ValidateNested } from 'class-validator'
import { CreateTaalhuisInput } from '../CreateTaalhuisService'

@InputType()
class CreateTaalhuisAddressInputType {
    @Field()
    public street!: string

    @Field()
    public houseNumber!: string

    @Field({ nullable: true })
    @IsOptional()
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
    @Type(() => CreateTaalhuisAddressInputType)
    @ValidateNested()
    public address!: CreateTaalhuisAddressInputType

    @Field()
    public name!: string

    @Field()
    @IsEmail()
    public email!: string

    @Field()
    public phoneNumber!: string
}