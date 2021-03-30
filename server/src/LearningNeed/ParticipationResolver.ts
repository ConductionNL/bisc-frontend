import { Resolver, Args, Mutation, registerEnumType } from '@nestjs/graphql'
import { CurrentUser } from 'src/User/CurrentUserDecorator'
import { ContextUser } from 'src/User/entities/UserEntity'
import {
    ParticipationGroupFormationEnum,
    ParticipationOfferCourseEnum,
    ParticipationStatusEnum,
} from './services/ParticipationService'
import { CreateParticipationInputType } from './types/CreateParticipationInputType'
import { ParticipationType } from './types/ParticipationType'

registerEnumType(ParticipationStatusEnum, { name: 'ParticipationStatusEnum' })
registerEnumType(ParticipationOfferCourseEnum, { name: 'ParticipationOfferCourseEnum' })
registerEnumType(ParticipationGroupFormationEnum, { name: 'ParticipationGroupFormationEnum' })

// @ArgsType()
// class ParticipationsArgs {
//     @Field()
//     @IsUrl()
//     public studentId!: string
// }

@Resolver(() => ParticipationType)
export class ParticipationResolver {
    @Mutation(() => ParticipationType)
    public async createParticipation(
        @CurrentUser() contextUser: ContextUser,
        @Args('input') input: CreateParticipationInputType
    ): Promise<ParticipationType> {
        // TODO: Fetch LearningNeed + student
        // TODO: Auth checks

        return {
            id: 'temporaryID',
            status: ParticipationStatusEnum.REFERRED,
            aanbiederId: input.aanbiederId ?? null,
            aanbiederName: input.aanbiederName ?? null,
            aanbiederNote: input.aanbiederNote ?? null,
            offerName: input.offerName ?? null,
            offerCourse: input.offerCourse ?? null,
            outComesGoal: input.outComesGoal ?? null,
            outComesTopic: input.outComesTopic ?? null,
            outComesTopicOther: input.outComesTopicOther ?? null,
            outComesApplication: input.outComesApplication ?? null,
            outComesApplicationOther: input.outComesApplicationOther ?? null,
            outComesLevel: input.outComesLevel ?? null,
            outComesLevelOther: input.outComesLevelOther ?? null,
            detailsIsFormal: input.detailsIsFormal ?? null,
            detailsGroupFormation: input.detailsGroupFormation ?? null,
            detailsTotalClassHours: input.detailsTotalClassHours ?? null,
            detailsCertificateWillBeAwarded: input.detailsCertificateWillBeAwarded ?? null,
            detailsStartDate: input.detailsStartDate ?? null,
            detailsEndDate: input.detailsEndDate ?? null,
            detailsEngagements: input.detailsEngagements ?? null,
        }
    }
}
