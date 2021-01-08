import { UseGuards } from '@nestjs/common'
import { Args, ArgsType, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { AuthService } from './AuthService'

@ObjectType()
export class UserType {
    @Field()
    public id!: string

    @Field()
    public username!: string
}

@ObjectType()
export class UserEdgeType {
    @Field()
    public node!: UserType
}

@ObjectType()
export class RawReturnType {
    @Field()
    public accessToken!: string
}

@ArgsType()
class LoginArgs {
    @Field()
    public username!: string

    @Field()
    public password!: string
}

@Resolver()
export class AuthResolver {
    public constructor(private authService: AuthService) {}

    // TODO: Maybe move auth logic to LocalAuthGuard? Unguarded login mutation looks like an easier solution though,
    // see docs https://docs.nestjs.com/security/authentication#implementing-passport-local
    @Mutation(() => RawReturnType)
    public async login(@Args() args: LoginArgs): Promise<RawReturnType> {
        const result = this.authService.login(args.username, args.password)

        return result
    }
}
