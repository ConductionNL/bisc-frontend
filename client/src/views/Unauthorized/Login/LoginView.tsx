import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext, useEffect } from 'react'
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
import { Forms } from 'utils/forms'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { routes } from 'routes/routes'
import { usePostLogin } from 'api/authentication/login'
import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'

interface FormModel {
    email: string
    password: string
}

function LoginView() {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const history = useHistory()

    const { mutate: postLogin, loading } = usePostLogin()

    useEffect(() => {
        if (sessionContext.session) {
            // redirect if a session seem to exist
            // when the session turns out to be invalid,
            // the user will be redirected back to the logged-out screen and the session will be removed
            history.push(routes.authorized.index)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionContext.session])

    return (
        <ContentGreetingPageLayout
            greeting={i18n._(t`Welkom bij TOP`)}
            TopComponent={<Logo text={i18n._(t`TOP`)} />}
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
                            <Button big={true} stretch={true} submit={true} loading={loading}>
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

        if (!sessionContext.setSession) {
            throw new Error('Could not login: SessionContext provider not mounted')
        }

        try {
            const response = await postLogin({ username: data.email, password: data.password })
            sessionContext.setSession({
                jwtToken: response.jwtToken,
                userId: response.id,
            })

            NotificationsManager.success(
                i18n._(t`Je bent ingelogd`),
                i18n._(t`Je wordt doorgestuurd naar de TOP omgeving`)
            )

            history.push(routes.authorized.index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data?.message === 'Invalid credentials') {
                NotificationsManager.error(i18n._(t`Deze combinatie e-mailadres & wachtwoord is onjuist`))
            }
        }
    }
}

export default LoginView
