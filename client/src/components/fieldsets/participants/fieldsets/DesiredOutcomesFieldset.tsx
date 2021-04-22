import React, { useState } from 'react'

import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { DesiredOutcomeMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import Input from 'components/Core/DataEntry/Input'
import { GenericValidators } from 'utils/validators/GenericValidators'
import Select from 'components/Core/DataEntry/Select'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import { LearningNeedApplicationEnum, LearningNeedLevelEnum, LearningNeedTopicEnum } from 'generated/graphql'
import {
    learningNeedApplicationTranslations,
    learningNeedLevelTranslations,
    learningNeedTopicTranslations,
} from 'components/Domain/LearningNeeds/Translations/LearningNeedTranslations'

interface Props {
    defaultValues?: DesiredOutcomePrefillData
    readOnly?: boolean
}

export interface DesiredOutcomePrefillData {
    goal: string
    topic: LearningNeedTopicEnum
    topicOther?: string
    application?: LearningNeedApplicationEnum
    applicationOther?: string
    level: LearningNeedLevelEnum
    levelOther?: string
}

export interface DesiredOutcomesFieldsetModel {
    goal: string
    topic: LearningNeedTopicEnum
    topicOther?: string
    application: LearningNeedApplicationEnum
    applicationOther?: string
    level: LearningNeedLevelEnum
    levelOther?: string
}

export const DesiredOutcomesFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [applicationValue, setApplicationValue] = useState<string>()
    const [levelValue, setLevelValue] = useState<string>()
    const [topicValue, setTopicValue] = useState<string>()

    return (
        <Section title={i18n._(t`Gewenste leeruitkomst`)}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        const { readOnly, defaultValues } = props

        if (readOnly && defaultValues) {
            return (
                <>
                    <Field label={i18n._(t`Werkwoord`)} horizontal={true}>
                        <Paragraph>{defaultValues.goal}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Onderwerp`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues.topicOther ? defaultValues.topicOther : defaultValues.topic}
                        </Paragraph>
                    </Field>
                    <Field label={i18n._(t`Toepassingen`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues.applicationOther
                                ? defaultValues.applicationOther
                                : defaultValues.application}
                        </Paragraph>
                    </Field>
                    <Field label={i18n._(t`Niveau`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues.levelOther ? defaultValues.levelOther : defaultValues.level}
                        </Paragraph>
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field label={i18n._(t`Werkwoord`)} horizontal={true} required={true}>
                    <Input
                        defaultValue={defaultValues?.goal}
                        name="goal"
                        required={true}
                        placeholder={i18n._(t`Werkwoord`)}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Onderwerp`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            name="topic"
                            list="topic"
                            placeholder={i18n._(t`Selecteer onderwerp`)}
                            required={true}
                            onChangeValue={value => setTopicValue(value)}
                            options={getTopicOptions()}
                            defaultValue={defaultValues?.topic}
                        />
                        {topicValue === LearningNeedTopicEnum.Other && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Onderwerp`)}>
                                    <Input
                                        defaultValue={defaultValues?.topicOther}
                                        name="topicOther"
                                        required={true}
                                        placeholder={i18n._(t`Ander onderwerp`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field label={i18n._(t`Toepassing`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            list="application"
                            name="application"
                            placeholder={i18n._(t`Toepassing`)}
                            required={true}
                            onChangeValue={value => setApplicationValue(value)}
                            options={getApplicationOptions()}
                            defaultValue={defaultValues?.application}
                        />
                        {applicationValue === LearningNeedApplicationEnum.Other && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Ander toepassing`)}>
                                    <Input
                                        defaultValue={defaultValues?.applicationOther}
                                        name="applicationOther"
                                        required={true}
                                        placeholder={i18n._(t`Andere toepassing`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field label={i18n._(t`Niveau`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            list="level"
                            name="level"
                            placeholder={i18n._(t`Selecteer niveau`)}
                            required={true}
                            onChangeValue={value => setLevelValue(value)}
                            options={getlevelOptions()}
                            defaultValue={defaultValues?.level}
                        />
                        {levelValue === LearningNeedLevelEnum.Other && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Niveau`)}>
                                    <Input
                                        defaultValue={defaultValues?.levelOther}
                                        name="levelOther"
                                        required={true}
                                        placeholder={i18n._(t`Ander niveau`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
            </>
        )
    }

    function getTopicOptions() {
        return Object.values(LearningNeedTopicEnum).map(value => ({
            value,
            label: learningNeedTopicTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }

    function getApplicationOptions() {
        return Object.values(LearningNeedApplicationEnum).map(value => ({
            value,
            label: learningNeedApplicationTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }

    function getlevelOptions() {
        return Object.values(LearningNeedLevelEnum).map(value => ({
            value,
            label: learningNeedLevelTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }
}
