import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentWritingTestResultEnumTranslations } from 'components/Domain/Participation/translations/translations'
import React from 'react'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { Maybe, WritingTestResult } from 'api/types/types'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    prefillData?: WritingInformationFieldsetPrefillData
    readOnly?: boolean
}
export interface WritingInformationFieldsetModel {
    'intake.writingTestResult'?: Maybe<WritingTestResult>
}

export interface WritingInformationFieldsetPrefillData {
    'intake.writingTestResult'?: Maybe<WritingTestResult>
}

const WritingInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Schrijftest`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                        <Paragraph>
                            {
                                getStudentWritingTestResultEnumTranslations().find(
                                    option => option.value === prefillData?.['intake.writingTestResult']
                                )?.label
                            }
                        </Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Schrijftest`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                    <Select
                        name="intake.writingTestResult"
                        placeholder={i18n._(t`Selecteer`)}
                        options={getStudentWritingTestResultEnumTranslations()}
                        defaultValue={prefillData?.['intake.writingTestResult'] ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )

    function getStudentWritingTestResultEnumTranslations() {
        return Object.values(WritingTestResult).map(value => ({
            label: studentWritingTestResultEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value,
        }))
    }
}

export default WritingInformationFieldset
