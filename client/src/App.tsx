import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import AddPersonToProgramView from './views/AddPersonToProgramView'
import AddPersonView from './views/AddPersonView'
import IndexView from './views/IndexView'
import Kitchensink from './views/App/Kitchensink/Kitchensink'
import MyProgramsView from './views/MyProgramsView'
import PersonsView from './views/PersonsView'
import ProgramsView from './views/ProgramsView'
import { NotificationsManager } from './components/Core/Feedback/Notifications/NotificationsManager'

function App() {
    return (
        <>
            <Switch>
                <Route path={routes.index} exact={true} component={IndexView} />
                <Route path={routes.persons} exact={true} component={PersonsView} />
                <Route path={routes.addPerson} exact={true} component={AddPersonView} />
                <Route path={routes.addPersonToProgram} exact={true} component={AddPersonToProgramView} />
                <Route path={routes.programs} exact={true} component={ProgramsView} />
                <Route path={routes.myPrograms} exact={true} component={MyProgramsView} />

                {/* TODO: delete - for design review/check only */}
                <Route path={routes.kitchensink} exact={true} component={Kitchensink} />
            </Switch>

            <NotificationsManager />
        </>
    )
}

export default App
