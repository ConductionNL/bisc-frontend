import { UserEnvironmentEnum } from '../../generated/graphql'
import { ManagementCoworkerParams } from './types'

const managementCoworkerBaseUrl = (
    environment: UserEnvironmentEnum,
    props: ManagementCoworkerParams = {
        coworkerid: ':coworkerid',
        coworkername: ':coworkername',
    }
) => `/management/${environment}/coworkers/${props.coworkerid}/${props.coworkername}`

export const managementRoutes = {
    index: '/management',
    bisc: {
        index: '/management/bisc',
        overview: '/management/bisc/overview',
        coworkers: {
            index: '/management/bisc/coworkers',
            create: '/management/bisc/coworkers/create',
            update: (props?: ManagementCoworkerParams) =>
                `${managementCoworkerBaseUrl(UserEnvironmentEnum.Bisc, props)}/update`,
            read: (props?: ManagementCoworkerParams) =>
                `${managementCoworkerBaseUrl(UserEnvironmentEnum.Bisc, props)}/read`,
        },
    },
    taalhuis: {
        index: '/management/taalhuis',
        coworkers: {
            index: '/management/taalhuis/coworkers',
            overview: '/management/taalhuis/coworkers/overview',
            create: '/management/taalhuis/coworkers/create',
            detail: {
                index: (props?: ManagementCoworkerParams) =>
                    managementCoworkerBaseUrl(UserEnvironmentEnum.Taalhuis, props),
                update: (props?: ManagementCoworkerParams) =>
                    `${managementCoworkerBaseUrl(UserEnvironmentEnum.Taalhuis, props)}/update`,
                read: (props?: ManagementCoworkerParams) =>
                    `${managementCoworkerBaseUrl(UserEnvironmentEnum.Taalhuis, props)}/read`,
            },
        },
        data: {
            index: `/management/taalhuis/data`,
            read: `/management/taalhuis/data/read`,
            update: `/management/taalhuis/data/update`,
        },
    },
    aanbieder: {
        index: '/management/aanbieder',
        coworkers: {
            index: '/management/aanbieder/coworkers',
            overview: '/management/aanbieder/coworkers/overview',
            create: '/management/aanbieder/coworkers/create',
            detail: {
                index: (props?: ManagementCoworkerParams) =>
                    managementCoworkerBaseUrl(UserEnvironmentEnum.Aanbieder, props),
                data: {
                    index: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(UserEnvironmentEnum.Aanbieder, props)}/data`,
                    update: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(UserEnvironmentEnum.Aanbieder, props)}/data/update`,
                    read: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(UserEnvironmentEnum.Aanbieder, props)}/data/read`,
                },
                documents: {
                    overview: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(UserEnvironmentEnum.Aanbieder, props)}/documents`,
                },
                participants: {
                    overview: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(UserEnvironmentEnum.Aanbieder, props)}/participants`,
                },
            },
        },
        data: {
            index: `/management/aanbieder/data`,
            read: `/management/aanbieder/data/read`,
            update: `/management/aanbieder/data/update`,
        },
    },
}
