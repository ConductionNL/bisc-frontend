import React from 'react'

import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { LearningQuestionMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    defaultValues: LearningQuestionMetadata
    readOnly?: boolean
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
        const { motivations, desiredOffers, advisedOffers, engagements } = defaultValues

        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Motivatie`)} horizontal={true}>
                        {renderTexts(motivations, { withHyphen: true })}
                    </Field>
                    <Field label={i18n._(t`Gewenste aanbod`)} horizontal={true}>
                        {renderTexts(desiredOffers)}
                    </Field>
                    <Field label={i18n._(t`Geadviseerd aanbod`)} horizontal={true}>
                        {renderTexts(advisedOffers)}
                    </Field>
                    <Field label={i18n._(t`Afspraken`)} horizontal={true}>
                        {renderTexts(engagements, { withHyphen: true })}
                    </Field>
                </>
            )
        }

        // TODO: implement editable fields when needed
        return null
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
