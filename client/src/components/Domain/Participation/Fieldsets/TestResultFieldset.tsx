import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import React from 'react'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: TestResultFieldsetPrefillData
    readOnly?: boolean
}

export interface TestResultFieldsetFormModel {
    date: string
    test: string
    result: string
    characteristics: string
    explanation: string
}

export interface TestResultFieldsetPrefillData {
    date: string

    test: string
    result: string
    characteristics: string
    explanation: string
}

type Fields = 'date' | 'test' | 'result' | 'characteristics' | 'explanation'

export const TestResultFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Toets resultaat`),
            date: {
                label: i18n._(t`Datum`),
                placeholder: i18n._(t`Datum`),
            },
            test: {
                label: i18n._(t`Toets`),
                placeholder: i18n._(t`Toets`),
            },
            result: {
                label: i18n._(t`Resultaat`),
                placeholder: i18n._(t`Resultaat`),
            },
            characteristics: {
                label: i18n._(t`Kenmerk`),
                placeholder: i18n._(t`Kenmerk`),
            },
            explanation: {
                label: i18n._(t`Toelichting`),
                placeholder: i18n._(t`Toelichting`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            date: {},
            test: {},
            result: {},
            characteristics: {},
            explanation: {},
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.date} label={content.date?.label} horizontal={true}>
                        <p>{prefillData?.date}</p>
                    </ControlField>

                    <ControlField control={controls.test} label={content.test?.label} horizontal={true}>
                        <p>{prefillData?.test}</p>
                    </ControlField>

                    <ControlField
                        control={controls.characteristics}
                        label={content.characteristics?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.characteristics}</p>
                    </ControlField>

                    <ControlField control={controls.result} label={content.result?.label} horizontal={true}>
                        <p>{prefillData?.result}</p>
                    </ControlField>

                    <ControlField control={controls.explanation} label={content.explanation?.label} horizontal={true}>
                        <p>{prefillData?.explanation}</p>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={content.title}>
            <Column spacing={4}>
                <ControlField control={controls?.date} label={content.date?.label} horizontal={true}>
                    <Input
                        name="date"
                        placeholder={content.date?.placeholder}
                        validators={controls.date?.validators}
                        defaultValue={prefillData?.date}
                    />
                </ControlField>

                <ControlField control={controls?.test} label={content?.test?.label} horizontal={true}>
                    <Input
                        name="test"
                        placeholder={content.test?.placeholder}
                        validators={controls.test?.validators}
                        defaultValue={prefillData?.test}
                    />
                </ControlField>

                <ControlField
                    control={controls?.characteristics}
                    label={content?.characteristics?.label}
                    horizontal={true}
                >
                    <Input
                        name="characteristics"
                        placeholder={content?.characteristics?.placeholder}
                        validators={controls.characteristics?.validators}
                        defaultValue={prefillData?.characteristics}
                    />
                </ControlField>

                <ControlField control={controls?.result} label={content.result?.label} horizontal={true}>
                    <Input
                        name="result"
                        placeholder={content.result?.placeholder}
                        defaultValue={prefillData?.result}
                        validators={controls.result?.validators}
                    />
                </ControlField>

                <ControlField control={controls?.explanation} label={content.explanation?.label} horizontal={true}>
                    <Input
                        name="explanation"
                        placeholder={content.explanation?.placeholder}
                        defaultValue={prefillData?.explanation}
                        validators={controls.explanation?.validators}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}
