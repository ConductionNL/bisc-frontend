import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import RegistratorInformationFieldset from 'components/fieldsets/participants/fieldsets/RegistratorInformationFieldset'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
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
import ExplanationInformationFieldset from '../../../../../../components/fieldsets/shared/ExplanationInformationFieldset'
import NameInformationFieldset from '../../../../../../components/fieldsets/shared/NameInformationFieldset'
import AdressInformationFieldset from '../../../../../../components/fieldsets/shared/AdressInformationFieldset'
import {
    RegistrationsDocument,
    useAcceptRegistrationMutation,
    useRegistrationQuery,
} from '../../../../../../generated/graphql'
import { routes } from '../../../../../../routes/routes'
import { NameFormatters } from '../../../../../../utils/formatters/name/Name'
import { RegistrationDeleteModal } from '../../Modals/RegistrationDeleteModal'
import { RegistrationsDetailLocationStateProps } from '../RegistrationsView'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'

interface Props {
    routeState: RegistrationsDetailLocationStateProps
}

export const RegistrationReadView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { loading, error, data } = useRegistrationQuery({ variables: { studentId: routeState.registrationId } })
    const [acceptRegistration, { loading: acceptRegistratorLoading }] = useAcceptRegistrationMutation()

    return (
        <>
            <Headline
                title={routeState.registrationName}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.taalhuis.participants.overview,
                            breadcrumbItems.taalhuis.participants.registrations.overview,
                        ]}
                    />
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
                        firstname: data.registration.personDetails.givenName,
                        insertion: data.registration.personDetails.additionalName,
                        lastname: data.registration.personDetails.familyName,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <AdressInformationFieldset
                    prefillData={{
                        street: data.registration.contactDetails?.street || '',
                        houseNumber: data.registration.contactDetails?.houseNumber || '',
                        houseNumberSuffix: data.registration.contactDetails?.houseNumberSuffix || '',
                        postalCode: data.registration.contactDetails?.postalCode || '',
                        locality: data.registration.contactDetails?.locality || '',
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        phone: data.registration.contactDetails?.telephone,
                        email: data.registration.contactDetails?.email,
                    }}
                    readOnly={true}
                    fieldControls={{
                        postalCode: {
                            hidden: true,
                        },
                        city: {
                            hidden: true,
                        },
                        phoneNumberContactPerson: {
                            hidden: true,
                        },
                        contactPreference: {
                            hidden: true,
                        },
                        address: {
                            hidden: true,
                        },
                    }}
                />
                <HorizontalRule />
                <RegistratorInformationFieldset
                    prefillData={{
                        date: data.registration.dateCreated,
                        registeringParty: data.registration.registrar?.organisationName,
                        registratorName: NameFormatters.formattedFullname({
                            givenName: data.registration.personDetails.givenName,
                            additionalName: data.registration.personDetails.additionalName,
                            familyName: data.registration.personDetails.familyName,
                        }),
                        registratorEmail: data.registration.registrar?.email,
                        registratorPhone: data.registration.registrar?.telephone,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <ExplanationInformationFieldset
                    prefillData={{
                        note: data.registration.memo,
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
                        id={routeState.registrationId}
                        studentName={routeState.registrationName}
                        onClose={() => setModalIsVisible(false)}
                    />
                </Modal>
            </>
        )

        async function handleRegistration() {
            const response = await acceptRegistration({
                variables: {
                    studentId: routeState.registrationId,
                },
                refetchQueries: [
                    { query: RegistrationsDocument, variables: { languageHouseId: userContext.user?.organizationId } },
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
