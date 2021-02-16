import React, { useContext, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { SessionContext } from '../../components/Providers/SessionProvider/context'
import { routes } from '../../routes'
import AddPersonToProgramView from './Persons/AddPersonToProgramView'
import MyProgramsView from './Programs/MyProgramsView'
import PersonsView from './Persons/PersonsView'
import ProgramsView from './Programs/ProgramsView'
import { NotFoundView } from '../Generic/NotFoundView'
import AddPersonView from './Persons/AddPersonView'

interface Props {}

export const AuthorizedView: React.FunctionComponent<Props> = () => {
    const context = useContext(SessionContext)
    const history = useHistory()

    useEffect(() => {
        if (!context.accesstoken) {
            history.replace(routes.unauthorized.index)
        }
    }, [context.accesstoken])

    return (
        <Switch>
            <Route path={routes.authorized.persons} exact={true} component={PersonsView} />
            <Route path={routes.authorized.addPerson} exact={true} component={AddPersonView} />
            <Route path={routes.authorized.addPersonToProgram} exact={true} component={AddPersonToProgramView} />
            <Route path={routes.authorized.programs} exact={true} component={ProgramsView} />
            <Route path={routes.authorized.myPrograms} exact={true} component={MyProgramsView} />
            <Route component={NotFoundView} />
        </Switch>
    )
}
