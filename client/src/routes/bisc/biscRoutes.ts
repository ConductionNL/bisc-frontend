export const biscRoutes = {
    // TODO: should become '/' when all screens are refactored
    index: '/bisc',
    taalhuizen: {
        index: '/bisc/taalhuizen',
        overview: '/bisc/taalhuizen/overview',
        create: '/bisc/taalhuizen/overview/create',
        detail: {
            index: '/bisc/taalhuizen/overview/detail',
            data: {
                index: '/bisc/taalhuizen/overview/detail/data',
                update: '/bisc/taalhuizen/overview/detail/update',
            },
            coworkers: {
                index: '/bisc/taalhuizen/overview/detail/coworkers/',
                overview: '/bisc/taalhuizen/overview/detail/coworkers/overview',
                create: '/bisc/taalhuizen/overview/detail/coworkers/create',
                detail: {
                    index: '/bisc/taalhuizen/overview/detail/coworkers/overview/detail',
                    data: '/bisc/taalhuizen/overview/detail/coworkers/overview/detail/data',
                    update: '/bisc/taalhuizen/overview/detail/coworkers/overview/detail/update',
                },
            },
        },
    },
}
