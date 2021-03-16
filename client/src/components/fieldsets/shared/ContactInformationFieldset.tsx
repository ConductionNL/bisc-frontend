import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import Input from '../../Core/DataEntry/Input'
import ControlField from '../../Core/Field/ControlField'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: ContactInformationFieldsetModel
    readOnly?: true
}

export interface ContactInformationFieldsetModel {
    phone: string
    email: string
}
type Fields = 'email' | 'phone'

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            email: {
                label: i18n._(t`E-mailadres`),
                placeholder: i18n._(t`gebruiker@mail.nl`),
            },
            phone: {
                label: i18n._(t`Tel. nr.`),
                placeholder: i18n._(t`06 - 123 456 78`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            email: {
                validators: [EmailValidators.isEmailAddress],
            },
            phone: {
                validators: [PhoneNumberValidators.isPhoneNumber],
            },
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <ControlField control={controls.phone} label={content.phone?.label} horizontal={true}>
                        <p>{prefillData?.phone}</p>
                    </ControlField>

                    <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                        <p>{prefillData?.email}</p>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Contactgegevens`)}>
            <Column spacing={4}>
                <ControlField label={content.phone?.label} horizontal={true}>
                    <Input
                        name="phone"
                        placeholder={content.phone?.placeholder}
                        defaultValue={prefillData?.phone}
                        validators={controls.phone?.validators}
                    />
                </ControlField>

                <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                    <Input
                        name="email"
                        placeholder={content.email?.placeholder}
                        defaultValue={prefillData?.email}
                        validators={controls.email?.validators}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
