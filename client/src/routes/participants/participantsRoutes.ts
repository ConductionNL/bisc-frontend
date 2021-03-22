import { Type } from '../../components/Providers/UserProvider/types'
import { ParticipantDetailParams, RegistrationsDetailParams } from './types'

const participantDetailBaseUrl = (
    environment: Type,
    props: ParticipantDetailParams = { participantid: ':participantid', participantname: ':participantname' }
) => {
    return `/participants/${environment}/participants/overview/${props.participantid}/${props.participantname}`
}

const registrationsDetailBaseUrl = (
    environment: Type,
    props: RegistrationsDetailParams = { registrationid: ':registrationid', registrationname: ':registrationname' }
) => {
    return `/participants/${environment}/registrations/overview/${props.registrationid}/${props.registrationname}`
}

export const participantsRoutes = {
    index: '/participants',
    taalhuis: {
        index: '/participants/taalhuis',
        participants: {
            index: '/participants/taalhuis/participants',
            overview: '/participants/taalhuis/participants/overview',
            create: '/participants/taalhuis/participants/create',
            detail: {
                index: (params?: ParticipantDetailParams) => participantDetailBaseUrl(Type.taalhuis, params),
                read: (params?: ParticipantDetailParams) => `${participantDetailBaseUrl(Type.taalhuis, params)}/read`,
                update: (params?: ParticipantDetailParams) =>
                    `${participantDetailBaseUrl(Type.taalhuis, params)}/update`,
                registration: (params?: ParticipantDetailParams) =>
                    `${participantDetailBaseUrl(Type.taalhuis, params)}/registration`,
                files: (params?: ParticipantDetailParams) => `${participantDetailBaseUrl(Type.taalhuis, params)}/files`,
                learningNeeds: (params?: ParticipantDetailParams) =>
                    `${participantDetailBaseUrl(Type.taalhuis, params)}/learning-needs`,
                documents: (params?: ParticipantDetailParams) =>
                    `${participantDetailBaseUrl(Type.taalhuis, params)}/documents`,
            },
        },
        registrations: {
            index: '/participants/taalhuis/registrations',
            overview: '/participants/taalhuis/registrations/overview',
            detail: {
                index: (params?: RegistrationsDetailParams) => registrationsDetailBaseUrl(Type.taalhuis, params),
                read: (params?: RegistrationsDetailParams) =>
                    `${registrationsDetailBaseUrl(Type.taalhuis, params)}/read`,
            },
        },
    },
}
