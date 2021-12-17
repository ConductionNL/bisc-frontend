import React, { useEffect, useRef, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Form from 'components/Core/Form/Form'
import {
    PublicRegistrationFields,
    PublicRegistrationFieldsFormModel,
} from 'components/Domain/PublicRegistration/Fields/PublicRegistrationFields'
import { PublicRegistrationActionBar } from 'components/Domain/PublicRegistration/PublicRegistrationActionBar/PublicRegistrationActionBar'
import { PublicRegistrationHeader } from 'components/Domain/PublicRegistration/PublicRegistrationHeader/PublicRegistrationHeader'
import { IconType } from 'components/Core/Icon/IconType'
import { Forms } from 'utils/forms'
import { LandingPageContainer } from 'components/Domain/LandingPage/LandingPageContainer'
import { usePostStudent } from 'api/student/student'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { publicRegistrationFieldsMapper } from 'components/Domain/Participation/mappers/PublicRegistrationFieldsMapper'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'

export const PublicRegistrationView: React.FC = () => {
    const { i18n } = useLingui()

    const [hasAcceptedToShareDetailsWithTaalhuis, setHasAcceptedToShareDetailsWithTaalhuis] = useState<boolean>(false)
    const [isSucces, setIsSucces] = useState<boolean>()
    const formRef = useRef<HTMLFormElement>()
    const { mutate: postStudent, loading, error } = usePostStudent()

    useEffect(() => {
        document.title = `TOP - Registratie`

        return function cleanup() {
            document.title = `TOP - Inloggen`
        }
    }, [])

    return (
        <>
            <PublicRegistrationHeader
                title={i18n._(t`Aanmelding deelnemer Taalhuis`)}
                subtitle={i18n._(
                    t`Met dit formulier kunt u een deelnemer aanmelden voor deelname aan activiteiten bij een Taalhuis.`
                )}
                description={i18n._(t`Wanneer wij de aanmelding ontvangen hebben nemen we contact op met
                    de deelnemer om een afspreek te maken voor een intake. Tijdens deze intake bekijken
                    we welke aanpak voor deze deelnemer het meest geschikt is.`)}
                success={isSucces}
            />
            <Form onSubmit={handleCreate} onRef={formRef}>
                <LandingPageContainer>
                    <MutationErrorProvider mutationError={error?.data}>
                        <PublicRegistrationFields
                            hasAcceptedToShareDetailsWithTaalhuis={hasAcceptedToShareDetailsWithTaalhuis}
                            setHasAcceptedToShareDetailsWithTaalhuis={setHasAcceptedToShareDetailsWithTaalhuis}
                        />
                    </MutationErrorProvider>
                </LandingPageContainer>
                <PublicRegistrationActionBar>
                    <Button
                        icon={IconType.send}
                        type={ButtonType.primary}
                        submit={true}
                        loading={loading}
                        disabled={!hasAcceptedToShareDetailsWithTaalhuis}
                    >
                        {i18n._(t`Versturen`)}
                    </Button>
                </PublicRegistrationActionBar>
            </Form>
        </>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<PublicRegistrationFieldsFormModel>(e)
        const input = publicRegistrationFieldsMapper(formData)

        try {
            await postStudent(input)
            handleSuccess()
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                console.error(error)
            }
        }
    }

    function handleSuccess() {
        setIsSucces(true)
        formRef.current?.reset()
        window.scrollTo(0, 0)
    }
}
