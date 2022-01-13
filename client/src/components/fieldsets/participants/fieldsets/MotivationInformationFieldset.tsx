import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import TextArea from 'components/Core/DataEntry/TextArea'
import {
    studentMotivationDesiredLearningMethodsEnumTranslations,
    studentMotivationDesiredSkillsEnumTranslations,
    studentMotivationDesiredSkillsLabelEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import React from 'react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { CheckboxListWithLabels } from '../components/CheckboxListWithLabels'
import { DesiredLearningMethod, DesiredSkills, Maybe } from 'api/types/types'
import nl2br from 'react-nl2br'

interface Props {
    prefillData?: MotivationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface MotivationInformationFieldsetModel {
    'intake.desiredSkills'?: Maybe<DesiredSkills[]>
    'intake.desiredSkillsOther'?: Maybe<string>
    'intake.hasTriedThisBefore'?: Maybe<'YES' | 'NO'>
    'intake.hasTriedThisBeforeExplanation'?: Maybe<string>
    'intake.whyWantTheseskills'?: Maybe<string>
    'intake.whyWantThisNow'?: Maybe<string>
    'intake.desiredLearningMethod'?: Maybe<DesiredLearningMethod[]>
    'intake.remarks'?: Maybe<string>
}

export interface MotivationInformationFieldsetPrefillData {
    'intake.desiredSkills'?: Maybe<DesiredSkills[]>
    'intake.desiredSkillsOther'?: Maybe<string>
    'intake.hasTriedThisBefore'?: Maybe<boolean>
    'intake.hasTriedThisBeforeExplanation'?: Maybe<string>
    'intake.whyWantTheseskills'?: Maybe<string>
    'intake.whyWantThisNow'?: Maybe<string>
    'intake.desiredLearningMethod'?: Maybe<DesiredLearningMethod[]>
    'intake.remarks'?: Maybe<string>
}

// TODO: refactor after api connectiond
export const MotivationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const learningPreferences = getStudentMotivationDesiredLearningMethodsEnumOptions()
    const desiredSkills = getStudentMotivationDesiredSkillsEnumOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Motivatie`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                        <Column spacing={2}>
                            <CheckboxListWithLabels
                                prefillData={prefillData?.['intake.desiredSkills']?.map(value => value)}
                                list={desiredSkills}
                                readOnly={true}
                                name={'desiredSkills'}
                            />
                            {prefillData?.['intake.desiredSkillsOther'] && (
                                <p>{prefillData?.['intake.desiredSkillsOther']}</p>
                            )}
                        </Column>
                    </Field>

                    <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                        <p>{prefillData?.['intake.hasTriedThisBefore'] ? i18n._(t`Ja`) : i18n._(t`Nee`)}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                        <p>{prefillData?.['intake.hasTriedThisBeforeExplanation']}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                        <p>{prefillData?.['intake.whyWantTheseskills']}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                        <p>{prefillData?.['intake.whyWantThisNow']}</p>
                    </Field>

                    <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                        {renderLearningPreferenceCheckboxes()}
                    </Field>

                    <Field label={i18n._(t`Opmerkingen van de deelnemer`)} horizontal={true}>
                        <p>{nl2br(prefillData?.['intake.remarks'])}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Motivatie`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                    <Column spacing={2}>
                        <CheckboxListWithLabels
                            prefillData={prefillData?.['intake.desiredSkills']?.map(value => value)}
                            list={desiredSkills}
                            name={'intake.desiredSkills[]'}
                        />
                        <Input
                            name="intake.desiredSkillsOther"
                            placeholder={i18n._(t`Anders`)}
                            defaultValue={prefillData?.['intake.desiredSkillsOther'] ?? undefined}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={`intake.hasTriedThisBefore`}
                            value={'YES'}
                            defaultChecked={prefillData?.['intake.hasTriedThisBefore'] === true}
                        />
                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={`intake.hasTriedThisBefore`}
                            value={'NO'}
                            defaultChecked={prefillData?.['intake.hasTriedThisBefore'] === false}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                    <Input
                        name="intake.hasTriedThisBeforeExplanation"
                        placeholder={i18n._(t`Reden waarom`)}
                        defaultValue={prefillData?.['intake.hasTriedThisBeforeExplanation'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                    <Input
                        name="intake.whyWantTheseskills"
                        placeholder={i18n._(t`Reden`)}
                        defaultValue={prefillData?.['intake.whyWantTheseskills'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                    <Input
                        name="intake.whyWantThisNow"
                        placeholder={i18n._(t`Waarom nu`)}
                        defaultValue={prefillData?.['intake.whyWantThisNow'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                    <Column spacing={4}>{renderLearningPreferenceCheckboxes()}</Column>
                </Field>
                <Field
                    label={i18n._(t`Opmerkingen van de deelnemer`)}
                    description={
                        'Bijzonderheden bijv. over huis, lesnemer, gezin, wensen, taalniveau, dagbesteding etc.'
                    }
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <TextArea
                            name="intake.remarks"
                            placeholder={i18n._(t`Opmerkingen`)}
                            defaultValue={prefillData?.['intake.remarks'] ?? undefined}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderLearningPreferenceCheckboxes() {
        if (readOnly) {
            const selectedDesiredLearningMethods = prefillData?.['intake.desiredLearningMethod'] || []

            return selectedDesiredLearningMethods.map((preference, index) => {
                return (
                    <React.Fragment key={index}>
                        <p>
                            {
                                learningPreferences.find(learningPreference => learningPreference.value === preference)
                                    ?.label
                            }
                        </p>
                    </React.Fragment>
                )
            })
        }

        return learningPreferences.map((preference, index) => {
            return (
                <React.Fragment key={index}>
                    <Checkbox
                        label={preference.label}
                        name={'intake.desiredLearningMethod[]'}
                        value={preference.value}
                        defaultChecked={
                            !!prefillData?.['intake.desiredLearningMethod']?.find(
                                learningMethod => learningMethod === preference.value
                            )
                        }
                    />
                </React.Fragment>
            )
        })
    }

    function getStudentMotivationDesiredSkillsEnumOptions() {
        return Object.values(DesiredSkills).map(value => ({
            label: studentMotivationDesiredSkillsLabelEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
            text: studentMotivationDesiredSkillsEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
        }))
    }

    function getStudentMotivationDesiredLearningMethodsEnumOptions() {
        return Object.values(DesiredLearningMethod).map(value => ({
            label: studentMotivationDesiredLearningMethodsEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}
