import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import FormField from '../../../components/Core/DataEntry/FormField'
import Input from '../../../components/Core/DataEntry/Input'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import PasswordStrengthBar from '../../../components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'
import HorizontalRule from '../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../components/Core/Icon/IconType'
import Column from '../../../components/Core/Layout/Column/Column'
import Logo from '../../../components/Core/Logo/Logo'
import ContentGreetingPageLayout from '../../../components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from '../../../components/Core/Text/PageTitle'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import { useResetPasswordMutation } from '../../../generated/graphql'
import { routes } from '../../../routes'
import { Forms } from '../../../utils/forms'
import { NotFoundView } from '../../Generic/NotFoundView'

interface FormModel {
    password: string
    passwordRepeat: string
}

function ResetPassword() {
    const { i18n } = useLingui()
    const history = useHistory()
    const location = useLocation()
    const email = new URLSearchParams(location.search).get('email')
    const environment = new URLSearchParams(location.search).get('environment')
    const token = new URLSearchParams(location.search).get('token')
    const [success, setSuccess] = useState(false)
    const [password, setPassword] = useState<string | undefined>(undefined)
    const [resetPasswordMutation, { loading }] = useResetPasswordMutation()

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = Forms.getFormDataFromFormEvent<FormModel>(e)
        if (data.password !== data.passwordRepeat) {
            NotificationsManager.error(
                i18n._(t`Er ging iets fout`),
                i18n._(t`De ingevoerde wachtwoorden zijn niet hetzelfde`)
            )
            return
        }
        await resetPassword(data)
    }

    if (!token) {
        return <NotFoundView />
    }

    return (
        <ContentGreetingPageLayout
            greeting={i18n._(t`Welkom bij Top`)}
            TopComponent={
                success ? (
                    <Logo text={i18n._(t`Top`)} />
                ) : (
                    <Link to={routes.unauthorized.login}>
                        <Button round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
                    </Link>
                )
            }
            ContentComponent={renderContent()}
        />
    )

    function renderContent() {
        if (success) {
            return (
                <>
                    <Column spacing={5}>
                        <PageTitle title={i18n._(t`Wachtwoord ingesteld`)} />
                        <Paragraph>
                            {i18n._(
                                t`Je wachtwoord is ingesteld. Klik op onderstaande link om naar de login pagina te gaan en in te loggen met je ingestelde wachtwoord.`
                            )}
                        </Paragraph>
                    </Column>
                    <Button big={true} stretch={true} onClick={() => history.push(routes.unauthorized.login)}>
                        {i18n._(t`Inloggen`)}
                    </Button>
                    <HorizontalRule />
                </>
            )
        }

        return (
            <form onSubmit={handleResetPassword}>
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
                            {i18n._(t`Wachtwoord instellen`)}
                        </Button>
                    </Column>
                </Column>
            </form>
        )
    }

    async function resetPassword(data: FormModel) {
        try {
            if (!email || !token) {
                return
            }

            const response = await resetPasswordMutation({ variables: { email, token, password: data.password } })

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
}

export default ResetPassword
