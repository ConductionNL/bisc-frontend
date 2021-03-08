import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
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
    phonenumber: string
    email: string
}

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <p>{prefillData?.phonenumber}</p>
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
                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                    <Input
                        name="phonenumber"
                        placeholder={i18n._(t`Telefoonnummer`)}
                        validators={[PhoneNumberValidators.isPhoneNumber]}
                        defaultValue={prefillData?.phonenumber}
                    />
                </Field>
                <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                    <Input
                        name="callSign"
                        placeholder={i18n._(t`E-mailadres`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.email}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
