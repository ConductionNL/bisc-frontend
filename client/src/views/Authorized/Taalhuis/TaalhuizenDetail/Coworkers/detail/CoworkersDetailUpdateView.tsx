import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import Form from '../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Modal from '../../../../../../components/Core/Modal/Modal'
import AccountInformationFieldset, {
    AccountInformationFieldsetModel,
} from '../../../../../../components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, {
    InformationFieldsetModel,
} from '../../../../../../components/fieldsets/shared/InformationFieldset'
import {
    useTaalhuisEmployeeQuery,
    useUpdateTaalhuisEmployeeMutation,
    useUserRolesByTaalhuisIdQuery,
} from '../../../../../../generated/graphql'
import { routes } from '../../../../../../routes/routes'
import { TaalhuisCoworkersDetailParams } from '../../../../../../routes/taalhuis/types'
import { Forms } from '../../../../../../utils/forms'
import TaalhuisCoworkerDeleteModalView from '../../../Modals/TaalhuisCoworkerDeleteModal'

interface Props {}

interface FormModel extends InformationFieldsetModel, AccountInformationFieldsetModel {}

const CoworkersDetailUpdateView: React.FunctionComponent<Props> = () => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<TaalhuisCoworkersDetailParams>()
    const decodedTaalhuisid = decodeURIComponent(params.taalhuisid)
    const decodedCoworkerId = decodeURIComponent(params.coworkerid)
    const { loading: loadingUserRoles, data: userRoles, error: userRolesError } = useUserRolesByTaalhuisIdQuery({
        variables: { taalhuisId: decodedTaalhuisid },
    })
    const { data: employeeData, loading: loadingEmployee, error: errorEmployee } = useTaalhuisEmployeeQuery({
        variables: {
            employeeId: decodedCoworkerId,
        },
    })
    const [updateCoworker, { loading: loadingUpdate }] = useUpdateTaalhuisEmployeeMutation()

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await updateCoworker({
                variables: {
                    input: {
                        taalhuisId: decodedTaalhuisid,
                        userGroupId: formData.role || '',
                        givenName: formData.callSign || '',
                        additionalName: formData.insertion,
                        familyName: formData.lastname || '',
                        email: formData.email || '',
                        telephone: formData.phonenumber || '',
                        employeeId: decodedCoworkerId,
                    },
                },
            })

            if (response) {
                NotificationsManager.success(
                    i18n._(t`Medewerker is bijgewerkt`),
                    i18n._(t`U word teruggestuurd naar het overzicht`)
                )
                history.push(
                    routes.authorized.taalhuis.read.coworkers.overview({
                        taalhuisid: params.taalhuisid,
                        taalhuisname: params.taalhuisname,
                    })
                )
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    if (!decodedTaalhuisid) {
        return null
    }

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`Medewerker ${params.taalhuisname}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb
                            text={params.taalhuisname}
                            to={routes.authorized.taalhuis.read.data({
                                taalhuisid: params.taalhuisid,
                                taalhuisname: params.taalhuisname,
                            })}
                        />
                    </Breadcrumbs>
                }
            />
            {renderSections()}
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
                    coworkerid={decodedCoworkerId}
                    coworkername={params.taalhuisname}
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
                            insertion: employeeData.taalhuisEmployee.additionalName,
                            callSign: employeeData.taalhuisEmployee.givenName,
                            phonenumber: employeeData.taalhuisEmployee.telephone,
                        }}
                    />
                    <HorizontalRule />
                    <AccountInformationFieldset
                        roleOptions={userRoles?.userRolesByTaalhuisId.map(role => [role])}
                        rolesLoading={loadingUserRoles}
                        rolesError={!!userRolesError}
                        prefillData={{
                            email: employeeData.taalhuisEmployee.email,
                            role: employeeData.taalhuisEmployee.userRoles[0].name,
                            createdAt: employeeData.taalhuisEmployee.dateCreated,
                            updatedAt: employeeData.taalhuisEmployee.dateModified,
                        }}
                    />
                </>
            )
        }
        return null
    }
}

export default CoworkersDetailUpdateView
