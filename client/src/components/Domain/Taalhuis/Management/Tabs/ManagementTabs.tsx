import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'

export enum Tabs {
    data = 'data',
    coworkers = 'coworkers',
}

interface Props {
    activeTabId: Tabs
}

const ManagementTabs: React.FunctionComponent<Props> = props => {
    const { activeTabId } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const tabRoutes = [
        {
            id: Tabs.data,
            pathName: routes.authorized.management.taalhuis.data.index,
        },
        {
            id: Tabs.coworkers,
            pathName: routes.authorized.management.taalhuis.coworkers.index,
        },
    ]

    return (
        <TabSwitch defaultActiveTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
            <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.coworkers} />
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

export default ManagementTabs
