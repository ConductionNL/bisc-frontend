import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props {
    data: DocumentType[]
}

interface DocumentType {
    fileName: string
    createdAt: string
    filePath: string
}

export const DocumentsList = (props: Props) => {
    const { data } = props
    const { i18n } = useLingui()

    return (
        <Table
            flex={1}
            lastItemIsIcon={true}
            headers={[i18n._(t`BESTAND`), i18n._(t`GEÜPLOAD OP`), '']}
            rows={getRows()}
        />
    )

    function getRows() {
        if (!data) {
            return []
        }

        return data.map(item => [
            <TableLink href={item.filePath} text={item.fileName} />,
            <p>{DateFormatters.formattedDate(item.createdAt)}</p>,
            <Button type={ButtonType.secondary} icon={IconType.delete} />,
        ])
    }
}
