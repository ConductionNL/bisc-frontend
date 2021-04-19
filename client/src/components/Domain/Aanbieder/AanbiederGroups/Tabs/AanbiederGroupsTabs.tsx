import React from 'react'
import { routes } from 'routes/routes'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    currentTab: AanbiederGroupsTab
}

export enum AanbiederGroupsTab {
    active = 'active',
    future = 'future',
    finished = 'finished',
}

export const AanbiederGroupsTabs: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { currentTab } = props

    return (
        <Row justifyContent="flex-start">
            <TabSwitch defaultActiveTabId={getRoute(currentTab)} onChange={props => history.push(props.tabid)}>
                <Tab label={i18n._(t`Lopend`)} tabid={getRoute(AanbiederGroupsTab.active)} />
                <Tab label={i18n._(t`Toekomstig`)} tabid={getRoute(AanbiederGroupsTab.future)} />
                <Tab label={i18n._(t`Afgerond`)} tabid={getRoute(AanbiederGroupsTab.finished)} />
            </TabSwitch>
        </Row>
    )

    function getRoute(tab: AanbiederGroupsTab) {
        return routes.authorized.supplier.groups.overview[tab]
    }
}
