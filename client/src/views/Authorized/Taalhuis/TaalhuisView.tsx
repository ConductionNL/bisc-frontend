import { UserContext } from 'components/Providers/UserProvider/context'
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ReportsView } from './Reports/ReportsView'
import { ParticipantsTaalhuisView } from './Participants/ParticipantsTaalhuisView'
import { UserEnvironmentEnum } from 'generated/enums'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    const user = useContext(UserContext).user

    if (user?.userEnvironment !== UserEnvironmentEnum.Taalhuis) {
        return null
    }

    return (
        <Switch>
            <Redirect path={taalhuisRoutes.index} exact={true} to={taalhuisRoutes.reports.index} />
            <Route path={taalhuisRoutes.reports.index} component={ReportsView} />
            <Route path={taalhuisRoutes.participants.index} component={ParticipantsTaalhuisView} />
        </Switch>
    )
}
