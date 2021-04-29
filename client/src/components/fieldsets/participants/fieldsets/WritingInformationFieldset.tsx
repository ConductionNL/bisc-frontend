import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentWritingTestResultEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { Maybe, StudentWritingTestResultEnum } from 'generated/graphql'
import React from 'react'
import Select from '../../../Core/DataEntry/Select'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'

interface Props {
    prefillData?: WritingInformationFieldsetPrefillData
    readOnly?: boolean
}
export interface WritingInformationFieldsetModel {
    writingTestResult?: StudentWritingTestResultEnum
}

export interface WritingInformationFieldsetPrefillData {
    writingTestResult: Maybe<StudentWritingTestResultEnum> | undefined
}

const WritingInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Schrijftest`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>
                            {
                                getStudentWritingTestResultEnumTranslations().find(
                                    option => option.value === prefillData?.writingTestResult
                                )?.label
                            }
                        </p>
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
                        name="writingTestResult"
                        placeholder={i18n._(t`Selecteer`)}
                        options={getStudentWritingTestResultEnumTranslations()}
                        defaultValue={prefillData?.writingTestResult ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )

    function getStudentWritingTestResultEnumTranslations() {
        return Object.values(StudentWritingTestResultEnum).map(value => ({
            label: studentWritingTestResultEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value,
        }))
    }
}

export default WritingInformationFieldset
