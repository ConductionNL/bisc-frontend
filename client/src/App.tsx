import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import AddPersonView from './views/AddPersonView'
import IndexView from './views/IndexView'
import PersonsView from './views/PersonsView'

function App() {
    return (
        <Switch>
            <Route path={routes.index} exact={true} component={IndexView} />
            <Route path={routes.persons} exact={true} component={PersonsView} />
            <Route path={routes.addPerson} exact={true} component={AddPersonView} />
        </Switch>
    )
}

export default App
