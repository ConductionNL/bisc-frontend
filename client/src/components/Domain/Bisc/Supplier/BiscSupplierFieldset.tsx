import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'api/types/types'
import Input from 'components/Core/DataEntry/Input'
import StreetNumberAdditionField from 'components/Core/DataEntry/StreetNumberAdditionField'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { AdressFormatters } from 'utils/formatters/Address/Address'

interface Props {
    prefillData?: BiscSupplierFieldsetModel
    readOnly?: boolean
}

export interface BiscSupplierFieldsetModel {
    name?: Maybe<string>
    'addresses[0].street'?: Maybe<string>
    'addresses[0].houseNumber'?: Maybe<string>
    'addresses[0].houseNumberSuffix'?: Maybe<string>
    'addresses[0].postalCode'?: Maybe<string>
    'addresses[0].locality'?: Maybe<string>
    'telephones[0].telephone'?: Maybe<string>
    'emails[0].email'?: Maybe<string>
}

export function BiscSupplierFieldset(props: Props) {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <>
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field horizontal={true} label={i18n._(t`Naam vestiging`)}>
                            <Paragraph>{i18n._(t`${prefillData?.name}`)}</Paragraph>
                        </Field>
                        <Field horizontal={true} label={i18n._(t`Straat en huisnr.`)}>
                            <Paragraph>
                                {AdressFormatters.formattedAddress({
                                    street: prefillData?.['addresses[0].street'],
                                    houseNumber: prefillData?.['addresses[0].houseNumber'],
                                    houseNumberSuffix: prefillData?.['addresses[0].houseNumberSuffix'],
                                })}
                            </Paragraph>
                        </Field>
                        <Field horizontal={true} label={i18n._(t`Postcode`)}>
                            <Paragraph>{i18n._(t`${prefillData?.['addresses[0].postalCode']}`)}</Paragraph>
                        </Field>
                        <Field horizontal={true} label={i18n._(t`Plaats`)}>
                            <Paragraph>{i18n._(t`${prefillData?.['addresses[0].locality']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <HorizontalRule />
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['telephones[0].telephone']}`)}</Paragraph>
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['emails[0].email']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
            </>
        )
    }

    return (
        <>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field horizontal={true} label={i18n._(t`Naam vestiging`)}>
                        <Input
                            name="name"
                            placeholder={i18n._(t`Naam vestiging`)}
                            defaultValue={prefillData?.name ?? undefined}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Straat en huisnr.`)}>
                        <StreetNumberAdditionField
                            prefixName="addresses[0]."
                            prefillData={{
                                street: prefillData?.['addresses[0].street'] ?? undefined,
                                houseNumber: prefillData?.['addresses[0].houseNumber'] ?? undefined,
                                houseNumberSuffix: prefillData?.['addresses[0].houseNumberSuffix'] ?? undefined,
                            }}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Postcode`)}>
                        <Input
                            name="addresses[0].postalCode"
                            placeholder={i18n._(t`1234 AB`)}
                            defaultValue={prefillData?.['addresses[0].postalCode'] ?? undefined}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Plaats`)}>
                        <Input
                            name="addresses[0].locality"
                            placeholder={i18n._(t`Utrecht`)}
                            defaultValue={prefillData?.['addresses[0].locality'] ?? undefined}
                        />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <Input
                            name={'telephones[0].telephone'}
                            placeholder={i18n._(t`030 - 123 45 67`)}
                            defaultValue={prefillData?.['telephones[0].telephone'] ?? ''}
                        />
                    </Field>
                    <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                        <Input
                            name={'emails[0].email'}
                            placeholder={i18n._(t`aanbieder@email.nl`)}
                            defaultValue={prefillData?.['emails[0].email'] || ''}
                        />
                    </Field>
                </Column>
            </Section>
        </>
    )
}
