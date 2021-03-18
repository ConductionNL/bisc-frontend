import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Select from '../../Core/DataEntry/Select'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: WritingInformationFieldsetModel
    readOnly?: true
}

export interface WritingInformationFieldsetModel {
    writingResults: string
}

const WritingInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Schrijftest`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>{prefillData?.writingResults}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Schrijftest`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                    <Select name="results" placeholder={i18n._(t`Selecteer`)} options={['test']} />
                </Field>
            </Column>
        </Section>
    )
}

export default WritingInformationFieldset
