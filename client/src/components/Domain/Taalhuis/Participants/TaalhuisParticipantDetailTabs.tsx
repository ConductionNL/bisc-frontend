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
    intake = 'intake',
    learningNeeds = 'learningNeeds',
    documents = 'documents',
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
            id: Tabs.intake,
            pathName: routes.authorized.participants.taalhuis.participants.detail.intake.read,
        },
        {
            id: Tabs.learningNeeds,
            pathName: routes.authorized.participants.taalhuis.participants.detail.goals.index,
        },
        {
            id: Tabs.documents,
            pathName: routes.authorized.participants.taalhuis.participants.detail.documents.index,
        },
    ]

    return (
        <TabSwitch defaultActiveTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Intake`)} tabid={Tabs.intake} />
            <Tab label={i18n._(t`Leervragen`)} tabid={Tabs.learningNeeds} />
            <Tab label={i18n._(t`Documenten`)} tabid={Tabs.documents} />
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
