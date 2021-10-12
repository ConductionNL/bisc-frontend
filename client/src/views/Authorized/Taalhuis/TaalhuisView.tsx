import { UserContext } from 'components/Providers/UserProvider/context'
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ReportsView } from './Reports/ReportsView'
import { ParticipantsTaalhuisView } from './Participants/ParticipantsTaalhuisView'
import { routes } from 'routes/routes'
import { OrganizationTypeEnum } from 'api/types/types'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    const user = useContext(UserContext).user

    // if (user?.organization.type === OrganizationTypeEnum.Taalhuis) {
    if (1 === 1) {
        return null
    }

    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.index}
                exact={true}
                to={routes.authorized.taalhuis.participants.index}
            />

            <Route path={routes.authorized.taalhuis.reports.index} component={ReportsView} />
            <Route path={routes.authorized.taalhuis.participants.index} component={ParticipantsTaalhuisView} />
        </Switch>
    )
}
