import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
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
import { TestResultType } from 'temp/TEMPORARYgraphql'

interface Props extends ConnectedFieldsetProps<Fields> {
    defaultValues?: TestResultType
    readOnly?: boolean
}
export interface TestInformationFieldsetModel {
    usedTests: string
    testDate: string
    memo: string
}

type Fields = 'usedTests' | 'testDate' | 'memo' | 'level'

const TestInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()

    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Toets`),
            usedTests: {
                label: i18n._(t`Gebruikte toets`),
                placeholder: i18n._(t`Gebruikte toets`),
            },
            testDate: {
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
            usedTests: {
                required: true,
            },
            testDate: {
                required: true,
            },
            memo: {},
        },
        fieldControls
    )

    return (
        <Section title={content.title}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        if (readOnly) {
            return (
                <>
                    <ControlField control={controls.usedTests} label={content.usedTests?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.examUsedExam}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.testDate} label={content.testDate?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.examDate}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.memo} label={content.memo?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.examMemo}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField control={controls.usedTests} label={content.usedTests?.label} horizontal={true}>
                    <Input
                        name="usedTests"
                        placeholder={content.usedTests?.placeholder}
                        defaultValue={defaultValues?.examUsedExam}
                    />
                </ControlField>

                <ControlField control={controls.testDate} label={content.testDate?.label} horizontal={true}>
                    <Column spacing={2}>
                        <DateInput name="testDate" placeholder={content.testDate?.placeholder} />
                    </Column>
                </ControlField>

                <ControlField control={controls.memo} label={content.memo?.label} horizontal={true}>
                    <Column spacing={2}>
                        <TextArea
                            name="memo"
                            placeholder={content.memo?.placeholder}
                            defaultValue={defaultValues?.examMemo ?? undefined}
                        />
                    </Column>
                </ControlField>
            </>
        )
    }
}

export default TestInformationFieldset
