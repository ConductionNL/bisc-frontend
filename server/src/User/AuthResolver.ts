import { Args, ArgsType, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql'
import { UserRepository } from './UserRepository'

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

@ArgsType()
class LoginArgs {
    @Field()
    public username!: string
}

@Resolver()
export class AuthResolver {
    public constructor(private userRepository: UserRepository) {}

    @Mutation(() => UserEdgeType)
    public async login(@Args() args: LoginArgs): Promise<UserEdgeType> {
        const result = this.userRepository.findUsersByUsername(args.username)

        return result
    }
}
