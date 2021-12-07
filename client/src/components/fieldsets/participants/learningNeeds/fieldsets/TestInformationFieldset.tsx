import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { TestResult } from 'api/types/types'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import TextArea from 'components/Core/DataEntry/TextArea'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import React from 'react'

interface Props extends ConnectedFieldsetProps<Fields> {
    defaultValues?: TestResult
    readOnly?: boolean
    errorPath?: Partial<Record<keyof TestInformationFieldsetModel, string | undefined>>
    hideTitle?: boolean
}
export interface TestInformationFieldsetModel {
    usedExam: string
    examDate: string
    memo: string
}

type Fields = 'usedExam' | 'examDate' | 'memo' | 'level'

const TestInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, fieldNaming, fieldControls, errorPath, hideTitle } = props
    const { i18n } = useLingui()

    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Toets`),
            usedExam: {
                label: i18n._(t`Gebruikte toets`),
                placeholder: i18n._(t`Gebruikte toets`),
            },
            examDate: {
                label: i18n._(t`Toetsdatum`),
                placeholder: i18n._(t`DD/MM/YYYY`),
            },
            memo: {
                label: i18n._(t`Toelichting`),
                placeholder: i18n._(t`Toelichting`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            usedExam: {
                required: true,
            },
            examDate: {
                required: true,
            },
            memo: {},
        },
        fieldControls
    )

    if (hideTitle) {
        return <Column spacing={4}>{renderFields()}</Column>
    }

    return (
        <Section title={content.title}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        if (readOnly) {
            return (
                <>
                    <ControlField
                        readOnly={true}
                        control={controls.usedExam}
                        label={content.usedExam?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.usedExam}</Paragraph>
                    </ControlField>
                    <ControlField
                        readOnly={true}
                        control={controls.examDate}
                        label={content.examDate?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.examDate}</Paragraph>
                    </ControlField>
                    <ControlField readOnly={true} control={controls.memo} label={content.memo?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.memo}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField control={controls.usedExam} label={content.usedExam?.label} horizontal={true}>
                    <Input
                        errorPath={errorPath?.usedExam || 'usedExam'}
                        name="usedExam"
                        placeholder={content.usedExam?.placeholder}
                        defaultValue={defaultValues?.usedExam}
                    />
                </ControlField>

                <ControlField control={controls.examDate} label={content.examDate?.label} horizontal={true}>
                    <Column spacing={2}>
                        <DateInput
                            errorPath={errorPath?.examDate || 'examDate'}
                            name="examDate"
                            placeholder={content.examDate?.placeholder}
                        />
                    </Column>
                </ControlField>

                <ControlField control={controls.memo} label={content.memo?.label} horizontal={true}>
                    <Column spacing={2}>
                        <TextArea
                            errorPath={errorPath?.memo || 'memo'}
                            name="memo"
                            placeholder={content.memo?.placeholder}
                            defaultValue={defaultValues?.memo ?? undefined}
                        />
                    </Column>
                </ControlField>
            </>
        )
    }
}

export default TestInformationFieldset
