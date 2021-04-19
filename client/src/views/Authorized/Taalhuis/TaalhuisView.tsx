import { UserContext } from 'components/Providers/UserProvider/context'
import { UserEnvironmentEnum } from 'generated/graphql'
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ReportsView } from './Reports/ReportsView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    const user = useContext(UserContext).user

    if (user?.userEnvironment !== UserEnvironmentEnum.Taalhuis) {
        return null
    }

    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.index}
                exact={true}
                to={routes.authorized.taalhuis.reports.index}
            />
            <Route path={routes.authorized.taalhuis.reports.index} component={ReportsView} />
        </Switch>
    )
}
