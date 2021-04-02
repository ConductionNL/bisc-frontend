import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
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
    defaultValues?: TestInformationFieldsetDefaultValues
    readOnly?: boolean
}

export interface TestInformationFieldsetModel {
    usedTests: string
    testDate: string
    application: string
}

export interface TestInformationFieldsetDefaultValues {
    usedTests: string
    testDate: string
    application: string
}

type Fields = 'usedTests' | 'testDate' | 'application' | 'level'

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
            application: {
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
            application: {},
        },
        fieldControls
    )

    return (
        <Section title={content.title}>
            <Column spacing={4}>{renderFieldsets()}</Column>
        </Section>
    )

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <ControlField control={controls.usedTests} label={content.usedTests?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.usedTests}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.testDate} label={content.testDate?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.testDate}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.application} label={content.application?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.application}</Paragraph>
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
                        defaultValue={defaultValues?.usedTests}
                    />
                </ControlField>

                <ControlField control={controls.testDate} label={content.testDate?.label} horizontal={true}>
                    <Column spacing={2}>
                        <DateInput name="testDate" placeholder={content.testDate?.placeholder} />
                    </Column>
                </ControlField>

                <ControlField control={controls.application} label={content.application?.label} horizontal={true}>
                    <Column spacing={2}>
                        <TextArea
                            name="application"
                            placeholder={content.application?.placeholder}
                            defaultValue={defaultValues?.application}
                        />
                    </Column>
                </ControlField>
            </>
        )
    }
}

export default TestInformationFieldset
