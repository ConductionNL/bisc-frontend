import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantDetailLocationStateProps } from '../../../ParticipantsDetailView'
import { ParticipantsLearningNeedsOverviewView } from '../../ParticipantLearningNeedsOverviewView'
import { ParticipantsLearningNeedsCreateView } from '../../ParticipantsLearningNeedsCreateView'
import { ParticipantsLearningNeedsDetailView } from '../ParticipantsLearningNeedsDetailView'
import { ParticipantsLearningNeedsReferencesCreateView } from './ParticipantsLearningNeedsReferencesCreateView'

export interface ParticipantsLearningNeedsLocationStateProps extends ParticipantDetailLocationStateProps {}

export const ParticipantsLearningNeedsReferencesView: React.FunctionComponent<ParticipantsLearningNeedsLocationStateProps> = () => {
    const location = useLocation<ParticipantsLearningNeedsLocationStateProps>()
    const routeState = location.state as ParticipantsLearningNeedsLocationStateProps

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
                path={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
                exact={true}
                render={() => <ParticipantsLearningNeedsReferencesCreateView routeState={routeState} />}
            />
        </Switch>
    )
}
