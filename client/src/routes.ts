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
        persons: `/persons`,
        addPerson: `/persons/add-person`,
        addPersonToProgram: `/persons/add-person-to-program`,
        programs: `/programs/programs`,
        myPrograms: `/programs/my-programs`,
        profile: `/profile`,
        taalhuis: {
            index: '/taalhuis',
            overview: '/taalhuis/overview',
            create: '/taalhuis/create',
            update: '/taalhuis/update',
        },
        supplier: {
            index: '/supplier',
            overview: '/supplier/overview',
            create: '/supplier/overview/create',
            update: (id: string | number = ':id', name: string | number = ':name') =>
                `/supplier/overview/${id}/${name}/update`,
            read: (id: string | number = ':id', name: string | number = ':name') =>
                `/supplier/overview/${id}/${name}/read`,
        },
        reports: {
            index: '/reports',
            overview: '/reports/overview',
        },
        management: {
            index: '/management',
            overview: '/management/overview',
            medewerkers: {
                index: '/management/medewerkers',
                create: '/management/medewerkers/create',
                update: (id: string | number = ':id', name: string | number = ':name') =>
                    `/management/medewerkers/${id}/${name}/update`,
                read: (id: string | number = ':id', name: string | number = ':name') =>
                    `/management/medewerkers/${id}/${name}/read`,
            },
        },

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
