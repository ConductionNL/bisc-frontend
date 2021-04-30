import { Route, Switch } from 'react-router-dom'
import { routes } from '../routes/routes'
import { UnauthorizedView } from './Unauthorized/UnauthorizedView'
import { AuthorizedView } from './Authorized/AuthorizedView'

function RootView() {
    return (
        <>
            <Switch>
                <Route path={routes.unauthorized.index} component={UnauthorizedView} />
                <Route path={routes.authorized.index} component={AuthorizedView} />
            </Switch>
        </>
    )
}

export default RootView
