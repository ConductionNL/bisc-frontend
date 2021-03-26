import { Resolver, Query, Args, Mutation, Field, registerEnumType, ArgsType } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { ContextUser } from 'src/User/entities/UserEntity'
import { CreateLearningNeedService } from './services/CreateLearningNeedService'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedService,
    LearningNeedTopicEnum,
} from './services/LearningNeedService'
import { CreateLearningNeedInputType } from './types/CreateLearningNeedInputType'
import { LearningNeedType } from './types/LearningNeedType'

registerEnumType(LearningNeedApplicationEnum, { name: 'LearningNeedApplicationEnum' })
registerEnumType(LearningNeedLevelEnum, { name: 'LearningNeedLevelEnum' })
registerEnumType(LearningNeedOfferDifferenceEnum, { name: 'LearningNeedOfferDifferenceEnum' })
registerEnumType(LearningNeedTopicEnum, { name: 'LearningNeedTopicEnum' })

@ArgsType()
class LearningNeedsArgs {
    @Field()
    @IsUrl()
    public studentId!: string
}

@Resolver()
// @Resolver(() => AanbiederType)
export class LearningNeedResolver {
    public constructor(
        private createLearningNeedService: CreateLearningNeedService,
        private learningNeedService: LearningNeedService
    ) {}

    @Query(() => [LearningNeedType])
    public async learningNeeds(
        @CurrentUser() contextUser: ContextUser,
        @Args() args: LearningNeedsArgs
    ): Promise<LearningNeedType[]> {
        // TODO: Authorization checks (user type, user role)
        return this.learningNeedService.findByParticipantId(args.studentId)
    }

    @Mutation(() => LearningNeedType)
    public async createLearningNeed(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: CreateLearningNeedInputType
    ): Promise<LearningNeedType> {
        // TODO: Auth checks
        return this.createLearningNeedService.createLearingNeed(input)
    }
}
