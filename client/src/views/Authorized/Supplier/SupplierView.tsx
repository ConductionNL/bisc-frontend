import { UserEnvironmentEnum } from 'generated/enums'
import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
// import { AanbiederView } from './AanbiederView/AanbiederView'
// import { BiscSupplierView } from './BiscView/BiscSupplierView'

import { BiscSupplierView } from './BiscView/BiscSupplierView'

interface Props {}

export const SupplierView: React.FunctionComponent<Props> = () => {
    const user = useContext(UserContext).user

    if (!user) {
        return null
    }

    if (user.userEnvironment === UserEnvironmentEnum.Bisc) {
        return <BiscSupplierView />
    }

    // if (user.userEnvironment === UserEnvironmentEnum.Aanbieder) {
    //     return <AanbiederView />
    // }

    return null
}
