import { supplierRoutes } from './supplier/supplierRoutes'
import { taalhuisRoutes } from './taalhuis/taalhuisRoutes'

export const routes = {
    unauthorized: {
        index: '/auth',
        login: '/auth/login',
        forgotpassword: '/auth/forgotpassword',
        resetpassword: '/auth/reset-password',
        loggedout: '/auth/loggedout',
    },
    authorized: {
        index: '/',
        profile: `/profile`,
        taalhuis: taalhuisRoutes,
        supplier: supplierRoutes,
        reports: {
            index: '/reports',
            overview: '/reports/overview',
        },
        management: {
            index: '/management',
            overview: '/management/overview',
            coworkers: {
                index: '/management/coworkers',
                create: '/management/coworkers/create',
                update: (id: string | number = ':id', name: string | number = ':name') =>
                    `/management/coworkers/${id}/${name}/update`,
                read: (id: string | number = ':id', name: string | number = ':name') =>
                    `/management/coworkers/${id}/${name}/read`,
            },
        },

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
