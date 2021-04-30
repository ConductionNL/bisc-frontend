import { Route, Switch } from 'react-router-dom'
import { routes } from '../routes/routes'
import { UnauthorizedView } from './Unauthorized/UnauthorizedView'

function RootView() {
    return (
        <>
            <Switch>
                <Route path={routes.unauthorized.index} component={UnauthorizedView} />
                <Route path={routes.authorized.index} component={() => <p>loggedIn</p>} />
            </Switch>
        </>
    )
}

export default RootView
