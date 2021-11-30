import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { LearningResultApplication, LearningResultLevel, LearningResultSubject, Maybe } from 'api/types/types'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
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
}

export interface LearningOutcomeOfferFieldsetModel {
    'learningResult[0].verb'?: Maybe<string>
    'learningResult[0].subject'?: Maybe<LearningResultSubject>
    'learningResult[0].subjectOther'?: Maybe<string>
    'learningResult[0].application'?: Maybe<LearningResultApplication>
    'learningResult[0].applicationOther'?: Maybe<string>
    'learningResult[0].level'?: Maybe<LearningResultLevel>
    'learningResult[0].levelOther'?: Maybe<string>
}

export interface LearningOutComeOfferDefaultValues {
    'learningResult[0].verb'?: Maybe<string>
    'learningResult[0].subject'?: Maybe<LearningResultSubject>
    'learningResult[0].subjectOther'?: Maybe<string>
    'learningResult[0].application'?: Maybe<LearningResultApplication>
    'learningResult[0].applicationOther'?: Maybe<string>
    'learningResult[0].level'?: Maybe<LearningResultLevel>
    'learningResult[0].levelOther'?: Maybe<string>
}

const LearningOutcomeOfferFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly } = props
    const { i18n } = useLingui()
    const [learningResultSubject, setLearningResultSubjectValue] = useState<LearningResultSubject | undefined>(
        defaultValues?.['learningResult[0].subject'] ?? undefined
    )
    const [learningResultApplication, setLearningResultApplicationValue] = useState<
        LearningResultApplication | undefined
    >(defaultValues?.['learningResult[0].application'] ?? undefined)
    const [learningResultLevel, setLearningResultLevelValue] = useState<LearningResultLevel | undefined>(
        defaultValues?.['learningResult[0].level'] ?? undefined
    )

    return (
        <Section title={i18n._(t`Gewenste leeruitkomst`)}>
            <Column spacing={4}>{renderFieldsets()}</Column>
        </Section>
    )

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Werkwoord`)} horizontal={true}>
                        <Paragraph>{defaultValues?.['learningResult[0].verb']}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Onderwerp`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.['learningResult[0].subject'] &&
                                learningResultSubjectTranslations[defaultValues?.['learningResult[0].subject']]}
                        </Paragraph>
                        {defaultValues?.['learningResult[0].subject'] === LearningResultSubject.Other && (
                            <Paragraph italic={true}>{defaultValues?.['learningResult[0].subjectOther']}</Paragraph>
                        )}
                    </Field>
                    <Field label={i18n._(t`Toepassing`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.['learningResult[0].application'] &&
                                learningResultApplicationTranslations[defaultValues?.['learningResult[0].application']]}
                        </Paragraph>
                        {defaultValues?.['learningResult[0].application'] === LearningResultApplication.Other && (
                            <Paragraph italic={true}>{defaultValues?.['learningResult[0].applicationOther']}</Paragraph>
                        )}
                    </Field>
                    <Field label={i18n._(t`Niveau`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.['learningResult[0].level'] &&
                                learningResultLevelTranslations[defaultValues?.['learningResult[0].level']]}
                        </Paragraph>
                        {defaultValues?.['learningResult[0].level'] === LearningResultLevel.Other && (
                            <Paragraph italic={true}>{defaultValues?.['learningResult[0].levelOther']}</Paragraph>
                        )}
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field label={i18n._(t`Werkwoord`)} horizontal={true}>
                    <Input
                        name="learningResult[0].verb"
                        placeholder={i18n._(t`Werkwoord`)}
                        defaultValue={defaultValues?.['learningResult[0].verb'] ?? undefined}
                    />
                </Field>

                <Field label={i18n._(t`Onderwerp`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            name="learningResult[0].subject"
                            placeholder={i18n._(t`Selecteer onderwerp`)}
                            options={renderLearningResultSubjectOptions()}
                            onChangeValue={value => setLearningResultSubjectValue(value as LearningResultSubject)}
                            defaultValue={defaultValues?.['learningResult[0].subject'] ?? undefined}
                        />
                        {learningResultSubject === LearningResultSubject.Other && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Toepassing`)}>
                                    <Input
                                        name="learningResult[0].subjectOther"
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={defaultValues?.['learningResult[0].subjectOther'] ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>

                <Field label={i18n._(t`Toepassing`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            name="learningResult[0].application"
                            placeholder={i18n._(t`Selecteer toepassing`)}
                            options={renderOutComesApplicationsTopicOptions()}
                            onChangeValue={value =>
                                setLearningResultApplicationValue(value as LearningResultApplication)
                            }
                            defaultValue={defaultValues?.['learningResult[0].application'] ?? undefined}
                        />
                        {learningResultApplication === LearningResultApplication.Other && (
                            <ConditionalCard>
                                <Field>
                                    <Input
                                        name="learningResult[0].applicationOther"
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={
                                            defaultValues?.['learningResult[0].applicationOther'] ?? undefined
                                        }
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field label={i18n._(t`Niveau`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            name="learningResult[0].level"
                            placeholder={i18n._(t`Selecteer niveau`)}
                            options={renderOutComesLevelOptions()}
                            onChangeValue={value => setLearningResultLevelValue(value as LearningResultLevel)}
                            defaultValue={defaultValues?.['learningResult[0].level'] ?? undefined}
                        />
                        {learningResultLevel === LearningResultLevel.Other && (
                            <ConditionalCard>
                                <Field>
                                    <Input
                                        name="learningResult[0].levelOther"
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={defaultValues?.['learningResult[0].levelOther'] ?? undefined}
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
