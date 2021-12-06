import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { routes } from 'routes/routes'
// import { SupplierDetailLocationStateProps } from 'views/Authorized/Supplier/BiscView/SupplierDetailView/SupplierDetailView'
// import { ParticipantsLearningNeedsDetailLocationStateProps } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/Details/ParticipantsLearningNeedsDetailView'
// import { SupplierDetailLocationStateProps } from 'views/Authorized/Supplier/BiscView/SupplierDetailView/SupplierDetailView'

export const breadcrumbItems = {
    bisc: {
        taalhuis: {
            overview: {
                label: i18n._(t`Taalhuizen`),
                to: routes.authorized.bisc.taalhuizen.index,
            },
            detail: {
                index: (taalhuisName: string, taalhuisId: string) => ({
                    label: taalhuisName,
                    to: routes.authorized.bisc.taalhuizen.detail(taalhuisId).index,
                }),
            },
            employees: {
                index: (taalhuisId: string) => ({
                    label: i18n._(t`Medewerkers`),
                    to: routes.authorized.bisc.taalhuizen.detail(taalhuisId).coworkers.index,
                }),
            },
        },
        aanbieders: {
            overview: {
                label: i18n._(t`Aanbieders`),
                to: routes.authorized.bisc.suppliers.index,
            },
            detail: {
                index: (supplierName: string, supplierId: string) => ({
                    label: supplierName,
                    to: routes.authorized.bisc.suppliers.detail(supplierId).data.index,
                }),
                coworkers: {
                    overview: (supplierId: string) => ({
                        label: i18n._(t`Medewerkers`),
                        to: routes.authorized.bisc.suppliers.detail(supplierId).coworkers.index,
                    }),
                },
            },
        },
        management: {
            overview: {
                label: i18n._(t`Beheer`),
                to: routes.authorized.bisc.management.coworkers.index,
            },
        },
    },
    taalhuis: {
        participants: {
            overview: {
                label: i18n._(t`Deelnemers`),
                to: routes.authorized.taalhuis.participants.index,
            },
            detail: {
                learningNeeds: {
                    overview: (taalhuisParticipantId: string) => ({
                        label: i18n._(t`Leervragen`),
                        to: routes.authorized.taalhuis.participants.detail(taalhuisParticipantId).data.learningNeeds
                            .index,
                    }),
                    detail: {
                        index: (taalhuisParticipantId: string, label: string, learningNeedId: string) => ({
                            label,
                            to: routes.authorized.taalhuis.participants
                                .detail(taalhuisParticipantId)
                                .data.learningNeeds.detail(learningNeedId).index,
                        }),
                    },
                },
            },
            registrations: {
                overview: {
                    label: i18n._(t`Aanmeldingen`),
                    to: routes.authorized.taalhuis.participants.registrations.index,
                },
            },
        },
        management: {
            overview: {
                label: i18n._(t`Beheer`),
                to: routes.authorized.taalhuis.management.index,
            },
            employees: {
                label: i18n._(t`Medewerkers`),
                to: routes.authorized.taalhuis.management.coworkers.index,
            },
        },
    },
    // aanbieder: {
    //     participants: {
    //         overview: {
    //             label: i18n._(t`Deelnemers`),
    //             to: routes.authorized.supplier.participants.detail.overview,
    //         },
    //         detail: {
    //             goals: {
    //                 overview: {
    //                     label: i18n._(t`Leervragen`),
    //                     to: routes.authorized.supplier.participants.detail.goals.overview,
    //                 },
    //             },
    //         },
    //     },
    // },
    // dev: {
    //     kitchensink: {
    //         label: 'kitchensink',
    //         to: routes.authorized.kitchensink,
    //     },
    // },
}
