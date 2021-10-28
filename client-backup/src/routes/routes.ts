import { biscRoutes } from './bisc/biscRoutes'
import { taalhuisRoutes } from './taalhuis/taalhuisRoutes'
import { supplierRoutes } from './supplier/supplierRoutes'

export const routes = {
    unauthorized: {
        index: '/auth',
        login: '/auth/login',
        register: '/auth/register',
        forgotpassword: '/auth/forgotpassword',
        resetpassword: '/auth/resetpassword/:token',
        loggedout: '/auth/loggedout',
    },
    authorized: {
        index: '/',
        profile: `/profile`,
        bisc: biscRoutes,
        taalhuis: taalhuisRoutes,
        supplier: supplierRoutes,

        // TODO: public form route

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
