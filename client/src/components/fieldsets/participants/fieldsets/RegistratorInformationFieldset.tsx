import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { DateFormatters } from '../../../../utils/formatters/Date/Date'
import { EmailValidators } from '../../../../utils/validators/EmailValidators'
import { PhoneNumberValidators } from '../../../../utils/validators/PhoneNumberValidator'
import DateInput from '../../../Core/DataEntry/DateInput'
import Input from '../../../Core/DataEntry/Input'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'

interface Props {
    prefillData?: RegistratorInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface RegistratorInformationFieldsetPrefillData {
    date?: string | null
    registeringParty?: string | null
    registratorName?: string | null
    registratorEmail?: string | null
    registratorPhone?: string | null
}

export interface RegistratorInformationFieldsetModel {
    date?: string
    registeringParty?: string
    registratorName?: string
    registratorEmail?: string
    registratorPhone?: string
}

const RegistratorInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Aanmelder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Datum`)} horizontal={true}>
                        <p>{DateFormatters.formattedDate(prefillData?.date ?? undefined)}</p>
                    </Field>

                    <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                        <p>{prefillData?.registeringParty}</p>
                    </Field>

                    <Field label={i18n._(t`Naam`)} horizontal={true}>
                        <p>{prefillData?.registratorName}</p>
                    </Field>

                    <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                        <p>{prefillData?.registratorEmail}</p>
                    </Field>

                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <p>{prefillData?.registratorPhone}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Aanmelder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Datum`)} horizontal={true}>
                    <DateInput
                        name="date"
                        placeholder={i18n._(t`01/01/2020`)}
                        defaultValue={prefillData?.date ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Input
                        name="registeringParty"
                        placeholder={i18n._(t`1234 AB`)}
                        defaultValue={prefillData?.registeringParty ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Naam`)} horizontal={true}>
                    <Input
                        name="registratorName"
                        placeholder={i18n._(t`Naam`)}
                        defaultValue={prefillData?.registratorName ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                    <Input
                        name="registratorEmail"
                        placeholder={i18n._(t`email@deelnemer.nl`)}
                        defaultValue={prefillData?.registratorEmail ?? undefined}
                        validators={[EmailValidators.isEmailAddress]}
                    />
                </Field>
                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                    <Input
                        name="registratorPhone"
                        placeholder={i18n._(t`06 - 12 34 56 78`)}
                        defaultValue={prefillData?.registratorPhone ?? undefined}
                        validators={[PhoneNumberValidators.isPhoneNumber]}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default RegistratorInformationFieldset
