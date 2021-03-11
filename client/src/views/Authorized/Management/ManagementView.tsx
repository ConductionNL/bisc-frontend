import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { Type } from '../../../components/Providers/UserProvider/types'
import { ManagementBiscView } from './bisc/ManagementBiscView'
import { ManagementTaalhuisView } from './taalhuis/ManagementTaalhuisView'

interface Props {}

export const ManagementView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.environment === Type.bisc) {
        return <ManagementBiscView />
    }

    return <ManagementTaalhuisView />
}
