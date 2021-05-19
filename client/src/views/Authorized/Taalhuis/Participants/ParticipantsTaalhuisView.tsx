import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ParticipantsOverviewView } from './ParticipantsOverviewView'
import { ParticipantsCreateView } from './ParticipantsCreateView'
import { RegistrationsOverviewView } from './RegistrationsOverviewView'
import { ParticipantsDetailView } from './Detail/ParticipantsDetailView'

interface Props {}

export const ParticipantsTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route path={taalhuisRoutes.participants.index} exact={true} component={ParticipantsOverviewView} />
            <Route path={taalhuisRoutes.participants.create} exact={true} component={ParticipantsCreateView} />
            <Route path={taalhuisRoutes.participants.detail().index} component={ParticipantsDetailView} />

            <Route
                path={taalhuisRoutes.participants.registrations}
                exact={true}
                component={RegistrationsOverviewView}
            />
            {/* <Route
                path={routes.authorized.participants.taalhuis.registrations.detail.read}
                exact={true}
                render={() => <RegistrationReadView routeState={routeState} />}
            /> */}
        </Switch>
    )
}
