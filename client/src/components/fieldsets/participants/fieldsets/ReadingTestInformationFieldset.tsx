import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentReadingTestResultEnumTranslations } from 'components/Domain/Participation/translations/translations'
import React from 'react'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { Maybe, ReadingTestResult } from 'api/types/types'
import Paragraph from 'components/Core/Typography/Paragraph'
import { NewSelectV2 } from 'components/Core/DataEntry/NewSelectV2'

interface Props {
    prefillData?: ReadingTestInformationPrefillData
    readOnly?: boolean
}

export interface ReadingTestInformationPrefillData {
    'intake.readingTestResult'?: Maybe<ReadingTestResult>
}

export interface ReadingTestInformationFieldsetModel {
    'intake.readingTestResult'?: Maybe<ReadingTestResult>
}

const ReadingTestInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Leestest`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                        <Paragraph>
                            {
                                getStudentReadingTestResultEnumTranslations().find(
                                    option => option.value === prefillData?.['intake.readingTestResult']
                                )?.label
                            }
                        </Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Leestest`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                    <NewSelectV2
                        name="intake.readingTestResult"
                        placeholder={i18n._(t`Selecteer`)}
                        options={getStudentReadingTestResultEnumTranslations()}
                        defaultValue={
                            prefillData?.['intake.readingTestResult']
                                ? {
                                      value: prefillData?.['intake.readingTestResult'],
                                      label:
                                          studentReadingTestResultEnumTranslations[
                                              prefillData?.['intake.readingTestResult']
                                          ],
                                  }
                                : undefined
                        }
                    />
                </Field>
            </Column>
        </Section>
    )

    function getStudentReadingTestResultEnumTranslations() {
        return Object.values(ReadingTestResult).map(value => ({
            label: studentReadingTestResultEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value,
        }))
    }
}

export default ReadingTestInformationFieldset
