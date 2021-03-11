import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { RegisterStudentService } from './services/RegisterStudentService'
import { StudentResolver } from './StudentResolver'

@Module({
    providers: [StudentResolver, RegisterStudentService],
    exports: [],
    imports: [CommonGroundAPIModule],
})
export class StudentModule {}
