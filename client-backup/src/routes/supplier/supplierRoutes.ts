export interface SupplierParticipantsDetailRouteParams {
    supplierParticipantId: string
}

export interface SupplierParticipantsDetailDossierDetailRouteParams extends SupplierParticipantsDetailRouteParams {
    dossierId: string
}

export interface SupplierParticipantsDetailLearningNeedsDetailRouteParams extends SupplierParticipantsDetailRouteParams {
    learningNeedId: string
}

export interface SupplierParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams extends SupplierParticipantsDetailLearningNeedsDetailRouteParams {
    referralId: string
}

export interface SupplierParticipantsDetailLearningNeedsDetailReferralsDetailGroupPreviewRouteParams extends SupplierParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams {
    groupId: string
}

export interface SupplierParticipantsDetailLearningNeedsDetailReferralsDetailMentorPreviewRouteParams extends SupplierParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams {
    mentorId: string
}

export interface SupplierGroupsDetailRouteParams {
    supplierGroupId: string
}

export interface SupplierManagementCoworkerDetailRouteParams {
    providerEmployeeId: string
}

export const supplierRoutes = {
    index: '/supplier',
    participants: {
        index: `/supplier/participants`,
        overviews: {
            active: `/supplier/participants/active`,
            inactive: `/supplier/participants/inactive`,
            referrals: `/supplier/participants/referrals`,
        },
        detail: (supplierParticipantId: string = ':supplierParticipantId') =>  ({
            index: `/supplier/participants/${supplierParticipantId}`,
            data: {
                index: `/supplier/participants/${supplierParticipantId}/intake`,
                registration: `/supplier/participants/${supplierParticipantId}/registration`,
                dossier: {
                    index: `/supplier/participants/${supplierParticipantId}/dossier`,
                    detail: (dossierId: string = ':dossierId') =>  ({
                        index: `/supplier/participants/${supplierParticipantId}/dossier/${dossierId}`,
                    }),
                },
                learningNeeds: {
                    index: `/supplier/participants/${supplierParticipantId}/learning-needs`,
                    detail: (learningNeedId: string = ':learningNeedId') => ({
                        index: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}`,
                        referrals: {
                            index: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals`,
                            detail: (referralId: string = ':referralId') => ({
                                index: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}`,
                                testResult: {
                                    create: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/test-result/create`,
                                    update: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/test-result/update`
                                },
                                groupAssignment: {
                                    select: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/group/list`,
                                    preview: (groupId: string = ':groupId') => `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/group/${groupId}/preview`,
                                    update: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/group/update`,
                                },
                                mentorAssignment: {
                                    select: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/mentor/list`,
                                    preview: (mentorId: string = ':mentorId') => `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/mentor/${mentorId}/preview`,
                                    update: `/supplier/participants/${supplierParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/mentor/update`,
                                },
                            }),
                        },
                    }),
                },
                documents: `/supplier/participants/${supplierParticipantId}/documents`,
            },
        }),
    },
    groups: {
        index: `/supplier/groups`,
        overviews: {
            active: `/supplier/groups/active`,
            future: `/supplier/groups/future`,
            past: `/supplier/groups/past`,
        },
        create: `/supplier/groups/create`,
        detail: (groupId: string = ':groupId') =>  ({
            index: `/supplier/groups/${groupId}`,
            data: {
                index: `/supplier/groups/${groupId}/data`,
                participants: `/supplier/groups/${groupId}/participants`,
                update: `/supplier/groups/${groupId}/update`,
            },
        }),
    },
    management: {
        index: '/supplier/management',
        supplierDetails: {
            index: `/supplier/management/supplier`,
            data: {
                index: `/supplier/management/supplier/data`,
                update: `/supplier/management/supplier/update`,
            },
        },
        coworkers: {
            index: `/supplier/management/coworkers`,
            create: `/supplier/management/coworkers/create`,
            detail: (providerEmployeeId: string = ':providerEmployeeId') => ({
                index: `/supplier/management/coworkers/${providerEmployeeId}`,
                data: {
                    index: `/supplier/management/coworkers/${providerEmployeeId}/data`,
                    update: `/supplier/management/coworkers/${providerEmployeeId}/update`,
                    documents: `/supplier/management/coworkers/${providerEmployeeId}/documents`,
                },
            }),
        },
    },
}


