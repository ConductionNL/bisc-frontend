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
                headers={[
                    i18n._(t`ACHTERNAAM`),
                    i18n._(t`Roepnaam`),
                    i18n._(t`rol`),
                    i18n._(t`aangemaakt`),
                    i18n._(t`bewerkt`),
                ]}
                rows={[
                    [<p>Test</p>, <p>Test</p>, <p>Test</p>, <p>Test</p>, <p>Test</p>],
                    [<p>Test</p>, <p>Test</p>, <p>Test</p>, <p>Test</p>, <p>Test</p>],
                    [<p>Test</p>, <p>Test</p>, <p>Test</p>, <p>Test</p>, <p>Test</p>],
                ]}
            />
        </>
    )
}

export default Medewerkers
