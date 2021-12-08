import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export enum TaalhuisParticipantDetailTabsEnum {
    Intake = 'intake',
    LearningNeeds = 'learningNeeds',
    Documents = 'documents',
    Files = 'files',
    Registration = 'registration',
}

interface Props {
    activeTabId: TaalhuisParticipantDetailTabsEnum
}

export const TaalhuisParticipantDetailTabs: React.FunctionComponent<Props> = props => {
    const { activeTabId } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()

    const tabRoutes = [
        {
            id: TaalhuisParticipantDetailTabsEnum.Intake,
            pathName: taalhuisRoutes.participants.detail(taalhuisParticipantId).data.index,
        },
        {
            id: TaalhuisParticipantDetailTabsEnum.LearningNeeds,
            pathName: taalhuisRoutes.participants.detail(taalhuisParticipantId).data.learningNeeds.index,
        },
        {
            id: TaalhuisParticipantDetailTabsEnum.Documents,
            pathName: taalhuisRoutes.participants.detail(taalhuisParticipantId).data.documents,
        },
        {
            id: TaalhuisParticipantDetailTabsEnum.Files,
            pathName: taalhuisRoutes.participants.detail(taalhuisParticipantId).data.dossier.index,
        },
        {
            id: TaalhuisParticipantDetailTabsEnum.Registration,
            pathName: taalhuisRoutes.participants.detail(taalhuisParticipantId).data.registration,
        },
    ]

    return (
        <TabSwitch activeTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Intake`)} tabid={TaalhuisParticipantDetailTabsEnum.Intake} />
            {/* <Tab label={i18n._(t`Aanmelding`)} tabid={Tabs.Registration} /> */}
            <Tab label={i18n._(t`Dossier`)} tabid={TaalhuisParticipantDetailTabsEnum.Files} />
            <Tab label={i18n._(t`Leervragen`)} tabid={TaalhuisParticipantDetailTabsEnum.LearningNeeds} />
            {/* <Tab label={i18n._(t`Documenten`)} tabid={Tabs.Documents} /> */}
        </TabSwitch>
    )

    function handleTabSwitch(tab: TabProps) {
        const tabRoute = tabRoutes.find(tabRoute => tabRoute.id === tab.tabid)
        if (!tabRoute) {
            return
        }

        history.push(tabRoute.pathName)
    }
}
