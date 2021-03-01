import { Field } from '@nestjs/graphql'
import { UpdateTaalhuisInput } from '../UpdateTaalhuisService'
import { CreateTaalhuisInputType } from './CreateTaalhuisInputType'

export class UpdateTaalhuisInputType extends CreateTaalhuisInputType implements UpdateTaalhuisInput {
    @Field()
    public id!: string
}
