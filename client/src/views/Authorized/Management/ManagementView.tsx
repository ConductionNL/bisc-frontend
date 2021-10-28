import { OrganizationTypeEnum } from 'api/types/types'
import { UserEnvironmentEnum } from 'generated/enums'
import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
// import { UserEnvironmentEnum } from '../../../generated/graphql'
import { ManagementBiscView } from './bisc/ManagementBiscView'
// import { ManagementTaalhuisView } from './taalhuis/ManagementTaalhuisView'

interface Props {}

export const ManagementView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.organization.type === OrganizationTypeEnum.Bisc) {
        return <ManagementBiscView />
    }

    // if (userContext.user?.userEnvironment === UserEnvironmentEnum.Taalhuis) {
    //     return <ManagementTaalhuisView />
    // }

    return null
}
