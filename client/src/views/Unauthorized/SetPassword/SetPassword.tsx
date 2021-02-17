import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import FormField from '../../../components/Core/DataEntry/FormField'
import Input from '../../../components/Core/DataEntry/Input'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import PasswordStrengthBar from '../../../components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'
import HorizontalRule from '../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../components/Core/Icon/IconType'
import Column from '../../../components/Core/Layout/Column/Column'
import ContentGreetingPageLayout from '../../../components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from '../../../components/Core/Text/PageTitle'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import { useRequestPasswordResetMutation } from '../../../generated/graphql'
import { routes } from '../../../routes'
import { Forms } from '../../../utils/forms'

interface FormModel {
    email: string
}

function SetPassword() {
    const { i18n } = useLingui()
    const history = useHistory()
    const environment = 'OMGEVING' // TODO: should come from mail
    const [success, setSuccess] = useState(false)
    const [password, setPassword] = useState<string | undefined>(undefined)
    const [requestPasswordReset, { loading }] = useRequestPasswordResetMutation()

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await requestPasswordReset({ variables: { email: data.email } })

            if (response.errors) {
                throw new Error(response.errors[0].message)
            }

            NotificationsManager.success(
                i18n._(t`Wij hebben uw verzoek ontvangen`),
                i18n._(t`U heeft een E-mail onvangen waarmee u uw wachtwoord kunt wijzigen.`)
            )
            setSuccess(true)
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Wij hebben uw aanvraag niet ontvangen`),
                i18n._(t`Controleeer uw gegevens en probeer het later opnieuw`)
            )
        }
    }

    return (
        <ContentGreetingPageLayout
            greeting={i18n._(t`Welkom bij Top`)}
            TopComponent={
                <Link to={routes.unauthorized.login}>
                    <Button round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
                </Link>
            }
            ContentComponent={renderContent()}
        />
    )

    function renderContent() {
        if (success) {
            return (
                <Column spacing={8}>
                    <Column spacing={5}>
                        <PageTitle title={i18n._(t`De wachtwoordlink is verstuurd`)} />
                        <Paragraph>
                            {i18n._(
                                t`Bedankt voor jouw aanvraag. Je ontvangt een e-mail met een link. Klik op deze link om een nieuw wachtwoord in te stellen.`
                            )}
                        </Paragraph>
                        <Button big={true} stretch={true} onClick={() => history.push(routes.unauthorized.login)}>
                            {i18n._(t`Terug naar login`)}
                        </Button>
                    </Column>
                </Column>
            )
        }

        return (
            <form onSubmit={handleForgotPassword}>
                <Column spacing={8}>
                    <Column spacing={5}>
                        <PageTitle title={i18n._(t`Wachtwoord instellen`)} />
                        <Paragraph>
                            {i18n._(
                                t`Stel een nieuw wachtwoord in voor de ${environment}. Deze kan niet hetzelfde zijn als het oude wachtwoord.`
                            )}
                        </Paragraph>
                        <HorizontalRule />
                    </Column>
                    <Column spacing={12}>
                        <Column spacing={6}>
                            <FormField label={i18n._(t`Nieuw wachtwoord`)}>
                                <Input
                                    onChange={value => setPassword(value)}
                                    name={'newPassword'}
                                    type={'password'}
                                    placeholder={i18n._(t`Nieuw wachtwoord`)}
                                />
                                <PasswordStrengthBar value={password} />
                            </FormField>
                            <FormField label={i18n._(t`Herhaal wachtwoord`)}>
                                <Input
                                    name={'repeatPassword'}
                                    type={'password'}
                                    placeholder={i18n._(t`Herhaal wachtwoord`)}
                                />
                            </FormField>
                        </Column>
                        <Button big={true} stretch={true} submit={true} loading={loading}>
                            {i18n._(t`Stuur email`)}
                        </Button>
                    </Column>
                </Column>
            </form>
        )
    }
}

export default SetPassword
