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
                    detail: {
                        data: {
                            index: (
                                id: string | number = ':id',
                                name: string | number = ':name',
                                coworkerName: string | number = ':coworkername',
                                coworkerId: string | number = ':coworkerid'
                            ) =>
                                `/supplier/overview/${id}/${name}/read/coworkers/overview/detail/${coworkerName}/${coworkerId}/data`,
                            update: (
                                id: string | number = ':id',
                                name: string | number = ':name',
                                coworkerName: string | number = ':coworkername',
                                coworkerId: string | number = ':coworkerid'
                            ) =>
                                `/supplier/overview/${id}/${name}/read/coworkers/overview/detail/${coworkerName}/${coworkerId}/data/update`,
                            documents: {
                                index: (
                                    id: string | number = ':id',
                                    name: string | number = ':name',
                                    coworkerName: string | number = ':coworkername',
                                    coworkerId: string | number = ':coworkerid'
                                ) =>
                                    `/supplier/overview/${id}/${name}/read/coworkers/overview/detail/${coworkerName}/${coworkerId}/data/documents`,
                            },
                        },
                    },
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
            bisc: {
                index: '/management/bisc',
                overview: '/management/bisc/overview',
                coworkers: {
                    index: '/management/bisc/coworkers',
                    create: '/management/bisc/coworkers/create',
                    update: (id: string | number = ':id', name: string | number = ':name') =>
                        `/management/bisc/coworkers/${id}/${name}/update`,
                    read: (id: string | number = ':id', name: string | number = ':name') =>
                        `/management/bisc/coworkers/${id}/${name}/read`,
                },
            },
            taalhuis: {
                index: '/management/taalhuis',
                overview: '/management/taalhuis/overview',
                detail: {
                    data: {
                        index: (
                            id: string | number = ':id',
                            name: string | number = ':name',
                            taalhuis: string | number = ':taalhuis'
                        ) => `/supplier/overview/${id}/${name}/read/${taalhuis}/overview/detail/data`,
                        update: (
                            id: string | number = ':id',
                            name: string | number = ':name',
                            taalhuis: string | number = ':taalhuis'
                        ) => `/supplier/overview/${id}/${name}/read/${taalhuis}/overview/detail/data/update`,
                    },
                },
            },
        },

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
