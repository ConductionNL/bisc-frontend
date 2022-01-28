import Form from 'components/Core/Form/Form'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { Forms } from 'utils/forms'
import { OrganizationEmployee, TaalhuisEmployeeRole } from 'api/types/types'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { useGetOrganizationEmployee, usePutOrganizationEmployee } from 'api/employee/employee'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import TaalhuisCoworkersInformationFieldset, {
    TaalhuisCoworkersInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'
import { getMappedTaalhuisCoworkerFormFields } from 'components/Domain/Taalhuis/mappers/taalhuisFieldsMappers'
import TaalhuisCoworkerDeleteModalView from 'views/Authorized/Bisc/Taalhuizen/TaalhuizenDetail/Coworkers/modals/TaalhuisCoworkerDeleteModal'
import { TaalhuisManagementCoworkerDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { UserContext } from 'components/Providers/UserProvider/context'

interface Props {
    onEdit?: () => void
}

export const ManagementTaalhuisEmployeesDetailUpdateView: React.FunctionComponent<Props> = ({ onEdit }) => {
    const { taalhuisEmployeeId } = useParams<TaalhuisManagementCoworkerDetailRouteParams>()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()
    const organizationId = userContext.user?.organization.id!

    const { mutate, loading, error } = usePutOrganizationEmployee(taalhuisEmployeeId)

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganizationEmployee(taalhuisEmployeeId)}>
            {data => renderPage(data)}
        </PageQuery>
    )

    function renderPage(employee: OrganizationEmployee) {
        return (
            <Form onSubmit={handleEdit(employee)}>
                {renderSections(employee)}
                <Actionbar
                    LeftComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                danger={true}
                                icon={IconType.delete}
                                onClick={() => setModalIsVisible(true)}
                            >
                                {i18n._(t`Medewerker verwijderen`)}
                            </Button>
                        </Row>
                    }
                    RightComponent={
                        <Row>
                            <Button disabled={loading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={loading}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <TaalhuisCoworkerDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        coworkerId={taalhuisEmployeeId}
                        coworkerName={employee.person.givenName}
                        onSuccess={() => {
                            history.push(taalhuisRoutes.management.coworkers.index)
                        }}
                    />
                </Modal>
            </Form>
        )
    }

    function renderSections(employee: OrganizationEmployee) {
        const { person } = employee
        const telephone = person.telephones?.length ? person.telephones[0].telephone : undefined
        const email = person.emails?.length ? person.emails[0].email : undefined

        return (
            <MutationErrorProvider mutationError={error?.data}>
                <TaalhuisCoworkersInformationFieldset
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
            </MutationErrorProvider>
        )
    }

    function handleEdit(employee: OrganizationEmployee) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<TaalhuisCoworkersInformationFieldsetModel>(e)
            const input = getMappedTaalhuisCoworkerFormFields(formData, organizationId, employee)

            try {
                await mutate(input)

                NotificationsManager.success(
                    i18n._(t`Medewerker is bijgewerkt`),
                    i18n._(t`Je wordt teruggestuurd naar het overzicht`)
                )

                history.push(taalhuisRoutes.management.coworkers.detail(employee.id).index)
                onEdit?.()
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
