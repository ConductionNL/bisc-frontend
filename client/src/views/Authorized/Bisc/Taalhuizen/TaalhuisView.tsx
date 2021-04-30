import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import { TaalhuisOverviewView } from './TaalhuisOverviewView'
// import TaalhuisCreateView from './TaalhuisCreateView'
// import TaalhuizenDetailView from './TaalhuizenDetail/TaalhuizenDetailView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.taalhuizen.index}
                exact={true}
                to={routes.authorized.bisc.taalhuizen.overview}
            />
            <Route path={routes.authorized.bisc.taalhuizen.overview} exact={true} component={TaalhuisOverviewView} />
            {/* <Route path={routes.authorized.bisc.taalhuizen.create} exact={true} component={TaalhuisCreateView} /> */}
            {/* <Route path={routes.authorized.bisc.taalhuizen.detail.index} component={TaalhuizenDetailView} /> */}
        </Switch>
    )
}
