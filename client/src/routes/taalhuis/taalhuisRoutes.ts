export interface TaalhuisParticipantsDetailRouteParams {
    taalhuisParticipantId: string
}

export interface TaalhuisParticipantsDetailDossierDetailRouteParams extends TaalhuisParticipantsDetailRouteParams {
    dossierId: string
}

export interface TaalhuisParticipantsDetailLearningNeedsDetailRouteParams
    extends TaalhuisParticipantsDetailRouteParams {
    learningNeedId: string
}

export interface TaalhuisParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams
    extends TaalhuisParticipantsDetailLearningNeedsDetailRouteParams {
    referralId: string
}

export interface TaalhuisParticipationTestResultRouteParams
    extends TaalhuisParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams {
    testResultId: string
}

export interface TaalhuisManagementCoworkerDetailRouteParams {
    taalhuisEmployeeId: string
}

export const taalhuisRoutes = {
    index: '/taalhuis',
    participants: {
        index: `/taalhuis/participants`,
        registrations: {
            index: `/taalhuis/participants/registrations`,
            detail: (registrationId: string = ':registrationId') =>
                `/taalhuis/participants/registrations/${registrationId}`,
        },
        create: `/taalhuis/participants/create`,
        detail: (taalhuisParticipantId: string = ':taalhuisParticipantId') => ({
            index: `/taalhuis/participants/${taalhuisParticipantId}`,
            data: {
                index: `/taalhuis/participants/${taalhuisParticipantId}/intake`,
                registration: `/taalhuis/participants/${taalhuisParticipantId}/registration`,
                update: `/taalhuis/participants/${taalhuisParticipantId}/update`,
                dossier: {
                    index: `/taalhuis/participants/${taalhuisParticipantId}/dossier`,
                    create: `/taalhuis/participants/${taalhuisParticipantId}/dossier/create`,
                    detail: (dossierId: string = ':dossierId') => ({
                        index: `/taalhuis/participants/${taalhuisParticipantId}/dossier/${dossierId}`,
                        update: `/taalhuis/participants/${taalhuisParticipantId}/dossier/${dossierId}/update`,
                    }),
                },
                learningNeeds: {
                    index: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs`,
                    create: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/create`,
                    detail: (learningNeedId: string = ':learningNeedId') => ({
                        index: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/${learningNeedId}`,
                        update: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/${learningNeedId}/update`,
                        referrals: {
                            index: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/${learningNeedId}/referrals`,
                            create: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/${learningNeedId}/referrals/create`,
                            detail: (referralId: string = ':referralId') => ({
                                index: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}`,
                                update: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/update`,
                                testResult: {
                                    create: `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/test-result/create`,
                                    update: (testResultId: string = ':testResultId') =>
                                        `/taalhuis/participants/${taalhuisParticipantId}/learning-needs/${learningNeedId}/referrals/${referralId}/test-result/${testResultId}/update`,
                                },
                            }),
                        },
                    }),
                },
                documents: `/taalhuis/participants/${taalhuisParticipantId}/documents`,
            },
        }),
    },
    reports: {
        index: '/taalhuis/reports',
        overview: '/taalhuis/reports/overview',
    },
    management: {
        index: '/taalhuis/management',
        taalhuisDetails: {
            index: `/taalhuis/management/taalhuis`,
            data: {
                index: `/taalhuis/management/taalhuis/data`,
                update: `/taalhuis/management/taalhuis/update`,
            },
        },
        coworkers: {
            index: `/taalhuis/management/coworkers`,
            create: `/taalhuis/management/coworkers/create`,
            detail: (taalhuisEmployeeId: string = ':taalhuisEmployeeId') => ({
                index: `/taalhuis/management/coworkers/${taalhuisEmployeeId}`,
                data: {
                    index: `/taalhuis/management/coworkers/${taalhuisEmployeeId}/data`,
                    update: `/taalhuis/management/coworkers/${taalhuisEmployeeId}/update`,
                },
            }),
        },
    },
}
