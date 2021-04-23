import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import {
    AanbiederParticipantTab,
    AanbiederParticipantTabs,
} from 'components/Domain/Aanbieder/AanbiederParticipants/Tabs/AanbiederParticipantTabs'
import { ParticipantLearningNeedsList } from 'components/Domain/LearningNeeds/List/ParticipantsLearningNeedsList'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedsQuery,
    LearningNeedTopicEnum,
    ParticipationGroupFormationEnum,
    ParticipationOfferCourseEnum,
    ParticipationStatusEnum,
    useLearningNeedsQuery,
} from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederParticipationGoalsLocationStateProps } from './AanbiederParticipantGoalsView'

interface Props {
    routeState: AanbiederParticipationGoalsLocationStateProps
}

export const AanbiederParticipantGoalsOverviewView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useLearningNeedsQuery({
        variables: {
            studentId: routeState.participantId ?? '',
        },
    })

    // TODO: remove when real data is available
    const stubbedData: LearningNeedsQuery = {
        ...data,
        learningNeeds:
            data?.learningNeeds.map(learningNeed => ({
                ...learningNeed,
                participations: [
                    {
                        __typename: 'ParticipationType',
                        id: 'temporaryID',
                        status: ParticipationStatusEnum.Active,
                        providerId: '',
                        providerName: 'providerName',
                        aanbiederNote: '',
                        offerName: 'offerName',
                        offerCourse: ParticipationOfferCourseEnum.Digital,
                        outComesGoal: 'outComesGoal',
                        outComesTopic: LearningNeedTopicEnum.Attitude,
                        outComesTopicOther: 'outComesTopicOther',
                        outComesApplication: LearningNeedApplicationEnum.FamilyAndParenting,
                        outComesApplicationOther: 'outComesApplicationOther',
                        outComesLevel: LearningNeedLevelEnum.Nlqf1,
                        outComesLevelOther: 'outComesLevelOther',
                        detailsIsFormal: true,
                        detailsGroupFormation: ParticipationGroupFormationEnum.InAGroup,
                        detailsTotalClassHours: 100,
                        detailsCertificateWillBeAwarded: true,
                        detailsStartDate: new Date('2021-04-02T08:56:27.000Z'),
                        detailsEndDate: new Date('2022-04-02T08:56:27.000Z'),
                    },
                    {
                        __typename: 'ParticipationType',
                        id: 'temporaryID',
                        status: ParticipationStatusEnum.Referred,
                        providerId: '',
                        providerName: 'providerName',
                        aanbiederNote: '',
                        offerName: 'offerName',
                        offerCourse: ParticipationOfferCourseEnum.Digital,
                        outComesGoal: 'outComesGoal',
                        outComesTopic: LearningNeedTopicEnum.Attitude,
                        outComesTopicOther: 'outComesTopicOther',
                        outComesApplication: LearningNeedApplicationEnum.FamilyAndParenting,
                        outComesApplicationOther: 'outComesApplicationOther',
                        outComesLevel: LearningNeedLevelEnum.Nlqf1,
                        outComesLevelOther: 'outComesLevelOther',
                        detailsIsFormal: true,
                        detailsGroupFormation: ParticipationGroupFormationEnum.InAGroup,
                        detailsTotalClassHours: 100,
                        detailsCertificateWillBeAwarded: true,
                        detailsStartDate: new Date('2021-04-02T08:56:27.000Z'),
                        detailsEndDate: new Date('2022-04-02T08:56:27.000Z'),
                    },
                    {
                        __typename: 'ParticipationType',
                        id: 'temporaryID',
                        status: ParticipationStatusEnum.Completed,
                        providerId: '',
                        providerName: 'providerName',
                        aanbiederNote: '',
                        offerName: 'offerName',
                        offerCourse: ParticipationOfferCourseEnum.Digital,
                        outComesGoal: 'outComesGoal',
                        outComesTopic: LearningNeedTopicEnum.Attitude,
                        outComesTopicOther: 'outComesTopicOther',
                        outComesApplication: LearningNeedApplicationEnum.FamilyAndParenting,
                        outComesApplicationOther: 'outComesApplicationOther',
                        outComesLevel: LearningNeedLevelEnum.Nlqf1,
                        outComesLevelOther: 'outComesLevelOther',
                        detailsIsFormal: true,
                        detailsGroupFormation: ParticipationGroupFormationEnum.InAGroup,
                        detailsTotalClassHours: 100,
                        detailsCertificateWillBeAwarded: true,
                        detailsStartDate: new Date('2021-04-02T08:56:27.000Z'),
                        detailsEndDate: new Date('2022-04-02T08:56:27.000Z'),
                    },
                ],
            })) || [],
    }

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            {/* TODO: add breadcrumb */}
            <Headline spacingType={SpacingType.small} title={i18n._(t`Leer doelen`)} />
            <Column spacing={10}>
                <AanbiederParticipantTabs routeState={routeState} currentTab={AanbiederParticipantTab.goals} />
                {renderList()}
            </Column>
        </>
    )

    // TODO
    function renderList() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <ParticipantLearningNeedsList
                queryData={stubbedData}
                onItemClick={item =>
                    history.push({
                        pathname: routes.authorized.supplier.participants.detail.goals.detail.overview,
                        state: {
                            participantId: routeState.participantId,
                            learningNeedId: item.id,
                        },
                    })
                }
            />
        )
    }
}
