import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganization } from 'api/organization/organization'
import { Organization } from 'api/types/types'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import TaalhuizenDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenDetailBreadcrumbs'
import TaalhuisInformationFieldset from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const DataView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.coworkers) {
            history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.index)
        }
    }

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganization(languageHouseId)}>{data => renderPageContent(data)}</PageQuery>
    )

    function renderPageContent(organization: Organization) {
        return (
            <>
                <Headline
                    title={organization.name}
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
                    {renderViews(organization)}
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
    }

    function renderViews(organization: Organization) {
        const address = organization.addresses && organization.addresses[0]
        const telephone = organization.telephones && organization.telephones[0]
        const email = organization.emails && organization.emails[0]

        return (
            <TaalhuisInformationFieldset
                readOnly={true}
                prefillData={{
                    taalhuis: organization.name,
                    street: address?.street,
                    houseNumber: address?.houseNumber,
                    houseNumberSuffix: address?.houseNumberSuffix,
                    postalCode: address?.postalCode,
                    city: address?.locality,
                    phoneNumber: telephone?.telephone || undefined,
                    email: email?.email || undefined,
                }}
            />
        )
    }
}

export default DataView
