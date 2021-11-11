import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Organization, OrganizationEmployee } from 'api/types/types'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Space from 'components/Core/Layout/Space/Space'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadcrumbs'
import AccountInformationFieldset from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    organization: Organization
    organizationEmployee: OrganizationEmployee
    organizationEmployeeFullName: string
}

const CoworkersDetailReadView: React.FunctionComponent<Props> = props => {
    const { organizationEmployee, organizationEmployeeFullName, organization } = props
    const { languageHouseId, languageHouseEmployeeId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <>
            <Headline
                title={organizationEmployeeFullName}
                TopComponent={
                    <TaalhuizenCoworkersDetailBreadcrumbs
                        languageHouseId={languageHouseId}
                        languageHouseName={organization.name}
                    />
                }
            />
            {renderSection()}
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        disabled={true}
                        onClick={() =>
                            history.push(
                                routes.authorized.bisc.taalhuizen
                                    .detail(languageHouseId)
                                    .coworkers.detail(languageHouseEmployeeId).data.update
                            )
                        }
                    >
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )

    function renderSection() {
        const { person } = organizationEmployee
        const telephone = person.telephones && person.telephones[0]
        const email = person.emails && person.emails[0]

        return (
            <>
                <InformationFieldset
                    readOnly={true}
                    prefillData={{
                        familyName: person.familyName,
                        additionalName: person.additionalName ?? '',
                        callSign: person.givenName,
                        phonenumber: (telephone && telephone.telephone) || '',
                    }}
                />
                <HorizontalRule />
                <AccountInformationFieldset
                    readOnly={true}
                    prefillData={{
                        email: email && email.email,
                        // roles: languageHouseEmployee.userRoles.map(role => role.name),
                        // createdAt: languageHouseEmployee.dateCreated,
                        // updatedAt: languageHouseEmployee.dateModified,
                    }}
                />
            </>
        )
    }
}

export default CoworkersDetailReadView
