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
import { useTaalhuisQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { TaalhuizenDetailLocationStateProps } from '../TaalhuizenDetailView'

interface Props {
    routeState: TaalhuizenDetailLocationStateProps
}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const DataView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useTaalhuisQuery({
        variables: { taalhuisId: routeState.taalhuisId || '' },
    })

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.coworkers) {
            history.push({
                pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.overview,
                state: routeState,
            })
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`${routeState.taalhuisName}`)}
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
                                history.push({
                                    pathname: routes.authorized.bisc.taalhuizen.detail.data.update,
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

    function renderViews() {
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
            <TaalhuisInformationFieldset
                readOnly={true}
                prefillData={{
                    taalhuis: data.taalhuis.name,
                    street: data.taalhuis.address?.street,
                    streetNr: data.taalhuis.address?.houseNumber,
                    addition: data.taalhuis.address?.houseNumberSuffix,
                    postalCode: data.taalhuis.address?.postalCode,
                    city: data.taalhuis.address?.locality,
                    phoneNumber: data.taalhuis.telephone || undefined,
                    email: data.taalhuis.email || undefined,
                }}
            />
        )
    }
}

export default DataView
