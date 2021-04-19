import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantsLearningNeedsLocationStateProps } from '../ParticipantsLearningNeedsView'
import { ParticipantsLearningNeedReadView } from './ParticipantsLearningNeedsReadView'
import { ParticipantsLearningNeedUpdateView } from './ParticipantsLearningNeedsUpdateView'
import { ParticipantsLearningNeedsReferencesView } from './References/ParticipantsLearningNeedsReferencesView'
import { ParticipantsLearningNeedsReferencesTestView } from './Tests/ParticipantsLearningNeedsReferencesTestView'

export interface ParticipantsLearningNeedsDetailLocationStateProps extends ParticipantsLearningNeedsLocationStateProps {
    learningNeedId: string
    learningNeedName: string
}

export const ParticipantsLearningNeedsDetailView: React.FunctionComponent<ParticipantsLearningNeedsDetailLocationStateProps> = () => {
    const location = useLocation<ParticipantsLearningNeedsDetailLocationStateProps>()
    const routeState = location.state as ParticipantsLearningNeedsDetailLocationStateProps
    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.index}
                exact={true}
                to={{
                    pathname: routes.authorized.participants.taalhuis.participants.detail.goals.detail.read,
                    state: routeState,
                }}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.read}
                exact={true}
                render={() => <ParticipantsLearningNeedReadView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.update}
                exact={true}
                render={() => <ParticipantsLearningNeedUpdateView routeState={routeState} />}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.references.index}
                component={ParticipantsLearningNeedsReferencesView}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.tests.index}
                component={ParticipantsLearningNeedsReferencesTestView}
            />
        </Switch>
    )
}
