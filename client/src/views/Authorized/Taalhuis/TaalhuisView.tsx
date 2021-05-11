import { UserContext } from 'components/Providers/UserProvider/context'
import { UserEnvironmentEnum } from 'generated/enums'
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ReportsView } from './Reports/ReportsView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    const user = useContext(UserContext).user

    if (user?.userEnvironment as UserEnvironmentEnum !== UserEnvironmentEnum.Taalhuis) {
        return null
    }

    return (
        <Switch>
            <Redirect
                path={taalhuisRoutes.index}
                exact={true}
                to={taalhuisRoutes.reports.index}
            />
            <Route path={taalhuisRoutes.reports.index} component={ReportsView} />
            <Route path={taalhuisRoutes.participants.index} component={ReportsView} />
        </Switch>
    )
}
