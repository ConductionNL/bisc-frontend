import { Field, Float, InputType } from '@nestjs/graphql'
import { IsUrl } from 'class-validator'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedTopicEnum,
} from '../services/LearningNeedService'
import {
    CreateParticipationInput,
    ParticipationGroupFormationEnum,
    ParticipationOfferCourseEnum,
} from '../services/ParticipationService'

@InputType()
export class CreateParticipationInputType implements CreateParticipationInput {
    @Field()
    @IsUrl()
    public learningNeedId!: string

    @Field(() => String, { nullable: true })
    public aanbiederId?: string | null

    @Field(() => String, { nullable: true })
    public aanbiederName?: string | null

    @Field(() => String, { nullable: true })
    public aanbiederNote?: string | null

    @Field(() => String, { nullable: true })
    public offerName?: string | null

    @Field(() => ParticipationOfferCourseEnum, { nullable: true })
    public offerCourse?: ParticipationOfferCourseEnum | null

    @Field(() => String, { nullable: true })
    public outComesGoal?: string | null

    @Field(() => LearningNeedTopicEnum, { nullable: true })
    public outComesTopic?: LearningNeedTopicEnum | null

    @Field(() => String, { nullable: true })
    public outComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum, { nullable: true })
    public outComesApplication?: LearningNeedApplicationEnum | null

    @Field(() => String, { nullable: true })
    public outComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum, { nullable: true })
    public outComesLevel?: LearningNeedLevelEnum | null

    @Field(() => String, { nullable: true })
    public outComesLevelOther?: string | null

    @Field(() => Boolean, { nullable: true })
    public detailsIsFormal?: boolean | null

    @Field(() => ParticipationGroupFormationEnum, { nullable: true })
    public detailsGroupFormation?: ParticipationGroupFormationEnum | null

    @Field(() => Float, { nullable: true })
    public detailsTotalClassHours?: number | null

    @Field(() => Boolean, { nullable: true })
    public detailsCertificateWillBeAwarded?: boolean | null

    @Field(() => Date, { nullable: true })
    public detailsStartDate?: Date | null

    @Field(() => Date, { nullable: true })
    public detailsEndDate?: Date | null

    @Field(() => String, { nullable: true })
    public detailsEngagements?: string | null
}
