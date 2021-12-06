import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployee } from 'api/employee/employee'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { Page } from 'components/Core/Page/Page'
import { useParams } from 'react-router-dom'
import { TaalhuisManagementCoworkerDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {}

export const ManagementTaalhuisEmployeesDetailUpdateView: React.FunctionComponent<Props> = () => {
    const { taalhuisEmployeeId } = useParams<TaalhuisManagementCoworkerDetailRouteParams>()
    const { i18n } = useLingui()
    const { data: employee, loading, error } = useGetOrganizationEmployee(taalhuisEmployeeId)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !employee) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Page>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Medewerker ${NameFormatters.formattedFullname(employee.person)}`)}
                    spacingType={SpacingType.small}
                />
                <Column spacing={10}>
                    <>Update</>
                </Column>
            </Column>
        </Page>
    )
}
