import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button from 'components/Core/Button/Button'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
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
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { CoworkersDetailLocationStateProps } from './CoworkerDetail/CoworkerDetailView'
import { CoworkersLocationStateProps } from './CoworkersView'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

interface Props {
    routeState: CoworkersLocationStateProps
}

enum Tabs {
    data = 'data',
    medewerkers = 'medewerkers',
}

const CoworkersOverviewView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const { data, loading, error } = useAanbiederEmployeesQuery({
        variables: {
            aanbiederId: routeState.supplierId,
        },
    })
    const history = useHistory()

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.data) {
            history.push({
                pathname: routes.authorized.supplier.bisc.read.data,
                state: routeState,
            })
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`Aanbieder ${routeState.supplierName}`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.aanbieder.overview]} />}
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch defaultActiveTabId={Tabs.medewerkers} onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.medewerkers} />
                    </TabSwitch>
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.supplier.bisc.read.coworkers.create,
                                state: routeState,
                            })
                        }
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
                <TableLink<CoworkersDetailLocationStateProps>
                    text={NameFormatters.formattedLastName({
                        additionalName: coworker.additionalName,
                        familyName: coworker.familyName,
                    })}
                    to={{
                        pathname: routes.authorized.supplier.bisc.read.coworkers.detail.index,
                        search: '',
                        hash: '',
                        state: {
                            ...routeState,
                            coworkerName: NameFormatters.formattedFullname({
                                givenName: coworker.givenName,
                                additionalName: coworker.additionalName,
                                familyName: coworker.familyName,
                            }),
                            coworkerId: coworker.id,
                        },
                    }}
                />,
                <p>{coworker.givenName}</p>,
                <Row spacing={1}>
                    {coworker.userRoles.map((role, index, userRoles) => (
                        <RoleLabelTag key={`${index}-${userRoles.length}`} role={role.name} />
                    ))}
                </Row>,
                <p>{DateFormatters.formattedDate(coworker.dateCreated)}</p>,
                <p>{DateFormatters.formattedDate(coworker.dateModified)}</p>,
            ]
        })
    }
}
export default CoworkersOverviewView
