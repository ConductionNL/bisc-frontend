import { Args, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { AanbiederEmployeeService } from './AanbiederEmployeeService'
import { AanbiederEmployeeInputType } from './types/AanbiederEmployeeInputType'
import { AanbiederEmployeeType } from './types/AanbiederEmployeeType'

@Resolver(() => AanbiederEmployeeType)
export class AanbiederEmployeeResolver {
    public constructor(private aanbiederEmployeeService: AanbiederEmployeeService) {}

    @Query(() => [AanbiederEmployeeType])
    public async aanbiederEmployees(
        @CurrentUser() user: UserEntity,
        @Args() args: AanbiederEmployeeInputType
    ): Promise<AanbiederEmployeeType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.aanbiederEmployeeService.findByAanbiederId(args.aanbiederId)
    }
}
