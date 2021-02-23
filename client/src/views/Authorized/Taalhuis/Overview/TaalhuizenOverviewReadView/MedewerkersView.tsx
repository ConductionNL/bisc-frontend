import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { Table } from '../../../../../components/Core/Table/Table'
import Paragraph from '../../../../../components/Core/Typography/Paragraph'

interface Props {}

const Medewerkers: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()

    return (
        <>
            <Table
                flex={1}
                headers={[i18n._(t`NAAM`), i18n._(t`ADRES`), i18n._(t`PLAATS`)]}
                rows={[
                    [<p>Test</p>, <p>Test</p>, <p>Test</p>],
                    [<p>Test</p>, <p>Test</p>, <p>Test</p>],
                    [<p>Test</p>, <p>Test</p>, <p>Test</p>],
                ]}
            />
        </>
    )
}

export default Medewerkers
