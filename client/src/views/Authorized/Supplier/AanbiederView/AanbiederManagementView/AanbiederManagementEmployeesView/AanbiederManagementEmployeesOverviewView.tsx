import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import { useHistory } from 'react-router'
import { useLingui } from '@lingui/react'

import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { TableLink } from 'components/Core/Table/TableLink'
import Button from 'components/Core/Button/Button'
import {
    AanbiederManagementTab,
    AanbiederManagementTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementTabs'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import Paragraph from 'components/Core/Typography/Paragraph'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { AanbiederEmployeeType, AanbiederUserRoleType, useAanbiederEmployeesQuery } from 'generated/graphql'
import { UserContext } from 'components/Providers/UserProvider/context'

export const AanbiederManagementEmployeesOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { user } = useContext(UserContext)

    const { data, loading, error } = useAanbiederEmployeesQuery({ variables: { aanbiederId: user!.organizationId! } })

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Beheer`)} />
            <Column spacing={10}>
                <AanbiederManagementTabs currentTab={AanbiederManagementTab.employees} />
                {renderCreateEmployeeButton()}
                {renderList()}
            </Column>
        </>
    )

    function renderCreateEmployeeButton() {
        return (
            <Row justifyContent="flex-end">
                <Button onClick={() => history.push(supplierRoutes.management.employees.create)}>
                    {i18n._(t`Nieuwe medewerker`)}
                </Button>
            </Row>
        )
    }

    function renderList() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        const headers = [
            i18n._(t`ACHTERNAAM`),
            i18n._(t`ROEPNAAM`),
            i18n._(t`ROL`),
            i18n._(t`AANGEMAAKT`),
            i18n._(t`BEWERKT`),
        ]

        return <Table flex={1} headers={headers} rows={data.aanbiederEmployees.map(renderRow)} />
    }

    function renderRow(employee: AanbiederEmployeeType) {
        const { id, givenName, familyName, userRoles, dateCreated, dateModified } = employee

        const pathname = supplierRoutes.management.employees.detail.overview
        const linkTo = { pathname, search: '', hash: '', state: { employeeId: id } }

        return [
            <TableLink to={linkTo} text={familyName} />,
            <Paragraph>{givenName}</Paragraph>,
            renderRoles(userRoles),
            <Paragraph>{DateFormatters.formattedDate(dateCreated)}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(dateModified)}</Paragraph>,
        ]
    }

    function renderRoles(userRoles: AanbiederUserRoleType[]) {
        return (
            <Row spacing={1}>
                {userRoles.map(({ id, name }) => (
                    <RoleLabelTag key={`role-${id}`} role={name} />
                ))}
            </Row>
        )
    }
}
