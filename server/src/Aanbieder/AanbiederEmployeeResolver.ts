import { Args, ArgsType, Field, Mutation, Query, Resolver } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { AanbiederEmployeeService } from './AanbiederEmployeeService'
import { CreateAanbiederEmployeeService } from './CreateAanbiederEmployeeService'
import { CreateAanbiederEmployeeInputType } from './types/CreateAanbiederEmployeeInputType'
import { AanbiederEmployeeType } from './types/AanbiederEmployeeType'
import { DeleteAanbiederEmployeeService } from './DeleteAanbiederEmployeeService'

@ArgsType()
class AanbiederEmployeesArgs {
    @Field()
    @IsUrl()
    public aanbiederId!: string
}

@ArgsType()
class AanbiederEmployeeArgs {
    @Field()
    @IsUrl()
    public userId!: string
}

@Resolver(() => AanbiederEmployeeType)
export class AanbiederEmployeeResolver {
    public constructor(
        private aanbiederEmployeeService: AanbiederEmployeeService,
        private createAanbiederEmployeeService: CreateAanbiederEmployeeService,
        private deleteAanbiederEmployeeService: DeleteAanbiederEmployeeService
    ) {}

    @Query(() => [AanbiederEmployeeType])
    public async aanbiederEmployees(
        @CurrentUser() user: UserEntity,
        @Args() args: AanbiederEmployeesArgs
    ): Promise<AanbiederEmployeeType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.aanbiederEmployeeService.findByAanbiederId(args.aanbiederId)
    }

    @Query(() => AanbiederEmployeeType)
    public async aanbiederEmployee(
        @CurrentUser() user: UserEntity,
        @Args() args: AanbiederEmployeeArgs
    ): Promise<AanbiederEmployeeType> {
        // TODO: Authorization checks (user type, user role)
        return this.aanbiederEmployeeService.findByUserId(args.userId)
    }

    @Mutation(() => AanbiederEmployeeType)
    public async createAanbiederEmployee(
        @CurrentUser() user: UserEntity,
        @Args('input') input: CreateAanbiederEmployeeInputType
    ): Promise<AanbiederEmployeeType> {
        // TODO: Authorization checks (user type, user role)
        return this.createAanbiederEmployeeService.createAanbiederEmployee(input)
    }

    @Mutation(() => Boolean)
    public async deleteAanbiederEmployee(@Args('userId') userId: string): Promise<boolean> {
        return this.deleteAanbiederEmployeeService.deleteAanbiederEmployee(userId)
    }
}
