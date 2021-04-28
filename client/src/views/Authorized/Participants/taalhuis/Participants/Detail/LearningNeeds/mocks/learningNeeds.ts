import { LearningNeedsReferenceDetails } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { ReferenceStatusLabelStatus } from 'components/Participants/components/ReferenceStatusLabel'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedTopicEnum,
    LearningNeedType,
    ParticipationGroupFormationEnum,
    ParticipationOfferCourseEnum,
} from 'generated/graphql'
import { ParticipationStatusEnum } from 'generated/graphql'
import {
    CreateLearningNeedInputType,
    CreateParticipationInputType,
    LearningNeedOfferDifferenceEnum,
} from 'temp/TEMPORARYgraphql'

export const learningNeedsStatusMock: LearningNeedsMock[] = [
    {
        title: 'Met computers leren werken',
        data: [
            {
                status: ParticipationStatusEnum.Referred,
                offer: undefined,
                referred: ['Taalhuis Utrecht', 'Bibliotheek X'],
                provider: undefined,
                notes: 'Graag opnemen in klik & Tik',
            },
            {
                status: ParticipationStatusEnum.Completed,
                offer: 'Klik & Tik',
                referred: undefined,
                provider: 'Graag opnemen in klik & Tik',
                notes: undefined,
            },
        ],
    },
    {
        title: 'Beter leren schrijven',
        data: [
            {
                status: ParticipationStatusEnum.Completed,
                offer: 'Digivaardigheidscursus',
                referred: undefined,
                provider: 'Digitaalhuis',
                notes: undefined,
            },
        ],
    },
]

export interface LearningNeedsMock {
    title: string
    data: LearningNeedsDataType[]
}

export interface LearningNeedsDataType {
    status: ParticipationStatusEnum
    offer?: string
    referred?: string[]
    provider?: string
    notes?: string
}

export interface LearningNeedsDetails extends CreateParticipationInputType {
    data: LearningNeedType
}

export const learningNeedsMockResponse: LearningNeedsDetails = {
    data: {
        id: 'some id',
        learningNeedDescription: '',
        learningNeedMotivation: '',
        desiredOutComesGoal: '',
        desiredOutComesTopic: LearningNeedTopicEnum.DutchReading,
        desiredOutComesTopicOther: '',
        desiredOutComesApplication: LearningNeedApplicationEnum.HealthAndWellbeing,
        desiredOutComesApplicationOther: '',
        desiredOutComesLevel: LearningNeedLevelEnum.Nlqf2,
        desiredOutComesLevelOther: '',
        offerDesiredOffer: '',
        offerAdvisedOffer: '',
        offerDifference: LearningNeedOfferDifferenceEnum.YesDistance,
        offerDifferenceOther: '',
        offerEngagements: '',
        participations: [
            {
                id: 'some id',
                providerId: '',
                providerName: '',
                providerNote: '',
                status: ParticipationStatusEnum.Active,
                offerName: 'naam aanbod',
                offerCourse: ParticipationOfferCourseEnum.Language,
                outComesGoal: 'een doel',
                outComesTopic: LearningNeedTopicEnum.DigitalProcessingInformation,
                outComesApplication: LearningNeedApplicationEnum.AdministrationAndFinance,
                outComesLevel: LearningNeedLevelEnum.Nlqf1,
                detailsIsFormal: true,
                detailsGroupFormation: ParticipationGroupFormationEnum.InAGroup,
                detailsTotalClassHours: 999,
                detailsCertificateWillBeAwarded: true,
                detailsStartDate: new Date('01/01/2021'),
                detailsEndDate: new Date('01/01/2023'),
                detailsEngagements: 'Een aantal afspraken',
            },
        ],
    },
}

export const LearningNeedsStatusDetailResponse = {
    title: 'Klik & Tik',
    supplierName: 'Bibliotheek X',
    status: ReferenceStatusLabelStatus.Ongoing,
    startDate: 'n.v.t.',
    endDate: 'n.v.t.',
    startedAt: '-',
    stoppedAt: '-',
    reason: '-',
}

// CreateParticipationInputType
// TestResultType

export const learningNeedsCourseData = {
    course: 'Digivaardigheids cursus',
    chapter: 'NL educatie',
}

export const LearningNeedsReferenceDetailsResponse: LearningNeedsReferenceDetails = {
    participation: {
        offerName: 'naam aanbod',
        offerCourse: ParticipationOfferCourseEnum.Language,
        outComesGoal: 'een doel',
        outComesTopic: LearningNeedTopicEnum.DigitalProcessingInformation,
        outComesApplication: LearningNeedApplicationEnum.AdministrationAndFinance,
        outComesLevel: LearningNeedLevelEnum.Nlqf1,
        detailsIsFormal: true,
        detailsGroupFormation: ParticipationGroupFormationEnum.InAGroup,
        detailsTotalClassHours: 999,
        detailsCertificateWillBeAwarded: true,
        detailsStartDate: new Date('01/01/2021'),
        detailsEndDate: new Date('01/01/2023'),
        detailsEngagements: 'Een aantal afspraken',
        learningNeedId: 'rtest',
    },
    tests: {
        id: '',
        outComesGoal: '',
        outComesTopic: LearningNeedTopicEnum.DigitalProcessingInformation,
        outComesTopicOther: '',
        outComesApplication: LearningNeedApplicationEnum.AdministrationAndFinance,
        outComesApplicationOther: '',
        outComesLevel: LearningNeedLevelEnum.Nlqf1,
        outComesLevelOther: '',
        examUsedExam: '',
        examDate: '',
        examMemo: '',
        examResult: '',
    },
}
