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
            coworkers: {
                index: '/taalhuis/medewerkers',
                overview: '/taalhuis/medewerkers/overview',
                create: '/taalhuis/medewerkers/create',
                update: (id: string | number = ':id', name: string | number = ':name') =>
                    `/taalhuis/medewerkers/${id}/${name}/update`,
                read: (id: string | number = ':id', name: string | number = ':name') =>
                    `/taalhuis/medewerkers/${id}/${name}/read`,
            },
        },
        supplier: {
            index: '/supplier',
            overview: '/supplier/overview',
            create: '/supplier/overview/create',
            read: {
                index: (id: string | number = ':id', name: string | number = ':name') =>
                    `/supplier/overview/${id}/${name}/read`,
                coworkers: {
                    index: (id: string | number = ':id', name: string | number = ':name') =>
                        `/supplier/overview/${id}/${name}/read/coworkers`,
                    overview: (id: string | number = ':id', name: string | number = ':name') =>
                        `/supplier/overview/${id}/${name}/read/coworkers/overview`,
                    create: (id: string | number = ':id', name: string | number = ':name') =>
                        `/supplier/overview/${id}/${name}/read/coworkers/create`,
                },
                data: (id: string | number = ':id', name: string | number = ':name') =>
                    `/supplier/overview/${id}/${name}/read/data`,
                update: (id: string | number = ':id', name: string | number = ':name') =>
                    `/supplier/overview/${id}/${name}/read/update`,
            },
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
