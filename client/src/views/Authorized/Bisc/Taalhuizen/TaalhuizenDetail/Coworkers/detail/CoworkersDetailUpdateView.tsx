import Headline from 'components/Chrome/Headline'
import Form from 'components/Core/Form/Form'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadcrumbs'
import { useUpdateLanguageHouseEmployeeMutation } from 'generated/graphql'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import { AccountInformationFieldsetFormModel } from 'components/fieldsets/shared/AccountInformationFieldset'
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
import { Organization, OrganizationEmployee } from 'api/types/types'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { useGetOrganizationEmployee } from 'api/employee/employee'
// import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import TaalhuisCoworkersInformationFieldset from 'components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    organization: Organization
}

interface FormModel extends InformationFieldsetModel, AccountInformationFieldsetFormModel {}

const CoworkersDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { organization } = props
    const { languageHouseId, languageHouseEmployeeId } = props.match.params
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()

    const [updateLanguageHouseEmployee, { loading: loadingUpdate }] = useUpdateLanguageHouseEmployeeMutation()

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
                    title={employee.person.givenName}
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
                            <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button
                                type={ButtonType.primary}
                                icon={IconType.send}
                                submit={true}
                                loading={loadingUpdate}
                            >
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <TaalhuisCoworkerDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        taalhuisId={languageHouseId}
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
        const user = person.user as any
        const telephone = person.telephones?.length ? person.telephones[0].telephone : undefined
        // const email = person.emails?.length ? person.emails[0].email : undefined

        return (
            // <MutationErrorProvider mutationError={error?.data}>
            <TaalhuisCoworkersInformationFieldset
                prefillData={{
                    'person.givenName': person.givenName,
                    'person.additionalName': person.additionalName,
                    'person.familyName': person.familyName,
                    'person.user.username': user.username, // email
                    // 'person.user.roles[0]': person.user.roles[0],
                    'person.telephones[0].telephone': telephone,
                }}
            />
            // </MutationErrorProvider>
        )
    }

    function handleEdit(employee: OrganizationEmployee) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            const { person } = employee
            const email = person.emails && person.emails[0]

            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)

            const response = await updateLanguageHouseEmployee({
                variables: {
                    input: {
                        id: languageHouseEmployeeId,
                        // userGroupId:
                        //     Forms.getObjectsFromListWithStringList<LanguageHouseUserRoleType>(
                        //         'name',
                        //         formData.roles,
                        //         userRoles?.userRolesByLanguageHouseId
                        //     )[0].id ?? data.userRoles,
                        givenName: formData.callSign ?? person.givenName,
                        additionalName: formData.additionalName,
                        familyName: formData.familyName ?? person.familyName,
                        email: formData.email ?? (email && email.email),
                        telephone: formData.phonenumber,
                    },
                },
            })

            if (response.errors?.length || !response.data) {
                return
            }

            NotificationsManager.success(
                i18n._(t`Medewerker is bijgewerkt`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.detail(languageHouseEmployeeId).data
                    .index
            )
        }
    }
}

export default CoworkersDetailUpdateView
