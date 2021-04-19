import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { AanbiederEmployeeType } from 'generated/graphql'
import React from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    data: AanbiederEmployeeType[]
}

export const GroupMentorsList = (props: Props) => {
    const { data } = props
    const { i18n } = useLingui()

    return (
        <>
            <Table flex={1} headers={getHeader()} rows={getRows()} />
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

        return data.map(item => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName({
                        additionalName: item.additionalName,
                        familyName: item.familyName,
                    })}
                    onClick={() => alert('switch to detail')}
                />,
                <Paragraph>{item.givenName}</Paragraph>,
                <Paragraph>{item.userRoles}</Paragraph>,
                <Paragraph>{item.dateCreated}</Paragraph>,
                <Paragraph>{item.dateModified}</Paragraph>,
                <Row>
                    <Button round={true} icon={IconType.openEye} onClick={handleOnViewClick} />
                    <Button round={true} icon={IconType.add} onClick={handleOnAddMentor} />
                </Row>,
            ]
        })
    }

    function handleOnViewClick() {
        alert('onView')
    }

    function handleOnAddMentor() {
        alert('onAddMentor')
    }
}
