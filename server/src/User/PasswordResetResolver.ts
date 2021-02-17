import { Args, ArgsType, Field, Mutation, Resolver } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { PasswordResetService } from './services/PasswordResetService'

@ArgsType()
class RequestPasswordResetArgs {
    @Field({ nullable: true })
    @IsNotEmpty()
    @MaxLength(255)
    @IsEmail()
    public email!: string
}

@ArgsType()
class ResetPasswordArgs {
    @Field({ nullable: true })
    @IsNotEmpty()
    @MaxLength(255)
    @IsEmail()
    public email!: string

    @Field()
    public token!: string

    @Field({ nullable: true })
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(8)
    public password!: string
}

@Resolver()
export class PasswordResetResolver {
    public constructor(private passwordResetService: PasswordResetService) {}

    @Mutation(() => Boolean)
    public async requestPasswordReset(@Args() args: RequestPasswordResetArgs): Promise<boolean> {
        await this.passwordResetService.requestPasswordReset(args.email)
        // We should always return true here to avoid leaking info about emails.
        return true
    }

    @Mutation(() => Boolean)
    public async resetPassword(@Args() args: ResetPasswordArgs): Promise<boolean> {
        return this.passwordResetService.resetPasswordByToken(args.email, args.token, args.password)
    }
}
