import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ParticipantsOverviewView } from './ParticipantsOverviewView'
import { ParticipantsCreateView } from './ParticipantsCreateView'
import { ParticipantsDetailView } from './Detail/ParticipantsDetailView'
// import { RegistrationsOverviewView } from './RegistrationsOverviewView'
// import { RegistrationReadView } from './RegistrationReadView'

interface Props {}

export const ParticipantsTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route path={taalhuisRoutes.participants.index} exact={true} component={ParticipantsOverviewView} />
            <Route path={taalhuisRoutes.participants.create} exact={true} component={ParticipantsCreateView} />
            <Route path={taalhuisRoutes.participants.detail().index} component={ParticipantsDetailView} />

            {/* <Route
                path={taalhuisRoutes.participants.registrations.index}
                exact={true}
                component={RegistrationsOverviewView}
            />
            <Route
                path={taalhuisRoutes.participants.registrations.detail()}
                exact={true}
                component={RegistrationReadView}
            /> */}
        </Switch>
    )
}
