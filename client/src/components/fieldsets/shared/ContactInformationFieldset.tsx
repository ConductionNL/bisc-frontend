import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: ContactInformationFieldsetModel
    readOnly?: true
}

export interface ContactInformationFieldsetModel {
    phone: number | string
    email: string
}

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                        <p>{prefillData?.phone}</p>
                    </Field>

                    <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                        <p>{prefillData?.email}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Contactgegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                    <Input
                        name="phone-number"
                        placeholder={i18n._(t`06 - 123 456 78`)}
                        defaultValue={prefillData?.phone}
                        validators={[PhoneNumberValidators.isPhoneNumber]}
                    />
                </Field>

                <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                    <Input
                        name="email"
                        placeholder={i18n._(t`email@deelnemer.nl`)}
                        defaultValue={prefillData?.email}
                        validators={[EmailValidators.isEmailAddress]}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
