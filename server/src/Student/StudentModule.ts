import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { CreateStudentService } from './services/CreateStudentService'
import { RegisterStudentService } from './services/RegisterStudentService'
import { RegistrationService } from './services/RegistrationService'
import { StudentPolicyService } from './services/StudentPolicyService'
import { StudentService } from './services/StudentService'
import { StudentResolver } from './StudentResolver'

@Module({
    providers: [
        StudentResolver,
        StudentService,
        RegisterStudentService,
        RegistrationService,
        CreateStudentService,
        StudentPolicyService,
    ],
    exports: [],
    imports: [CommonGroundAPIModule],
})
export class StudentModule {}
