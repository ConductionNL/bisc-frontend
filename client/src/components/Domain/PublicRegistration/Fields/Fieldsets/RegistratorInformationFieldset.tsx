import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { EmailValidators } from 'utils/validators/EmailValidators'
import { PhoneNumberValidators } from 'utils/validators/PhoneNumberValidator'

export interface RegistratorInformationFieldsetModel {
    registeringParty: string | null
    registratorLastName: string | null
    registratorAddition?: string | null
    registratorNickName: string | null
    registratorEmail: string | null
    registratorPhone: string | null
}

const RegistratorInformationFieldset: React.FunctionComponent = () => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Aanmelder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanmeldende organisatie`)} horizontal={true} required={true}>
                    <Input required={true} name="registeringParty" placeholder={i18n._(t`Uw organisatie`)} />
                </Field>
                <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                    <Input name="registratorLastName" placeholder={i18n._(t`Achternaamam`)} required={true} />
                </Field>
                <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                    <Input name="registratorAddition" placeholder={i18n._(t`Tussenvoegsel`)} />
                </Field>
                <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                    <Input name="registratorNickName" placeholder={i18n._(t`Roepnaam`)} required={true} />
                </Field>
                <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                    <Input
                        name="registratorEmail"
                        placeholder={i18n._(t`naam@organisatie.nl`)}
                        validators={[EmailValidators.isEmailAddress]}
                        required={true}
                    />
                </Field>
                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true} required={true}>
                    <Input
                        name="registratorPhone"
                        placeholder={i18n._(t`06 - 12 34 56 78`)}
                        validators={[PhoneNumberValidators.isPhoneNumber]}
                        required={true}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default RegistratorInformationFieldset
