import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsUrl, ValidateNested } from 'class-validator'
import { PublicGuard } from 'src/User/guards/PublicGuardDecorator'
import { RegisterStudentInput, RegisterStudentService } from './services/RegisterStudentService'

@InputType()
class RegisterStudentAddresInputType {
    @Field({ nullable: true })
    public street?: string

    @Field({ nullable: true })
    public postalCode?: string

    @Field({ nullable: true })
    public locality?: string

    @Field({ nullable: true })
    public houseNumber?: string

    @Field({ nullable: true })
    public houseNumberSuffix?: string
}

@InputType()
class RegisterStudentStudentInputType {
    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    public email!: string

    @Field()
    public telephone!: string

    @Field({ nullable: true })
    @Type(() => RegisterStudentAddresInputType)
    @ValidateNested()
    public address?: RegisterStudentAddresInputType
}

@InputType()
export class RegisterStudentInputType implements RegisterStudentInput {
    @Field()
    @IsUrl()
    public taalhuisId!: string

    @Field()
    @Type(() => RegisterStudentStudentInputType)
    @ValidateNested()
    public student!: RegisterStudentStudentInputType
}

// @Resolver(() => StudentType)
@Resolver()
export class StudentResolver {
    public constructor(private registerStudentService: RegisterStudentService) {}

    @PublicGuard()
    @Mutation(() => Boolean)
    public async registerStudent(@Args('input') args: RegisterStudentInputType): Promise<boolean> {
        // TODO: Authorization checks (user type, user role, can user see given Taalhuis?)

        return this.registerStudentService.registerStudent(args)
    }
}
