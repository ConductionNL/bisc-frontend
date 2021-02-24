import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import LabelTag, { LabelColor } from '../../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import { Table } from '../../../../../../components/Core/Table/Table'
import { TableLink } from '../../../../../../components/Core/Table/TableLink'
import { routes } from '../../../../../../routes'

interface Props {}

const MedewerkersView: React.FunctionComponent<Props> = () => {
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
                    [
                        <TableLink text="test" to={routes.authorized.profile} />,
                        <p>Test</p>,
                        <LabelTag label="Coördinator" color={LabelColor.yellow} />,
                        <p>Test</p>,
                        <p>Test</p>,
                    ],
                    [
                        <TableLink text="test" to={routes.authorized.profile} />,
                        <p>Test</p>,
                        <LabelTag label="Medewerker" />,
                        <p>Test</p>,
                        <p>Test</p>,
                    ],
                    [
                        <TableLink text="test" to={routes.authorized.profile} />,
                        <p>Test</p>,
                        <LabelTag label="Medewerker" />,
                        <p>Test</p>,
                        <p>Test</p>,
                    ],
                ]}
            />
        </>
    )
}
export default MedewerkersView
