import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { CreateStudentService } from './services/CreateStudentService'
import { RegisterStudentService } from './services/RegisterStudentService'
import { RegistrationService } from './services/RegistrationService'
import { StudentResolver } from './StudentResolver'

@Module({
    providers: [StudentResolver, RegisterStudentService, RegistrationService, CreateStudentService],
    exports: [],
    imports: [CommonGroundAPIModule],
})
export class StudentModule {}
