import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import HorizontalRule from '../../Core/HorizontalRule/HorizontalRule'
import Column from '../../Core/Layout/Column/Column'
import Space from '../../Core/Layout/Space/Space'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: TaalhuisInformationFieldsetModel
    readOnly?: true
}

export interface TaalhuisInformationFieldsetModel {
    name: string
    adres: string
    postalCode: string
    city: string
    phoneNumber: string
    email: string
}

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
                            <Paragraph>{i18n._(t`${prefillData?.adres}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.postalCode}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.city}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <HorizontalRule />

                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.phoneNumber}`)}</Paragraph>
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.email}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <Space pushTop={true} />
            </>
        )
    }

    return (
        <>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                        <Input
                            required={true}
                            name="taalhuis"
                            placeholder={i18n._(t`Taalhuis X`)}
                            validators={[GenericValidators.required]}
                            defaultValue={prefillData?.name}
                        />
                    </Field>

                    <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                        <Input
                            name="straatnaam"
                            placeholder={i18n._(t`Straatnaam`)}
                            defaultValue={prefillData?.adres}
                        />
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <Input name="postcode" placeholder={i18n._(t`1234AB`)} defaultValue={prefillData?.postalCode} />
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <Input name="plaatsnaam" placeholder={i18n._(t`Utrecht`)} defaultValue={prefillData?.city} />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                name="telefoonnummer"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                validators={[GenericValidators.required, PhoneNumberValidators.isPhoneNumber]}
                                defaultValue={prefillData?.phoneNumber}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input
                                name="email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                                defaultValue={prefillData?.email}
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
