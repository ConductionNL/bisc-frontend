import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../utils/validators/InsertionValidator'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import InputContainer from '../../Core/DataEntry/InputContainer'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: CourseInformationFieldsetModel
    readOnly?: true
}

export interface CourseInformationFieldsetModel {
    lastname: string
    insertion: string
    callSign: string
    phonenumber: string
}

const CourseInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Cursus/Training`)}>
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
            title={i18n._(t`Cursus/Training`)}
            description={i18n._(
                t`Volg je op dit moment een cursus/training die te maken heeft met het vrijwilligerswerk?`
            )}
        >
            <Column spacing={4}>
                <Field label={i18n._(t`Cursus/training`)} horizontal={true} required={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'ja'} value="ja" />
                            <p>Ja, namelijk:</p>
                        </Row>

                        <Input
                            name="insertion"
                            placeholder={i18n._(t`Naam cursus/training`)}
                            validators={[GenericValidators.required, InsertionValidators.isValidInsertion]}
                            defaultValue={prefillData?.insertion}
                        />
                        <InputContainer>
                            <Column spacing={5}>
                                <Field label={'Waar volg je de cursus/training?'}>
                                    <Input
                                        name="anders"
                                        placeholder={i18n._(t`naam cursus/training`)}
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

                                <Column>
                                    <Field label={'Type docent'}>
                                        <Column spacing={3}>
                                            <Row>
                                                <RadioButton name={'professional'} value="professional" />
                                                <p>Professional</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'vrijwilliger'} value="vrijwilliger" />
                                                <p>Vrijwilliger</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'beide'} value="beide" />
                                                <p>Beide</p>
                                            </Row>
                                        </Column>
                                    </Field>
                                </Column>
                                <Column>
                                    <Field label={'Type cursus/training'}>
                                        <Column spacing={3}>
                                            <Row>
                                                <RadioButton name={'professional'} value="professional" />
                                                <p>Professional</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'vrijwilliger'} value="vrijwilliger" />
                                                <p>Vrijwilliger</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'beide'} value="beide" />
                                                <p>Beide</p>
                                            </Row>
                                        </Column>
                                    </Field>
                                </Column>
                                <Column>
                                    <Field label={'Biedt de cursus een certificaat?'}>
                                        <Column spacing={3}>
                                            <Row>
                                                <RadioButton name={'provideCertificate'} value="yes" />
                                                <p>Ja</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'provideCertificate'} value="no" />
                                                <p>Nee</p>
                                            </Row>
                                        </Column>
                                    </Field>
                                </Column>
                            </Column>
                        </InputContainer>
                        <Row>
                            <RadioButton name={'no'} value="no" />
                            <p>Nee</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Andere relevante diploma’s/certificaten`)} horizontal={true}>
                    <Input
                        name="insertion"
                        placeholder={i18n._(t`VoorRelevante diploma's/certificatenkeur...`)}
                        validators={[GenericValidators.required, InsertionValidators.isValidInsertion]}
                        defaultValue={prefillData?.insertion}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default CourseInformationFieldset
