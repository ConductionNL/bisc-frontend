import { UseGuards } from '@nestjs/common'
import { Args, ArgsType, Field, Mutation, Resolver } from '@nestjs/graphql'
import { IsNotEmpty, MaxLength, Validate } from 'class-validator'
import { CurrentUser } from './CurrentUserDecorator'
import { UserEntity } from './entities/UserEntity'
import { JwtAuthGuard } from './guards/JwtAuthGuard'
import { ChangePasswordService } from './services/ChangePasswordService'
import { IsPasswordStrengthSufficientConstraint } from './types/PasswordStrengthConstraint'

@ArgsType()
class ChangePasswordArgs {
    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    public currentPassword!: string

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    @Validate(IsPasswordStrengthSufficientConstraint)
    public newPassword!: string
}

@Resolver()
@UseGuards(JwtAuthGuard)
export class ChangePasswordResolver {
    public constructor(private changePasswordService: ChangePasswordService) {}

    @Mutation(() => Boolean)
    public changePassword(@CurrentUser() user: UserEntity, @Args() args: ChangePasswordArgs): Promise<boolean> {
        return this.changePasswordService.changePassword(user, args.currentPassword, args.newPassword)
    }
}
