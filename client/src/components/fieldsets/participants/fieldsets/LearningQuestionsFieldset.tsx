import React from 'react'

import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import Input from 'components/Core/DataEntry/Input'
import { GenericValidators } from 'utils/validators/GenericValidators'
import TextArea from 'components/Core/DataEntry/TextArea'
import { CreateLearningNeedInputType } from 'temp/TEMPORARYgraphql'

interface Props {
    defaultValues?: CreateLearningNeedInputType
    readOnly?: boolean
}
export interface LearningQuestionsFieldsetModel {
    motivations: string
    decription: string
}

export const LearningQuestionsFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Leervraag`)}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        const { readOnly, defaultValues } = props

        if (readOnly && defaultValues) {
            return (
                <>
                    <Field label={i18n._(t`Motivatie`)} horizontal={true}>
                        {defaultValues.learningNeedMotivation}
                    </Field>
                    <Field label={i18n._(t`Gewenste aanbod`)} horizontal={true}>
                        {defaultValues.offerDesiredOffer}
                    </Field>
                    <Field label={i18n._(t`Geadviseerd aanbod`)} horizontal={true}>
                        {defaultValues.offerAdvisedOffer}
                    </Field>
                    <Field label={i18n._(t`Afspraken`)} horizontal={true}>
                        {defaultValues.offerEngagements}
                    </Field>
                </>
            )
        }

        // TODO: implement editable fields when needed
        return (
            <>
                <Field label={i18n._(t`Korte omschrijving`)} horizontal={true} required={true}>
                    <Input
                        name="decription"
                        required={true}
                        placeholder={i18n._(t`Beschrijving`)}
                        defaultValue={defaultValues?.learningNeedDescription}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Motivatie`)} horizontal={true} required={true}>
                    <TextArea
                        name="motivations"
                        placeholder={i18n._(t`Motivatie`)}
                        defaultValue={defaultValues?.learningNeedMotivation}
                        validators={[GenericValidators.required]}
                    />
                </Field>
            </>
        )
    }

    function renderTexts(texts: string[], flag?: { withHyphen: boolean }) {
        if (flag?.withHyphen) {
            return (
                <Column spacing={1}>
                    {texts.map((t, i) => (
                        <Paragraph key={i}>- {t}</Paragraph>
                    ))}
                </Column>
            )
        }

        return (
            <Column spacing={1}>
                {texts.map((t, i) => (
                    <Paragraph key={i}>{t}</Paragraph>
                ))}
            </Column>
        )
    }
}
