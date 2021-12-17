import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetSupplier } from 'api/supplier/supplier'
import { Supplier } from 'api/types/types'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import { BiscSupplierFieldset } from 'components/Domain/Bisc/Supplier/BiscSupplierFieldset'
import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscSuppliersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props extends RouteComponentProps<BiscSuppliersDetailRouteParams> {}

enum Tabs {
    data = 'data',
    medewerkers = 'medewerkers',
}

const DataView: React.FunctionComponent<Props> = props => {
    const { providerId } = props.match.params
    const history = useHistory()
    const { i18n } = useLingui()

    if (!providerId) {
        return null
    }

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.medewerkers) {
            history.push(routes.authorized.bisc.suppliers.detail(providerId).coworkers.index)
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return <PageQuery queryHook={() => useGetSupplier(providerId)}>{data => renderPage(data)}</PageQuery>

    function renderPage(supplier: Supplier) {
        return (
            <>
                <Headline
                    title={supplier.name}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.aanbieders.overview]} />}
                    spacingType={SpacingType.small}
                />
                <Column spacing={10}>
                    {/* <TabSwitch activeTabId={Tabs.data} onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.medewerkers} />
                    </TabSwitch> */}
                    {renderViews(supplier)}
                </Column>
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() =>
                                    history.push(routes.authorized.bisc.suppliers.detail(providerId).data.update)
                                }
                            >
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }

    function renderViews(supplier: Supplier) {
        return (
            <BiscSupplierFieldset
                readOnly={true}
                prefillData={{
                    name: supplier.name,
                    'addresses[0].street': supplier.addresses?.[0].street,
                    'addresses[0].houseNumber': supplier.addresses?.[0].houseNumber,
                    'addresses[0].houseNumberSuffix': supplier.addresses?.[0].houseNumberSuffix,
                    'addresses[0].postalCode': supplier.addresses?.[0].postalCode,
                    'addresses[0].locality': supplier.addresses?.[0].locality,
                    'telephones[0].telephone': supplier.telephones?.[0].telephone,
                    'emails[0].email': supplier.emails?.[0].email,
                }}
            />
        )
    }
}

export default DataView
