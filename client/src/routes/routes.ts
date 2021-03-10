import { managementRoutes } from './management/managementRoutes'
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
        management: managementRoutes,

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
