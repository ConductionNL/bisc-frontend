import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { PersonRepository } from './PersonRepository'

@ObjectType()
export class PersonType {
    @Field()
    public id!: string

    @Field()
    public name!: string
}

@ObjectType()
export class PersonEdgeType {
    @Field()
    public node!: PersonType
}

@Resolver(() => PersonType)
export class PersonResolver {
    public constructor(private personRepository: PersonRepository) {}

    @Query(() => [PersonEdgeType])
    public async persons(): Promise<PersonEdgeType[]> {
        const result = await this.personRepository.findPersons()

        return result
    }
}
