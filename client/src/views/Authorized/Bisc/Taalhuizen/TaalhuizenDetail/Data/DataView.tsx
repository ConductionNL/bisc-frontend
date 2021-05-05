import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import TaalhuizenDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenDetailBreadcrumbs'
import TaalhuisInformationFieldset from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import { useLanguageHouseQuery } from 'generated/graphql'
import { AddressIterableType } from 'graphql/types'
import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const DataView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    console.log('languageHouseId', languageHouseId)
    const { data, loading, error } = useLanguageHouseQuery({
        variables: { languageHouseId: languageHouseId },
    })

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.coworkers) {
            history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.index)
        }
    }

    return (
        <>
            <Headline
                title={'TODO_TAALHUIS_NAAM'}
                TopComponent={<TaalhuizenDetailBreadcrumbs />}
                spacingType={SpacingType.small}
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={handleTabSwitch} defaultActiveTabId={TabId.gegevens}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={TabId.coworkers} />
                    </TabSwitch>
                </Row>
                {renderViews()}
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).data.update)
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
        const address: AddressIterableType = data?.languageHouse?.address && data?.languageHouse?.address[0]

        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error || !data || !data.languageHouse) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return (
            <TaalhuisInformationFieldset
                readOnly={true}
                prefillData={{
                    taalhuis: data.languageHouse?.name,
                    street: address?.street,
                    houseNumber: address?.houseNumber,
                    houseNumberSuffix: address?.houseNumberSuffix,
                    postalCode: address?.postalCode,
                    city: address?.locality,
                    phoneNumber: data.languageHouse?.phoneNumber || undefined,
                    email: data.languageHouse?.email || undefined,
                }}
            />
        )
    }
}

export default DataView
