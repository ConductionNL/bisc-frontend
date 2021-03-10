export const managementRoutes = {
    index: '/management',
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
}
