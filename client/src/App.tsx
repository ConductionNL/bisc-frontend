import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import IndexView from './views/IndexView'
import PersonsView from './views/PersonsView'

function App() {
    return (
        <Switch>
            <Route path={routes.index} exact={true} component={IndexView} />
            <Route path={routes.persons} exact={true} component={PersonsView} />
        </Switch>
    )
}

export default App
