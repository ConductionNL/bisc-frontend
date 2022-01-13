import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ContactPreference, Maybe } from 'api/types/types'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { ChangeEventHandler, useState } from 'react'
import { AdressFormatters } from '../../../utils/formatters/Address/Address'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import StreetNumberAdditionField from '../../Core/DataEntry/StreetNumberAdditionField'
import ControlField from '../../Core/Field/ControlField'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'
import { contactPreferenceTranslations } from '../participants/translations/participantsTranslations'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: ContactInformationFieldsetFormModel
    readOnly?: boolean
    alternativeFieldsetTitle?: string
}

export interface ContactInformationFieldsetFormModel {
    'person.addresses[0].street'?: Maybe<string>
    'person.addresses[0].houseNumber'?: Maybe<string>
    'person.addresses[0].houseNumberSuffix'?: Maybe<string>
    'person.addresses[0].postalCode'?: Maybe<string>
    'person.addresses[0].locality'?: Maybe<string>
    'person.telephones[0].telephone'?: Maybe<string>
    'person.emails[0].email'?: Maybe<string>
    'person.telephones[1].telephone'?: Maybe<string>
    'person.contactPreference'?: Maybe<ContactPreference>
    'person.contactPreferenceOther'?: Maybe<string>
}

type Fields =
    | 'email'
    | 'telephone'
    | 'postalCode'
    | 'locality'
    | 'contactPersonTelephone'
    | 'contactPreference'
    | 'address'

export const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls, alternativeFieldsetTitle } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: alternativeFieldsetTitle ?? i18n._(t`Contactgegevens`),
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
            email: {},
            telephone: {},
            postalCode: {},
            contactPersonTelephone: {},
            address: {},
        },
        fieldControls
    )

    const [contactPreference, setContactPreference] = useState<Maybe<ContactPreference> | undefined>(
        prefillData?.['person.contactPreference']
    )

    const onChangeContactPreference: ChangeEventHandler<HTMLInputElement> = event => {
        setContactPreference(event.currentTarget.value as ContactPreference)
    }

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.address} label={content.address?.label} horizontal={true}>
                        {AdressFormatters.formattedAddress({
                            street: prefillData?.['person.addresses[0].street'],
                            houseNumber: prefillData?.['person.addresses[0].houseNumber'],
                            houseNumberSuffix: prefillData?.['person.addresses[0].houseNumberSuffix'],
                        })}
                    </ControlField>

                    <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                        <p>{prefillData?.['person.addresses[0].postalCode']}</p>
                    </ControlField>

                    <ControlField control={controls.locality} label={content.locality?.label} horizontal={true}>
                        <p>{prefillData?.['person.addresses[0].locality']}</p>
                    </ControlField>

                    <ControlField control={controls.telephone} label={content.telephone?.label} horizontal={true}>
                        <p>{prefillData?.['person.telephones[0].telephone']}</p>
                    </ControlField>

                    <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                        <p>{prefillData?.['person.emails[0].email']}</p>
                    </ControlField>

                    <ControlField
                        control={controls.contactPersonTelephone}
                        label={content.contactPersonTelephone?.label}
                        description={content.contactPersonTelephone?.description}
                        horizontal={true}
                    >
                        <p>{prefillData?.['person.telephones[1].telephone']}</p>
                    </ControlField>

                    <ControlField
                        control={controls.contactPreference}
                        label={content.contactPreference?.label}
                        horizontal={true}
                    >
                        <Paragraph>
                            {prefillData?.['person.contactPreference'] &&
                                contactPreferenceTranslations[prefillData?.['person.contactPreference']]}
                        </Paragraph>
                        {prefillData?.['person.contactPreference'] === ContactPreference.Other && (
                            <Paragraph italic={true}>{prefillData?.['person.contactPreferenceOther']}</Paragraph>
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
                            street: prefillData?.['person.addresses[0].street'],
                            houseNumber: prefillData?.['person.addresses[0].houseNumber'],
                            houseNumberSuffix: prefillData?.['person.addresses[0].houseNumberSuffix'],
                        }}
                        prefixName={'person.addresses[0].'}
                    />
                </ControlField>

                <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                    <Input
                        name="person.addresses[0].postalCode"
                        placeholder={content.postalCode?.placeholder}
                        defaultValue={prefillData?.['person.addresses[0].postalCode'] || ''}
                    />
                </ControlField>

                <ControlField control={controls.locality} label={content.locality?.label} horizontal={true}>
                    <Input
                        name="person.addresses[0].locality"
                        placeholder={content.locality?.placeholder}
                        defaultValue={prefillData?.['person.addresses[0].locality'] || ''}
                    />
                </ControlField>

                <ControlField control={controls.telephone} label={content.telephone?.label} horizontal={true}>
                    <Input
                        name={'person.telephones[0].telephone'}
                        placeholder={content.telephone?.placeholder}
                        defaultValue={prefillData?.['person.telephones[0].telephone'] || ''}
                    />
                </ControlField>

                <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                    <Input
                        name={'person.emails[0].email'}
                        placeholder={content.email?.placeholder}
                        defaultValue={prefillData?.['person.emails[0].email'] || ''}
                    />
                </ControlField>

                <ControlField
                    control={controls.contactPersonTelephone}
                    label={content.contactPersonTelephone?.label}
                    description={content.contactPersonTelephone?.description}
                    horizontal={true}
                >
                    <Input
                        name={'person.telephones[1].telephone'}
                        placeholder={content.contactPersonTelephone?.placeholder}
                        defaultValue={prefillData?.['person.telephones[1].telephone'] || ''}
                    />
                </ControlField>

                <ControlField
                    control={controls.contactPreference}
                    label={content.contactPreference?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        {Object.values(ContactPreference).map((value, key, array) => (
                            <RadioButton
                                key={`${key}-${array.length}`}
                                name={'person.contactPreference'}
                                value={value}
                                defaultChecked={contactPreference === value}
                                label={contactPreferenceTranslations[value]}
                                onChange={onChangeContactPreference}
                            />
                        ))}
                        {contactPreference === ContactPreference.Other && (
                            <Input
                                name={'person.contactPreferenceOther'}
                                defaultValue={prefillData?.['person.contactPreferenceOther'] || ''}
                                placeholder={i18n._(t`Namelijk...`)}
                            />
                        )}
                    </Column>
                </ControlField>
            </Column>
        </Section>
    )
}
