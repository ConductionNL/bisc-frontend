import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../utils/validators/InsertionValidator'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import InputContainer from '../../Core/DataEntry/InputContainer'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: EducationInformationFieldsetModel
    readOnly?: true
}

export interface EducationInformationFieldsetModel {
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
        <Section
            title={i18n._(t`Opleiding`)}
            description={i18n._(t`Volg je op dit moment een opleiding die te maken heeft met het vrijwilligerswerk?`)}
        >
            <Column spacing={4}>
                <Field label={i18n._(t`Huidige opleiding`)} horizontal={true} required={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'ja'} value="ja" />
                            <p>Ja, sinds:</p>
                        </Row>

                        <InputContainer>
                            <Column spacing={5}>
                                <Field label={'New Person name'}>
                                    <Input
                                        name="anders"
                                        placeholder={i18n._(t`Anders`)}
                                        validators={[GenericValidators.required]}
                                        defaultValue={undefined}
                                    />
                                </Field>

                                <Field label={'New Person name'}>
                                    <Input
                                        name="anders"
                                        placeholder={i18n._(t`Anders`)}
                                        validators={[GenericValidators.required]}
                                        defaultValue={undefined}
                                    />
                                </Field>
                            </Column>
                        </InputContainer>

                        <Row>
                            <RadioButton name={'no'} value="no" />
                            <p>Nee</p>
                        </Row>
                        <Row>
                            <RadioButton name={'no'} value="no" />
                            <p>Nee, maar wel gevolgd tot:</p>
                        </Row>
                        <DateInput name="country" placeholder={i18n._(t`Land`)} />
                        <InputContainer>
                            <Column spacing={5}>
                                <Field label={'Niveau'}>
                                    <Input
                                        name="level"
                                        placeholder={i18n._(t`Niveau`)}
                                        validators={[GenericValidators.required]}
                                        defaultValue={undefined}
                                    />
                                </Field>

                                <Field label={'Diploma'}>
                                    <Column spacing={3}>
                                        <Row>
                                            <RadioButton name={'certificate'} value="yes" />
                                            <p>Ja</p>
                                        </Row>
                                        <Row>
                                            <RadioButton name={'certificate'} value="no" />
                                            <p>Nee</p>
                                        </Row>
                                    </Column>
                                </Field>
                            </Column>
                        </InputContainer>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default EducationInformationFieldset
