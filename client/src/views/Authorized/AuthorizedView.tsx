import React, { useCallback, useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import AppChrome from '../../components/Chrome/AppChrome'
import { SessionContext } from '../../components/Providers/SessionProvider/context'
import { routes } from '../../routes'
import { NotFoundView } from '../Generic/NotFoundView'
import Kitchensink from './Dev/Kitchensink'
import { LinguiExample } from './Dev/LinguiExample'
import { ManagementView } from './Management/ManagementView'
import AddPersonToProgramView from './Persons/AddPersonToProgramView'
import AddPersonView from './Persons/AddPersonView'
import PersonsView from './Persons/PersonsView'
import ProfilePage from './Profile/ProfilePage'
import MyProgramsView from './Programs/MyProgramsView'
import ProgramsView from './Programs/ProgramsView'
import TaalhuizenOverviewCreateView from './Taalhuis/Overview/TaalhuizenOverviewCreateView'
import TaalhuizenReadOverviewPage from './Taalhuis/Overview/TaalhuizenOverviewReadView/TaalhuizenOverviewReadView'
import TaalhuizenOverviewUpdateView from './Taalhuis/Overview/TaalhuizenOverviewUpdateView'
import { ReportsView } from './Reports/ReportsView'
import { SupplierView } from './Supplier/SupplierView'
import { TaalhuisView } from './Taalhuis/TaalhuisView'

interface Props {}

export const AuthorizedView: React.FunctionComponent<Props> = () => {
    const context = useContext(SessionContext)
    const history = useHistory()

    const handleLocation = useCallback(() => {
        if (!context.accesstoken && !context.loggedout) {
            history.replace(routes.unauthorized.login)
        }
        if (!context.accesstoken && context.loggedout) {
            history.replace(routes.unauthorized.loggedout)
        }
    }, [context.loggedout, context.accesstoken, history])

    useEffect(() => {
        handleLocation()
    }, [context.accesstoken, handleLocation])

    if (!context.accesstoken) {
        return null
    }

    return (
        <AppChrome>
            <Switch>
                {/* <Redirect path={routes.authorized.index} exact={true} to={routes.authorized.myPrograms} /> */}
                <Route path={routes.authorized.persons} exact={true} component={PersonsView} />
                <Route path={routes.authorized.addPerson} exact={true} component={AddPersonView} />
                <Route path={routes.authorized.addPersonToProgram} exact={true} component={AddPersonToProgramView} />
                <Route path={routes.authorized.programs} exact={true} component={ProgramsView} />
                <Route path={routes.authorized.myPrograms} exact={true} component={MyProgramsView} />
                <Route path={routes.authorized.profile} exact={true} component={ProfilePage} />
                <Route path={routes.authorized.taalhuis.overview} exact={true} component={TaalhuizenReadOverviewPage} />
                <Route path={routes.authorized.taalhuis.create} exact={true} component={TaalhuizenOverviewCreateView} />
                <Route path={routes.authorized.taalhuis.update} exact={true} component={TaalhuizenOverviewUpdateView} />

                <Route path={routes.authorized.taalhuis.index} component={TaalhuisView} />
                <Route path={routes.authorized.supplier.index} component={SupplierView} />
                <Route path={routes.authorized.reports.index} component={ReportsView} />
                <Route path={routes.authorized.management.bisc.index} component={ManagementView} />
                <Route path={routes.authorized.management.taalhuis.index} component={ManagementView} />

                {/* dev only */}
                <Route path={routes.authorized.translationsExample} exact={true} component={LinguiExample} />
                <Route path={routes.authorized.kitchensink} exact={true} component={Kitchensink} />
                <Route component={NotFoundView} />
            </Switch>
        </AppChrome>
    )
}
