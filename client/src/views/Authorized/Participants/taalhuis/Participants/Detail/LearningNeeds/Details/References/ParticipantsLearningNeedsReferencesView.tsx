import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantsLearningNeedsDetailLocationStateProps } from '../ParticipantsLearningNeedsDetailView'
import { ParticipantsLearningNeedsReferencesCreateView } from './ParticipantsLearningNeedsReferencesCreateView'

export interface ParticipantsLearningNeedsReferencesLocationStateProps
    extends ParticipantsLearningNeedsDetailLocationStateProps {}

export const ParticipantsLearningNeedsReferencesView: React.FunctionComponent<ParticipantsLearningNeedsReferencesLocationStateProps> = () => {
    const location = useLocation<ParticipantsLearningNeedsReferencesLocationStateProps>()
    const routeState = location.state as ParticipantsLearningNeedsReferencesLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.references.index}
                exact={true}
                to={{
                    pathname:
                        routes.authorized.participants.taalhuis.participants.detail.goals.detail.references.create,
                    state: routeState,
                }}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.references.create}
                exact={true}
                render={() => <ParticipantsLearningNeedsReferencesCreateView routeState={routeState} />}
            />
        </Switch>
    )
}
