import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadCrumbs'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Headline from '../../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../../components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from '../../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../../components/Core/Feedback/Spinner/Spinner'
import Form from '../../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../../components/Core/Layout/Center/Center'
import Row from '../../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../../../../components/Core/Modal/Modal'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from '../../../../../../../components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, {
    InformationFieldsetModel,
} from '../../../../../../../components/fieldsets/shared/InformationFieldset'
import {
    TaalhuisUserRoleType,
    useTaalhuisEmployeeQuery,
    useUpdateTaalhuisEmployeeMutation,
    useUserRolesByTaalhuisIdQuery,
} from '../../../../../../../generated/graphql'
import { routes } from '../../../../../../../routes/routes'
import { Forms } from '../../../../../../../utils/forms'
import TaalhuisCoworkerDeleteModalView from '../../../Modals/TaalhuisCoworkerDeleteModal'
import { TaalhuizenCoworkersDetailLocationStateProps } from './CoworkersDetailView'

interface Props {
    routeState: TaalhuizenCoworkersDetailLocationStateProps
}

interface FormModel extends InformationFieldsetModel, AccountInformationFieldsetFormModel {}

const CoworkersDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()
    const { loading: loadingUserRoles, data: userRoles, error: userRolesError } = useUserRolesByTaalhuisIdQuery({
        variables: { taalhuisId: routeState.taalhuisId },
    })
    const { data: employeeData, loading: loadingEmployee, error: errorEmployee } = useTaalhuisEmployeeQuery({
        variables: {
            userId: routeState.coworkerId,
        },
    })
    const [updateCoworker, { loading: loadingUpdate }] = useUpdateTaalhuisEmployeeMutation()

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`Medewerker ${routeState.coworkerName}`)}
                TopComponent={<TaalhuizenCoworkersDetailBreadcrumbs routeState={routeState} />}
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
                            {i18n._(t`medewerker verwijderen`)}
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
                    coworkerId={routeState.coworkerId}
                    coworkerName={routeState.coworkerName}
                    onSuccess={() => {
                        history.push({
                            pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.detail.index,
                            state: routeState,
                        })
                    }}
                />
            </Modal>
        </Form>
    )

    function renderSections() {
        if (loadingEmployee) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (errorEmployee) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (employeeData) {
            return (
                <>
                    <InformationFieldset
                        prefillData={{
                            lastname: employeeData.taalhuisEmployee.familyName,
                            insertion: employeeData.taalhuisEmployee.additionalName ?? '',
                            callSign: employeeData.taalhuisEmployee.givenName,
                            phonenumber: employeeData.taalhuisEmployee.telephone ?? '',
                        }}
                    />
                    <HorizontalRule />
                    <AccountInformationFieldset
                        roleOptions={userRoles?.userRolesByTaalhuisId.map(role => [role.name])}
                        rolesLoading={loadingUserRoles}
                        rolesError={!!userRolesError}
                        prefillData={{
                            email: employeeData.taalhuisEmployee.email,
                            roles: employeeData.taalhuisEmployee.userRoles.map(role => role.name),
                            createdAt: employeeData.taalhuisEmployee.dateCreated,
                            updatedAt: employeeData.taalhuisEmployee.dateModified,
                        }}
                    />
                </>
            )
        }
        return null
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = employeeData?.taalhuisEmployee
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)

        if (data) {
            const response = await updateCoworker({
                variables: {
                    input: {
                        userId: routeState.coworkerId,
                        userGroupId:
                            Forms.getObjectsFromListWithStringList<TaalhuisUserRoleType>(
                                'name',
                                formData.roles,
                                userRoles?.userRolesByTaalhuisId
                            )[0].id ?? data.userRoles,
                        givenName: formData.callSign ?? data.givenName,
                        additionalName: formData.insertion,
                        familyName: formData.lastname ?? data.familyName,
                        email: formData.email ?? data.email,
                        telephone: formData.phonenumber,
                    },
                },
            })

            if (response.errors?.length || !response.data) {
                return
            }

            NotificationsManager.success(
                i18n._(t`Medewerker is bijgewerkt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )

            history.push({
                pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.detail.index,
                state: {
                    taalhuisId: routeState.taalhuisId,
                    taalhuisName: routeState.taalhuisName,
                    coworkerName: response.data?.updateTaalhuisEmployee.givenName || '',
                    coworkerId: response.data?.updateTaalhuisEmployee.id || '',
                },
            })
        }
    }
}

export default CoworkersDetailUpdateView
