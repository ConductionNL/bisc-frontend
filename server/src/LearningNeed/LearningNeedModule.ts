import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { StudentModule } from 'src/Student/StudentModule'
import { UserModule } from 'src/User/UserModule'
import { LearningNeedResolver } from './LearningNeedResolver'
import { CreateLearningNeedService } from './services/CreateLearningNeedService'
import { LearningNeedPolicyService } from './services/LearningNeedPolicyService'
import { LearningNeedService } from './services/LearningNeedService'

@Module({
    imports: [CommonGroundAPIModule, UserModule, StudentModule],
    providers: [LearningNeedResolver, CreateLearningNeedService, LearningNeedService, LearningNeedPolicyService],
})
export class LearningNeedModule {}
