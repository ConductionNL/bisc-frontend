export const routes = {
    unauthorized: {
        index: '/auth',
        login: '/auth/login',
        forgotpassword: '/auth/forgotpassword',
        resetpassword: '/auth/reset-password',
    },
    authorized: {
        index: '/',
        persons: `/persons`,
        addPerson: `/persons/add-person`,
        addPersonToProgram: `/persons/add-person-to-program`,
        programs: `/programs/programs`,
        myPrograms: `/programs/my-programs`,
        profile: `/profile`,
        taalhuis: {
            index: '/taalhuis',
            overview: '/taalhuis/overview',
        },
        supplier: {
            index: '/supplier',
            overview: '/supplier/overview',
            create: '/supplier/overview/create',
            update: (id: string | number = ':id') => `/supplier/overview/${id}/update`,
            read: (id: string | number = ':id') => `/supplier/overview/${id}/read`,
        },
        reports: {
            index: '/reports',
            overview: '/reports/overview',
        },
        management: {
            index: '/management',
            overview: '/management/overview',
        },

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
