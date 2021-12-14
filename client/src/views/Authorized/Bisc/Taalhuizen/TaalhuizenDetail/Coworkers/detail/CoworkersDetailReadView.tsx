import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployee } from 'api/employee/employee'
import { Organization, OrganizationEmployee, TaalhuisEmployeeRole } from 'api/types/types'
import { UserScope } from 'api/types/userScopes'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadcrumbs'
import TaalhuisCoworkersInformationFieldset from 'components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'
import { UserContext } from 'components/Providers/UserProvider/context'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    organization: Organization
}

const CoworkersDetailReadView: React.FunctionComponent<Props> = props => {
    const { organization } = props
    const { languageHouseId, languageHouseEmployeeId } = props.match.params
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganizationEmployee(languageHouseEmployeeId)}>
            {data => renderPage(data)}
        </PageQuery>
    )

    function renderPage(employee: OrganizationEmployee) {
        return (
            <>
                <Headline
                    title={i18n._(t`Medewerker ${NameFormatters.formattedFullname(employee.person)}`)}
                    TopComponent={
                        <TaalhuizenCoworkersDetailBreadcrumbs
                            languageHouseId={languageHouseId}
                            languageHouseName={organization.name}
                        />
                    }
                />
                {renderSection(employee)}
                <Space pushTop={true} />
                {userContext.user?.roles.includes(UserScope.PutEmployees) && (
                    <Actionbar
                        RightComponent={
                            <Button
                                type={ButtonType.primary}
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
                )}
            </>
        )
    }

    function renderSection(employee: OrganizationEmployee) {
        const { person } = employee

        const telephone = person.telephones?.length ? person.telephones[0].telephone : undefined
        const email = person.emails?.length ? person.emails[0].email : undefined

        return (
            <TaalhuisCoworkersInformationFieldset
                readOnly={true}
                prefillData={{
                    'person.givenName': person.givenName,
                    'person.additionalName': person.additionalName,
                    'person.familyName': person.familyName,
                    'person.emails[0].email': email,
                    'person.telephones[0].telephone': telephone,
                    role: employee.role as TaalhuisEmployeeRole,
                    '@dateCreated': employee['@dateCreated'],
                    '@dateModified': employee['@dateModified'],
                }}
            />
        )
    }
}

export default CoworkersDetailReadView