// --- OLD

// export const supplierRoutes = {
//     // TODO: change back to / when all routes are refactored to environment specific routes
//     index: '/supplier',
//     // TODO: this should be refactored to BiscRoutes, but it has a too big of an impact right now
//     bisc: {
//         index: '/supplier/bisc',
//         overview: '/supplier/bisc/overview',
//         create: '/supplier/bisc/overview/create',
//         read: {
//             index: '/supplier/bisc/overview/read',
//             data: '/supplier/bisc/overview/read/data',
//             update: '/supplier/bisc/overview/read/update',
//             coworkers: {
//                 index: '/supplier/bisc/overview/read/coworkers',
//                 overview: '/supplier/bisc/overview/read/coworkers/overview',
//                 create: '/supplier/bisc/overview/read/coworkers/create',
//                 detail: {
//                     index: '/supplier/bisc/overview/read/coworkers/overview/detail',
//                     data: {
//                         index: '/supplier/bisc/overview/read/coworkers/overview/detail/data',
//                         update: '/supplier/bisc/overview/read/coworkers/overview/detail/data/update',
//                     },
//                     documents: {
//                         index: '/supplier/bisc/overview/read/coworkers/overview/detail/documents',
//                     },
//                 },
//             },
//         },
//     },
//     groups: {
//         index: '/supplier/groups',
//         overview: {
//             index: '/supplier/groups/overview',
//             active: '/supplier/groups/overview/active',
//             future: '/supplier/groups/overview/future',
//             finished: '/supplier/groups/overview/finished',
//         },
//         create: '/supplier/groups/create',
//         detail: {
//             index: '/supplier/groups/detail',
//             read: '/supplier/groups/detail/read',
//             update: '/supplier/groups/detail/update',
//             participants: '/supplier/groups/detail/partcipants',
//         },
//     },
//     participants: {
//         index: '/supplier/participants',
//         overview: '/supplier/participants/overview', // TODO: temporary, delete after 2nd sprint
//         active: '/supplier/participants/active',
//         completed: '/supplier/participants/completed',
//         referred: '/supplier/participants/referred',
//         detail: {
//             index: '/supplier/participants/detail',
//             overview: '/supplier/participants/detail/overview',
//             registration: '/supplier/participants/detail/registration',
//             files: '/supplier/participants/detail/files',
//             goals: {
//                 index: '/supplier/participants/detail/goals',
//                 overview: '/supplier/participants/detail/goals/overview',
//                 detail: {
//                     index: '/supplier/participants/detail/goals/detail',
//                     overview: '/supplier/participants/detail/goals/detail/overview',
//                     tests: {
//                         index: `/supplier/participants/detail/goals/detail/tests`,
//                         create: `/supplier/participants/detail/goals/detail/tests/create`,
//                         update: `/supplier/participants/detail/goals/detail/tests/update`,
//                     },
//                 },
//             },
//             documents: '/supplier/participants/detail/documents',
//         },
//     },
//     // do not confuse with the bisc environment. this is for aanbieder management
//     management: {
//         index: '/supplier/management',
//         overview: '/supplier/management/overview',
//         employees: {
//             index: '/supplier/management/employees',
//             overview: '/supplier/management/employees/overview',
//             create: '/supplier/management/employees/create',
//             detail: {
//                 overview: '/supplier/management/employees/detail/overview',
//                 participants: '/supplier/management/employees/detail/participants',
//                 documents: '/supplier/management/employees/detail/documents',
//             },
//         },
//     },
// }
