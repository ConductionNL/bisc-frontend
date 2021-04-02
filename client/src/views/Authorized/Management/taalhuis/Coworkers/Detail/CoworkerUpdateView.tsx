import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import { DeleteTaalhuisEmployeeModal } from 'components/Domain/Shared/Modals/DeleteTaalhuisEmployeeModal'
import {
    ManagementCoworkerFieldsContainer,
    ManagementCoworkersFieldsContainerFormModel,
} from 'components/Domain/Taalhuis/Management/Containers/ManagementCoworkerFieldsContainer'
import { UserContext } from 'components/Providers/UserProvider/context'
import {
    TaalhuisUserRoleType,
    useTaalhuisEmployeeQuery,
    useUpdateTaalhuisEmployeeMutation,
    useUserRolesByTaalhuisIdQuery,
} from 'generated/graphql'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ManagementCoworkerParams } from 'routes/management/types'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumb/breadcrumbItems'
import { ManagementTaalhuisLocationStateProps } from './CoworkersDetailView'

interface Props {
    routeState: ManagementTaalhuisLocationStateProps
}

const CoworkerUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const userContext = useContext(UserContext)
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<ManagementCoworkerParams>()

    const { loading: queryLoading, error: queryError, data: queryData } = useTaalhuisEmployeeQuery({
        variables: {
            userId: routeState.coworkerId,
        },
    })
    const { loading: userRolesLoading, error: userRolesError, data: userRolesData } = useUserRolesByTaalhuisIdQuery({
        variables: {
            taalhuisId: userContext.user?.organizationId ?? '',
        },
    })

    const [updateMedewerker, { loading: updateLoading }] = useUpdateTaalhuisEmployeeMutation()

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`Medewerker ${params.coworkername}`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.management.overview]} />}
            />
            {renderForm()}
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
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()} disabled={updateLoading}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={updateLoading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <DeleteTaalhuisEmployeeModal
                    onClose={() => setModalIsVisible(false)}
                    coworkerName={routeState.coworkerName}
                    coworkerId={routeState.coworkerId}
                    onSuccess={() => history.push(routes.authorized.management.taalhuis.coworkers.overview)}
                />
            </Modal>
        </Form>
    )

    function renderForm() {
        if (queryLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (queryError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <ManagementCoworkerFieldsContainer
                defaultFieldValues={queryData}
                userRoleValues={userRolesData}
                userRolesError={!!userRolesError}
                userRolesLoading={userRolesLoading}
                editable={true}
            />
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = queryData?.taalhuisEmployee
        const formData = Forms.getFormDataFromFormEvent<ManagementCoworkersFieldsContainerFormModel>(e)

        if (!data) {
            return
        }
        const response = await updateMedewerker({
            variables: {
                input: {
                    userId: routeState.coworkerId,
                    userGroupId:
                        Forms.getObjectsFromListWithStringList<TaalhuisUserRoleType>(
                            'name',
                            formData.roles,
                            userRolesData?.userRolesByTaalhuisId
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
            pathname: routes.authorized.management.taalhuis.coworkers.detail.read,
            state: {
                coworkerName: NameFormatters.formattedFullname({
                    givenName: response.data.updateTaalhuisEmployee.givenName,
                    additionalName: response.data.updateTaalhuisEmployee.additionalName,
                    familyName: response.data.updateTaalhuisEmployee.familyName,
                }),
                coworkerId: response.data.updateTaalhuisEmployee.id,
            },
        })
    }
}

export default CoworkerUpdateView
