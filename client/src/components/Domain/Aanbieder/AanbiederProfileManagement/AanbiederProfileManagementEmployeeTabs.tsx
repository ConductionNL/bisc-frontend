import React from 'react'
import { routes } from 'routes/routes'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    currentTab: AanbiederProfileManagementEmployeeTab
}

export enum AanbiederProfileManagementEmployeeTab {
    overview = 'overview',
    participants = 'participants',
    documents = 'documents',
}

export const AanbiederProfileManagementEmployeeTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab } = props

    return (
        <Row justifyContent="flex-start">
            <TabSwitch defaultActiveTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid)}>
                <Tab label={i18n._(t`Gegevens`)} tabid={getRoute(AanbiederProfileManagementEmployeeTab.overview)} />
                <Tab
                    label={i18n._(t`Deelnemers`)}
                    tabid={getRoute(AanbiederProfileManagementEmployeeTab.participants)}
                />
                <Tab label={i18n._(t`Documenten`)} tabid={getRoute(AanbiederProfileManagementEmployeeTab.documents)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: AanbiederProfileManagementEmployeeTab) {
        return routes.authorized.supplier.profileManagement.employees.detail[tab]
    }
}
