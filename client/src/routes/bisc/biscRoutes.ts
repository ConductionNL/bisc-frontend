export interface BiscTaalhuizenDetailRouteParams {
    languageHouseId: string
}

export interface BiscTaalhuizenDetailCoworkersDetailRouteParams extends BiscTaalhuizenDetailRouteParams {
    languageHouseEmployeeId: string
}

export interface BiscSuppliersDetailRouteParams {
    providerId: string
}

export interface BiscSuppliersDetailCoworkersDetailRouteParams extends BiscSuppliersDetailRouteParams {
    providerEmployeeId: string
}

export interface BiscManagementCoworkerDetailRouteParams {
    biscEmployeeId: string
}

export const biscRoutes = {
    index: `/bisc`,
    taalhuizen: {
        index: `/bisc/taalhuizen`,
        create: `/bisc/taalhuizen/create`,
        detail: (languageHouseId: string = ':languageHouseId') => ({
            index: `/bisc/taalhuizen/${languageHouseId}`,
            data: {
                index: `/bisc/taalhuizen/${languageHouseId}/data`,
                update: `/bisc/taalhuizen/${languageHouseId}/update`,
            },
            coworkers: {
                index: `/bisc/taalhuizen/${languageHouseId}/coworkers`,
                create: `/bisc/taalhuizen/${languageHouseId}/coworkers/create`,
                detail: (languageHouseEmployeeId: string = ':languageHouseEmployeeId') => ({
                    index: `/bisc/taalhuizen/${languageHouseId}/coworkers/${languageHouseEmployeeId}`,
                    data: {
                        index: `/bisc/taalhuizen/${languageHouseId}/coworkers/${languageHouseEmployeeId}/data`,
                        update: `/bisc/taalhuizen/${languageHouseId}/coworkers/${languageHouseEmployeeId}/update`,
                    },
                }),
            },
        }),
    },
    suppliers: {
        index: `/bisc/providers`,
        create: `/bisc/providers/create`,
        detail: (providerId: string = ':providerId') => ({
            index: `/bisc/providers/${providerId}`,
            data: {
                index: `/bisc/providers/${providerId}/data`,
                update: `/bisc/providers/${providerId}/update`,
            },
            coworkers: {
                index: `/bisc/providers/${providerId}/coworkers`,
                create: `/bisc/providers/${providerId}/coworkers/create`,
                detail: (providerEmployeeId: string = ':providerEmployeeId') => ({
                    index: `/bisc/providers/${providerId}/coworkers/${providerEmployeeId}`,
                    data: {
                        index: `/bisc/providers/${providerId}/coworkers/${providerEmployeeId}/data`,
                        update: `/bisc/providers/${providerId}/coworkers/${providerEmployeeId}/update`,
                        documents: `/bisc/providers/${providerId}/coworkers/${providerEmployeeId}/documents`,
                    },
                }),
            },
        }),
    },
    reports: {
        index: '/bisc/reports',
        overview: '/bisc/reports/overview',
    },
    management: {
        index: '/bisc/management',
        coworkers: {
            index: `/bisc/management/coworkers`,
            create: `/bisc/management/coworkers/create`,
            detail: (biscEmployeeId: string = ':biscEmployeeId') => ({
                index: `/bisc/management/coworkers/${biscEmployeeId}`,
                data: {
                    index: `/bisc/management/coworkers/${biscEmployeeId}/data`,
                    update: `/bisc/management/coworkers/${biscEmployeeId}/update`,
                },
            }),
        },
    },
}
