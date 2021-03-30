import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'

enum Tabs {
    data = 'data',
    coworkers = 'coworkers',
}

interface Props {}

const ManagementTabs: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const tabRoutes = {
        [Tabs.data]: routes.authorized.management.taalhuis.data.index,
        [Tabs.coworkers]: routes.authorized.management.taalhuis.coworkers.index,
    }

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.coworkers) {
            history.push(tabRoutes[tab.tabid as Tabs])
        }
    }

    return (
        <TabSwitch defaultActiveTabId={Tabs.data} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
            <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.coworkers} />
        </TabSwitch>
    )
}

export default ManagementTabs
