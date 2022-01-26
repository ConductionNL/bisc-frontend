import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetAvailablePostalCodes } from 'api/postalCode/postalCode'
import { Maybe, PostalCode } from 'api/types/types'
import { TaalhuisPostcodeField, TaalhuisPostcodeFieldModel } from 'components/Domain/Taalhuis/TaalhuisPostcodeField'
import React from 'react'
import { AdressFormatters } from 'utils/formatters/Address/Address'
import Input from '../../Core/DataEntry/Input'
import StreetNumberAdditionField from '../../Core/DataEntry/StreetNumberAdditionField'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import HorizontalRule from '../../Core/HorizontalRule/HorizontalRule'
import Column from '../../Core/Layout/Column/Column'
import Space from '../../Core/Layout/Space/Space'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: TaalhuisInformationFieldsetPrefillData
    readOnly?: true
}

export interface TaalhuisInformationFieldsetModel extends TaalhuisPostcodeFieldModel {
    name?: Maybe<string>
    'addresses[0].street'?: Maybe<string>
    'addresses[0].houseNumber'?: Maybe<string>
    'addresses[0].houseNumberSuffix'?: Maybe<string>
    'addresses[0].postalCode'?: Maybe<string>
    'addresses[0].locality'?: Maybe<string>
    'addresses[0].country'?: Maybe<string>
    'telephones[0].telephone'?: Maybe<string>
    'emails[0].email'?: Maybe<string>
}

export interface TaalhuisInformationFieldsetPrefillData {
    name?: Maybe<string>
    'addresses[0].street'?: Maybe<string>
    'addresses[0].houseNumber'?: Maybe<string>
    'addresses[0].houseNumberSuffix'?: Maybe<string>
    'addresses[0].postalCode'?: Maybe<string>
    'addresses[0].locality'?: Maybe<string>
    'addresses[0].country'?: Maybe<string>
    'telephones[0].telephone'?: Maybe<string>
    'emails[0].email'?: Maybe<string>
    languageHouse_postalCodes?: Maybe<PostalCode[]>
}

// NOTE: Don't use these fieldset for new screens, these should be split up in a TaalhuisBranchInformationFieldset and TaalhuisContactInformationFieldset
const TaalhuisInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <>
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Naam Taalhuis`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.name}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Paragraph>
                                {AdressFormatters.formattedAddress({
                                    street: prefillData?.['addresses[0].street'],
                                    houseNumber: prefillData?.['addresses[0].houseNumber'],
                                    houseNumberSuffix: prefillData?.['addresses[0].houseNumberSuffix'],
                                })}
                            </Paragraph>
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['addresses[0].postalCode']}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['addresses[0].locality']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <HorizontalRule />
                <TaalhuisPostcodeField defaultValues={prefillData?.languageHouse_postalCodes} readOnly={true} />
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

                <Space pushTop={true} />
            </>
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, loading } = useGetAvailablePostalCodes()

    return (
        <>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                        <Input
                            name="name"
                            placeholder={i18n._(t`Taalhuis X`)}
                            defaultValue={prefillData?.name ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                        <StreetNumberAdditionField
                            prefixName="addresses[0]."
                            prefillData={{
                                street: prefillData?.['addresses[0].street'] || '',
                                houseNumber: prefillData?.['addresses[0].houseNumber'] || '',
                                houseNumberSuffix: prefillData?.['addresses[0].houseNumberSuffix'] || '',
                            }}
                        />
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <Input
                            name="addresses[0].postalCode"
                            placeholder={i18n._(t`1234AB`)}
                            defaultValue={prefillData?.['addresses[0].postalCode'] ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <Input
                            name="addresses[0].locality"
                            placeholder={i18n._(t`Utrecht`)}
                            defaultValue={prefillData?.['addresses[0].locality'] ?? undefined}
                        />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <TaalhuisPostcodeField
                errorPath="languageHouse_postalCodes\[[0-9]+\]\.code"
                loading={loading}
                options={data?.postalCodes.map(code => ({ label: code, value: code }))}
                defaultValues={prefillData?.languageHouse_postalCodes}
            />
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                name="telephones[0].telephone"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                defaultValue={prefillData?.['telephones[0].telephone'] ?? undefined}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input
                                name="emails[0].email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                defaultValue={prefillData?.['emails[0].email'] ?? undefined}
                            />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
        </>
    )
}

export default TaalhuisInformationFieldset
