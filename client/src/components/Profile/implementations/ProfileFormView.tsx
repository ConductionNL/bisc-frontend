import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import Actionbar from '../../../components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import Form from '../../../components/Core/Form/Form'
import Column from '../../../components/Core/Layout/Column/Column'
import Space from '../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../components/Core/Text/PageTitle'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { useChangePasswordMutation } from '../../../generated/graphql'
import { NameFormatters } from '../../../utils/formatters/name/Name'
import { Forms } from '../../../utils/forms'
import ChangePasswordFieldset, { ChangePasswordFieldsetFormModel } from '../fieldsets/ChangePasswordFieldset'

interface Props {}

interface FormModel extends ChangePasswordFieldsetFormModel {}

const ProfileFormView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)
    const { i18n } = useLingui()
    const [changePasswordMutation, { loading }] = useChangePasswordMutation()

    return (
        <Form onSubmit={handleChangePassword}>
            <Column spacing={12}>
                <PageTitle
                    title={NameFormatters.formattedFullname({
                        givenName: userContext.user?.givenName,
                        additionalName: userContext.user?.additionalName,
                        familyName: userContext.user?.familyName,
                    })}
                    size={PageTitleSize.default}
                />
                <ChangePasswordFieldset />
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button type={ButtonType.primary} loading={loading} submit={true}>
                        {i18n._(t`Wachtwoord wijzigen`)}
                    </Button>
                }
            />
        </Form>
    )

    async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)

        if (formData.newPassword !== formData.repeatPassword) {
            NotificationsManager.error(
                i18n._(t`Er ging iets fout`),
                i18n._(t`De ingevoerde wachtwoorden komen niet overeen`)
            )
            return
        }

        const response = await changePasswordMutation({
            variables: {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is bijgewerkt`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )
    }
}

export default ProfileFormView
