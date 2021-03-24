import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Checkbox from '../../../Core/DataEntry/Checkbox'
import Input from '../../../Core/DataEntry/Input'
import RadioButton from '../../../Core/DataEntry/RadioButton'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'
import { CheckboxListWithLabels } from '../components/CheckboxListWithLabels'

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

const MotivationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const skills = [
        {
            name: 'skills',
            label: 'DIGITAAL VAARDIG WORDEN',
            value: 'Klik & Tik',
            text: i18n._(t`Klik & Tik`),
        },
        {
            name: 'skills',
            label: 'DIGITAAL VAARDIG WORDEN',
            value: 'Leren whatsappen',
            text: i18n._(t`Leren whatsappen`),
        },
        {
            name: 'skills',
            label: 'DIGITAAL VAARDIG WORDEN',
            value: 'Leren skypen',
            text: i18n._(t`Leren skypen`),
        },
        {
            name: 'skills',
            label: 'DIGITAAL VAARDIG WORDEN',
            value: 'Functionaliteiten apparaat leren kennen',
            text: i18n._(t`Functionaliteiten apparaat leren kennen`),
        },
        {
            name: 'skills',
            label: 'DIGITAAL VAARDIG WORDEN',
            value: 'Met digitiale overheid werken',
            text: i18n._(t`Met digitiale overheid werken`),
        },
        {
            name: 'skills',
            label: 'DIGITAAL VAARDIG WORDEN',
            value: 'Boeken kunnen reserveren in de bibliotheek',
            text: i18n._(t`Boeken kunnen reserveren in de bibliotheek`),
        },
        {
            name: 'skills',
            label: 'DIGITAAL VAARDIG WORDEN',
            value: 'Een advertentie op martkplaats zetten',
            text: i18n._(t`Een advertentie op martkplaats zetten`),
        },
        {
            name: 'skills',
            label: 'BETER LEREN LEZEN',
            value: 'Voorlezen aan mijn (klein)kind',
            text: i18n._(t`Voorlezen aan mijn (klein)kind`),
        },
        {
            name: 'skills',
            label: 'BETER LEREN LEZEN',
            value: 'Een bijsluiter begrijpen',
            text: i18n._(t`Een bijsluiter begrijpen`),
        },
        {
            name: 'skills',
            label: 'BETER LEREN SCHRIJVEN',
            value: 'Een Sollicitatiebrief schrijven',
            text: i18n._(t`Een Sollicitatiebrief schrijven`),
        },
        {
            name: 'skills',
            label: 'BETER LEREN SCHRIJVEN',
            value: 'Een kaart aan familie kunnen sturen',
            text: i18n._(t`Een kaart aan familie kunnen sturen`),
        },
        {
            name: 'skills',
            label: 'BETER LEREN REKENEN',
            value: 'Mijn eigen administratie kunnen doen',
            text: i18n._(t`Mijn eigen administratie kunnen doen`),
        },
        {
            name: 'skills',
            label: 'BETER LEREN REKENEN',
            value: 'Hoeveelheden bij een recept kunnen uitrekenen',
            text: i18n._(t`Hoeveelheden bij een recept kunnen uitrekenen`),
        },
        {
            name: 'skills',
            label: 'ANDERS',
            value: 'Anders',
            text: i18n._(t`Anders, namelijk:`),
        },
    ]

    const learningPreferences = [
        {
            name: 'learningPreference',
            value: 'In een groep',
            text: i18n._(t`In een groep`),
        },
        {
            name: 'learningPreference',
            value: 'Een-op-een',
            text: i18n._(t`Een-op-een`),
        },
        {
            name: 'learningPreference',
            value: 'In thuis omgeving',
            text: i18n._(t`In thuis omgeving`),
        },
        {
            name: 'learningPreference',
            value: 'In de bibliotheek of elders',
            text: i18n._(t`In de bibliotheek of elders`),
        },
        {
            name: 'learningPreference',
            value: 'Online',
            text: i18n._(t`Online`),
        },
    ]

    if (readOnly) {
        return (
            <Section title={i18n._(t`Motivatie`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                        <Column spacing={8}>
                            <CheckboxListWithLabels prefillData={prefillData?.skills} list={skills} readOnly={true} />
                        </Column>
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
                    <Column spacing={8}>
                        <CheckboxListWithLabels prefillData={prefillData?.skills} list={skills} />
                    </Column>
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

    function renderLearningPreferenceCheckboxes() {
        if (readOnly && prefillData?.learningPreference) {
            return prefillData.learningPreference.map((preference, index) => {
                return (
                    <Row key={index}>
                        <p>{preference}</p>
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
                    <p>{preference.text}</p>
                </Row>
            )
        })
    }
}

export default MotivationInformationFieldset
