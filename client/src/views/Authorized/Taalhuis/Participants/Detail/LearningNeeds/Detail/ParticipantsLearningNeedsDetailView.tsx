import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ParticipantsLearningNeedReadView } from './ParticipantsLearningNeedReadView'
import { ParticipantsLearningNeedUpdateView } from './ParticipantsLearningNeedUpdateView'

// import { ParticipantsLearningNeedsReferencesView } from './References/ParticipantsLearningNeedsReferencesView'
// import { ParticipantsLearningNeedsReferencesTestView } from './Tests/ParticipantsLearningNeedsReferencesTestView'

export const ParticipantsLearningNeedsDetailView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Redirect
                path={taalhuisRoutes.participants.detail().data.learningNeeds.index}
                exact={true}
                to={taalhuisRoutes.participants.detail().data.learningNeeds.detail().index}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.learningNeeds.detail().index}
                exact={true}
                component={ParticipantsLearningNeedReadView}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.learningNeeds.detail().update}
                exact={true}
                component={ParticipantsLearningNeedUpdateView}
            />
        </Switch>
    )
}

// export const ParticipantsLearningNeedsDetailView: React.FunctionComponent<ParticipantsLearningNeedsDetailLocationStateProps> = () => {
//     const location = useLocation<ParticipantsLearningNeedsDetailLocationStateProps>()
//     const routeState = location.state as ParticipantsLearningNeedsDetailLocationStateProps

//     return (
//         <Switch>
//             <Redirect
//                 path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.index}
//                 exact={true}
//                 to={{
//                     pathname: routes.authorized.participants.taalhuis.participants.detail.goals.detail.read,
//                     state: routeState,
//                 }}
//             />
//             <Route
//                 path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.read}
//                 exact={true}
//                 render={() => <ParticipantsLearningNeedReadView routeState={routeState} />}
//             />
//             <Route
//                 path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.update}
//                 exact={true}
//                 render={() => <ParticipantsLearningNeedUpdateView routeState={routeState} />}
//             />

//             {/* <Route
//                 path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.references.index}
//                 component={ParticipantsLearningNeedsReferencesView}
//             /> */}

//             {/* <Route
//                 path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.tests.index}
//                 component={ParticipantsLearningNeedsReferencesTestView}
//             /> */}
//         </Switch>
//     )
// }
