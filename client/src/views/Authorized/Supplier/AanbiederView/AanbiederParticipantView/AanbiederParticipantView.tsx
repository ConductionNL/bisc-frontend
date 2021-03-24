import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederParticipantOverviewView } from './AanbiederParticipantOverviewView'

interface LocationStateProps {
    participantId: number
}

export const AanbiederParticipantView: React.FunctionComponent = () => {
    const location = useLocation()
    const props = location.state as LocationStateProps

    const basePath = routes.authorized.supplier.participants.detail

    return (
        <Switch>
            <Route path={basePath.overview} render={() => <AanbiederParticipantOverviewView {...props} />} />
        </Switch>
    )
}
