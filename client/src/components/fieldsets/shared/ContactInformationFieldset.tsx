import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import LabelTag, { LabelColor } from '../../Core/DataDisplay/LabelTag/LabelTag'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: InformationFieldsetModel
    readOnly?: true
}

export interface InformationFieldsetModel {
    lastname: string
    insertion: string
    callSign: string
    phonenumber: string
}

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Geslacht`)} horizontal={true} required={true}>
                        <p>{'X'}</p>
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <p>{'1234 AB'}</p>
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <p>{'Utrecht'}</p>
                    </Field>

                    <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                        <p>{'06 - 123 456 78'}</p>
                    </Field>

                    <Field label={i18n._(t`Contact bij voorkeur`)} horizontal={true}>
                        <p>{'mailen'}</p>
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
                        name="country"
                        placeholder={i18n._(t`Land`)}
                        validators={[GenericValidators.required]}
                        defaultValue={undefined}
                    />
                </Field>
                <Field label={i18n._(t`Postcode`)} horizontal={true}>
                    <Input
                        name="postal-code"
                        placeholder={i18n._(t`1234 AB`)}
                        validators={[GenericValidators.required]}
                        defaultValue={undefined}
                    />
                </Field>
                <Field label={i18n._(t`Plaats`)} horizontal={true}>
                    <Input
                        name="city"
                        placeholder={i18n._(t`Plaats`)}
                        validators={[GenericValidators.required]}
                        defaultValue={undefined}
                    />
                </Field>
                <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                    <Input
                        name="phoneNumber"
                        placeholder={i18n._(t`06 - 123 456 78`)}
                        validators={[GenericValidators.required]}
                        defaultValue={undefined}
                    />
                </Field>
                <Field label={i18n._(t`Contact bij voorkeur`)} horizontal={true} required={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'call'} value="call" />
                            <p>Bellen</p>
                        </Row>
                        <Row>
                            <RadioButton name={'whatsapp'} value="whatsapp" />
                            <p>Whatsapp</p>
                        </Row>
                        <Row>
                            <RadioButton name={'mailen'} value="mailen" />
                            <p>Mailen</p>
                        </Row>
                        <Input
                            name="anders"
                            placeholder={i18n._(t`Anders`)}
                            validators={[GenericValidators.required]}
                            defaultValue={undefined}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
