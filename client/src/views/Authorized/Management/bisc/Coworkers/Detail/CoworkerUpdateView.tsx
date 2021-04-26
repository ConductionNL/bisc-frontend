import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    BiscManagementCoworkerFieldsContainer,
    BiscManagementCoworkersFieldsContainerFormModel,
} from 'components/Domain/Bisc/Management/Fields/BiscManagementCoworkerFields'
import { useBiscEmployeeQuery, useDeleteBiscEmployeeMutation, useUpdateBiscEmployeeMutation } from 'generated/graphql'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { ManagementBiscCoworkerDetailLocationStateProps } from './CoworkerDetailView'

interface Props {
    routeState: ManagementBiscCoworkerDetailLocationStateProps
}

const CoworkerUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()
    const { data: queryData, loading: queryLoading, error } = useBiscEmployeeQuery({
        variables: {
            biscEmployeeId: routeState.coworkerId,
        },
    })
    const [updateCoworker, { loading: updateLoading }] = useUpdateBiscEmployeeMutation()
    const [deleteCoworker, { loading: loadingDelete }] = useDeleteBiscEmployeeMutation()

    if (queryLoading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`Medewerker ${routeState.coworkerName}`)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.management.overview]} />}
            />
            <BiscManagementCoworkerFieldsContainer defaultFieldValues={queryData} editable={true} />

            <Actionbar
                LeftComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            danger={true}
                            icon={IconType.delete}
                            disabled={updateLoading}
                            onClick={() => setModalIsVisible(true)}
                        >
                            {i18n._(t`medewerker verwijderen`)}
                        </Button>
                    </Row>
                }
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            disabled={updateLoading}
                            onClick={() =>
                                history.push({
                                    pathname: routes.authorized.management.bisc.coworkers.detail.read,
                                    state: routeState,
                                })
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={updateLoading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ModalView
                    onClose={() => setModalIsVisible(false)}
                    ContentComponent={
                        <Column spacing={6}>
                            <SectionTitle
                                title={i18n._(t`Medewerker ${routeState.coworkerName} verwijderen`)}
                                heading="H4"
                            />
                            <Paragraph>
                                {i18n._(t`
                                Weet je zeker dat je de medewerker wil verwijderen? Hiermee worden ook alle onderliggende
                                medewerkers en deelnemers verwijderd.`)}
                            </Paragraph>
                        </Column>
                    }
                    BottomComponent={
                        <>
                            <Button
                                type={ButtonType.secondary}
                                disabled={loadingDelete}
                                onClick={() => setModalIsVisible(false)}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>
                            <Button
                                danger={true}
                                type={ButtonType.primary}
                                icon={IconType.delete}
                                onClick={handleDelete}
                                loading={loadingDelete}
                            >
                                {i18n._(t`Verwijderen`)}
                            </Button>
                        </>
                    }
                />
            </Modal>
        </Form>
    )

    async function handleDelete() {
        const response = await deleteCoworker({
            variables: {
                biscEmployeeId: routeState.coworkerId,
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is verwijderd`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )

        history.push(routes.authorized.management.bisc.coworkers.index)
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<BiscManagementCoworkersFieldsContainerFormModel>(e)
        const response = await updateCoworker({
            variables: {
                input: {
                    biscEmployeeId: routeState.coworkerId,
                    givenName: formData.callSign ?? '',
                    additionalName: formData.insertion,
                    familyName: formData.lastname ?? '',
                    email: formData.email ?? '',
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
            pathname: routes.authorized.management.bisc.coworkers.detail.index,
            state: {
                coworkerId: response.data.updateBiscEmployee.id,
                coworkerName: NameFormatters.formattedFullname(response.data.updateBiscEmployee),
            },
        })
    }
}

export default CoworkerUpdateView
