import React from 'react'

import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { DesiredOutcomeMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    defaultValues: DesiredOutcomeMetadata
    readOnly?: boolean
}

export const DesiredOutcomesFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Gewenste leeruitkomst`)}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        const { readOnly, defaultValues } = props
        const { goal, topic, application, level } = defaultValues

        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Werkwoord`)} horizontal={true}>
                        <Paragraph>{goal}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Onderwerp`)} horizontal={true}>
                        <Paragraph>{topic}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Toepassingen`)} horizontal={true}>
                        <Paragraph>{application.join(', ')}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Niveau`)} horizontal={true}>
                        <Paragraph>{level}</Paragraph>
                    </Field>
                </>
            )
        }

        // TODO: implement editable fields when needed
        return null
    }
}
