import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import ConditionalCard from '../../Core/Containers/ConditionalCard'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: CourseInformationFieldsetModel
    readOnly?: boolean
}

export interface CourseInformationFieldsetModel {
    course: string
}

const CourseInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Cursus/Training`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Huidige cursus/training`)} horizontal={true}>
                        <p>{prefillData?.course}</p>
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
                <Field label={i18n._(t`Cursus/training`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'course'} value="yes" />
                            <p>{i18n._(t`Ja, namelijk:`)}</p>
                        </Row>

                        <Input name="additionalName" placeholder={i18n._(t`Naam cursus/training`)} />
                        <ConditionalCard>
                            <Column spacing={5}>
                                <Field label={i18n._(t`Waar volg je de cursus/training?`)}>
                                    <Input name="anders" placeholder={i18n._(t`naam cursus/training`)} />
                                </Field>

                                <Column>
                                    <Field label={i18n._(t`Type docent`)}>
                                        <Column spacing={3}>
                                            <Row>
                                                <RadioButton name={'instructor-type'} value="professional" />
                                                <p>{i18n._(t`Professioneel`)}</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'instructor-type'} value="vrijwilliger" />
                                                <p>{i18n._(t`Vrijwilliger`)}</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'instructor-type'} value="beide" />
                                                <p>{i18n._(t`Beide`)}</p>
                                            </Row>
                                        </Column>
                                    </Field>
                                </Column>
                                <Column>
                                    <Field label={i18n._(t`Type cursus/training`)}>
                                        <Column spacing={3}>
                                            <Row>
                                                <RadioButton name={'course-type'} value="professional" />
                                                <p>{i18n._(t`Professioneel`)}</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'course-type'} value="vrijwilliger" />
                                                <p>{i18n._(t`Vrijwilliger`)}</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'course-type'} value="beide" />
                                                <p>{i18n._(t`Beide`)}</p>
                                            </Row>
                                        </Column>
                                    </Field>
                                </Column>
                                <Column>
                                    <Field label={i18n._(t`Biedt de cursus een certificaat?`)}>
                                        <Column spacing={3}>
                                            <Row>
                                                <RadioButton name={'provideCertificate'} value="yes" />
                                                <p>{i18n._(t`Ja`)}</p>
                                            </Row>
                                            <Row>
                                                <RadioButton name={'provideCertificate'} value="no" />
                                                <p>{i18n._(t`Nee`)}</p>
                                            </Row>
                                        </Column>
                                    </Field>
                                </Column>
                            </Column>
                        </ConditionalCard>
                        <Row>
                            <RadioButton name={'course'} value="no" />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Andere relevante diploma’s/certificaten`)} horizontal={true}>
                    <Column spacing={3}>
                        <Input
                            name="relevantCertificates"
                            placeholder={i18n._(t`Relevante diploma's/certificatenkeur`)}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default CourseInformationFieldset
