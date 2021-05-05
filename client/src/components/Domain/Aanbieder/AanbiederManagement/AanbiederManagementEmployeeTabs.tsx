export {}
// import React from 'react'
// import { routes } from 'routes/routes'
// import { useHistory } from 'react-router'
// import { useLingui } from '@lingui/react'
// import { t } from '@lingui/macro'

// import Tab from 'components/Core/TabSwitch/Tab'
// import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
// import Row from 'components/Core/Layout/Row/Row'
// import { AanbiederManagementEmployeesLocationStateProps } from 'views/Authorized/Supplier/AanbiederView/AanbiederManagementView/AanbiederManagementEmployeesView/AanbiederManagementEmployeesView'

// interface Props {
//     currentTab: AanbiederManagementEmployeeTab
//     routeState: AanbiederManagementEmployeesLocationStateProps
// }

// export enum AanbiederManagementEmployeeTab {
//     overview = 'overview',
//     participants = 'participants',
//     documents = 'documents',
// }

// export const AanbiederManagementEmployeeTabs: React.FunctionComponent<Props> = props => {
//     const history = useHistory()
//     const { i18n } = useLingui()
//     const { currentTab, routeState } = props

//     return (
//         <Row justifyContent="flex-start">
//             <TabSwitch defaultActiveTabId={getRoute(currentTab)} onChange={props => handleOnChange(props.tabid)}>
//                 <Tab label={i18n._(t`Gegevens`)} tabid={getRoute(AanbiederManagementEmployeeTab.overview)} />
//                 <Tab label={i18n._(t`Deelnemers`)} tabid={getRoute(AanbiederManagementEmployeeTab.participants)} />
//                 <Tab label={i18n._(t`Documenten`)} tabid={getRoute(AanbiederManagementEmployeeTab.documents)} />
//             </TabSwitch>
//         </Row>
//     )

//     function getRoute(tab: AanbiederManagementEmployeeTab) {
//         return routes.authorized.supplier.management.employees.detail[tab]
//     }

//     function handleOnChange(pathname: string) {
//         history.push({
//             pathname,
//             search: '',
//             hash: '',
//             state: routeState,
//         })
//     }
// }
