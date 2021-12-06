import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export enum TaalhuisManagementTab {
    TaalhuisEmployees,
    TaalhuisDetails,
}

interface Props {
    activeTabId: TaalhuisManagementTab
}

export const TaalhuisManagementTabs: React.FunctionComponent<Props> = props => {
    const { activeTabId } = props
    const { i18n } = useLingui()
    const history = useHistory()

    const tabRoutes = [
        {
            id: TaalhuisManagementTab.TaalhuisDetails,
            pathName: taalhuisRoutes.management.taalhuisDetails.index,
        },
        {
            id: TaalhuisManagementTab.TaalhuisEmployees,
            pathName: taalhuisRoutes.management.coworkers.index,
        },
    ]

    return (
        <TabSwitch activeTabId={activeTabId} onChange={handleTabSwitch}>
            <Tab label={i18n._(t`Beheer`)} tabid={TaalhuisManagementTab.TaalhuisDetails} />
            <Tab label={i18n._(t`Medewerkers`)} tabid={TaalhuisManagementTab.TaalhuisEmployees} />
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
