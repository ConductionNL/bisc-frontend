export interface TaalhuisDetailParams {
    taalhuisid: string
    taalhuisname: string
}

export interface TaalhuisCoworkersDetailParams extends TaalhuisDetailParams {
    coworkerid: string
}

const taalhuisBaseUrl = (
    props: TaalhuisDetailParams = { taalhuisid: ':taalhuisid', taalhuisname: ':taalhuisname' }
) => {
    return `/taalhuis/overview/${props.taalhuisid}/${props.taalhuisname}`
}

const taalhuisCoworkerBaseUrl = (
    props: TaalhuisCoworkersDetailParams = {
        taalhuisid: ':taalhuisid',
        taalhuisname: ':taalhuisname',
        coworkerid: ':coworkerid',
    }
) => {
    return `${taalhuisBaseUrl(props)}/read/coworkers/read/${props.coworkerid}`
}

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
            create: '/taalhuis/overview/create',
            read: {
                index: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read`,
                data: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/data`,
                update: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/update`,
                coworkers: {
                    index: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/coworkers/`,
                    overview: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/coworkers/overview`,
                    create: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/coworkers/create`,
                    detail: {
                        index: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/coworkers/read`,
                        data: (props?: TaalhuisCoworkersDetailParams) => `${taalhuisCoworkerBaseUrl(props)}/data`,
                        update: (props?: TaalhuisCoworkersDetailParams) => `${taalhuisCoworkerBaseUrl(props)}/update`,
                    },
                },
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
                    detail: {
                        index: (
                            id: string | number = ':id',
                            name: string | number = ':name',
                            coworkerName: string | number = ':coworkername',
                            coworkerId: string | number = ':coworkerid'
                        ) =>
                            `/supplier/overview/${id}/${name}/read/coworkers/overview/detail/${coworkerName}/${coworkerId}`,
                        update: (
                            id: string | number = ':id',
                            name: string | number = ':name',
                            coworkerName: string | number = ':coworkername',
                            coworkerId: string | number = ':coworkerid'
                        ) =>
                            `/supplier/overview/${id}/${name}/read/coworkers/overview/detail/${coworkerName}/${coworkerId}/update`,
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
            index: '/management',
            overview: '/management/overview',
            coworkers: {
                index: '/management/coworkers',
                create: '/management/coworkers/create',
                update: (id: string | number = ':id', name: string | number = ':name') =>
                    `/management/coworkers/${id}/${name}/update`,
                read: (id: string | number = ':id', name: string | number = ':name') =>
                    `/management/coworkers/${id}/${name}/read`,
            },
        },

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
