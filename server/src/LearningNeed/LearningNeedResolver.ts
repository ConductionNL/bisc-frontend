import { Resolver, Query, Args, Mutation, InputType, Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { ContextUser } from 'src/User/entities/UserEntity'
import {
    CreateLearningNeedInput,
    CreateLearningNeedService,
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedTopicEnum,
} from './services/CreateLearningNeedService'

registerEnumType(LearningNeedApplicationEnum, { name: 'LearningNeedApplicationEnum' })
registerEnumType(LearningNeedLevelEnum, { name: 'LearningNeedLevelEnum' })
registerEnumType(LearningNeedOfferDifferenceEnum, { name: 'LearningNeedOfferDifferenceEnum' })
registerEnumType(LearningNeedTopicEnum, { name: 'LearningNeedTopicEnum' })

@ObjectType()
class LearningNeedType {
    @Field()
    public id!: string
}

@InputType()
class CreateLearningNeedInputType implements CreateLearningNeedInput {
    @Field()
    @IsUrl()
    public studentId!: string

    @Field()
    public learningNeedDescription!: string

    @Field()
    public learningNeedMotivation!: string

    @Field()
    public desiredOutComesGoal!: string

    @Field(() => LearningNeedTopicEnum)
    public desiredOutComesTopic!: LearningNeedTopicEnum

    @Field()
    public desiredOutComesTopicOther!: string

    @Field(() => LearningNeedApplicationEnum)
    public desiredOutComesApplication!: LearningNeedApplicationEnum

    @Field()
    public desiredOutComesApplicationOther!: string

    @Field(() => LearningNeedLevelEnum)
    public desiredOutComesLevel!: LearningNeedLevelEnum

    @Field()
    public desiredOutComesLevelOther!: string

    @Field()
    public offerDesiredOffer!: string

    @Field()
    public offerAdvisedOffer!: string

    @Field(() => LearningNeedOfferDifferenceEnum)
    public offerDifference!: LearningNeedOfferDifferenceEnum

    @Field()
    public offerDifferenceOther!: string

    @Field(() => String, { nullable: true })
    public offerEngagements?: string | null
}

@Resolver()
// @Resolver(() => AanbiederType)
export class LearningNeedResolver {
    public constructor(private createLearningNeedService: CreateLearningNeedService) {}

    // @Query(() => [LearningNeedType])
    // public async learningNeeds(@CurrentUser() user: UserEntity): Promise<LearningNeedType[]> {
    //     // TODO: Authorization checks (user type, user role)
    //     return this.organizationRepository.findAll(OrganizationTypesEnum.AANBIEDER)
    // }

    @Mutation(() => LearningNeedType)
    public async createLearningNeed(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: CreateLearningNeedInputType
    ): Promise<LearningNeedType> {
        // TODO: Auth checks
        return this.createLearningNeedService.createLearingNeed(input)
    }
}
