import { Args, ArgsType, Field, InputType, Mutation, Query, Resolver } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { CreateTaalhuisEmployeeInput, CreateTaalhuisEmployeeService } from './CreateTaalhuisEmployeeService'
import { TaalhuisEmployeeService } from './TaalhuisEmployeeService'
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

@ArgsType()
class TaalhuisEmployeesArgs {
    @Field()
    public taalhuisId!: string
}

@Resolver(() => TaalhuisEmployeeType)
export class TaalhuisEmployeeResolver {
    public constructor(
        private createTaalhuisEmployeeService: CreateTaalhuisEmployeeService,
        private taalhuisEmployeeService: TaalhuisEmployeeService
    ) {}

    @Query(() => [TaalhuisEmployeeType])
    public async taalhuisEmployees(
        @CurrentUser() user: UserEntity,
        @Args() args: TaalhuisEmployeesArgs
    ): Promise<TaalhuisEmployeeType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.taalhuisEmployeeService.findByTaalhuisId(args.taalhuisId)
    }

    @Mutation(() => TaalhuisEmployeeType)
    public async createTaalhuisEmployee(
        @Args('input') input: CreateTaalhuisEmployeeInputType
    ): Promise<TaalhuisEmployeeType> {
        return this.createTaalhuisEmployeeService.createTaalhuisEmployee(input)
    }
}
