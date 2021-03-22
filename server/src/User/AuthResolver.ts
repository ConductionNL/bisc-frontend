import { Args, ArgsType, Field, Mutation, ObjectType, Query, registerEnumType, Resolver } from '@nestjs/graphql'
import { TaalhuisUserRoleType } from 'src/Taalhuis/types/TaalhuisUserRoleType'
import { AuthService } from './AuthService'
import { CurrentUser } from './CurrentUserDecorator'
import { ContextUser, UserEnvironmentEnum } from './entities/UserEntity'
import { PublicGuard } from './guards/PublicGuardDecorator'

registerEnumType(UserEnvironmentEnum, { name: 'UserEnvironmentEnum' })

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

@ObjectType()
export class ContextUserType extends ContextUser {
    @Field()
    public id!: string

    @Field()
    public username!: string

    @Field()
    public givenName!: string

    @Field(() => String, { nullable: true })
    public additionalName!: string | null

    @Field()
    public familyName!: string

    @Field(() => UserEnvironmentEnum)
    public userEnvironment!: UserEnvironmentEnum

    @Field(() => String, { nullable: true })
    public organizationId!: string | null

    @Field(() => String, { nullable: true })
    public organizationName!: string | null

    @Field()
    public dateCreated!: string

    @Field()
    public dateModified!: string

    @Field(() => [TaalhuisUserRoleType])
    public userRoles!: TaalhuisUserRoleType[]
}

@Resolver()
export class AuthResolver {
    public constructor(private authService: AuthService) {}

    // TODO: Maybe move auth logic to LocalAuthGuard? Unguarded login mutation looks like an easier solution though,
    // see docs https://docs.nestjs.com/security/authentication#implementing-passport-local
    @Mutation(() => RawReturnType)
    @PublicGuard()
    public async login(@Args() args: LoginArgs): Promise<RawReturnType> {
        return this.authService.login(args.username, args.password)
    }

    @Query(() => ContextUserType)
    public currentUser(@CurrentUser() user: ContextUser) {
        return user
    }
}
