import React from 'react'
import { Switch, Redirect, Route, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'

import { ParticipantsFilesView } from './Files/ParticipantsFilesView'
import { ParticipantsReadView } from './Intake/ParticipantReadView'
import { ParticipantsUpdateView } from './Intake/ParticipantUpdateView'
import { ParticipantsLearningNeedsView } from './LearningNeeds/ParticipantLearningNeedsView'
import { ParticipantsRegistrationView } from './Registration/ParticipantsRegistrationsView'

interface Props {}
export interface ParticipantDetailLocationStateProps {
    participantId: string
    participantName: string
}

export const ParticipantsDetailView: React.FunctionComponent<Props> = () => {
    const location = useLocation<ParticipantDetailLocationStateProps>()
    const routeState = location.state as ParticipantDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.index}
                exact={true}
                to={{
                    pathname: routes.authorized.participants.taalhuis.participants.detail.intake.read,
                    state: routeState,
                }}
            />

            {/* TODO: these routes should have their own RouteView when there are more screens then 1 */}
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.intake.read}
                exact={true}
                render={() => <ParticipantsReadView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.intake.update}
                exact={true}
                render={() => <ParticipantsUpdateView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.registration.index}
                exact={true}
                render={() => <ParticipantsRegistrationView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.folder.index}
                exact={true}
                render={() => <ParticipantsFilesView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.index}
                exact={true}
                render={() => <ParticipantsLearningNeedsView routeState={routeState} />}
            />
        </Switch>
    )
}
