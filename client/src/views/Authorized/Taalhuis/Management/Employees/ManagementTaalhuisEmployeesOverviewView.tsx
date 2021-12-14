import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useOrganizationEmployees } from 'api/employee/employee'
import { OrganizationTypeEnum, TaalhuisEmployeeRole } from 'api/types/types'
import { UserScope } from 'api/types/userScopes'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import { InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
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
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {}

export const ManagementTaalhuisEmployeesOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()
    const organizationId = userContext.user?.organization.id!
    const { data, loading, error, loadMore } = useOrganizationEmployees(organizationId)

    console.log(userContext)

    return (
        <Page>
            <Column spacing={4}>
                <Headline title={i18n._(t`Medewerkers`)} spacingType={SpacingType.small} />
                <Column spacing={10}>
                    <Row justifyContent="space-between">
                        <TaalhuisManagementTabs activeTabId={TaalhuisManagementTab.TaalhuisEmployees} />
                        {userContext.user?.roles.includes(UserScope.PostEmployees) && (
                            <Button
                                icon={IconType.add}
                                onClick={() => history.push(taalhuisRoutes.management.coworkers.create)}
                            >
                                {i18n._(t`Nieuwe medewerker`)}
                            </Button>
                        )}
                    </Row>
                    <InfiniteScroll
                        loadMore={loadMore}
                        isLoading={loading || !data}
                        isLoadingMore={loading && !!data}
                        totalPages={data?.pages}
                    >
                        {renderList()}
                    </InfiniteScroll>
                </Column>
            </Column>
        </Page>
    )

    function renderList() {
        if (!data && loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <Table
                flex={1}
                headers={[
                    i18n._(t`achternaam`),
                    i18n._(t`roepnaam`),
                    i18n._(t`rol`),
                    i18n._(t`aangemaakt`),
                    i18n._(t`bewerkt`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }

        const list = data.results.map(employee => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName(employee.person)}
                    to={taalhuisRoutes.management.coworkers.detail(employee.id).data.index}
                />,
                <p>{employee.person.givenName}</p>,
                <p>
                    {employee.role && (
                        <RoleLabelTag organizationType={OrganizationTypeEnum.Taalhuis} role={employee.role} />
                    )}
                </p>,
                <Paragraph>{DateFormatters.formattedDate(employee['@dateCreated'])}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(employee['@dateModified'])}</Paragraph>,
            ]
        })

        if (!list) {
            return null
        }
        return list
    }
}
