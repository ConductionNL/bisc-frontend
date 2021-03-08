import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: ContactInformationFieldsetModel
    readOnly?: true
}

export interface ContactInformationFieldsetModel {
    adres: string
    postalCode: string
    city: string
    phoneNumberContactPerson: string
    contact: string
}

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true}>
                        <p>{prefillData?.adres}</p>
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <p>{prefillData?.postalCode}</p>
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <p>{prefillData?.city}</p>
                    </Field>

                    <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                        <p>{prefillData?.phoneNumberContactPerson}</p>
                    </Field>

                    <Field label={i18n._(t`Contact bij voorkeur`)} horizontal={true}>
                        <p>{prefillData?.contact}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Contactgegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true}>
                    <Input
                        name="street"
                        placeholder={i18n._(t`Straatnaam + huisnr.`)}
                        defaultValue={prefillData?.adres}
                    />
                </Field>
                <Field label={i18n._(t`Postcode`)} horizontal={true}>
                    <Input name="postal-code" placeholder={i18n._(t`1234 AB`)} defaultValue={prefillData?.postalCode} />
                </Field>
                <Field label={i18n._(t`Plaats`)} horizontal={true}>
                    <Input name="city" placeholder={i18n._(t`Plaats`)} defaultValue={prefillData?.city} />
                </Field>
                <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                    <Input
                        name="phoneNumber"
                        placeholder={i18n._(t`06 - 123 456 78`)}
                        defaultValue={prefillData?.phoneNumberContactPerson}
                    />
                </Field>
                <Field label={i18n._(t`Contact bij voorkeur`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'contact-preference'} value="call" />
                            <p>Bellen</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-preference'} value="whatsapp" />
                            <p>Whatsapp</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-preference'} value="mailen" />
                            <p>Mailen</p>
                        </Row>
                        <Input name="anders" placeholder={i18n._(t`Anders`)} />
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
