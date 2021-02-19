import React, { useContext, useEffect, useRef } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { SessionContext } from '../../components/Providers/SessionProvider/context'
import { routes } from '../../routes'
import AddPersonToProgramView from './Persons/AddPersonToProgramView'
import MyProgramsView from './Programs/MyProgramsView'
import PersonsView from './Persons/PersonsView'
import ProgramsView from './Programs/ProgramsView'
import { NotFoundView } from '../Generic/NotFoundView'
import AddPersonView from './Persons/AddPersonView'
import AppChrome from '../../components/Chrome/AppChrome'
import { LinguiExample } from './Dev/Dev/LinguiExample'
import Kitchensink from './Dev/Dev/Kitchensink'
import ProfilePage from './Profile/ProfilePage'

interface Props {}

export const AuthorizedView: React.FunctionComponent<Props> = () => {
    const context = useContext(SessionContext)
    const history = useHistory()
    useEffect(() => {
        if (!context.accesstoken) {
            history.replace(routes.unauthorized.login)
        }
    }, [context.accesstoken, history])

    if (!context.accesstoken) {
        return null
    }

    return (
        <AppChrome>
            <Switch>
                <Redirect path={routes.authorized.index} exact={true} to={routes.authorized.myPrograms} />
                <Route path={routes.authorized.persons} exact={true} component={PersonsView} />
                <Route path={routes.authorized.addPerson} exact={true} component={AddPersonView} />
                <Route path={routes.authorized.addPersonToProgram} exact={true} component={AddPersonToProgramView} />
                <Route path={routes.authorized.programs} exact={true} component={ProgramsView} />
                <Route path={routes.authorized.myPrograms} exact={true} component={MyProgramsView} />
                <Route path={routes.authorized.profile} exact={true} component={ProfilePage} />

                {/* dev only */}
                <Route path={routes.authorized.translationsExample} exact={true} component={LinguiExample} />
                <Route path={routes.authorized.kitchensink} exact={true} component={Kitchensink} />
                <Route component={NotFoundView} />
            </Switch>
        </AppChrome>
    )
}
