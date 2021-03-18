import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Checkbox from '../../../Core/DataEntry/Checkbox'
import Input from '../../../Core/DataEntry/Input'
import RadioButton from '../../../Core/DataEntry/RadioButton'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Label from '../../../Core/Label/Label'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'

interface Props {
    prefillData?: MotivationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface MotivationInformationFieldsetModel {
    skills: string
    triedThisSkillBefore: string
    reasonWhy: string
    learningReason: string
    whyNowLearningReason: string
    learningPreference: string
    remark: string
}

interface MotivationInformationFieldsetPrefillData {
    skills: string[]
    triedThisSkillBefore: string
    reasonWhy: string
    learningReason: string
    whyNowLearningReason: string
    learningPreference: string
    remark: string
}

const skills = [
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Gezindsleden',
        text: 'Gezindsleden',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Buren',
        text: 'Buren',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Familie (buiten gezin om)',
        text: 'Familie (buiten gezin om)',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Weduwe/Hulpverleners',
        text: 'Weduwe/Hulpverleners',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Vrienden, kennissen',
        text: 'Vrienden, kennissen',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Vrienden, kennissen',
        text: 'Vrienden, kennissen',
    },
    {
        name: 'skills',
        label: 'BETER LEREN LEZEN',
        value: 'Voorlezen aan mijn (klein)kind',
        text: 'Voorlezen aan mijn (klein)kind',
    },
    {
        name: 'skills',
        label: 'BETER LEREN LEZEN',
        value: 'Een bijsluiter begrijpen',
        text: 'Een bijsluiter begrijpen',
    },
    {
        name: 'skills',
        label: 'BETER LEREN SCHRIJVEN',
        value: 'Een Sollicitatiebrief schrijven',
        text: 'Een Sollicitatiebrief schrijven',
    },
    {
        name: 'skills',
        label: 'BETER LEREN SCHRIJVEN',
        value: 'Een kaart aan familie kunnen sturen',
        text: 'Een kaart aan familie kunnen sturen',
    },
    {
        name: 'skills',
        label: 'BETER LEREN REKENEN',
        value: 'Mijn eigen administratie kunnen doen',
        text: 'Mijn eigen administratie kunnen doen',
    },
    {
        name: 'skills',
        label: 'BETER LEREN REKENEN',
        value: 'Hoeveelheden bij een recept kunnen uitrekenen',
        text: 'Hoeveelheden bij een recept kunnen uitrekenen',
    },
    {
        name: 'skills',
        label: 'ANDERS',
        value: 'Anders',
        text: 'Anders, namelijk:',
    },
]

const MotivationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Motivatie`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                        {renderSkillsCheckboxes()}
                    </Field>

                    <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                        <p>{prefillData?.triedThisSkillBefore}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                        <p>{prefillData?.reasonWhy}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                        <p>{prefillData?.learningReason}</p>
                    </Field>
                    <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                        <p>{prefillData?.whyNowLearningReason}</p>
                    </Field>
                    <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                        <p>{prefillData?.learningPreference}</p>
                    </Field>
                    <Field label={i18n._(t`Opmerkingen  afnemer`)} horizontal={true}>
                        <p>{prefillData?.remark}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Motivatie`)}>
            <Column spacing={10}>
                <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                    <Column spacing={8}>{renderSkillsCheckboxes()}</Column>
                </Field>
                <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'tried-this-before'} value="yes" />
                            <p>{i18n._(t`Ja`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'tried-this-before'} value="no" />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                    <Input
                        name="reasonWhy"
                        placeholder={i18n._(t`Reden waarom`)}
                        defaultValue={prefillData?.reasonWhy}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                    <Input
                        name="learningReason"
                        placeholder={i18n._(t`Reden voor dit`)}
                        defaultValue={prefillData?.learningReason}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                    <Input
                        name="whyNowLearningReason"
                        placeholder={i18n._(t`Reden voor nu`)}
                        defaultValue={prefillData?.whyNowLearningReason}
                    />
                </Field>
                <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                    <Column spacing={2}>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`In een groep`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`Een-op-een`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`In thuis omgeving`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`In de bibliotheek of elders`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`Online`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field
                    label={i18n._(t`Opmerkingen voor afnemer`)}
                    description={
                        'Bijzonderheden bijv. over huis, lesnemer, gezin, wensen, taalniveau, dagbesteding etc.'
                    }
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Input
                            name="whyNowLearningReason"
                            placeholder={i18n._(t`Reden voor nu`)}
                            defaultValue={prefillData?.whyNowLearningReason}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderSkillsCheckboxes() {
        const labels = Array.from(new Set(skills.map(skill => skill.label)))

        if (readOnly && prefillData?.skills) {
            return labels.map(label => {
                return (
                    <Column spacing={2}>
                        <Label text={label} />
                        {skills.map(skill => {
                            if (skill.label !== label) {
                                return null
                            }

                            return (
                                <Row>
                                    <p>{i18n._(t`${prefillData?.skills.includes(skill.value) ?? skill.value}`)}</p>
                                </Row>
                            )
                        })}
                    </Column>
                )
            })
        }

        return labels.map(label => {
            return (
                <Column spacing={2}>
                    <Label text={label} />
                    {skills.map(skill => {
                        if (skill.label !== label) {
                            return null
                        }

                        return (
                            <Row>
                                <Checkbox
                                    name={skill.name}
                                    value={skill.value}
                                    defaultChecked={prefillData?.skills.includes(skill.value)}
                                />
                                <p>{i18n._(t`${skill.text}`)}</p>
                            </Row>
                        )
                    })}
                </Column>
            )
        })
    }
}

export default MotivationInformationFieldset
