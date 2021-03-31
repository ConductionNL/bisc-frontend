import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'

interface Props {
    defaultValues?: LearningOutcomeOfferFieldsetDefaultValues
    readOnly?: boolean
}

export interface LearningOutcomeOfferFieldsetModel {
    supplier?: string
    explanation: string
}

export interface LearningOutcomeOfferFieldsetDefaultValues {
    goal: string
    topic: string
    application: string
    level: string
}

const LearningOutcomeOfferFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues: prefillData, readOnly } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Leeruitkomst aanbod`)}>
            <Column spacing={4}>{renderFieldsets()}</Column>
        </Section>
    )

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>{prefillData?.goal}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>{prefillData?.topic}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>{prefillData?.application}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>{prefillData?.level}</Paragraph>
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field label={i18n._(t`Werkwoord`)} horizontal={true}>
                    <Input name="goal" placeholder={i18n._(t`Werkwoord`)} defaultValue={prefillData?.goal} />
                </Field>
                <Field label={i18n._(t`Onderwerp`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select name="topic" placeholder={i18n._(t`Selecteer onderwerp`)} options={['test']} />
                    </Column>
                </Field>
                <Field label={i18n._(t`Toepassing`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select name="application" placeholder={i18n._(t`Selecteer toepassing`)} options={['test']} />
                    </Column>
                </Field>
                <Field label={i18n._(t`Level`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select name="level" placeholder={i18n._(t`Selecteer niveau`)} options={['test']} />
                    </Column>
                </Field>
            </>
        )
    }
}

export default LearningOutcomeOfferFieldset
