import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { LearningNeedsCard } from 'components/Domain/LearningNeeds/LearningNeedsCard'
import { LearningNeedsTable } from 'components/Domain/LearningNeeds/LearningNeedsTable'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import { routes } from '../../../../../../../routes/routes'
import { ReadDetailTabs, readDetailTabsTranslations } from '../../../constants'
import LabelWithIcon from 'components/Core/Text/LabelWithIcon'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { RefererContainer } from 'components/Domain/LearningNeeds/LearningNeedsRefererContainer'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { LearningNeedsDataType, LearningNeedsMock, learningNeedsMock } from './mocks/learningNeeds'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { StatusLabelTag } from 'components/Core/DataDisplay/LabelTag/StatusLabelTag'

interface Props {}

export const ParticipantsLearningNeedsView: React.FC<Props> = () => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<LearningNeedsMock[]>(learningNeedsMock)

    return (
        <>
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
                <Tab
                    label={readDetailTabsTranslations[ReadDetailTabs.registration]}
                    tabid={ReadDetailTabs.registration}
                />
                <Tab label={readDetailTabsTranslations[ReadDetailTabs.folder]} tabid={ReadDetailTabs.folder} />
                <Tab label={readDetailTabsTranslations[ReadDetailTabs.goals]} tabid={ReadDetailTabs.goals} />
                <Tab label={readDetailTabsTranslations[ReadDetailTabs.documents]} tabid={ReadDetailTabs.documents} />
            </TabSwitch>
            <Row justifyContent="flex-end">
                <Button
                    icon={IconType.add}
                    onClick={() => history.push(routes.authorized.participants.taalhuis.participants.create)}
                >
                    {i18n._(t`Voeg leervraag toe`)}
                </Button>
            </Row>
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
                    leftHeader={'Leervraag'}
                    rightHeaders={['Status', 'Aanbod/Verwezen naar', 'Aanbieder/Notitie']}
                    rows={data.map(item => (
                        <LearningNeedsCard
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
                item.offer ? <LabelWithIcon text={item.offer} icon={IconType.offer} /> : null,
                item.referred ? (
                    <RefererContainer
                        labels={[
                            <LabelTag label={item.referred[0]} color={LabelColor.grey} />,
                            <LabelTag label={item.referred[1]} color={LabelColor.grey} />,
                        ]}
                    />
                ) : null,
                item.provider ? <LabelWithIcon text={item.provider} icon={IconType.providers} /> : null,
                item.notes ? <LabelWithIcon text={item.notes} icon={IconType.providers} /> : null,
            ]
        })

        return rows
    }
}
