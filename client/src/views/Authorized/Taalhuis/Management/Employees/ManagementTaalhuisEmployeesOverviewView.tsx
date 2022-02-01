import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployees } from 'api/employee/employee'
import { OrganizationEmployee, OrganizationTypeEnum } from 'api/types/types'
import { UserScope } from 'api/types/userScopes'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import { InfiniteScrollPageQuery } from 'components/Core/InfiniteScrollPageQuery/InfiniteScrollPageQuery'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Page } from 'components/Core/Page/Page'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import {
    TaalhuisManagementTab,
    TaalhuisManagementTabs,
} from 'components/Domain/Taalhuis/Management/Tabs/TaalhuisManagementTabs'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useContext } from 'react'
import { useHistory } from 'react-router'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {}

export const ManagementTaalhuisEmployeesOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()
    const organizationId = userContext.user?.organization.id!

    return (
        <Page>
            <Column spacing={4}>
                <Headline title={i18n._(`Medewerkers`)} spacingType={SpacingType.small} />
                <Column spacing={10}>
                    <Row justifyContent="space-between">
                        <TaalhuisManagementTabs activeTabId={TaalhuisManagementTab.TaalhuisEmployees} />
                        {userContext.user?.roles.includes(UserScope.PostEmployees) && (
                            <Button
                                icon={IconType.add}
                                onClick={() => history.push(taalhuisRoutes.management.coworkers.create)}
                            >
                                {i18n._(`Nieuwe medewerker`)}
                            </Button>
                        )}
                    </Row>
                    {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                    <InfiniteScrollPageQuery queryHook={() => useGetOrganizationEmployees(organizationId)}>
                        {renderList}
                    </InfiniteScrollPageQuery>
                </Column>
            </Column>
        </Page>
    )

    function renderList(employees: OrganizationEmployee[]) {
        return (
            <Table
                flex={1}
                headers={[i18n._('achternaam'), i18n._('roepnaam'), i18n._('rol'), i18n._('teams')]}
                rows={getRows(employees)}
            />
        )
    }

    function getRows(employees: OrganizationEmployee[]) {
        return employees.map(employee => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName(employee.person)}
                    to={taalhuisRoutes.management.coworkers.detail(employee.id).data.index}
                />,
                <Paragraph>{employee.person.givenName}</Paragraph>,
                <Paragraph>
                    {employee.role && (
                        <RoleLabelTag organizationType={OrganizationTypeEnum.Taalhuis} role={employee.role} />
                    )}
                </Paragraph>,
                <Paragraph>{employee.teams?.map(t => t.name).join(', ')}</Paragraph>,
            ]
        })
    }
}
