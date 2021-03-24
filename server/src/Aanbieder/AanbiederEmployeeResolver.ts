import { Args, ArgsType, Field, Mutation, Query, Resolver } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { AanbiederEmployeeService } from './AanbiederEmployeeService'
import { CreateAanbiederEmployeeService } from './CreateAanbiederEmployeeService'
import { CreateAanbiederEmployeeInputType } from './types/CreateAanbiederEmployeeInputType'
import { AanbiederEmployeeType } from './types/AanbiederEmployeeType'

@ArgsType()
class AanbiederEmployeesArgs {
    @Field()
    @IsUrl()
    public aanbiederId!: string
}

@Resolver(() => AanbiederEmployeeType)
export class AanbiederEmployeeResolver {
    public constructor(
        private aanbiederEmployeeService: AanbiederEmployeeService,
        private createAanbiederEmployeeService: CreateAanbiederEmployeeService
    ) {}

    @Query(() => [AanbiederEmployeeType])
    public async aanbiederEmployees(
        @CurrentUser() user: UserEntity,
        @Args() args: AanbiederEmployeesArgs
    ): Promise<AanbiederEmployeeType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.aanbiederEmployeeService.findByAanbiederId(args.aanbiederId)
    }

    @Mutation(() => AanbiederEmployeeType)
    public async createAanbiederEmployee(
        @CurrentUser() user: UserEntity,
        @Args('input') input: CreateAanbiederEmployeeInputType
    ): Promise<AanbiederEmployeeType> {
        // TODO: Authorization checks (user type, user role)
        return this.createAanbiederEmployeeService.createAanbiederEmployee(input)
    }
}
