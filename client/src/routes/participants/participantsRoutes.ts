import { UserEnvironmentEnum } from '../../generated/graphql'
import { ParticipantDetailParams, RegistrationsDetailParams } from './types'

const participantDetailBaseUrl = (
    environment: UserEnvironmentEnum,
    props: ParticipantDetailParams = { participantid: ':participantid', participantname: ':participantname' }
) => {
    return `/participants/${environment}/participants/overview/${props.participantid}/${props.participantname}`
}

const registrationsDetailBaseUrl = (
    environment: UserEnvironmentEnum,
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
                index: (params?: ParticipantDetailParams) =>
                    participantDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params),
                read: (params?: ParticipantDetailParams) =>
                    `${participantDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params)}/read`,
                update: (params?: ParticipantDetailParams) =>
                    `${participantDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params)}/update`,
                registration: {
                    index: (params?: ParticipantDetailParams) =>
                        `${participantDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params)}/registration`,
                },
                folder: {
                    index: (params?: ParticipantDetailParams) =>
                        `${participantDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params)}/folder`,
                },
                goals: {
                    index: (params?: ParticipantDetailParams) =>
                        `${participantDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params)}/goals`,
                },
                documents: {
                    index: (params?: ParticipantDetailParams) =>
                        `${participantDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params)}/documents`,
                },
            },
        },
        registrations: {
            index: '/participants/taalhuis/registrations',
            overview: '/participants/taalhuis/registrations/overview',
            detail: {
                index: (params?: RegistrationsDetailParams) =>
                    registrationsDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params),
                read: (params?: RegistrationsDetailParams) =>
                    `${registrationsDetailBaseUrl(UserEnvironmentEnum.Taalhuis, params)}/read`,
            },
        },
    },
}
