import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import BranchInformationFieldset from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'
import { useProviderQuery } from 'generated/graphql'
import { AddressIterableType } from 'graphql/types'
import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscSuppliersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props extends RouteComponentProps<BiscSuppliersDetailRouteParams> {
}

enum Tabs {
    data = 'data',
    medewerkers = 'medewerkers',
}

const DataView: React.FunctionComponent<Props> = props => {
    const { providerId } = props.match.params
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useProviderQuery({ variables: { id: providerId } })

    if (!providerId) {
        return null
    }

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.medewerkers) {
            history.push(routes.authorized.bisc.suppliers.detail(providerId).coworkers.index)
        }
    }

    return (
        <>
            <Headline
                title={'TODO_AANBIEDER_NAAM'}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.aanbieders.overview]} />}
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>
                <TabSwitch defaultActiveTabId={Tabs.data} onChange={handleTabSwitch}>
                    <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                    <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.medewerkers} />
                </TabSwitch>
                {renderViews()}
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

    function renderViews() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error || !data || !data.provider) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        const address: AddressIterableType = data.provider.address && data.provider.address[0]

        return (
            <>
                <BranchInformationFieldset
                    fieldNaming={{
                        branch: {
                            label: i18n._(t`Naam aanbieder`),
                            placeholder: i18n._(t`Naam`),
                        },
                    }}
                    prefillData={{
                        branch: data.provider.name,
                        branchStreet: address?.street,
                        branchHouseNumber: address?.houseNumber,
                        branchHouseNumberSuffix: address?.houseNumberSuffix,
                        branchPostalCode: address?.postalCode,
                        branchLocality: address?.locality,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        telephone: data?.provider.phoneNumber,
                        email: data?.provider.email,
                    }}
                    fieldControls={{
                        address: {
                            hidden: true,
                        },
                        postalCode: {
                            hidden: true,
                        },
                        locality: {
                            hidden: true,
                        },
                        contactPersonTelephone: {
                            hidden: true,
                        },
                        contactPreference: {
                            hidden: true,
                        },
                    }}
                    readOnly={true}
                />
            </>
        )
    }
}

export default DataView
