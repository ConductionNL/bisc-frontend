import { SupplierDetailCoworkersParams, SupplierDetailParams } from './types'

const supplierBaseUrl = (
    props: SupplierDetailParams = { supplierid: ':supplierid', suppliername: ':suppliername' }
) => {
    return `/supplier/overview/${props.supplierid}/${props.suppliername}/read`
}

const supplierCoworkersBaseUrl = (
    props: SupplierDetailCoworkersParams = {
        supplierid: ':supplierid',
        suppliername: ':suppliername',
        coworkerid: ':coworkerid',
        coworkername: ':coworkername',
    }
) => {
    return `/supplier/overview/${props.supplierid}/${props.suppliername}/read/coworkers/overview/detail/${props.coworkername}/${props.coworkerid}`
}

export const supplierRoutes = {
    index: '/supplier',
    overview: '/supplier/overview',
    create: '/supplier/overview/create',
    // TODO: delete or refactor to use without passing props
    read: {
        index: (props?: SupplierDetailParams) => supplierBaseUrl(props),
        data: (props?: SupplierDetailParams) => `${supplierBaseUrl(props)}/data`,
        update: (props?: SupplierDetailParams) => `${supplierBaseUrl(props)}/update`,
        coworkers: {
            index: (props?: SupplierDetailParams) => `${supplierBaseUrl(props)}/coworkers`,
            overview: (props?: SupplierDetailParams) => `${supplierBaseUrl(props)}/coworkers/overview`,
            create: (props?: SupplierDetailParams) => `${supplierBaseUrl(props)}/coworkers/create`,
            detail: {
                index: (props?: SupplierDetailCoworkersParams) => supplierCoworkersBaseUrl(props),
                data: {
                    index: (props?: SupplierDetailCoworkersParams) => `${supplierCoworkersBaseUrl(props)}/data`,
                    update: (props?: SupplierDetailCoworkersParams) => `${supplierCoworkersBaseUrl(props)}/data/update`,
                },
                documents: {
                    index: (props?: SupplierDetailCoworkersParams) => `${supplierCoworkersBaseUrl(props)}/documents`,
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
