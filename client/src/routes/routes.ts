import { biscRoutes } from './bisc/biscRoutes'
import { taalhuisRoutes } from './taalhuis/taalhuisRoutes'
import { supplierRoutes } from './supplier/supplierRoutes'

export interface ResetPasswordRouteParams {
    base64Email: string
    base64Token: string
}

export const routes = {
    public: {
        publicRegistration: '/registration',
    },
    unauthorized: {
        index: '/auth',
        login: '/auth/login',
        forgotpassword: '/auth/forgotpassword',
        resetpassword: '/auth/resetpassword/:base64Email/:base64Token',
        loggedout: '/auth/loggedout',
    },
    authorized: {
        index: '/',
        profile: {
            index: `/profile`,
            update: `/profile/update`,
        },
        bisc: biscRoutes,
        taalhuis: taalhuisRoutes,
        supplier: supplierRoutes,

        // TODO: public form route

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
