import Headline from 'components/Chrome/Headline'
import Form from 'components/Core/Form/Form'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadcrumbs'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Space from 'components/Core/Layout/Space/Space'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import TaalhuisCoworkerDeleteModalView from '../modals/TaalhuisCoworkerDeleteModal'
import { routes } from 'routes/routes'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { Forms } from 'utils/forms'
import { Organization, OrganizationEmployee, TaalhuisEmployeeRole } from 'api/types/types'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { useGetOrganizationEmployee, usePutOrganizationEmployee } from 'api/employee/employee'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import TaalhuisCoworkersInformationFieldset, {
    TaalhuisCoworkersInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'
import { getMappedTaalhuisCoworkerFormFields } from 'components/Domain/Taalhuis/mappers/taalhuisFieldsMappers'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    organization: Organization
}

const CoworkersDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { organization } = props
    const { languageHouseId, languageHouseEmployeeId } = props.match.params
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()

    const { mutate, loading, error } = usePutOrganizationEmployee(languageHouseEmployeeId)

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganizationEmployee(languageHouseEmployeeId)}>
            {data => renderPage(data)}
        </PageQuery>
    )

    function renderPage(employee: OrganizationEmployee) {
        return (
            <Form onSubmit={handleEdit(employee)}>
                <Headline
                    title={i18n._(t`Medewerker ${NameFormatters.formattedFullname(employee.person)}`)}
                    TopComponent={
                        <TaalhuizenCoworkersDetailBreadcrumbs
                            languageHouseId={languageHouseId}
                            languageHouseName={organization.name}
                        />
                    }
                />
                {renderSections(employee)}
                <Space pushTop={true} />
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
                        coworkerId={languageHouseEmployeeId}
                        coworkerName={employee.person.givenName}
                        onSuccess={() => {
                            history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.index)
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
            const input = getMappedTaalhuisCoworkerFormFields(formData, languageHouseId, employee)

            try {
                await mutate(input)

                NotificationsManager.success(
                    i18n._(t`Medewerker is bijgewerkt`),
                    i18n._(t`Je wordt teruggestuurd naar het overzicht`)
                )

                history.push(
                    routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.detail(languageHouseEmployeeId)
                        .data.index
                )
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

export default CoworkersDetailUpdateView
