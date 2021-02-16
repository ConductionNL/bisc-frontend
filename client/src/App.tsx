import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotificationsManager } from './components/Core/Feedback/Notifications/NotificationsManager'
import { routes } from './routes'
import { AuthorizedView } from './views/Authorized/AuthorizedView'
import { UnauthorizedView } from './views/Unauthorized/UnauthorizedView'

function App() {
    return (
        <>
            <Switch>
                <Route path={routes.authorized.index} exact={true} component={AuthorizedView} />
                <Route path={routes.unauthorized.index} exact={true} component={UnauthorizedView} />
            </Switch>

            <NotificationsManager />
        </>
    )
}

export default App
