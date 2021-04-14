import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { routes } from 'routes/routes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { GroupType } from 'views/Authorized/Supplier/AanbiederView/AanbiederGroupsView/mocks'

interface Props {
    data: GroupType[]
}

export const GroupsList = (props: Props) => {
    const { data } = props
    const { i18n } = useLingui()

    return (
        <>
            <Table flex={1} headers={getHeader()} rows={getRows()} />
        </>
    )

    function getHeader() {
        return [
            i18n._(t`NAAM`),
            i18n._(t`TYPE CURSUS`),
            i18n._(t`BESCHIKBAARHEID`),
            i18n._(t`DEELNEMERS`),
            i18n._(t`STARTDATUM`),
            i18n._(t`EINDDATUM`),
        ]
    }

    function getRows() {
        if (!data) {
            return []
        }

        return data.map(item => {
            return [
                <TableLink
                    text={item.name}
                    to={{
                        pathname: routes.authorized.supplier.groups.detail.index,
                        hash: '',
                        search: '',
                        state: {
                            groupId: item.id,
                        },
                    }}
                />,
                <Paragraph>{item.courseType}</Paragraph>,
                <Paragraph>{item.available}</Paragraph>,
                <Paragraph>{item.participants}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(item.dateCreated)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(item.dateEnded)}</Paragraph>,
            ]
        })
    }
}
