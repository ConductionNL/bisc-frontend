import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import styles from './App.module.scss'
import AddPersonToProgramView from './views/AddPersonToProgramView'
import AddPersonView from './views/AddPersonView'
import IndexView from './views/IndexView'
import Kitchensink from './views/App/Kitchensink/Kitchensink'
import MyProgramsView from './views/MyProgramsView'
import PersonsView from './views/PersonsView'
import ProgramsView from './views/ProgramsView'
import LoginView from './views/Unauthorized/LoginView'

function App() {
    return (
        <div className={styles.container}>
            <Switch>
                <Route path={routes.index} exact={true} component={IndexView} />
                <Route path={routes.login} exact={true} component={LoginView} />
                <Route path={routes.persons} exact={true} component={PersonsView} />
                <Route path={routes.addPerson} exact={true} component={AddPersonView} />
                <Route path={routes.addPersonToProgram} exact={true} component={AddPersonToProgramView} />
                <Route path={routes.programs} exact={true} component={ProgramsView} />
                <Route path={routes.myPrograms} exact={true} component={MyProgramsView} />

                {/* TODO: delete - for design review/check only */}
                <Route path={routes.kitchensink} exact={true} component={Kitchensink} />
            </Switch>
        </div>
    )
}

export default App
