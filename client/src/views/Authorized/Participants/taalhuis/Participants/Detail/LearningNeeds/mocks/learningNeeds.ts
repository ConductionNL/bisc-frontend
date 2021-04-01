import { StatusTypes } from 'components/Domain/LearningNeeds/StatusLabelTag'
import { DetailsInformationFieldsetDefaultValues } from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { LearningOutcomeOfferFieldsetDefaultValues } from 'components/fieldsets/participants/learningNeeds/fieldsets/LearningOutcomeOfferFieldset'
import { OfferInformationFieldsetDefaultValues } from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import { SupplierInformationFieldsetDefaultValues } from 'components/fieldsets/participants/learningNeeds/fieldsets/SupplierInformationFieldset'
import { TestInformationFieldsetDefaultValues } from 'components/fieldsets/participants/learningNeeds/fieldsets/TestInformationFieldset'
import { ReferenceStatusLabelStatus } from 'components/Participants/components/ReferenceStatusLabel'
import { DesiredOutcomeMetadata, LearningQuestionMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'

export const learningNeedsStatusMock: LearningNeedsMock[] = [
    {
        title: 'Met computers leren werken',
        data: [
            {
                status: StatusTypes.referred,
                offer: undefined,
                referred: ['Taalhuis Utrecht', 'Bibliotheek X'],
                provider: undefined,
                notes: 'Graag opnemen in klik & Tik',
            },
            {
                status: StatusTypes.completed,
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
                status: StatusTypes.completed,
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
    status: StatusTypes
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
    supplier: SupplierInformationFieldsetDefaultValues
    offer: OfferInformationFieldsetDefaultValues
    learningOutcome: LearningOutcomeOfferFieldsetDefaultValues
    details: DetailsInformationFieldsetDefaultValues
    tests: TestInformationFieldsetDefaultValues
}

export const LearningNeedsReferenceDetailsResponse = {
    supplier: {
        supplier: 'Aanbieder X',
        explanation: '',
    },
    offer: {
        nameOffer: 'naam aanbod',
        cursusType: 'cursus',
    },
    learningOutcome: {
        goal: 'een doel',
        topic: 'een onderwerp',
        application: 'een toepassing',
        level: 'een niveau',
    },
    details: {
        formality: 'string',
        groupFormation: 'Een groeps formatie',
        teachingHours: '9999 uur',
        certificate: 'ja',
        startDate: '01/01/2021',
        endDate: '01/01/2023',
        engagements: '- Een aantal afspraken',
    },
    tests: {
        usedTests: 'some tests',
        testDate: '01/01/2021',
        application: 'some applications',
    },
}
