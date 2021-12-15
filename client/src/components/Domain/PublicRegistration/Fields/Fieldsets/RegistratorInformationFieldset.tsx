import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'api/types/types'
import Input from 'components/Core/DataEntry/Input'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { EmailValidators } from 'utils/validators/EmailValidators'
import { PhoneNumberValidators } from 'utils/validators/PhoneNumberValidator'

export interface RegistratorInformationFieldsetModel {
    'intake.referringOrganizationOther'?: Maybe<string>
    'intake.referringPerson.givenName'?: Maybe<string>
    'intake.referringPerson.additionalName'?: Maybe<string>
    'intake.referringPerson.familyName'?: Maybe<string>
    'intake.referringPerson.emails[0].email'?: Maybe<string>
    'intake.referringPerson.telephones[0].telephone'?: Maybe<string>
}

const RegistratorInformationFieldset: React.FunctionComponent = () => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Aanmelder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanmeldende organisatie`)} horizontal={true} required={true}>
                    <Input
                        required={true}
                        name="intake.referringOrganizationOther"
                        placeholder={i18n._(t`Uw organisatie`)}
                    />
                </Field>
                <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                    <Input name="intake.referringPerson.givenName" placeholder={i18n._(t`Roepnaam`)} required={true} />
                </Field>
                <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                    <Input name="intake.referringPerson.additionalName" placeholder={i18n._(t`Tussenvoegsel`)} />
                </Field>
                <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                    <Input
                        name="intake.referringPerson.familyName"
                        placeholder={i18n._(t`Achternaamam`)}
                        required={true}
                    />
                </Field>
                <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                    <Input
                        name="intake.referringPerson.emails[0].email"
                        placeholder={i18n._(t`naam@organisatie.nl`)}
                        validators={[EmailValidators.isEmailAddress]}
                        required={true}
                    />
                </Field>
                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true} required={true}>
                    <Input
                        name="intake.referringPerson.telephones[0].telephone"
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
