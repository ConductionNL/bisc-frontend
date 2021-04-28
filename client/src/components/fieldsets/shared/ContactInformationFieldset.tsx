import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { AdressFormatters } from '../../../utils/formatters/Address/Address'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import { PostalCodeValidator } from '../../../utils/validators/PostalCodeValidators'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import StreetNumberAdditionField, {
    StreetNumberAdditionFieldModel,
} from '../../Core/DataEntry/StreetNumberAdditionField'
import ControlField from '../../Core/Field/ControlField'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: ContactInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface ContactInformationFieldsetPrefillData extends StreetNumberAdditionFieldModel {
    phone?: string | null
    email?: string | null
    postalCode?: string | null
    city?: string
    phoneNumberContactPerson?: string | null
    contactPreference?: string | null
}

export interface ContactInformationFieldsetFormModel extends StreetNumberAdditionFieldModel {
    contactPhone: string
    contactEmail: string
    contactPostalCode?: string
    contactCity?: string
    contactPhoneNumberContactPerson?: string
    contactPreference?: string
}

type Fields =
    | 'contactEmail'
    | 'contactPhone'
    | 'contactPostalCode'
    | 'contactCity'
    | 'phoneNumberContactPerson'
    | 'contactPreference'
    | 'address'

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Contactgegevens`),
            contactEmail: {
                label: i18n._(t`E-mailadres`),
                placeholder: i18n._(t`gebruiker@mail.nl`),
            },
            contactPhone: {
                label: i18n._(t`Telefoonnummer`),
                placeholder: i18n._(t`06 - 123 456 78`),
            },
            address: {
                label: i18n._(t`Straatnaam + huisnr.`),
            },
            contactPostalCode: {
                label: i18n._(t`Postcode`),
                placeholder: i18n._(t`1234 AB`),
            },
            contactCity: {
                label: i18n._(t`Plaats`),
                placeholder: i18n._(t`Plaats`),
            },
            phoneNumberContactPerson: {
                label: i18n._(t`Tel. nr. contactpersoon`),
                placeholder: i18n._(t`06 - 123 456 78`),
            },
            contactPreference: {
                label: i18n._(t`Contact bij voorkeur`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            contactEmail: {
                validators: [EmailValidators.isEmailAddress],
            },
            contactPhone: {
                validators: [PhoneNumberValidators.isPhoneNumber],
            },
            contactPostalCode: {
                validators: [PostalCodeValidator.isPostalCode],
            },
            phoneNumberContactPerson: {
                validators: [PhoneNumberValidators.isPhoneNumber],
            },
            address: {},
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.address} label={content.address?.label} horizontal={true}>
                        {AdressFormatters.formattedAddress({
                            street: prefillData?.street,
                            houseNumber: prefillData?.streetNr,
                            houseNumberSuffix: prefillData?.addition,
                        })}
                    </ControlField>

                    <ControlField
                        control={controls.contactPostalCode}
                        label={content.contactPostalCode?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.postalCode}</p>
                    </ControlField>

                    <ControlField control={controls.contactCity} label={content.contactCity?.label} horizontal={true}>
                        <p>{prefillData?.city}</p>
                    </ControlField>

                    <ControlField
                        control={controls.phoneNumberContactPerson}
                        label={content.phoneNumberContactPerson?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.phoneNumberContactPerson}</p>
                    </ControlField>

                    <ControlField
                        control={controls.contactPreference}
                        label={content.contactPreference?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.contactPreference}</p>
                    </ControlField>

                    <ControlField control={controls.contactPhone} label={content.contactPhone?.label} horizontal={true}>
                        <p>{prefillData?.phone}</p>
                    </ControlField>

                    <ControlField control={controls.contactEmail} label={content.contactEmail?.label} horizontal={true}>
                        <p>{prefillData?.email}</p>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={content.title}>
            <Column spacing={4}>
                <ControlField control={controls.address} label={content.address?.label} horizontal={true}>
                    <StreetNumberAdditionField
                        prefillData={{
                            street: prefillData?.street,
                            streetNr: prefillData?.streetNr,
                            addition: prefillData?.addition,
                        }}
                    />
                </ControlField>

                <ControlField
                    control={controls.contactPostalCode}
                    label={content.contactPostalCode?.label}
                    horizontal={true}
                >
                    <Input
                        name="postalCode"
                        placeholder={content.contactPostalCode?.placeholder}
                        defaultValue={prefillData?.postalCode || ''}
                        validators={controls.contactPostalCode?.validators}
                    />
                </ControlField>

                <ControlField control={controls.contactCity} label={content.contactCity?.label} horizontal={true}>
                    <Input
                        name="city"
                        placeholder={content.contactCity?.placeholder}
                        defaultValue={prefillData?.city || ''}
                    />
                </ControlField>

                <ControlField control={controls.contactEmail} label={content.contactEmail?.label} horizontal={true}>
                    <Input
                        name="email"
                        placeholder={content.contactEmail?.placeholder}
                        defaultValue={prefillData?.email || ''}
                        validators={controls.contactEmail?.validators}
                    />
                </ControlField>

                <ControlField
                    control={controls.phoneNumberContactPerson}
                    label={content.phoneNumberContactPerson?.label}
                    horizontal={true}
                >
                    <Input
                        name="phoneNumberContactPerson"
                        placeholder={content.phoneNumberContactPerson?.placeholder}
                        defaultValue={prefillData?.phoneNumberContactPerson || ''}
                        validators={controls.phoneNumberContactPerson?.validators}
                    />
                </ControlField>

                <ControlField
                    control={controls.contactPreference}
                    label={content.contactPreference?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'contact-preference'} value="call" />
                            <p>{i18n._(t`Bellen`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-preference'} value="whatsapp" />
                            <p>{i18n._(t`Whatsapp`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-preference'} value="mailen" />
                            <p>{i18n._(t`Mailen`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-preference'} value="mailen" />
                            <p>{i18n._(t`Anders, namelijk:`)}</p>
                        </Row>
                        <Input name="contact-preference-input" placeholder={i18n._(t`Anders`)} />
                    </Column>
                </ControlField>

                <ControlField control={controls.contactPhone} label={content.contactPhone?.label} horizontal={true}>
                    <Input
                        name="phone"
                        placeholder={content.contactPhone?.placeholder}
                        defaultValue={prefillData?.phone || ''}
                        validators={controls.contactPhone?.validators}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
