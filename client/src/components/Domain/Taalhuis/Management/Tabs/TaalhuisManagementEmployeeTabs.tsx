import { useLingui } from '@lingui/react'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch, { handleTabSwitch } from 'components/Core/TabSwitch/TabSwitch'
import get from 'lodash/get'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisManagementCoworkerDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

enum TaalhuisManagementEmployeeTabsEnum {
    view = 'data.index',
    update = 'data.update',
    mentees = 'mentees',
}

export const TaalhuisManagementEmployeeTabs = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    const { taalhuisEmployeeId } = useParams<TaalhuisManagementCoworkerDetailRouteParams>()
    const enumValues = Object.values(TaalhuisManagementEmployeeTabsEnum)
    const basePath = taalhuisRoutes.management.coworkers.detail(taalhuisEmployeeId)
    const tabRoutes = enumValues.map(value => ({
        id: value,
        pathName: get(basePath, value),
    }))

    return (
        <TabSwitch activeTabId={getActiveTabId()} onChange={tab => handleTabSwitch(tab, history, tabRoutes)}>
            <Tab label={i18n._('Gegevens')} tabid={TaalhuisManagementEmployeeTabsEnum.view} />
            <Tab label={i18n._('Deelnemers in begeleiding')} tabid={TaalhuisManagementEmployeeTabsEnum.mentees} />
        </TabSwitch>
    )

    function getActiveTabId() {
        const currentTabValue = enumValues.find(val => history.location.pathname === get(basePath, val))
        if (!currentTabValue) {
            return ''
        }

        // because there is no dedicated update tab, return view as active
        if (currentTabValue === TaalhuisManagementEmployeeTabsEnum.update) {
            return TaalhuisManagementEmployeeTabsEnum.view
        }

        return currentTabValue
    }
}
