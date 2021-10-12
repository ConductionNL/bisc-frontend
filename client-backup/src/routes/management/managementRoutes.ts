export const managementRoutes = {
    index: '/management',
    taalhuis: {
        index: '/management/taalhuis',
        coworkers: {
            index: '/management/taalhuis/coworkers',
            overview: '/management/taalhuis/coworkers/overview',
            create: '/management/taalhuis/coworkers/create',
            detail: {
                index: '/management/taalhuis/coworkers/detail',
                update: '/management/taalhuis/coworkers/detail/update',
                read: '/management/taalhuis/coworkers/detail/read',
            },
        },
        data: {
            index: '/management/taalhuis/data',
            read: '/management/taalhuis/data/read',
            update: '/management/taalhuis/data/update',
        },
    },
}
