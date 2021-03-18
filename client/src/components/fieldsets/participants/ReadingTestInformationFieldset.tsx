import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Select from '../../Core/DataEntry/Select'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: ReadingTestInformationFieldsetModel
    readOnly?: true
}

export interface ReadingTestInformationFieldsetModel {
    readingResults: string
}

const ReadingTestInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Leestest`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>{prefillData?.readingResults}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Leestest`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                    <Select name="results" placeholder={i18n._(t`Selecteer`)} options={['test']} />
                </Field>
            </Column>
        </Section>
    )
}

export default ReadingTestInformationFieldset
