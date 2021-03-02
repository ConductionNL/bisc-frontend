import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { CreateTaalhuisEmployeeInput, CreateTaalhuisEmployeeService } from './CreateTaalhuisEmployeeService'
import { TaalhuisEmployeeType } from './types/TaalhuisEmployeeType'

@InputType()
class CreateTaalhuisEmployeeInputType implements CreateTaalhuisEmployeeInput {
    @Field()
    public taalhuisId!: string

    @Field()
    public userGroupId!: string

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    @IsEmail()
    public email!: string

    @Field()
    public telephone!: string
}

@Resolver(() => TaalhuisEmployeeType)
export class TaalhuisEmployeeResolver {
    public constructor(private createTaalhuisEmployeeService: CreateTaalhuisEmployeeService) {}

    // @Query(() => [TaalhuisType])
    // public async taalhuizen(@CurrentUser() user: UserEntity): Promise<TaalhuisType[]> {
    //     // TODO: Authorization checks (user type, user role)
    //     return this.taalhuisRepository.findAll()
    // }

    @Mutation(() => TaalhuisEmployeeType)
    public async createTaalhuisEmployee(
        @Args('input') input: CreateTaalhuisEmployeeInputType
    ): Promise<TaalhuisEmployeeType> {
        return this.createTaalhuisEmployeeService.createTaalhuisEmployee(input)
    }
}
