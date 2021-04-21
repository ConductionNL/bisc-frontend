import { DetailsInformationFieldsetDefaultValues } from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { OfferInformationFieldsetDefaultValues } from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import { SupplierInformationFieldsetDefaultValues } from 'components/fieldsets/participants/learningNeeds/fieldsets/SupplierInformationFieldset'
import { ReferenceStatusLabelStatus } from 'components/Participants/components/ReferenceStatusLabel'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedTopicEnum,
    ParticipationGroupFormationEnum,
    ParticipationOfferCourseEnum,
} from 'generated/graphql'
import { ParticipationStatusEnum } from 'generated/graphql'
import { CreateParticipationInputType, TestResultType } from 'temp/TEMPORARYgraphql'
import { DesiredOutcomeMetadata, LearningQuestionMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'

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

export interface LearningNeedsDetails {
    learningQuestion: LearningQuestionMetadata
    desiredOutcome: DesiredOutcomeMetadata
}

export const learningNeedsMockResponse: LearningNeedsDetails = {
    learningQuestion: {
        motivations: ['Administratie kunnen doen', 'Zelfstandig zijn'],
        desiredOffers: ['Digivaardigheidscurcus', 'Klik & Tik'],
        advisedOffers: ['Digivaardigheidscurcus', 'Klik & Tik'],
        engagements: ['Neemt eigen tablet mee'],
        differences: [''],
    },
    desiredOutcome: {
        goal: 'Is in staat om',
        topic: 'Digitale vaardigheden: Informatie zoeken',
        application: ['Anders, namelijk: mantelzorg verlenen'],
        level: 'NLQF 2',
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

export interface LearningNeedsReferenceDetails {
    participation: CreateParticipationInputType
    tests: TestResultType
}

// CreateParticipationInputType
// TestResultType

export const LearningNeedsReferenceDetailsResponse: LearningNeedsReferenceDetails = {
    participation: {
        aanbiederId: 'Aanbieder X',
        aanbiederName: 'Aanbieder X',
        aanbiederNote: '',
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
        detailsStartDate: new Date('01/01/2021').toString(),
        detailsEndDate: new Date('01/01/2023').toString(),
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
