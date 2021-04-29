import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import { Maybe, StudentContactPreferenceEnum } from 'generated/graphql'
import React, { ChangeEventHandler, useState } from 'react'
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
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'
import { contactPreferenceTranslations } from '../participants/translations/participantsTranslations'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: ContactInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface ContactInformationFieldsetPrefillData extends StreetNumberAdditionFieldModel {
    telephone?: Maybe<string>
    email?: Maybe<string>
    postalCode?: Maybe<string>
    locality?: Maybe<string>
    contactPersonTelephone?: Maybe<string>
    contactPreference?: Maybe<StudentContactPreferenceEnum>
    contactPreferenceOther?: Maybe<string>
}

export interface ContactInformationFieldsetFormModel extends StreetNumberAdditionFieldModel {
    telephone?: string
    email?: string
    postalCode?: string
    locality?: string
    contactPersonTelephone?: string
    contactPreference?: StudentContactPreferenceEnum
    contactPreferenceOther?: Maybe<string>
}
type Fields =
    | 'email'
    | 'telephone'
    | 'postalCode'
    | 'locality'
    | 'contactPersonTelephone'
    | 'contactPreference'
    | 'address'

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Contactgegevens`),
            email: {
                label: i18n._(t`E-mailadres`),
                placeholder: i18n._(t`gebruiker@mail.nl`),
            },
            telephone: {
                label: i18n._(t`Telefoonnummer`),
                placeholder: i18n._(t`06 - 123 456 78`),
            },
            address: {
                label: i18n._(t`Straatnaam + huisnr.`),
            },
            postalCode: {
                label: i18n._(t`Postcode`),
                placeholder: i18n._(t`1234 AB`),
            },
            locality: {
                label: i18n._(t`Plaats`),
                placeholder: i18n._(t`Plaats`),
            },
            contactPersonTelephone: {
                label: i18n._(t`Tel. nr. contactpersoon`),
                description: i18n._(t`Voor noodgevallen`),
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
            email: {
                validators: [EmailValidators.isEmailAddress],
            },
            telephone: {
                validators: [PhoneNumberValidators.isPhoneNumber],
            },
            postalCode: {
                validators: [PostalCodeValidator.isPostalCode],
            },
            contactPersonTelephone: {
                validators: [PhoneNumberValidators.isPhoneNumber],
            },
            address: {},
        },
        fieldControls
    )

    const [contactPreference, setContactPreference] = useState<Maybe<StudentContactPreferenceEnum> | undefined>(
        prefillData?.contactPreference
    )

    const onChangeContactPreference: ChangeEventHandler<HTMLInputElement> = event => {
        setContactPreference(event.currentTarget.value as StudentContactPreferenceEnum)
    }

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.address} label={content.address?.label} horizontal={true}>
                        {AdressFormatters.formattedAddress({
                            street: prefillData?.street,
                            houseNumber: prefillData?.houseNumber,
                            houseNumberSuffix: prefillData?.houseNumberSuffix,
                        })}
                    </ControlField>

                    <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                        <p>{prefillData?.postalCode}</p>
                    </ControlField>

                    <ControlField control={controls.locality} label={content.locality?.label} horizontal={true}>
                        <p>{prefillData?.locality}</p>
                    </ControlField>

                    <ControlField control={controls.telephone} label={content.telephone?.label} horizontal={true}>
                        <p>{prefillData?.telephone}</p>
                    </ControlField>

                    <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                        <p>{prefillData?.email}</p>
                    </ControlField>

                    <ControlField
                        control={controls.contactPersonTelephone}
                        label={content.contactPersonTelephone?.label}
                        description={content.contactPersonTelephone?.description}
                        horizontal={true}
                    >
                        <p>{prefillData?.contactPersonTelephone}</p>
                    </ControlField>

                    <ControlField
                        control={controls.contactPreference}
                        label={content.contactPreference?.label}
                        horizontal={true}
                    >
                        <Paragraph>
                            {prefillData?.contactPreference &&
                                contactPreferenceTranslations[prefillData?.contactPreference]}
                        </Paragraph>
                        {prefillData?.contactPreference === StudentContactPreferenceEnum.Other && (
                            <Paragraph italic={true}>{prefillData?.contactPreferenceOther}</Paragraph>
                        )}
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
                            houseNumber: prefillData?.houseNumber,
                            houseNumberSuffix: prefillData?.houseNumberSuffix,
                        }}
                    />
                </ControlField>

                <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                    <Input
                        name="postalCode"
                        placeholder={content.postalCode?.placeholder}
                        defaultValue={prefillData?.postalCode || ''}
                        validators={controls.postalCode?.validators}
                    />
                </ControlField>

                <ControlField control={controls.locality} label={content.locality?.label} horizontal={true}>
                    <Input
                        name="locality"
                        placeholder={content.locality?.placeholder}
                        defaultValue={prefillData?.locality || ''}
                    />
                </ControlField>

                <ControlField control={controls.telephone} label={content.telephone?.label} horizontal={true}>
                    <Input
                        name={'telephone'}
                        placeholder={content.telephone?.placeholder}
                        defaultValue={prefillData?.telephone || ''}
                        validators={controls.telephone?.validators}
                    />
                </ControlField>

                <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                    <Input
                        name={'email'}
                        placeholder={content.email?.placeholder}
                        defaultValue={prefillData?.email || ''}
                        validators={controls.email?.validators}
                    />
                </ControlField>

                <ControlField
                    control={controls.contactPersonTelephone}
                    label={content.contactPersonTelephone?.label}
                    description={content.contactPersonTelephone?.description}
                    horizontal={true}
                >
                    <Input
                        name={'contactPersonTelephone'}
                        placeholder={content.contactPersonTelephone?.placeholder}
                        defaultValue={prefillData?.contactPersonTelephone || ''}
                        validators={controls.contactPersonTelephone?.validators}
                    />
                </ControlField>

                <ControlField
                    control={controls.contactPreference}
                    label={content.contactPreference?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        {Object.values(StudentContactPreferenceEnum).map((value, key, array) => (
                            <RadioButton
                                key={`${key}-${array.length}`}
                                name={'contactPreference'}
                                value={value}
                                checked={contactPreference === value}
                                label={contactPreferenceTranslations[value]}
                                onChange={onChangeContactPreference}
                            />
                        ))}
                        {contactPreference === StudentContactPreferenceEnum.Other && (
                            <Input
                                name={'contactPreferenceOther'}
                                defaultValue={prefillData?.contactPreferenceOther || ''}
                                placeholder={i18n._(t`Namelijk...`)}
                            />
                        )}
                    </Column>
                </ControlField>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
