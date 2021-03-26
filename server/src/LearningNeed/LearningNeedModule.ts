import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { UserModule } from 'src/User/UserModule'
import { LearningNeedResolver } from './LearningNeedResolver'
import { CreateLearningNeedService } from './services/CreateLearningNeedService'
import { LearningNeedService } from './services/LearningNeedService'

@Module({
    imports: [CommonGroundAPIModule, UserModule],
    providers: [LearningNeedResolver, CreateLearningNeedService, LearningNeedService],
})
export class LearningNeedModule {}
