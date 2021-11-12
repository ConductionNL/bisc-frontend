import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { usePutProfile } from 'api/authentication/profile'
import { useLazyGetUser } from 'api/authentication/user'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { OwnProfileFields, OwnProfileFieldsFormModel } from 'components/Domain/Participation/Fields/OwnProfileFields'
import { UserContext } from 'components/Providers/UserProvider/context'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

interface Props extends RouteComponentProps {}

export const ProfileUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const user = useContext(UserContext).user
    const history = useHistory()

    const { mutate: putProfile, loading, error } = usePutProfile()
    const { data: fetchedUser, refetch, loading: loadingUser, error: userError } = useLazyGetUser()

    useEffect(() => {
        if (user) {
            refetch({
                pathParams: {
                    userId: user.id,
                },
            })
        }
    }, [user])

    if (!user || !fetchedUser) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    console.log(fetchedUser)

    return (
        <Form onSubmit={handleUpdate}>
            <Headline title={NameFormatters.formattedFullname(user.person)} />
            <MutationErrorProvider mutationError={error?.data}>
                <OwnProfileFields user={user} />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!user) {
            NotificationsManager.success(i18n._(t`Actie mislukt`))
            return
        }

        const formData = Forms.getFormDataFromFormEvent<OwnProfileFieldsFormModel>(e)

        try {
            await putProfile(
                {
                    organization: user.organization.id,
                    userGroups: fetchedUser?.userGroups.map(group => group.id) || [],
                    username: user?.email!,
                    password: formData.password,
                    currentPassword: formData.currentPassword,
                },
                {
                    pathParams: { userId: user.id },
                }
            )

            NotificationsManager.success(i18n._(t`Wachtwoord is gewijzigd`))

            history.push(routes.authorized.profile.index)
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                console.error(error)
            }
        }
    }
}
