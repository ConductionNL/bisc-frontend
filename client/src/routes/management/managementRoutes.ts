export const managementRoutes = {
    index: '/management',
    bisc: {
        index: '/management/bisc',
        overview: '/management/bisc/overview',
        coworkers: {
            index: '/management/bisc/coworkers',
            create: '/management/bisc/coworkers/create',
            detail: {
                index: `/management/bisc/coworkers/detail`,
                update: `/management/bisc/coworkers/detail/update`,
                read: `/management/bisc/coworkers/detail/read`,
            },
        },
    },
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
