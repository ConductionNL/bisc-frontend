import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext, useState } from 'react'
import Actionbar from '../../../components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Password from '../../../components/Core/DataEntry/Password'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import PasswordStrengthBar from '../../../components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'
import Field from '../../../components/Core/Field/Field'
import Section from '../../../components/Core/Field/Section'
import Column from '../../../components/Core/Layout/Column/Column'
import Space from '../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../components/Core/Text/PageTitle'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { NameFormatters } from '../../../utils/formatters/name/Name'

interface Props {}

const ProfilePage: React.FunctionComponent<Props> = () => {
    const [password, setPassword] = useState<string>()
    const userContext = useContext(UserContext)
    const { i18n } = useLingui()

    return (
        <>
            <Column spacing={12}>
                <PageTitle
                    title={NameFormatters.formattedFullname({
                        givenName: userContext.user?.givenName,
                        additionalName: userContext.user?.additionalName,
                        familyName: userContext.user?.familyName,
                    })}
                    size={PageTitleSize.default}
                />
                <Section title={i18n._(t`Wachtwoord aanpassen`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Huidig wachtwoord`)} horizontal={true}>
                            <Password placeholder={i18n._(t`Wachtwoord`)} onChange={undefined} />
                        </Field>

                        <Field label={i18n._(t`Nieuw wachtwoord`)} horizontal={true}>
                            <Column spacing={4}>
                                <Password
                                    placeholder={i18n._(t`Wachtwoord`)}
                                    onChangeValue={value => setPassword(value)}
                                />
                                <PasswordStrengthBar value={password} />
                                <Space />
                            </Column>
                        </Field>

                        <Field label={i18n._(t`Bevestig wachtwoord`)} horizontal={true}>
                            <Password placeholder={i18n._(t`Wachtwoord`)} />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    // TODO: implement the changePassword mutation
                    <Button type={ButtonType.primary} onClick={() => NotificationsManager.success('title', 'test')}>
                        {i18n._(t`Wachtwoord wijzigen`)}
                    </Button>
                }
            />
        </>
    )
}

export default ProfilePage
