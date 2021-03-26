import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { UserEnvironmentEnum } from '../../../generated/graphql'

import { ParticipantTaalhuisView } from './taalhuis/ParticipantsTaalhuisView'

interface Props {}

export const ParticipantsView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.userEnvironment === UserEnvironmentEnum.Taalhuis) {
        return <ParticipantTaalhuisView />
    }

    return null
}
