import { ArgsType, Field } from '@nestjs/graphql'
import { UpdateTaalhuisInput } from '../UpdateTaalhuisService'
import { CreateTaalhuisInputType } from './CreateTaalhuisInputType'
@ArgsType()
export class UpdateTaalhuisInputType extends CreateTaalhuisInputType implements UpdateTaalhuisInput {
    @Field()
    public id!: string
}
