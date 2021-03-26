import React from 'react'
import { routes } from 'routes/routes'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    currentTab: AanbiederProfileManagementTab
}

export enum AanbiederProfileManagementTab {
    overview = 'overview',
    employees = 'employees',
}

export const AanbiederProfileManagementTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab } = props

    return (
        <Row justifyContent="flex-start">
            <TabSwitch defaultActiveTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid)}>
                <Tab label={i18n._(t`Gegevens`)} tabid={getRoute(AanbiederProfileManagementTab.overview)} />
                <Tab label={i18n._(t`Medewerkers`)} tabid={getRoute(AanbiederProfileManagementTab.employees)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: AanbiederProfileManagementTab) {
        if (tab === AanbiederProfileManagementTab.employees) {
            return routes.authorized.supplier.profileManagement.employees.index
        }

        return routes.authorized.supplier.profileManagement[tab]
    }
}
