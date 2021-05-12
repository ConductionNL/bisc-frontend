import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import TextArea from 'components/Core/DataEntry/TextArea'
import {
    studentMotivationDesiredLearningMethodsEnumTranslations,
    studentMotivationDesiredSkillsEnumTranslations,
    studentMotivationDesiredSkillsLabelEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import {
    Maybe,
    Scalars
} from 'generated/graphql'
import React from 'react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { CheckboxListWithLabels } from '../components/CheckboxListWithLabels'
import { StudentMotivationDesiredLearningMethodsEnum, StudentMotivationDesiredSkillsEnum } from 'generated/enums'

interface Props {
    prefillData?: MotivationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface MotivationInformationFieldsetModel {
    desiredSkills?: string
    desiredSkillsOther?: string
    hasTriedThisBefore?: HasTriedThisBeforeOptionEnum
    hasTriedThisBeforeExplanation?: string
    whyWantTheseSkills?: string
    whyWantThisNow?: string
    desiredLearningMethod?: string
    remarks?: string
}

export interface MotivationInformationFieldsetPrefillData {
    desiredSkills?: Maybe<Array<StudentMotivationDesiredSkillsEnum>>
    desiredSkillsOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    whyWantTheseSkills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    desiredLearningMethod?: Maybe<Array<StudentMotivationDesiredLearningMethodsEnum>>
    remarks?: Maybe<Scalars['String']>
}

export enum HasTriedThisBeforeOptionEnum {
    yes = 'yes',
    no = 'no',
}

// TODO: refactor after api connectiond
const MotivationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const learningPreferences = getStudentMotivationDesiredLearningMethodsEnumOptions()
    const desiredSkills = getStudentMotivationDesiredSkillsEnumOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Motivatie`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                        <Column spacing={8}>
                            <CheckboxListWithLabels
                                prefillData={prefillData?.desiredSkills?.map(value => value)}
                                list={desiredSkills}
                                readOnly={true}
                                name={'desiredSkills'}
                            />
                            {prefillData?.desiredSkillsOther && <p>{prefillData?.desiredSkillsOther}</p>}
                        </Column>
                    </Field>

                    <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                        <p>{prefillData?.hasTriedThisBefore ? i18n._(t`Ja`) : i18n._(t`Nee`)}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                        <p>{prefillData?.hasTriedThisBeforeExplanation}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                        <p>{prefillData?.whyWantTheseSkills}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                        <p>{prefillData?.whyWantThisNow}</p>
                    </Field>

                    <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                        {renderLearningPreferenceCheckboxes()}
                    </Field>

                    <Field label={i18n._(t`Opmerkingen  afnemer`)} horizontal={true}>
                        <p>{prefillData?.remarks}</p>
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
                        <CheckboxListWithLabels
                            prefillData={prefillData?.desiredSkills?.map(value => value)}
                            list={desiredSkills}
                            name={'desiredSkills'}
                        />
                        <Input
                            name="desiredSkillsOther"
                            placeholder={i18n._(t`Anders`)}
                            defaultValue={prefillData?.desiredSkillsOther ?? undefined}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'hasTriedThisBefore'} value={HasTriedThisBeforeOptionEnum.yes} />
                            <p>{i18n._(t`Ja`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'hasTriedThisBefore'} value={HasTriedThisBeforeOptionEnum.no} />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                    <Input
                        name="hasTriedThisBeforeExplanation"
                        placeholder={i18n._(t`Reden waarom`)}
                        defaultValue={prefillData?.hasTriedThisBeforeExplanation ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                    <Input
                        name="whyWantTheseSkills"
                        placeholder={i18n._(t`Reden voor dit`)}
                        defaultValue={prefillData?.whyWantTheseSkills ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                    <Input
                        name="whyWantThisNow"
                        placeholder={i18n._(t`Reden voor nu`)}
                        defaultValue={prefillData?.whyWantThisNow ?? undefined}
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
                        <TextArea
                            name="remarks"
                            placeholder={i18n._(t`Opmerkingen`)}
                            defaultValue={prefillData?.remarks ?? undefined}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderLearningPreferenceCheckboxes() {
        if (readOnly && prefillData?.desiredLearningMethod) {
            return prefillData.desiredLearningMethod.map((preference, index) => {
                return (
                    <Row key={index}>
                        <p>
                            {
                                learningPreferences.find(learningPreference => learningPreference.value === preference)
                                    ?.label
                            }
                        </p>
                    </Row>
                )
            })
        }

        return learningPreferences.map((preference, index) => {
            return (
                <Row key={index}>
                    <Checkbox
                        label={preference.label}
                        name={'desiredLearningMethod'}
                        value={preference.value}
                        defaultChecked={
                            !!prefillData?.desiredLearningMethod?.find(
                                learningMethod => learningMethod === preference.value
                            )
                        }
                    />
                </Row>
            )
        })
    }

    function getStudentMotivationDesiredSkillsEnumOptions() {
        return Object.values(StudentMotivationDesiredSkillsEnum).map(value => ({
            label: studentMotivationDesiredSkillsLabelEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
            text: studentMotivationDesiredSkillsEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
        }))
    }

    function getStudentMotivationDesiredLearningMethodsEnumOptions() {
        return Object.values(StudentMotivationDesiredLearningMethodsEnum).map(value => ({
            label: studentMotivationDesiredLearningMethodsEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}

export default MotivationInformationFieldset
