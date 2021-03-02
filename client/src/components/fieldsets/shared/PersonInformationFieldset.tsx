import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../utils/validators/InsertionValidator'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import LabelTag, { LabelColor } from '../../Core/DataDisplay/LabelTag/LabelTag'
import DateInput from '../../Core/DataEntry/DateInput'
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

const PersonInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Persoonsgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Geslacht`)} horizontal={true} required={true}>
                        <p>{''}</p>
                    </Field>

                    <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                        <p>{''}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Persoonsgegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Geslacht`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'male'} value="male" />
                            <p>Man</p>
                        </Row>
                        <Row>
                            <RadioButton name={'female'} value="female" />
                            <p>Vrouw</p>
                        </Row>
                        <Row>
                            <RadioButton name={'x'} value="x" />
                            <p>X</p>
                        </Row>
                    </Column>
                </Field>

                <Field label={i18n._(t`Geboortedatum`)} horizontal={true}>
                    <DateInput name="country" placeholder={i18n._(t`Land`)} />
                </Field>

                <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                    <Input
                        name="country"
                        placeholder={i18n._(t`Land`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.lastname}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default PersonInformationFieldset
