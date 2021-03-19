import React, { useContext } from 'react'
import { UserContext } from 'components/Providers/UserProvider/context'
import { Type } from 'components/Providers/UserProvider/types'
import { BiscSupplierView } from './BiscView/BiscSupplierView'
import { AanbiederSupplierView } from './AanbiederView/AanbiederSupplierView'

interface Props {}

export const SupplierView: React.FunctionComponent<Props> = () => {
    const user = useContext(UserContext).user

    if (!user) {
        return null
    }

    if (user.environment === Type.bisc) {
        return <BiscSupplierView />
    }

    if (user.environment === Type.aanbieder) {
        return <AanbiederSupplierView />
    }

    return null
}
