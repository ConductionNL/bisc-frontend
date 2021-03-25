export const supplierRoutes = {
    // TODO: this should be refactored to BiscRoutes, but it has a too big of an impact right now
    index: '/bisc/suppliers',
    bisc: {
        index: '/bisc/suppliers',
        overview: '/bisc/suppliers/overview',
        create: '/bisc/suppliers/overview/create',
        read: {
            index: '/bisc/suppliers/overview/read',
            data: `/bisc/suppliers/overview/read/data`,
            update: `/bisc/suppliers/overview/read/update`,
            coworkers: {
                index: `/bisc/suppliers/overview/read/coworkers`,
                overview: `/bisc/suppliers/overview/read/coworkers/overview`,
                create: `/bisc/suppliers/overview/read/coworkers/create`,
                detail: {
                    index: `/bisc/suppliers/overview/read/coworkers/overview/detail`,
                    data: {
                        index: `/bisc/suppliers/overview/read/coworkers/overview/detail/data`,
                        update: `/bisc/suppliers/overview/read/coworkers/overview/detail/data/update`,
                    },
                    documents: {
                        index: `/bisc/suppliers/overview/read/coworkers/overview/detail/documents`,
                    },
                },
            },
        },
    },
    participants: {
        overview: {
            active: '/supplier/participants/active',
            completed: '/supplier/participants/completed',
            referred: '/supplier/participants/referred',
        },
        detail: {
            overview: '/supplier/participant/overview',
            registration: '/supplier/participant/registration',
            folder: '/supplier/participant/folder',
            goals: '/supplier/participant/goals',
            documents: '/supplier/participant/documents',
        },
    },
}
