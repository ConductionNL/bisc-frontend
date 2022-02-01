import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployee } from 'api/employee/employee'
import { Student } from 'api/types/types'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useParams } from 'react-router-dom'
import { TaalhuisManagementCoworkerDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

export const ManagementTaalhuisEmployeeMenteesView = () => {
    const { taalhuisEmployeeId } = useParams<TaalhuisManagementCoworkerDetailRouteParams>()
    const { i18n } = useLingui()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganizationEmployee(taalhuisEmployeeId)}>
            {data => (
                <Table
                    flex={1}
                    headers={[
                        i18n._(`Achternaam`),
                        i18n._(`Roepnaam`),
                        i18n._(`Team`),
                        // i18n._(`Lopende Deeln.`), DATA NOT AVAILABLE amount of active participations
                        // i18n._(`Afgeronde Deeln.`), DATA NOT AVAILABLE amount of finished participations
                        i18n._(`Aangemaakt`),
                    ]}
                    rows={data.mentees?.map(renderRow) || []}
                />
            )}
        </PageQuery>
    )

    function renderRow(student: Student) {
        return [
            <TableLink
                text={(student.person && NameFormatters.formattedLastName(student.person)) || '-'}
                to={taalhuisRoutes.participants.detail(student.id).index}
            />,
            <Paragraph>{student.person?.givenName}</Paragraph>,
            <Paragraph>{student.team?.name}</Paragraph>,
            // <Paragraph /> DATA NOT AVAILABLE amount of active participations,
            // <Paragraph /> DATA NOT AVAILABLE amount of finished participations,
            <Paragraph>{DateFormatters.formattedDate(student['@dateCreated'])}</Paragraph>,
        ]
    }
}
