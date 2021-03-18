import { Args, ArgsType, Field, Mutation, Query, registerEnumType, Resolver } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { UserEntity } from 'src/User/entities/UserEntity'
import { PublicGuard } from 'src/User/guards/PublicGuardDecorator'
import { CreateStudentService } from './services/CreateStudentService'
import { RegisterStudentService } from './services/RegisterStudentService'
import { RegistrationService } from './services/RegistrationService'
import { CreateStudentInputType } from './types/CreateStudentInputType'
import { RegisterStudentInputType } from './types/RegisterStudentInputType'
import { StudentType } from './types/StudentType'

registerEnumType(ParticipantStatusEnum, { name: 'ParticipantStatusEnum' })

@ArgsType()
class RegistrationsArgs {
    @Field()
    @IsUrl()
    public taalhuisId!: string
}

@ArgsType()
class FindAcceptAndDeleteRegistrationArgs {
    @Field()
    @IsUrl()
    public studentId!: string
}

@Resolver(() => StudentType)
export class StudentResolver {
    public constructor(
        private registerStudentService: RegisterStudentService,
        private registrationService: RegistrationService,
        private createStudentService: CreateStudentService
    ) {}

    @PublicGuard()
    @Mutation(() => Boolean)
    public async registerStudent(@Args('input') args: RegisterStudentInputType): Promise<boolean> {
        return this.registerStudentService.registerStudent(args)
    }

    @Query(() => [StudentType])
    public async registrations(
        @CurrentUser() user: UserEntity,
        @Args() args: RegistrationsArgs
    ): Promise<StudentType[]> {
        // TODO: Authorization checks (user type, user role, can user see given Taalhuis and Students?)

        return this.registrationService.findByTaalhuisId(args.taalhuisId)
    }

    @Query(() => StudentType)
    public async registration(
        @CurrentUser() user: UserEntity,
        @Args() args: FindAcceptAndDeleteRegistrationArgs
    ): Promise<StudentType> {
        // TODO: Authorization checks (user type, user role, can user see given Taalhuis and Students?)

        return this.registrationService.findByStudentId(args.studentId)
    }

    @Mutation(() => Boolean)
    public async deleteRegistration(@Args() args: FindAcceptAndDeleteRegistrationArgs): Promise<boolean> {
        // TODO: Authorization checks

        return this.registrationService.deleteRegistration(args.studentId)
    }

    @Mutation(() => StudentType)
    public async acceptRegistration(@Args() args: FindAcceptAndDeleteRegistrationArgs): Promise<StudentType> {
        // TODO: Authorization checks

        await this.registrationService.acceptRegistration(args.studentId)

        return this.registrationService.findByStudentId(args.studentId)
    }

    @Mutation(() => StudentType)
    public async createStudent(@Args('input') args: CreateStudentInputType): Promise<StudentType> {
        // TODO: Authorization checks

        return this.createStudentService.createStudent(args)
    }
}
