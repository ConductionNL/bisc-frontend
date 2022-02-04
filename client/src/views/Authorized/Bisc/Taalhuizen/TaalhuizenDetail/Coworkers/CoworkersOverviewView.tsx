import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployees } from 'api/employee/employee'
import { Organization, OrganizationTypeEnum } from 'api/types/types'
import { InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Paragraph from 'components/Core/Typography/Paragraph'
import TaalhuizenDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenDetailBreadcrumbs'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import Headline from '../../../../../../components/Chrome/Headline'
import Button from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import { Table } from '../../../../../../components/Core/Table/Table'
import { TableLink } from '../../../../../../components/Core/Table/TableLink'
import Tab from '../../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../../components/Core/TabSwitch/types'
import { routes } from '../../../../../../routes/routes'
import { NameFormatters } from '../../../../../../utils/formatters/name/Name'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
    organization: Organization
}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const CoworkersOverviewView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()

    const { data, loading, error, loadMore } = useGetOrganizationEmployees({ organizationId: languageHouseId })
    const history = useHistory()
    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.gegevens) {
            history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).data.index)
        }
    }

    return (
        <>
            <Headline title={i18n._(t`Medewerkers`)} TopComponent={<TaalhuizenDetailBreadcrumbs />} />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={handleTabSwitch} activeTabId={TabId.coworkers}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={TabId.coworkers} />
                    </TabSwitch>

                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.create)
                        }
                    >
                        {i18n._(t`Nieuwe medewerker`)}
                    </Button>
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
        </>
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
                    to={routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.detail(employee.id).index}
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
export default CoworkersOverviewView
