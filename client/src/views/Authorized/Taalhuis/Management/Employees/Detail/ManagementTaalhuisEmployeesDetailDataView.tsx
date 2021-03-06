import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployee } from 'api/employee/employee'
import { OrganizationEmployee, TaalhuisEmployeeRole } from 'api/types/types'
import { UserScope } from 'api/types/userScopes'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import TaalhuisCoworkersInformationFieldset from 'components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisManagementCoworkerDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

interface Props {}

export const ManagementTaalhuisEmployeesDetailDataView: React.FunctionComponent<Props> = () => {
    const { taalhuisEmployeeId } = useParams<TaalhuisManagementCoworkerDetailRouteParams>()
    const history = useHistory()
    const userContext = useContext(UserContext)
    const { i18n } = useLingui()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganizationEmployee(taalhuisEmployeeId)}>
            {data => renderPage(data)}
        </PageQuery>
    )

    function renderPage(employee: OrganizationEmployee) {
        return (
            <>
                {renderSection(employee)}
                <Space pushTop={true} />
                {userContext.user?.roles.includes(UserScope.PutEmployees) && (
                    <Actionbar
                        RightComponent={
                            <Button
                                type={ButtonType.primary}
                                onClick={() =>
                                    history.push(
                                        taalhuisRoutes.management.coworkers.detail(taalhuisEmployeeId).data.update
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
                showTeams={true}
                prefillData={{
                    'person.givenName': person.givenName,
                    'person.additionalName': person.additionalName,
                    'person.familyName': person.familyName,
                    'person.emails[0].email': email,
                    'person.telephones[0].telephone': telephone,
                    role: employee.role as TaalhuisEmployeeRole,
                    '@dateCreated': employee['@dateCreated'],
                    '@dateModified': employee['@dateModified'],
                    teams: employee.teams,
                }}
            />
        )
    }
}
