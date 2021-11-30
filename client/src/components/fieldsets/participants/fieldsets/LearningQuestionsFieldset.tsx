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
import { Maybe } from 'api/types/types'

interface Props {
    defaultValues?: LearningQuestionsDefaultValues
    readOnly?: boolean
}
export interface LearningQuestionsFieldsetModel {
    description?: Maybe<string>
    motivation?: Maybe<string>
}

export interface LearningQuestionsDefaultValues {
    description?: Maybe<string>
    motivation?: Maybe<string>
    // offerDesiredOffer: string | null
    // offerAdvisedOffer?: string | null
    // offerEngagements?: string | null
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
                    <Field label={i18n._(t`Korte omschrijving`)} horizontal={true}>
                        {defaultValues.description}
                    </Field>
                    <Field label={i18n._(t`Motivatie`)} horizontal={true}>
                        {defaultValues.motivation}
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field label={i18n._(t`Korte omschrijving`)} horizontal={true} required={true}>
                    <Input
                        name="description"
                        placeholder={i18n._(t`Beschrijving`)}
                        defaultValue={defaultValues?.description ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Motivatie`)} horizontal={true} required={true}>
                    <TextArea
                        name="motivation"
                        placeholder={i18n._(t`Motivatie`)}
                        defaultValue={defaultValues?.motivation ?? undefined}
                    />
                </Field>
            </>
        )
    }
}
