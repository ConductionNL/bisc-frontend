import React from 'react'
import { Student } from 'api/types/types'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { ContactInformationFieldset } from 'components/fieldsets/shared/ContactInformationFieldset'
import { PersonInformationFieldset } from 'components/fieldsets/shared/PersonInformationFieldset'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import Field from 'components/Core/Field/Field'
import nl2br from 'react-nl2br'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    student?: Student
}

export const RegistrationReadFields: React.FunctionComponent<Props> = props => {
    const { student } = props
    const { i18n } = useLingui()

    const address = student?.person.addresses?.[0]
    const telephone = student?.person.telephones?.[0]
    const email = student?.person.emails?.[0]

    return (
        <>
            <PersonInformationFieldset
                alternativeFieldsetTitle={i18n._(t`Naam`)}
                readOnly={true}
                prefillData={{
                    'person.givenName': student?.person.givenName,
                    'person.additionalName': student?.person.additionalName,
                    'person.familyName': student?.person.familyName,
                }}
                fieldControls={{
                    countryOfOrigin: {
                        hidden: true,
                    },
                    birthday: {
                        hidden: true,
                    },
                    gender: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                alternativeFieldsetTitle={i18n._(t`Adresgegevens`)}
                readOnly={true}
                prefillData={{
                    'person.addresses[0].street': address?.street,
                    'person.addresses[0].houseNumber': address?.houseNumber,
                    'person.addresses[0].houseNumberSuffix': address?.houseNumberSuffix,
                    'person.addresses[0].postalCode': address?.postalCode,
                    'person.addresses[0].locality': address?.locality,
                }}
                fieldControls={{
                    email: { hidden: true },
                    telephone: { hidden: true },
                    contactPersonTelephone: { hidden: true },
                    contactPreference: { hidden: true },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                readOnly={true}
                prefillData={{
                    'person.telephones[0].telephone': telephone?.telephone,
                    'person.emails[0].email': email?.email,
                }}
                fieldControls={{
                    address: { hidden: true },
                    postalCode: { hidden: true },
                    locality: { hidden: true },
                    contactPersonTelephone: { hidden: true },
                    contactPreference: { hidden: true },
                }}
            />
            <HorizontalRule />
            <Section title={i18n._(t`Aanmelder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Datum`)} horizontal={true}>
                        <Paragraph>{DateFormatters.formattedDate(student?.['@dateCreated'], 'DD-MM-YYYY')}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                        <Paragraph>{student?.intake?.referringOrganizationOther}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Naam`)} horizontal={true}>
                        <Paragraph>
                            {student?.intake?.referringPerson &&
                                NameFormatters.formattedFullname(student?.intake?.referringPerson)}
                        </Paragraph>
                    </Field>
                    <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                        <Paragraph>{student?.intake?.referringPerson.emails?.[0]?.email}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <Paragraph>{student?.intake?.referringPerson.telephones?.[0]?.telephone}</Paragraph>
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Section title={i18n._(t`Toelichting`)}>
                <Column spacing={4}>
                    <Field horizontal={true} label={i18n._(t`Notitie`)}>
                        <Paragraph>{nl2br(student?.intake?.remarks)}</Paragraph>
                    </Field>
                </Column>
            </Section>
        </>
    )
}
