import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import IndexView from './views/IndexView'

function App() {
    return (
        <Switch>
            <Route path={routes.index} exact={true} component={IndexView} />
        </Switch>
    )
}

export default App
