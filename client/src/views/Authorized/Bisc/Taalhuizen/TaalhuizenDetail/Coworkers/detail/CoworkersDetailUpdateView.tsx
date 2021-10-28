import Headline from 'components/Chrome/Headline'
import Form from 'components/Core/Form/Form'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadcrumbs'
import { useLanguageHouseEmployeeQuery, useUpdateLanguageHouseEmployeeMutation } from 'generated/graphql'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import Space from 'components/Core/Layout/Space/Space'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import TaalhuisCoworkerDeleteModalView from '../modals/TaalhuisCoworkerDeleteModal'
import { routes } from 'routes/routes'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { Forms } from 'utils/forms'
import { Organization, OrganizationEmployee } from 'api/types/types'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    organization: Organization
    organizationEmployee: OrganizationEmployee
    organizationEmployeeFullName: string
}

interface FormModel extends InformationFieldsetModel, AccountInformationFieldsetFormModel {}

const CoworkersDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { organization, organizationEmployee, organizationEmployeeFullName } = props
    const { languageHouseId, languageHouseEmployeeId } = props.match.params
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()

    const { refetch } = useLanguageHouseEmployeeQuery({
        variables: { languageHouseEmployeeId },
    })

    useEffect(() => {
        // running query once, just to get the latest info
        refetch({ languageHouseEmployeeId })
    }, [languageHouseEmployeeId])

    const history = useHistory()

    const [updateLanguageHouseEmployee, { loading: loadingUpdate }] = useUpdateLanguageHouseEmployeeMutation()

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={organizationEmployeeFullName}
                TopComponent={
                    <TaalhuizenCoworkersDetailBreadcrumbs
                        languageHouseId={languageHouseId}
                        languageHouseName={organization.name}
                    />
                }
            />
            {renderSections()}
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

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loadingUpdate}>
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
                    coworkerName={organizationEmployeeFullName}
                    onSuccess={() => {
                        history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.index)
                    }}
                />
            </Modal>
        </Form>
    )

    function renderSections() {
        const { person } = organizationEmployee
        const telephone = person.telephones && person.telephones[0]
        const email = person.emails && person.emails[0]

        return (
            <>
                <InformationFieldset
                    prefillData={{
                        familyName: person.familyName,
                        additionalName: person.additionalName ?? '',
                        callSign: person.givenName,
                        phonenumber: (telephone && telephone.telephone) || '',
                    }}
                />
                <HorizontalRule />
                <AccountInformationFieldset
                    // roleOptions={userRoles?.userRolesByLanguageHouseId.map(role => [role.name])}
                    // rolesLoading={loadingUserRoles}
                    // rolesError={!!userRolesError}
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

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        const { person } = organizationEmployee
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

export default CoworkersDetailUpdateView
