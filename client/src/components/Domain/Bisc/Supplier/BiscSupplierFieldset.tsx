import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'api/types/types'
import Input from 'components/Core/DataEntry/Input'
import StreetNumberAdditionField from 'components/Core/DataEntry/StreetNumberAdditionField'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'

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

    return (
        <>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field horizontal={true} required={true} label={i18n._(t`Naam vestiging`)} readOnly={readOnly}>
                        <Input
                            readOnly={readOnly}
                            name="name"
                            placeholder={i18n._(t`Naam vestiging`)}
                            defaultValue={prefillData?.name ?? undefined}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Straat en huisnr.`)} readOnly={readOnly}>
                        <StreetNumberAdditionField
                            readOnly={readOnly}
                            prefixName="addresses[0]."
                            prefillData={{
                                street: prefillData?.['addresses[0].street'] ?? undefined,
                                houseNumber: prefillData?.['addresses[0].houseNumber'] ?? undefined,
                                houseNumberSuffix: prefillData?.['addresses[0].houseNumberSuffix'] ?? undefined,
                            }}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Postcode`)} readOnly={readOnly}>
                        <Input
                            readOnly={readOnly}
                            name="addresses[0].postalCode"
                            placeholder={i18n._(t`1234 AB`)}
                            defaultValue={prefillData?.['addresses[0].postalCode'] ?? undefined}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Plaats`)} readOnly={readOnly}>
                        <Input
                            readOnly={readOnly}
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
                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true} readOnly={readOnly}>
                        <Input
                            readOnly={readOnly}
                            name={'telephones[0].telephone'}
                            placeholder={i18n._(t`030 - 123 45 67`)}
                            defaultValue={prefillData?.['telephones[0].telephone'] ?? ''}
                        />
                    </Field>
                    <Field label={i18n._(t`E-mailadres`)} horizontal={true} readOnly={readOnly}>
                        <Input
                            readOnly={readOnly}
                            name={'emails[0].email'}
                            placeholder={i18n._(t`Taalhuis@email.nl`)}
                            defaultValue={prefillData?.['emails[0].email'] || ''}
                        />
                    </Field>
                </Column>
            </Section>
        </>
    )
}
