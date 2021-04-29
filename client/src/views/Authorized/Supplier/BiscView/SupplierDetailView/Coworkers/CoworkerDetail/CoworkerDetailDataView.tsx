import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
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
import AccountInformationFieldset from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { useProviderEmployeeQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { CoworkersDetailLocationStateProps } from './CoworkerDetailView'

enum Tabs {
    data = 'data',
    documenten = 'documenten',
}

interface Props {
    routeState: CoworkersDetailLocationStateProps
}

const CoworkerDetailDataView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()

    const { loading, error, data } = useProviderEmployeeQuery({
        variables: {
            userId: routeState.coworkerId,
        },
    })

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.documenten) {
            history.push({
                pathname: routes.authorized.supplier.bisc.read.coworkers.detail.documents.index,
                state: routeState,
            })
        }
    }

    return (
        <>
            <Headline
                title={`${routeState.coworkerName}`}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.bisc.aanbieders.overview,
                            breadcrumbItems.bisc.aanbieders.detail.index(routeState.supplierName, routeState),
                            breadcrumbItems.bisc.aanbieders.detail.coworkers.overview(routeState),
                        ]}
                    />
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch defaultActiveTabId={Tabs.data} onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                        <Tab label={i18n._(t`Documenten`)} tabid={Tabs.documenten} />
                    </TabSwitch>
                </Row>
                {renderFields()}
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push({
                                    pathname: routes.authorized.supplier.bisc.read.coworkers.detail.data.update,
                                    state: routeState,
                                })
                            }
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )

    function renderFields() {
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

        return (
            <>
                <InformationFieldset
                    prefillData={{
                        familyName: data.providerEmployee.familyName,
                        additionalName: data.providerEmployee.additionalName || undefined,
                        callSign: data.providerEmployee.givenName,
                        phonenumber: data.providerEmployee.telephone || undefined,
                    }}
                    readOnly={true}
                />
                {/* TODO: implement availlabillity again */}
                {/* <HorizontalRule />
                <AvailabillityFieldset
                    prefillData={{
                        available: data.available,
                        note: data.note,
                    }}
                    readOnly={true}
                /> */}
                <HorizontalRule />
                <AccountInformationFieldset
                    prefillData={{
                        email: data.providerEmployee.email,
                        roles: data.providerEmployee.userRoles.map(role => role.name),
                    }}
                    readOnly={true}
                />
            </>
        )
    }
}

export default CoworkerDetailDataView
