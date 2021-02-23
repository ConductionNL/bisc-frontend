import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Paragraph from '../../../../../components/Core/Typography/Paragraph'

interface Props {}

const Medewerkers: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()

    return (
        <>
            <Paragraph>{i18n._(t`Medewerkers`)}</Paragraph>
        </>
    )
}

export default Medewerkers
