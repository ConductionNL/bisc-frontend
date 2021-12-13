import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { LearningResultApplication, LearningResultLevel, LearningResultSubject, Maybe } from 'api/types/types'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import { NewSelectV2 } from 'components/Core/DataEntry/NewSelectV2'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    learningResultApplicationTranslations,
    learningResultLevelTranslations,
    learningResultSubjectTranslations,
} from 'components/Domain/LearningNeeds/Translations/LearningNeedTranslations'
import React, { useState } from 'react'

interface Props {
    defaultValues?: LearningOutComeOfferDefaultValues
    readOnly?: boolean
    sectionTitle?: string
    allRequired?: boolean
    errorPath?: Partial<Record<keyof LearningOutComeOfferDefaultValues, string | undefined>>
    hideTitle?: boolean
}

export type LearningOutcomeOfferFieldsetModel = LearningOutComeOfferDefaultValues

export interface LearningOutComeOfferDefaultValues {
    verb?: Maybe<string>
    subject?: Maybe<LearningResultSubject>
    subjectOther?: Maybe<string>
    application?: Maybe<LearningResultApplication>
    applicationOther?: Maybe<string>
    level?: Maybe<LearningResultLevel>
    levelOther?: Maybe<string>
}

const LearningOutcomeOfferFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, sectionTitle, allRequired, errorPath, hideTitle } = props
    const { i18n } = useLingui()
    const [learningResultSubject, setLearningResultSubjectValue] = useState<LearningResultSubject | undefined>(
        defaultValues?.subject ?? undefined
    )
    const [learningResultApplication, setLearningResultApplicationValue] = useState<
        LearningResultApplication | undefined
    >(defaultValues?.application ?? undefined)
    const [learningResultLevel, setLearningResultLevelValue] = useState<LearningResultLevel | undefined>(
        defaultValues?.level ?? undefined
    )

    if (hideTitle) {
        return <Column spacing={4}>{renderFieldsets()}</Column>
    }

    return (
        <Section title={sectionTitle || i18n._(t`Gewenste leeruitkomst`)}>
            <Column spacing={4}>{renderFieldsets()}</Column>
        </Section>
    )

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Werkwoord`)} horizontal={true}>
                        <Paragraph>{defaultValues?.verb}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Onderwerp`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.subject && learningResultSubjectTranslations[defaultValues?.subject]}
                        </Paragraph>
                        {defaultValues?.subject === LearningResultSubject.Other && (
                            <Paragraph italic={true}>{defaultValues?.subjectOther}</Paragraph>
                        )}
                    </Field>
                    <Field label={i18n._(t`Toepassing`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.application &&
                                learningResultApplicationTranslations[defaultValues?.application]}
                        </Paragraph>
                        {defaultValues?.application === LearningResultApplication.Other && (
                            <Paragraph italic={true}>{defaultValues?.applicationOther}</Paragraph>
                        )}
                    </Field>
                    <Field label={i18n._(t`Niveau`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.level && learningResultLevelTranslations[defaultValues?.level]}
                        </Paragraph>
                        {defaultValues?.level === LearningResultLevel.Other && (
                            <Paragraph italic={true}>{defaultValues?.levelOther}</Paragraph>
                        )}
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field required={allRequired} label={i18n._(t`Werkwoord`)} horizontal={true}>
                    <Input
                        errorPath={errorPath?.verb || 'verb'}
                        name="verb"
                        placeholder={i18n._(t`Werkwoord`)}
                        defaultValue={defaultValues?.verb ?? undefined}
                    />
                </Field>

                <Field required={allRequired} label={i18n._(t`Onderwerp`)} horizontal={true}>
                    <Column spacing={2}>
                        <NewSelectV2
                            errorPath={errorPath?.subject || 'subject'}
                            name="subject"
                            placeholder={i18n._(t`Selecteer onderwerp`)}
                            options={renderLearningResultSubjectOptions()}
                            onChangeValue={option =>
                                setLearningResultSubjectValue(
                                    option ? (option.value as LearningResultSubject) : undefined
                                )
                            }
                            defaultValue={
                                defaultValues?.subject
                                    ? {
                                          value: defaultValues.subject,
                                          label: learningResultSubjectTranslations[defaultValues.subject],
                                      }
                                    : undefined
                            }
                        />
                        {learningResultSubject === LearningResultSubject.Other && (
                            <ConditionalCard>
                                <Field required={allRequired} label={i18n._(t`Toepassing`)}>
                                    <Input
                                        errorPath={errorPath?.subjectOther || 'subjectOther'}
                                        name="subjectOther"
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={defaultValues?.subjectOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>

                <Field required={allRequired} label={i18n._(t`Toepassing`)} horizontal={true}>
                    <Column spacing={2}>
                        <NewSelectV2
                            errorPath={errorPath?.application || 'application'}
                            name="application"
                            placeholder={i18n._(t`Selecteer toepassing`)}
                            options={renderOutComesApplicationsTopicOptions()}
                            onChangeValue={option =>
                                setLearningResultApplicationValue(
                                    option ? (option.value as LearningResultApplication) : undefined
                                )
                            }
                            defaultValue={
                                defaultValues?.application
                                    ? {
                                          value: defaultValues.application,
                                          label: learningResultApplicationTranslations[defaultValues.application],
                                      }
                                    : undefined
                            }
                        />
                        {learningResultApplication === LearningResultApplication.Other && (
                            <ConditionalCard>
                                <Field required={allRequired}>
                                    <Input
                                        errorPath={errorPath?.applicationOther || 'applicationOther'}
                                        name="applicationOther"
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={defaultValues?.applicationOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field required={allRequired} label={i18n._(t`Niveau`)} horizontal={true}>
                    <Column spacing={2}>
                        <NewSelectV2
                            errorPath={errorPath?.level || 'level'}
                            name="level"
                            placeholder={i18n._(t`Selecteer niveau`)}
                            options={renderOutComesLevelOptions()}
                            onChangeValue={option =>
                                setLearningResultLevelValue(option ? (option.value as LearningResultLevel) : undefined)
                            }
                            defaultValue={
                                defaultValues?.level
                                    ? {
                                          value: defaultValues.level,
                                          label: learningResultLevelTranslations[defaultValues.level],
                                      }
                                    : undefined
                            }
                        />
                        {learningResultLevel === LearningResultLevel.Other && (
                            <ConditionalCard>
                                <Field required={allRequired}>
                                    <Input
                                        errorPath={errorPath?.levelOther || 'levelOther'}
                                        name="levelOther"
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={defaultValues?.levelOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
            </>
        )
    }

    function renderLearningResultSubjectOptions() {
        return Object.values(LearningResultSubject).map(value => ({
            value,
            label: learningResultSubjectTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }

    function renderOutComesApplicationsTopicOptions() {
        return Object.values(LearningResultApplication).map(value => ({
            value,
            label: learningResultApplicationTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }

    function renderOutComesLevelOptions() {
        return Object.values(LearningResultLevel).map(value => ({
            value,
            label: learningResultLevelTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }
}
export default LearningOutcomeOfferFieldset
