import { biscRoutes } from './bisc/biscRoutes'
import { managementRoutes } from './management/managementRoutes'
import { participantsRoutes } from './participants/participantsRoutes'
import { supplierRoutes } from './supplier/supplierRoutes'
import { taalhuisRoutes } from './taalhuis/taalhuisRoutes'

export const routes = {
    unauthorized: {
        index: '/auth',
        login: '/auth/login',
        register: '/auth/register',
        forgotpassword: '/auth/forgotpassword',
        resetpassword: '/auth/reset-password',
        loggedout: '/auth/loggedout',
    },
    authorized: {
        index: '/',
        profile: `/profile`,
        bisc: biscRoutes,
        supplier: supplierRoutes,
        taalhuis: taalhuisRoutes,

        //  TODO: these routes should be phased out and refactored in the future to biscRoutes, aanbiederRoutes and taalhuisRoutes
        participants: participantsRoutes,
        management: managementRoutes,

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
