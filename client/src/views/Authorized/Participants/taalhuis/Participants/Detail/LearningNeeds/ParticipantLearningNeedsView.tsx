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
                rows={[
                    <LearningNeedsCard
                        leftComponent={<SectionTitle title="Met computers leren werken" heading={'H4'} />}
                        rightComponent={[
                            [
                                <LabelTag label={'Verwezen'} icon={IconType.send} />,
                                <RefererContainer
                                    labels={[
                                        <LabelTag label={'Taalhuis Utrecht'} color={LabelColor.grey} />,
                                        <LabelTag label={'Bibliotheek X'} color={LabelColor.grey} />,
                                    ]}
                                />,
                                <p>test</p>,
                            ],
                            [
                                <LabelTag label={'Afgerond'} icon={IconType.checkmark} color={LabelColor.green} />,
                                <LabelWithIcon text={'test'} icon={IconType.providers} />,
                                <LabelWithIcon text={'test'} icon={IconType.search} />,
                            ],
                        ]}
                    />,
                    <LearningNeedsCard
                        leftComponent={<SectionTitle title="Met computers leren werken" heading={'H4'} />}
                        rightComponent={[
                            [
                                <LabelTag label={'Verwezen'} icon={IconType.send} />,
                                <RefererContainer
                                    labels={[
                                        <LabelTag label={'Taalhuis Utrecht'} color={LabelColor.grey} />,
                                        <LabelTag label={'Bibliotheek X'} color={LabelColor.grey} />,
                                    ]}
                                />,
                                <p>test</p>,
                            ],
                        ]}
                    />,
                ]}
            />
        </>
    )
}
