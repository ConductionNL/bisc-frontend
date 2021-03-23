import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from 'components/Chrome/Headline'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button from 'components/Core/Button/Button'
import RoleLabelTag from 'components/Core/DataDisplay/LabelTag/RoleLabelTag'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import { useAanbiederEmployeesQuery } from 'generated/graphql'
import { routes } from 'routes/routes'
import { SupplierDetailParams } from 'routes/supplier/types'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {}

enum Tabs {
    data = 'data',
    medewerkers = 'medewerkers',
}

const CoworkersOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const params = useParams<SupplierDetailParams>()
    const decodedAanbiederId = decodeURIComponent(params.supplierid)
    const { data, loading, error } = useAanbiederEmployeesQuery({
        variables: {
            aanbiederId: decodedAanbiederId,
        },
    })
    const history = useHistory()

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.data) {
            history.push(routes.authorized.supplier.read.data(params))
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`Aanbieder ${params.suppliername}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch defaultActiveTabId={Tabs.medewerkers} onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.medewerkers} />
                    </TabSwitch>
                    <Button
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.supplier.read.coworkers.create(params))}
                    >
                        {i18n._(t`Nieuwe medewerker`)}
                    </Button>
                </Row>
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (loading) {
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

        return data.aanbiederEmployees.map(coworker => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName({
                        additionalName: coworker.additionalName,
                        familyName: coworker.familyName,
                    })}
                    to={routes.authorized.supplier.read.coworkers.detail.index({
                        supplierid: params.supplierid,
                        suppliername: params.suppliername,
                        coworkername: `${coworker.additionalName} ${coworker.familyName}`,
                        coworkerid: encodeURIComponent(coworker.id),
                    })}
                />,
                <p>{coworker.givenName}</p>,
                <Row spacing={1}>
                    {coworker.userRoles.map(role => (
                        <RoleLabelTag role={role.name} />
                    ))}
                </Row>,
                <p>{DateFormatters.formattedDate(coworker.dateCreated)}</p>,
                <p>{DateFormatters.formattedDate(coworker.dateModified)}</p>,
            ]
        })
    }
}
export default CoworkersOverviewView
