import React from 'react'
import { routes } from 'routes/routes'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'
import { AanbiederGroupDetailLocationProps } from 'views/Authorized/Supplier/AanbiederView/AanbiederGroupsView/AanbiederGroupsDetailView/AanbiederGroupsDetailView'

interface Props {
    currentTab: AanbiederGroupsDetailTab
    routeState: AanbiederGroupDetailLocationProps
}

export enum AanbiederGroupsDetailTab {
    Gegevens = 'read',
    Deelnemers = 'participants',
}

export const AanbiederGroupDetailTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab, routeState } = props

    return (
        <Row justifyContent="flex-start">
            <TabSwitch
                defaultActiveTabId={getRoute(currentTab)}
                onChange={props => history.push({ pathname: props.tabid, state: routeState })}
            >
                <Tab label={i18n._(t`Gegevens`)} tabid={getRoute(AanbiederGroupsDetailTab.Gegevens)} />
                <Tab label={i18n._(t`Deelnemers`)} tabid={getRoute(AanbiederGroupsDetailTab.Deelnemers)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: AanbiederGroupsDetailTab) {
        return routes.authorized.supplier.groups.detail[tab]
    }
}
