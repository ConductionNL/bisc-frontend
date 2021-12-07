import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { usePostOrganizationEmployee } from 'api/employee/employee'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { getMappedBiscCoworkerFormFields } from 'components/Domain/Bisc/mappers/biscFieldsMappers'
import {
    BiscCoworkersInformationFieldset,
    BiscCoworkersInformationFieldsetModel,
} from 'components/fieldsets/bisc/BiscCoworkersInformationFieldset'
import { UserContext } from 'components/Providers/UserProvider/context'

import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { biscRoutes } from 'routes/bisc/biscRoutes'
import { Forms } from 'utils/forms'

interface Props {}

export const ManagementBiscEmployeesCreateView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()
    const organizationId = userContext.user?.organization.id!
    const { mutate: createCoworker, loading, error } = usePostOrganizationEmployee()

    return (
        <Form onSubmit={handleCreate()}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.bisc.management.overview,
                            breadcrumbItems.bisc.management.employees,
                        ]}
                    />
                }
            />
            <MutationErrorProvider mutationError={error?.data}>
                <BiscCoworkersInformationFieldset />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(biscRoutes.management.coworkers.index)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function handleCreate() {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<BiscCoworkersInformationFieldsetModel>(e)
            const input = getMappedBiscCoworkerFormFields(formData, organizationId)

            try {
                const response = await createCoworker(input)

                NotificationsManager.success(
                    i18n._(t`Medewerker is aangemaakt`),
                    i18n._(t`Je wordt doorgestuurd naar de gegevens van de medewerker `)
                )

                history.push(biscRoutes.management.coworkers.detail(response.id).data.index)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }
}
