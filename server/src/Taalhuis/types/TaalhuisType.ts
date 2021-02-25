import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class TaalhuisType {
    @Field()
    public id!: string

    @Field()
    public name!: string

    // @Field()
    // public dateCreated!: Date

    // @Field()
    // public dateModified!: Date

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
