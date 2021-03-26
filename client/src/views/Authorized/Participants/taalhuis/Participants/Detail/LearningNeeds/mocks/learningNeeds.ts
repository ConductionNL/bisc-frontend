import { StatusTypes } from 'components/Domain/LearningNeeds/StatusLabelTag'

export const learningNeedsMock: LearningNeedsMock[] = [
    {
        title: 'Met computers leren werken',
        data: [
            {
                status: StatusTypes.verwezen,
                offer: undefined,
                referred: ['Taalhuis Utrecht', 'Bibliotheek X'],
                provider: undefined,
                notes: 'Graag opnemen in klik & Tik',
            },
            {
                status: StatusTypes.afgerond,
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
                status: StatusTypes.afgerond,
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

interface LearningNeedsDetails {
    learningNeeds: LearningNeeds
    desiredOutcome: DesiredOutcome
    offer: Offer
}

interface LearningNeeds {
    description: string
    motivation: string
}

interface DesiredOutcome {
    verb: string
    subject: string
    appliance: string
    level: string
}

interface Offer {
    desiredOffer: string
    advisedOffer: string
    difference: string
    agreements: string
}

export const learningNeedsResponse = {
    title: 'Wit',
    data: [
        {
            status: 'Verwezen',
            offer: undefined,
            referred: ['Taalhuis Utrecht', 'Bibliotheek X'],
        },
        {
            status: 'Verwezen',
            offer: 'Klik & Tik',
            referred: undefined,
            provider: 'NL Educatie',
        },
    ],
}
