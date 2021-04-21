import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconButton } from 'components/Core/Button/IconButton'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { AanbiederEmployeeType } from 'generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    data: AanbiederEmployeeType[]
}

export const GroupMentorsList = (props: Props) => {
    const { data } = props
    const { i18n } = useLingui()

    return (
        <>
            <Table lastItemIsIcon={true} flex={1} headers={getHeader()} rows={getRows()} />
        </>
    )

    function getHeader() {
        return [
            i18n._(t`ACHTERNAAM`),
            i18n._(t`ROEPNAAM`),
            i18n._(t`ROL`),
            i18n._(t`AANGEMAAKT`),
            i18n._(t`BEWERKT`),
            '',
        ]
    }

    function getRows() {
        if (!data) {
            return []
        }

        return data.map(item => [
            <TableLink
                text={NameFormatters.formattedLastName({
                    additionalName: item.additionalName,
                    familyName: item.familyName,
                })}
                onClick={() => alert('switch to detail')}
            />,
            <Paragraph>{item.givenName}</Paragraph>,
            <Row spacing={1}>
                {item.userRoles.map((role, i, a) => (
                    <RoleLabelTag key={`${i}-${a.length}`} role={role.name} />
                ))}
            </Row>,
            <Paragraph>{DateFormatters.formattedDate(item.dateCreated)}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(item.dateModified)}</Paragraph>,
            <Row>
                <IconButton icon={IconType.openEye} onClick={handleOnViewClick} />
                <IconButton icon={IconType.add} onClick={handleOnAddMentor} />
            </Row>,
        ])
    }

    function handleOnViewClick() {
        alert('onView')
    }

    function handleOnAddMentor() {
        alert('onAddMentor')
    }
}
