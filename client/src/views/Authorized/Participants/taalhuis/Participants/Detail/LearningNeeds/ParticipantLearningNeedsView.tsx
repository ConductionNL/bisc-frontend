import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
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

interface Props {}

export const ParticipantsLearningNeedsView: React.FC<Props> = () => {
    const history = useHistory()
    const { i18n } = useLingui()
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

            <LearningNeedsTable
                leftHeader={'Leervraag'}
                rightHeaders={['Status', 'Aanbod/Verwezen naar', 'Aanbieder/Notitie']}
            />

            <LearningNeedsCard
                leftComponent={<SectionTitle title="test" heading={'H4'} />}
                rightComponent={[
                    [<p>test</p>, <p>test</p>, <p>test</p>],
                    [<p>test</p>, <p>test</p>, <p>test</p>],
                ]}
            />
        </>
    )
}
