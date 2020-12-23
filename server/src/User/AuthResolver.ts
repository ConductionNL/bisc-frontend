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
    public raw!: string
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

    @Mutation(() => RawReturnType)
    public async login(@Args() args: LoginArgs): Promise<RawReturnType> {
        const result = this.authService.login(args.username, args.password)

        return { raw: JSON.stringify(result) }
    }
}
