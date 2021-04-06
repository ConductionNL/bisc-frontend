import { biscRoutes } from './bisc/biscRoutes'
import { managementRoutes } from './management/managementRoutes'
import { participantsRoutes } from './participants/participantsRoutes'
import { reportsRoutes } from './reports/reportsRoutes'
import { supplierRoutes } from './supplier/supplierRoutes'

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
        bisc: biscRoutes,
        supplier: supplierRoutes,

        //  TODO: these routes should be phased out and refactored in the future to biscRoutes, aanbiederRoutes and taalhuisRoutes
        reports: reportsRoutes,
        participants: participantsRoutes,
        management: managementRoutes,

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
