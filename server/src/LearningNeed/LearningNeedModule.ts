import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { StudentModule } from 'src/Student/StudentModule'
import { UserModule } from 'src/User/UserModule'
import { LearningNeedResolver } from './LearningNeedResolver'
import { ParticipationResolver } from './ParticipationResolver'
import { CreateLearningNeedService } from './services/CreateLearningNeedService'
import { LearningNeedPolicyService } from './services/LearningNeedPolicyService'
import { LearningNeedService } from './services/LearningNeedService'
import { ParticipationService } from './services/ParticipationService'

@Module({
    imports: [CommonGroundAPIModule, UserModule, StudentModule],
    providers: [
        LearningNeedResolver,
        CreateLearningNeedService,
        LearningNeedService,
        LearningNeedPolicyService,
        ParticipationResolver,
        ParticipationService,
    ],
})
export class LearningNeedModule {}
