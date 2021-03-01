import { Type } from 'class-transformer'
import { ArgsType, Field, InputType } from '@nestjs/graphql'
import { ValidateNested, IsEmail } from 'class-validator'
import { UpdateTaalhuisInput } from '../UpdateTaalhuisService'

@InputType()
class UpdateTaalhuisAddressInputType {
    @Field()
    public street?: string

    @Field()
    public houseNumber?: string

    @Field({ nullable: true })
    public houseNumberSuffix?: string

    @Field()
    public postalCode?: string

    @Field()
    public locality?: string
}

@ArgsType()
export class UpdateTaalhuisInputType implements UpdateTaalhuisInput {
    @Field()
    public id!: string

    @Field()
    @Type(() => UpdateTaalhuisAddressInputType)
    @ValidateNested()
    public address?: UpdateTaalhuisAddressInputType

    @Field()
    public name?: string

    @Field()
    @IsEmail()
    public email?: string

    @Field()
    public phoneNumber?: string
}
