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

export interface MotivationInformationFieldsetPrefillData {
    skills: string[]
    triedThisSkillBefore: string
    reasonWhy: string
    learningReason: string
    whyNowLearningReason: string
    learningPreference: string[]
    remark: string
}

const skills = [
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Klik & Tik',
        text: 'Klik & Tik',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Leren whatsappen',
        text: 'Leren whatsappen',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Leren skypen',
        text: 'Leren skypen',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Functionaliteiten apparaat leren kennen',
        text: 'Functionaliteiten apparaat leren kennen',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Met digitiale overheid werken',
        text: 'Met digitiale overheid werken',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Boeken kunnen reserveren in de bibliotheek',
        text: 'Boeken kunnen reserveren in de bibliotheek',
    },
    {
        name: 'skills',
        label: 'DIGITAAL VAARDIG WORDEN',
        value: 'Een advertentie op martkplaats zetten',
        text: 'Een advertentie op martkplaats zetten',
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

const learningPreferences = [
    {
        name: 'learningPreference',
        value: 'In een groep',
        text: 'In een groep',
    },
    {
        name: 'learningPreference',
        value: 'Een-op-een',
        text: 'Een-op-een',
    },
    {
        name: 'learningPreference',
        value: 'In thuis omgeving',
        text: 'In thuis omgeving',
    },
    {
        name: 'learningPreference',
        value: 'In de bibliotheek of elders',
        text: 'In de bibliotheek of elders',
    },
    {
        name: 'learningPreference',
        value: 'Online',
        text: 'Online',
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
                        <Column spacing={8}>{renderSkillsCheckboxes()}</Column>
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
                        {renderLearningPreferenceCheckboxes()}
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
                            <RadioButton name={'triedThisSkillBefore'} value="yes" />
                            <p>{i18n._(t`Ja`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'triedThisSkillBefore'} value="no" />
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
                    <Column spacing={2}>{renderLearningPreferenceCheckboxes()}</Column>
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
        const prefillDataLabels = skills.map(skill => {
            if (!prefillData?.skills.includes(skill.value)) {
                return null
            }
            return skill.label
        })

        const labels = Array.from(new Set(skills.map(skill => skill.label)))

        const readOnlyLabels = labels.map(label => {
            let labelValue = ''
            prefillDataLabels.forEach(prefillDataLabel => {
                if (prefillDataLabel === label) {
                    labelValue = prefillDataLabel
                }
            })

            if (!labelValue) {
                return null
            }

            return labelValue
        })

        if (readOnly && prefillData?.skills) {
            return readOnlyLabels.map((label, index) => {
                if (!label) {
                    return null
                }
                return (
                    <Column spacing={2} key={index}>
                        <Label text={label} />
                        {skills.map((skill, index) => {
                            if (skill.label !== label || !prefillData?.skills.includes(skill.value)) {
                                return null
                            }

                            return (
                                <Row key={index}>
                                    <p>{i18n._(t`${skill.value}`)}</p>
                                </Row>
                            )
                        })}
                    </Column>
                )
            })
        }

        return labels.map((label, index) => {
            return (
                <Column spacing={2} key={index}>
                    <Label text={label} />
                    {skills.map((skill, index) => {
                        if (skill.label !== label) {
                            return null
                        }

                        return (
                            <Row key={index}>
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

    function renderLearningPreferenceCheckboxes() {
        if (readOnly && prefillData?.learningPreference) {
            return prefillData.learningPreference.map((preference, index) => {
                return (
                    <Row key={index}>
                        <p>{i18n._(t`- ${preference}`)}</p>
                    </Row>
                )
            })
        }

        return learningPreferences.map((preference, index) => {
            return (
                <Row key={index}>
                    <Checkbox
                        name={preference.name}
                        value={preference.value}
                        defaultChecked={prefillData?.learningPreference.includes(preference.value)}
                    />
                    <p>{i18n._(t`${preference.text}`)}</p>
                </Row>
            )
        })
    }
}

export default MotivationInformationFieldset
