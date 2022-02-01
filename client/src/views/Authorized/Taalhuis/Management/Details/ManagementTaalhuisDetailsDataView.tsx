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
import TaalhuisInformationFieldset from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import React, { useContext } from 'react'
import { UserContext } from 'components/Providers/UserProvider/context'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { useHistory } from 'react-router-dom'
import {
    TaalhuisManagementTab,
    TaalhuisManagementTabs,
} from 'components/Domain/Taalhuis/Management/Tabs/TaalhuisManagementTabs'

interface Props {}

export const ManagementTaalhuisDetailsDataView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()
    const organizationId = userContext.user?.organization.id!

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganization(organizationId)}>{data => renderPageContent(data)}</PageQuery>
    )

    function renderPageContent(organization: Organization) {
        return (
            <>
                <Headline title={i18n._(t`Beheer`)} spacingType={SpacingType.small} />

                <Column spacing={10}>
                    <TaalhuisManagementTabs activeTabId={TaalhuisManagementTab.TaalhuisDetails} />
                    {renderView(organization)}
                </Column>
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() => history.push(taalhuisRoutes.management.taalhuisDetails.data.update)}
                            >
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }

    function renderView(organization: Organization) {
        const address = organization.addresses && organization.addresses[0]
        const telephone = organization.telephones && organization.telephones[0]
        const email = organization.emails && organization.emails[0]

        return (
            <TaalhuisInformationFieldset
                readOnly={true}
                prefillData={{
                    name: organization.name,
                    'addresses[0].street': address?.street,
                    'addresses[0].houseNumber': address?.houseNumber,
                    'addresses[0].houseNumberSuffix': address?.houseNumberSuffix,
                    'addresses[0].postalCode': address?.postalCode,
                    'addresses[0].locality': address?.locality,
                    'telephones[0].telephone': telephone?.telephone || undefined,
                    'emails[0].email': email?.email || undefined,
                    languageHouse_postalCodes: organization.languageHouse_postalCodes,
                }}
            />
        )
    }
}
