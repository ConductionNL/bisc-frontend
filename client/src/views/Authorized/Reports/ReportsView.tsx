import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { UserEnvironmentEnum } from '../../../generated/graphql'
import { NotFoundView } from '../../Generic/NotFoundView'
import { ReportsTaalhuisView } from './taalhuis/ReportsTaalhuisView'

interface Props {}

export const ReportsView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.userEnvironment === UserEnvironmentEnum.Taalhuis) {
        return <ReportsTaalhuisView />
    }

    return <NotFoundView />
}
