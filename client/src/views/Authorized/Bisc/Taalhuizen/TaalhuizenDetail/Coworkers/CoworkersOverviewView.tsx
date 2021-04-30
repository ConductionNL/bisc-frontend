import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import TaalhuizenDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenDetailBreadcrumbs'
import React from 'react'
import { useHistory } from 'react-router-dom'
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
import { useEmployeesQuery } from '../../../../../../generated/graphql'
import { routes } from '../../../../../../routes/routes'
import { NameFormatters } from '../../../../../../utils/formatters/name/Name'
import { TaalhuizenDetailLocationStateProps } from '../TaalhuizenDetailView'

interface Props {
    routeState: TaalhuizenDetailLocationStateProps
}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const CoworkersOverviewView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const { data, loading, error } = useEmployeesQuery({
        variables: {
            languageHouseId: routeState.taalhuisId,
        },
    })
    const history = useHistory()
    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.gegevens) {
            history.push({
                pathname: routes.authorized.bisc.taalhuizen.detail.data.index,
                state: routeState,
            })
        }
    }

    return (
        <>
            <Headline title={i18n._(t`Medewerkers`)} TopComponent={<TaalhuizenDetailBreadcrumbs />} />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={handleTabSwitch} defaultActiveTabId={TabId.coworkers}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={TabId.coworkers} />
                    </TabSwitch>

                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.create,
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

        const list = data.employees?.edges?.map(coworker => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName({
                        additionalName: coworker?.node?.additionalName,
                        familyName: coworker?.node?.familyName,
                    })}
                    to={{
                        pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.detail.index,
                        hash: '',
                        search: '',
                        state: {
                            taalhuisId: routeState.taalhuisId,
                            taalhuisName: routeState.taalhuisName,
                            coworkerId: coworker?.node?.id,
                            coworkerName: coworker?.node?.givenName,
                        },
                    }}
                />,
                <p>{coworker?.node?.givenName}</p>,
                // <Row spacing={1}>
                //     {coworker.userRoles.map((role, i, a) => (
                //         <RoleLabelTag key={`${i}-${a.length}`} role={role.name} />
                //     ))}
                // </Row>,
                // <p>{DateFormatters.formattedDate(coworker?.node?.dateCreated)}</p>,
                // <p>{DateFormatters.formattedDate(coworker?.node?.dateModified)}</p>,
            ]
        })

        if (!list) {
            return null
        }
        return list
    }
}
export default CoworkersOverviewView
