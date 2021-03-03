import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class TaalhuisAddressType {
    @Field()
    public street!: string

    @Field()
    public houseNumber!: string

    @Field()
    public houseNumberSuffix?: string

    @Field()
    public postalCode!: string

    @Field()
    public locality!: string
}

@ObjectType()
export class TaalhuisType {
    @Field()
    public id!: string

    @Field()
    public name!: string

    @Field()
    public address?: TaalhuisAddressType

    @Field()
    public email!: string

    @Field()
    public telephone!: string
}
