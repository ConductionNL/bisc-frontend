import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../../../components/Core/Modal/Modal'
import AdressInformationFieldset from '../../../../../../components/fieldsets/shared/AdressInformationFieldset'
import ContactInformationFieldset from '../../../../../../components/fieldsets/shared/ContactInformationFieldset'
import ExplanationInformationFieldset from '../../../../../../components/fieldsets/shared/ExplanationInformationFieldset'
import NameInformationFieldset from '../../../../../../components/fieldsets/shared/NameInformationFieldset'
import RegistratorInformationFieldset from '../../../../../../components/fieldsets/shared/RegistratorInformationFieldset'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { UserContext } from '../../../../../../components/Providers/UserProvider/context'
import { RegistrationsDocument, useAcceptRegistrationMutation } from '../../../../../../generated/graphql'
import { RegistrationsDetailParams } from '../../../../../../routes/participants/types'
import { routes } from '../../../../../../routes/routes'
import { RegistrationsMock, taalhuisRegistrationsCreateResponse } from '../../../mocks/registrations'
import { RegistrationDeleteModal } from '../../Modals/RegistrationDeleteModal'

interface Props {}

export const RegistrationReadView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<RegistrationsDetailParams>()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const decodedStudentId = decodeURIComponent(params.registrationid)
    const userContext = useContext(UserContext)
    const { loading, error, data } = useMockQuery<RegistrationsMock, {}>(taalhuisRegistrationsCreateResponse, false)
    const [acceptRegistration, { loading: acceptRegistratorLoading }] = useAcceptRegistrationMutation()

    return (
        <>
            <Headline
                title={params.registrationname}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb
                            text={i18n._(t`Deelnemers`)}
                            to={routes.authorized.participants.taalhuis.participants.index}
                        />
                        <Breadcrumb
                            text={i18n._(t`Aanmeldingen`)}
                            to={routes.authorized.participants.taalhuis.registrations.overview}
                        />
                    </Breadcrumbs>
                }
                spacingType={SpacingType.default}
            />
            <Column spacing={10}>{renderForm()}</Column>
        </>
    )

    function renderForm() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <>
                <NameInformationFieldset
                    prefillData={{
                        firstname: data.firstName,
                        insertion: data.insertion,
                        lastname: data.lastName,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <AdressInformationFieldset
                    prefillData={{
                        street: data.street,
                        streetNr: data.streetNr,
                        postalCode: data.postalCode,
                        city: data.city,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <RegistratorInformationFieldset
                    prefillData={{
                        date: data.date,
                        registeringParty: data.registeringParty,
                        registratorName: data.registratorName,
                        registratorEmail: data.registratorEmail,
                        registratorPhone: data.registratorPhone,
                    }}
                    readOnly={true}
                />

                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        email: data.email,
                        phone: data.phone,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <ExplanationInformationFieldset
                    prefillData={{
                        note: data.note,
                    }}
                    readOnly={true}
                />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                icon={IconType.delete}
                                type={ButtonType.secondary}
                                onClick={() => setModalIsVisible(true)}
                            >
                                {i18n._(t`Aanmelding verwijderen`)}
                            </Button>
                            <Button
                                icon={IconType.checkmark}
                                type={ButtonType.primary}
                                onClick={handleRegistration}
                                loading={acceptRegistratorLoading}
                            >
                                {i18n._(t`Aanmelding accepteren`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <RegistrationDeleteModal
                        studentName={params.registrationname}
                        studentId={params.registrationid}
                        onClose={() => setModalIsVisible(false)}
                    />
                </Modal>
            </>
        )

        async function handleRegistration() {
            const response = await acceptRegistration({
                variables: {
                    studentId: decodedStudentId,
                },
                refetchQueries: [
                    { query: RegistrationsDocument, variables: { taalhuisId: userContext.user?.taalhuisid || '' } },
                ],
            })

            if (response.errors?.length || !response) {
                return
            }

            if (response) {
                NotificationsManager.success(
                    i18n._(t`Registratie is geaccepteerd`),
                    i18n._(t`U word teruggestuurd naar het overzicht`)
                )
                history.push(routes.authorized.participants.taalhuis.registrations.index)
            }
        }
    }
}
