import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'api/types/types'
import React from 'react'
import TextArea from '../../Core/DataEntry/TextArea'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: ExplanationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface ExplanationInformationFieldsetModel {
    'intake.remarks'?: Maybe<string>
}

export interface ExplanationInformationFieldsetPrefillData {
    'intake.remarks'?: Maybe<string>
}

const ExplanationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Toelichting`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Opmerkingen van de deelnemer`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>{prefillData?.['intake.remarks']}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Toelichting`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Opmerkingen van de deelnemer`)} horizontal={true}>
                    <TextArea
                        name="intake.remarks"
                        placeholder={i18n._(t`Opmerkingen van de deelnemer`)}
                        defaultValue={prefillData?.['intake.remarks'] ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default ExplanationInformationFieldset
