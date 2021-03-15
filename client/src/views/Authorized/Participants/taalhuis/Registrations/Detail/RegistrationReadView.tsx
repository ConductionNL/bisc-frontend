import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
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
import AdressInformationFieldset from '../../../../../../components/fieldsets/shared/AdressInformationFieldset'
import ContactInformationFieldset from '../../../../../../components/fieldsets/shared/ContactInformationFieldset'
import ExplanationInformationFieldset from '../../../../../../components/fieldsets/shared/ExplanationInformationFieldset'
import NameInformationFieldset from '../../../../../../components/fieldsets/shared/NameInformationFieldset'
import RegistratorInformationFieldset from '../../../../../../components/fieldsets/shared/RegistratorInformationFieldset'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { RegistrationsDetailParams } from '../../../../../../routes/participants/types'
import { routes } from '../../../../../../routes/routes'
import { RegistrationsMock, taalhuisRegistrationsCreateResponse } from '../../../mocks/registrations'

interface Props {}

export const RegistrationReadView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<RegistrationsDetailParams>()

    const { loading, error, data } = useMockQuery<RegistrationsMock, {}>(taalhuisRegistrationsCreateResponse, false)
    const [
        taalhuisRegistration,
        { loading: acceptRegistratorLoading, error: acceptRegistratorError, data: acceptRegistratorData },
    ] = useMockMutation<RegistrationsMock, {}>(taalhuisRegistrationsCreateResponse, false)

    return (
        <>
            <Headline
                title={`${params.registrationname}`}
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
                        firstname: 'Esra',
                        insertion: 'Oz',
                        lastname: 'Öskan',
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <AdressInformationFieldset
                    prefillData={{
                        street: 'Parkstraat',
                        streetNo: '22 A',
                        postalCode: '3533 AF',
                        city: 'Utrecht',
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <RegistratorInformationFieldset
                    prefillData={{
                        date: '01/01/2020',
                        registeringParty: 'Gemeente Utrecht',
                        name: 'Kader Benali',
                        email: 'k.benali@utrecht.nl',
                        phone: '06 - 11 22 32 76',
                    }}
                    readOnly={true}
                />

                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        email: 'email@deelnemer.nl',
                        phone: '06 - 19 76 85 43',
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <ExplanationInformationFieldset
                    prefillData={{
                        note: `Fusce vel porta neque. Fusce accumsan, ante ac suscipit tempus, 
                        lectus ante elementum est, non venenatis eros leo ac tortor. 
                        Duis mattis augue non diam tincidunt, 
                        nec semper leo aliquet. Aenean eget justo ut libero sollicitudin porta dictum at tortor. 
                        Quisque nec erat in enim laoreet tempus quis ac magna. Sed eros lacus, pretium vel eros in, 
                        rhoncus hendrerit ex. Sed sem tortor, venenatis ut enim sit amet, sollicitudin tempus nisi. 
                        Donec fringilla risus eu pellentesque imperdiet. 
                        Morbi efficitur libero quis libero efficitur rhoncus. `,
                    }}
                    readOnly={true}
                />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button icon={IconType.delete} type={ButtonType.secondary} onClick={undefined}>
                                {i18n._(t`Aanmelding verwijderen`)}
                            </Button>
                            <Button
                                icon={IconType.checkmark}
                                type={ButtonType.primary}
                                onClick={handleRegistrator}
                                loading={acceptRegistratorLoading}
                            >
                                {i18n._(t`Aanmelding accepteren`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }

    async function handleRegistrator() {
        await taalhuisRegistration(taalhuisRegistrationsCreateResponse)
        if (acceptRegistratorError) {
            ;<ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        }

        if (acceptRegistratorData) {
            NotificationsManager.success('title', 'test')
            history.push(routes.authorized.participants.taalhuis.registrations.overview)
        }
    }
}
