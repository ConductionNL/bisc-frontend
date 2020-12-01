import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { ProgramRepository } from './ProgramRepository'

@ObjectType()
export class ProgramType {
    @Field()
    public id!: string

    @Field()
    public name!: string
}

@ObjectType()
export class ProgramEdgeType {
    @Field()
    public node!: ProgramType
}

@Resolver(() => ProgramType)
export class ProgramResolver {
    public constructor(private programRepository: ProgramRepository) {}

    @Query(() => [ProgramEdgeType])
    public async programs(): Promise<ProgramEdgeType[]> {
        const result = await this.programRepository.findPrograms()

        return result
    }

    @Query(() => [ProgramType])
    public async myPrograms(): Promise<ProgramType[]> {
        const result = await this.programRepository.findProgramsByPerson('/people/1db5d8ee-fe16-4303-b2bb-577621068c75')

        return result
    }
}
