import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { Type } from '../../../components/Providers/UserProvider/types'
import { NotFoundView } from '../../Generic/NotFoundView'
import { ReportsTaalhuisView } from './taalhuis/ReportsTaalhuisView'

interface Props {}

export const ReportsView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.environment === Type.taalhuis) {
        return <ReportsTaalhuisView />
    }

    return <NotFoundView />
}
