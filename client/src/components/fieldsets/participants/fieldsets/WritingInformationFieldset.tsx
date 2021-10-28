import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentWritingTestResultEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { Maybe } from 'generated/graphql'
import React from 'react'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { StudentWritingTestResultEnum } from 'generated/enums'

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
                {/* <Column spacing={4}>
                    <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>
                            {
                                getStudentWritingTestResultEnumTranslations().find(
                                    option => option.value === prefillData?.writingTestResult
                                )?.label
                            }
                        </p>
                    </Field>
                </Column> */}
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
