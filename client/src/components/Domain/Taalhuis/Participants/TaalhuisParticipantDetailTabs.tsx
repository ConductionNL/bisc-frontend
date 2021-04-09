import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantDetailLocationStateProps } from 'views/Authorized/Participants/taalhuis/Participants/Detail/ParticipantsDetailView'

export enum Tabs {
    Intake = 'intake',
    LearningNeeds = 'learningNeeds',
    Documents = 'documents',
    Files = 'files',
    Registration = 'registration',
}

interface Props {
    activeTabId: Tabs
    routeState: ParticipantDetailLocationStateProps
}

export const TaalhuisParticipantsDetailTabs: React.FunctionComponent<Props> = props => {
    const { activeTabId, routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const tabRoutes = [
        {
            id: Tabs.Intake,
            pathName: routes.authorized.participants.taalhuis.participants.detail.intake.read,
        },
        {
            id: Tabs.LearningNeeds,
            pathName: routes.authorized.participants.taalhuis.participants.detail.goals.index,
        },
        {
            id: Tabs.Documents,
            pathName: routes.authorized.participants.taalhuis.participants.detail.documents.index,
        },
        {
            id: Tabs.Files,
            pathName: routes.authorized.participants.taalhuis.participants.detail.files.index,
        },
        {
            id: Tabs.Registration,
            pathName: routes.authorized.participants.taalhuis.participants.detail.registration.index,
        },
    ]

    return (
        <TabSwitch defaultActiveTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Intake`)} tabid={Tabs.Intake} />
            <Tab label={i18n._(t`Leervragen`)} tabid={Tabs.LearningNeeds} />
            <Tab label={i18n._(t`Documenten`)} tabid={Tabs.Documents} />
            <Tab label={i18n._(t`Dossier`)} tabid={Tabs.Files} />
            <Tab label={i18n._(t`Aanmelding`)} tabid={Tabs.Registration} />
        </TabSwitch>
    )

    function handleTabSwitch(tab: TabProps) {
        const tabRoute = tabRoutes.find(tabRoute => tabRoute.id === tab.tabid)
        if (!tabRoute) {
            return
        }
        history.push({ pathname: tabRoute.pathName, state: routeState })
    }
}
