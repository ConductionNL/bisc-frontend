import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
// import TaalhuisCreateView from './TaalhuisCreateView'
import { TaalhuisOverviewView } from './TaalhuisOverviewView'
import TaalhuizenDetailView from './TaalhuizenDetail/TaalhuizenDetailView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route path={routes.authorized.bisc.taalhuizen.index} exact={true} component={TaalhuisOverviewView} />
            {/* <Route path={routes.authorized.bisc.taalhuizen.create} exact={true} component={TaalhuisCreateView} /> */}
            <Route path={routes.authorized.bisc.taalhuizen.detail().index} component={TaalhuizenDetailView} />
        </Switch>
    )
}
