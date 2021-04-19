import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantsLearningNeedsDetailLocationStateProps } from '../ParticipantsLearningNeedsDetailView'
import { ParticipantsLearningNeedsReferencesTestUpdateView } from './Detail/ParticipantsLearningNeedsReferencesTestUpdateView'
import { ParticipantsLearningNeedsReferencesTestCreateView } from './ParticipantsLearningNeedsReferencesTestCreateView'

export interface ParticipantsLearningNeedsReferencesTestLocationStateProps
    extends ParticipantsLearningNeedsDetailLocationStateProps {}

export const ParticipantsLearningNeedsReferencesTestView: React.FunctionComponent<ParticipantsLearningNeedsReferencesTestLocationStateProps> = () => {
    const location = useLocation<ParticipantsLearningNeedsReferencesTestLocationStateProps>()
    const routeState = location.state as ParticipantsLearningNeedsReferencesTestLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.tests.index}
                exact={true}
                to={{
                    pathname: routes.authorized.participants.taalhuis.participants.detail.goals.detail.tests.create,
                    state: routeState,
                }}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.tests.create}
                exact={true}
                render={() => <ParticipantsLearningNeedsReferencesTestCreateView routeState={routeState} />}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.tests.update}
                exact={true}
                render={() => <ParticipantsLearningNeedsReferencesTestUpdateView routeState={routeState} />}
            />
        </Switch>
    )
}
