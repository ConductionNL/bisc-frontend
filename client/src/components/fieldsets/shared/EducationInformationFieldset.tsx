import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../utils/validators/InsertionValidator'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: ducationInformationFieldsetModel
    readOnly?: true
}

export interface ducationInformationFieldsetModel {
    lastname: string
    insertion: string
    callSign: string
    phonenumber: string
}

const EducationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Opleiding`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Huidige opleiding`)} horizontal={true} required={true}>
                        <p>{prefillData?.lastname}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Opleiding`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Huidige opleiding`)} horizontal={true} required={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'ja'} value="ja" />
                            <p>Ja, sinds:</p>
                        </Row>
                        <Row>
                            <RadioButton name={'no'} value="no" />
                            <p>Nee</p>
                        </Row>
                        <Row>
                            <RadioButton name={'no'} value="no" />
                            <p>Nee, maar wel gevolgd tot:</p>
                        </Row>
                        <Row>
                            <DateInput name="country" placeholder={i18n._(t`Land`)} />
                        </Row>
                        <Row>
                            <Input
                                name="anders"
                                placeholder={i18n._(t`Anders`)}
                                validators={[GenericValidators.required]}
                                defaultValue={'In asielzoekerscentrum gewerkters'}
                            />
                        </Row>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default EducationInformationFieldset
