import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { LearningNeedsItems } from 'components/Domain/LearningNeeds/LearningNeedsItems'
import { LearningNeedsTable } from 'components/Domain/LearningNeeds/LearningNeedsTable'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import { routes } from '../../../../../../../routes/routes'
import { ReadDetailTabs, readDetailTabsTranslations } from '../../../constants'
import { RefererContainer } from 'components/Domain/LearningNeeds/LearningNeedsRefererContainer'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { LearningNeedsDataType, LearningNeedsMock, learningNeedsStatusMock } from './mocks/learningNeeds'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { StatusLabelTag } from 'components/Domain/LearningNeeds/StatusLabelTag'
import { ParticipantDetailParams } from 'routes/participants/types'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import Column from 'components/Core/Layout/Column/Column'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsLearningNeedsOverviewView: React.FC<Props> = () => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<LearningNeedsMock[]>(learningNeedsStatusMock)

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
                    onChange={props => history.push(ReadDetailTabs[props.tabid as ReadDetailTabs])}
                >
                    <Tab label={readDetailTabsTranslations[ReadDetailTabs.read]} tabid={ReadDetailTabs.read} />
                    <Tab label={readDetailTabsTranslations[ReadDetailTabs.goals]} tabid={ReadDetailTabs.goals} />
                </TabSwitch>
                <Row justifyContent="flex-end">
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push(routes.authorized.participants.taalhuis.participants.detail.goals.create)
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
                <LearningNeedsTable
                    leftHeader={i18n._(t`Leervraag`)}
                    rightHeaders={[i18n._(t`Status`), i18n._(t`Aanbod/Verwezen naar`), i18n._(t`Aanbieder/Notitie`)]}
                    rows={data.map(item => (
                        <LearningNeedsItems
                            to={routes.authorized.participants.taalhuis.participants.detail.goals.detail.read}
                            leftComponent={<SectionTitle title={item.title} heading={'H4'} />}
                            rightComponent={getRows(item.data)}
                        />
                    ))}
                />
            )
        }
    }

    function getRows(data: LearningNeedsDataType[]): (JSX.Element | null)[][] {
        const rows = data.map(item => {
            return [
                <StatusLabelTag label={item.status} />,
                item.offer ? <LabelTag label={item.offer} color={LabelColor.white} icon={IconType.offer} /> : null,
                item.referred ? <RefererContainer labels={item.referred} /> : null,
                item.provider ? (
                    <LabelTag label={item.provider} color={LabelColor.white} icon={IconType.providers} />
                ) : null,
                item.notes ? <LabelTag label={item.notes} color={LabelColor.white} icon={IconType.providers} /> : null,
            ]
        })

        return rows
    }
}
