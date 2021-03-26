export const supplierRoutes = {
    // TODO: this should be refactored to BiscRoutes, but it has a too big of an impact right now
    index: '/',
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
            index: '/supplier/participants',
            active: '/supplier/participants/active',
            completed: '/supplier/participants/completed',
            referred: '/supplier/participants/referred',
        },
        detail: {
            index: '/supplier/participant',
            overview: '/supplier/participant/overview',
            registration: '/supplier/participant/registration',
            folder: '/supplier/participant/folder',
            goals: {
                index: '/supplier/participant/goals',
                overview: '/supplier/participant/goals/overview',
                detail: '/supplier/participant/goals/detail',
            },
            documents: '/supplier/participant/documents',
        },
    },
    profileManagement: {
        index: '/supplier/management',
        overview: '/supplier/management/overview',
        employees: '/supplier/management/employees',
    },
}
