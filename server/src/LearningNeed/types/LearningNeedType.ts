import { Field, ObjectType } from '@nestjs/graphql'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedTopicEnum,
} from '../services/LearningNeedService'
import { ParticipationType } from './ParticipationType'

@ObjectType()
export class LearningNeedType {
    @Field()
    public id!: string

    @Field()
    public learningNeedDescription!: string

    @Field()
    public learningNeedMotivation!: string

    @Field()
    public desiredOutComesGoal!: string

    @Field(() => LearningNeedTopicEnum)
    public desiredOutComesTopic!: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesTopicOther!: string | null

    @Field(() => LearningNeedApplicationEnum)
    public desiredOutComesApplication!: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesApplicationOther!: string | null

    @Field(() => LearningNeedLevelEnum)
    public desiredOutComesLevel!: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public desiredOutComesLevelOther!: string | null

    @Field()
    public offerDesiredOffer!: string

    @Field()
    public offerAdvisedOffer!: string

    @Field(() => LearningNeedOfferDifferenceEnum)
    public offerDifference!: LearningNeedOfferDifferenceEnum

    @Field(() => String, { nullable: true })
    public offerDifferenceOther!: string | null

    @Field(() => String, { nullable: true })
    public offerEngagements!: string | null

    // Verwijzingen
    @Field(() => [ParticipationType])
    public participations!: ParticipationType[]
}
