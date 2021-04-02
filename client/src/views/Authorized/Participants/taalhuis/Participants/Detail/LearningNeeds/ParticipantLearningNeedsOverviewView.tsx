import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TaalhuisParticipantLearningNeedsList } from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantsLearningNeedsList'
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
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import { routes } from '../../../../../../../routes/routes'
import { readDetailTabPaths, ReadDetailTabs, readDetailTabsTranslations } from '../../../constants'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsLearningNeedsOverviewView: React.FC<Props> = props => {
    const { routeState } = props
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useLearningNeedsQuery({
        variables: {
            studentId: routeState.participantId,
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
                        aanbiederId: '',
                        aanbiederName: '',
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

    return (
        <>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Deelnemer leervragen`)}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs>
                            <Breadcrumb
                                text={i18n._(t`Deelnemers`)}
                                to={routes.authorized.participants.taalhuis.participants.overview}
                            />
                        </Breadcrumbs>
                    }
                />
                <TabSwitch
                    defaultActiveTabId={ReadDetailTabs.goals}
                    onChange={props =>
                        history.push({
                            pathname: readDetailTabPaths[props.tabid as ReadDetailTabs],
                            state: routeState,
                        })
                    }
                >
                    <Tab label={readDetailTabsTranslations[ReadDetailTabs.read]} tabid={ReadDetailTabs.read} />
                    <Tab label={readDetailTabsTranslations[ReadDetailTabs.goals]} tabid={ReadDetailTabs.goals} />
                </TabSwitch>
                <Row justifyContent="flex-end">
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.participants.taalhuis.participants.detail.goals.create,
                                state: routeState,
                            })
                        }
                    >
                        {i18n._(t`Voeg leervraag toe`)}
                    </Button>
                </Row>
            </Column>
            {renderSections()}
        </>
    )

    function renderSections() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
            return (
                <TaalhuisParticipantLearningNeedsList
                    learningItemTo={{
                        pathname: routes.authorized.participants.taalhuis.participants.detail.goals.detail.read,
                        search: '',
                        hash: '',
                        state: routeState,
                    }}
                    queryData={stubbedData}
                />
            )
        }
    }
}
