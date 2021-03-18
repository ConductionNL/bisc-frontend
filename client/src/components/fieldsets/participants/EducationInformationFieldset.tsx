import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import ConditionalCard from '../../Core/Containers/ConditionalCard'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Select from '../../Core/DataEntry/Select'
import ControlField from '../../Core/Field/ControlField'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: EducationInformationFieldsetModel
    readOnly?: true
}

export interface EducationInformationFieldsetModel {
    lastEducation?: string
    graduated?: string
    currentEducation?: string
}

type Fields = 'lastEducation' | 'graduated' | 'currentEducation'

const EducationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            lastEducation: {
                label: i18n._(t`Laatst gevolgde opleiding`),
                placeholder: i18n._(t`Selecteer niveau`),
            },
            graduated: {
                label: i18n._(t`Diploma behaald`),
            },
            currentEducation: {
                label: i18n._(t`Volg je op dit moment een opleiding?`),
            },
        },
        fieldNaming
    )

    const controls = useFieldsetControl<Fields>({}, fieldControls)

    if (readOnly) {
        return (
            <Section title={i18n._(t`Opleiding`)}>
                <Column spacing={4}>
                    <ControlField
                        control={controls.lastEducation}
                        label={content.lastEducation?.label}
                        horizontal={true}
                    >
                        <p>{`${prefillData?.lastEducation}`}</p>
                    </ControlField>

                    <ControlField control={controls.graduated} label={content.graduated?.label} horizontal={true}>
                        <p>{prefillData?.graduated}</p>
                    </ControlField>

                    <ControlField
                        control={controls.currentEducation}
                        label={content.currentEducation?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.currentEducation}</p>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Opleiding`)}>
            <Column spacing={8}>
                <ControlField control={controls.lastEducation} label={content.lastEducation?.label} horizontal={true}>
                    <Select
                        name="lastEducation"
                        placeholder={content.lastEducation?.placeholder}
                        options={['test']}
                        defaultValue={prefillData?.lastEducation}
                    />
                </ControlField>

                <ControlField control={controls.graduated} label={content?.graduated?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'graduated'} value="yes" />
                            <p>{i18n._(t`Ja`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'graduated'} value="no" />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>
                    </Column>
                </ControlField>

                <ControlField
                    control={controls.currentEducation}
                    label={content?.currentEducation?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'currentEducation'} value="yes" />
                            <p>{i18n._(t`Ja`)}</p>
                        </Row>
                        <ConditionalCard>
                            <Column spacing={4}>
                                <Field label={i18n._(t`Begindatum`)}>
                                    <DateInput name="startDate" placeholder={i18n._(t`01/01/2020`)} />
                                </Field>

                                <Field label={i18n._(t`Einddatum`)}>
                                    <DateInput name="endDate" placeholder={i18n._(t`01/01/2020`)} />
                                </Field>

                                <Field label={i18n._(t`Opleidingsniveau`)}>
                                    <Select
                                        name="educationLevel"
                                        placeholder={i18n._(t`Selecteer niveau`)}
                                        options={['test']}
                                    />
                                </Field>

                                <Field label={i18n._(t`Waar volg je de opleiding?`)}>
                                    <Input name="educationLocation" placeholder={i18n._(t`Instituut`)} />
                                </Field>

                                <Field label={i18n._(t`Biedt de opleiding een diploma of certificaat?`)}>
                                    <Column spacing={4}>
                                        <Row>
                                            <RadioButton name={'providesCertificate'} value="yes" />
                                            <p>{i18n._(t`Ja`)}</p>
                                        </Row>
                                        <Row>
                                            <RadioButton name={'providesCertificate'} value="no" />
                                            <p>{i18n._(t`Nee`)}</p>
                                        </Row>
                                    </Column>
                                </Field>
                            </Column>
                        </ConditionalCard>

                        <Row>
                            <RadioButton name={'currentEducation'} value="no" />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>

                        <Row>
                            <RadioButton name={'currentEducation'} value="no, but followed" />
                            <p>{i18n._(t`Nee, maar wel gevolgd`)}</p>
                        </Row>
                        <ConditionalCard>
                            <Column spacing={4}>
                                <Field label={i18n._(t`Gevolgd tot`)}>
                                    <DateInput name="endDate" placeholder={i18n._(t`01/01/2020`)} />
                                </Field>

                                <Field label={i18n._(t`Opleidingsniveau`)}>
                                    <Select
                                        name="educationLevel"
                                        placeholder={i18n._(t`Selecteer niveau`)}
                                        options={['test']}
                                    />
                                </Field>

                                <Field label={i18n._(t`Diploma`)}>
                                    <Column spacing={4}>
                                        <Row>
                                            <RadioButton name={'certificate'} value="yes" />
                                            <p>{i18n._(t`Ja`)}</p>
                                        </Row>
                                        <Row>
                                            <RadioButton name={'certificate'} value="no" />
                                            <p>{i18n._(t`Nee`)}</p>
                                        </Row>
                                    </Column>
                                </Field>
                            </Column>
                        </ConditionalCard>
                    </Column>
                </ControlField>
            </Column>
        </Section>
    )
}

export default EducationInformationFieldset
