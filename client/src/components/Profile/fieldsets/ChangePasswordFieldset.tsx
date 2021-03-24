import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import Password from '../../../components/Core/DataEntry/Password'
import PasswordStrengthBar from '../../../components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'
import Section from '../../../components/Core/Field/Section'
import Column from '../../../components/Core/Layout/Column/Column'
import Space from '../../../components/Core/Layout/Space/Space'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import ControlField from '../../Core/Field/ControlField'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'

interface Props {}

export interface ChangePasswordFieldsetFormModel {
    currentPassword: string
    newPassword: string
    repeatPassword: string
}
type Fields = 'currentPassword' | 'newPassword' | 'repeatPassword'

const ChangePasswordFieldset: React.FunctionComponent<Props> = () => {
    const [password, setPassword] = useState<string>()
    const { i18n } = useLingui()
    const controls = useFieldsetControl<Fields>({
        currentPassword: {
            validators: [GenericValidators.required],
        },
        newPassword: {
            validators: [GenericValidators.required],
        },
        repeatPassword: {
            validators: [GenericValidators.required],
        },
    })
    const content = useFieldsetContent<Fields>({
        title: i18n._(t`Wachtwoord aanpassen`),
        currentPassword: {
            label: i18n._(t`Huidig wachtwoord`),
            placeholder: i18n._(t`Wachtwoord`),
        },
        newPassword: {
            label: i18n._(t`Nieuw wachtwoord`),
            placeholder: i18n._(t`Nieuw wachtwoord`),
        },
        repeatPassword: {
            label: i18n._(t`Bevestig wachtwoord`),
            placeholder: i18n._(t`Bevestig wachtwoord`),
        },
    })

    return (
        <Section title={content.title}>
            <Column spacing={4}>
                <ControlField
                    control={controls.currentPassword}
                    label={content.currentPassword?.label}
                    horizontal={true}
                >
                    <Password
                        name={'currentPassword'}
                        placeholder={content.currentPassword?.placeholder}
                        validators={controls.currentPassword?.validators}
                    />
                </ControlField>

                <ControlField control={controls.newPassword} label={content.newPassword?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Password
                            name={'newPassword'}
                            placeholder={content.newPassword?.placeholder}
                            onChangeValue={value => setPassword(value)}
                            validators={controls.newPassword?.validators}
                        />
                        <PasswordStrengthBar value={password} />
                        <Space />
                    </Column>
                </ControlField>

                <ControlField control={controls.repeatPassword} label={content.newPassword?.label} horizontal={true}>
                    <Password
                        name={'repeatPassword'}
                        placeholder={content.newPassword?.placeholder}
                        validators={controls.repeatPassword?.validators}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default ChangePasswordFieldset
