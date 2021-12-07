import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployee } from 'api/employee/employee'
import { OrganizationEmployee } from 'api/types/types'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { BiscCoworkersInformationFieldset } from 'components/fieldsets/bisc/BiscCoworkersInformationFieldset'
import { useHistory, useParams } from 'react-router-dom'
import { BiscManagementCoworkerDetailRouteParams, biscRoutes } from 'routes/bisc/biscRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {}

export const ManagementBiscEmployeesDetailDataView: React.FunctionComponent<Props> = () => {
    const { biscEmployeeId } = useParams<BiscManagementCoworkerDetailRouteParams>()
    const history = useHistory()
    const { i18n } = useLingui()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganizationEmployee(biscEmployeeId)}>{data => renderPage(data)}</PageQuery>
    )

    function renderPage(employee: OrganizationEmployee) {
        return (
            <>
                <Headline
                    title={i18n._(t`Medewerker ${NameFormatters.formattedFullname(employee.person)}`)}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.bisc.management.overview,
                                breadcrumbItems.bisc.management.employees,
                            ]}
                        />
                    }
                />
                {renderSection(employee)}
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push(biscRoutes.management.coworkers.detail(biscEmployeeId).data.update)
                            }
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    }
                />
            </>
        )
    }

    function renderSection(employee: OrganizationEmployee) {
        const { person } = employee

        const telephone = person.telephones?.length ? person.telephones[0].telephone : undefined
        const email = person.emails?.length ? person.emails[0].email : undefined

        return (
            <BiscCoworkersInformationFieldset
                readOnly={true}
                prefillData={{
                    'person.givenName': person.givenName,
                    'person.additionalName': person.additionalName,
                    'person.familyName': person.familyName,
                    'person.emails[0].email': email,
                    'person.telephones[0].telephone': telephone,
                }}
            />
        )
    }
}
