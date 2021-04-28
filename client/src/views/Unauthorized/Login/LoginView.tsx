import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import Button from 'components/Core/Button/Button'
import Field from 'components/Core/Field/Field'
import Input from 'components/Core/DataEntry/Input'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Link from 'components/Core/Link/Link'
import Logo from 'components/Core/Logo/Logo'
import ContentGreetingPageLayout from 'components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from 'components/Core/Text/PageTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { Forms } from 'utils/forms'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { EmailValidators } from 'utils/validators/EmailValidators'
import { routes } from 'routes/routes'

interface FormModel {
    email: string
    password: string
}

function LoginView() {
    const { i18n } = useLingui()
    const context = useContext(SessionContext)
    const history = useHistory()

    return (
        <ContentGreetingPageLayout
            greeting={i18n._(t`Welkom bij Top`)}
            TopComponent={<Logo text={i18n._(t`Top`)} />}
            ContentComponent={
                <form onSubmit={handleOnLogin}>
                    <Column spacing={8}>
                        <Column spacing={5}>
                            <PageTitle title={i18n._(t`E-mailadres`)} />
                            <Paragraph>{i18n._(t`Welkom terug! Log in met je email en wachtwoord.`)}</Paragraph>
                            <HorizontalRule />
                        </Column>
                        <Column spacing={12}>
                            <Column spacing={6}>
                                <Field label={i18n._(t`E-mail`)}>
                                    <Input
                                        grow={true}
                                        name={'email'}
                                        type={'email'}
                                        placeholder={i18n._(t`john@doe.com`)}
                                        validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                                    />
                                </Field>
                                <Field
                                    label={i18n._(t`Wachtwoord`)}
                                    RightComponent={
                                        <Link to={routes.unauthorized.forgotpassword}>
                                            {i18n._(t`Wachtwoord vergeten?`)}
                                        </Link>
                                    }
                                >
                                    <Input
                                        grow={true}
                                        name={'password'}
                                        type={'password'}
                                        placeholder={i18n._(t`6+ Karakters`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </Column>
                            <Button big={true} stretch={true} submit={true} loading={context.loading}>
                                {i18n._(t`Inloggen`)}
                            </Button>
                        </Column>
                    </Column>
                </form>
            }
        />
    )

    async function handleOnLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = Forms.getFormDataFromFormEvent<FormModel>(e)

        if (context.login) {
            const response = await context.login({ username: data.email, password: data.password })

            if (response?.errors || !response?.data) {
                return
            }

            NotificationsManager.success(
                i18n._(t`U bent ingelogd`),
                i18n._(t`U word doorgestuurd naar de Top omgeving`)
            )
            history.push(routes.authorized.index)
        }
    }
}

export default LoginView
