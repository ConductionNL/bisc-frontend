import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import React from 'react'

interface Props extends ConnectedFieldsetProps<Fields> {
    defaultValues?: LearningOutcomeOfferFieldsetDefaultValues
    readOnly?: boolean
}

export interface LearningOutcomeOfferFieldsetModel {
    goal: string
    topic: string
    application: string
    level: string
}

export interface LearningOutcomeOfferFieldsetDefaultValues {
    goal: string
    topic: string
    application: string
    level: string
}

type Fields = 'goal' | 'topic' | 'application' | 'level'

const LearningOutcomeOfferFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()

    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Leeruitkomst aanbod`),
            goal: {
                label: i18n._(t`Werkwoord`),
                placeholder: i18n._(t`Werkwoord`),
            },
            topic: {
                label: i18n._(t`Onderwerp`),
                placeholder: i18n._(t`Selecteer onderwerl`),
            },
            application: {
                label: i18n._(t`Toepassing`),
                placeholder: i18n._(t`Selecteer toepassing`),
            },
            level: {
                label: i18n._(t`Niveau`),
                placeholder: i18n._(t`Selecteer niveau`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            goal: {},
            topic: {},
            application: {},
            level: {},
        },
        fieldControls
    )

    return (
        <Section title={i18n._(t`Leeruitkomst aanbod`)}>
            <Column spacing={4}>{renderFieldsets()}</Column>
        </Section>
    )

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <ControlField control={controls.goal} label={content.goal?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.goal}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.topic} label={content.topic?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.topic}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.application} label={content.application?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.application}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.level} label={content.level?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.level}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField control={controls.goal} label={content.goal?.label} horizontal={true}>
                    <Input name="goal" placeholder={content.goal?.placeholder} defaultValue={defaultValues?.goal} />
                </ControlField>

                <ControlField control={controls.topic} label={content.topic?.label} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            list="topic"
                            name="topic"
                            placeholder={content.topic?.placeholder}
                            options={['test']}
                            defaultValue={defaultValues?.topic}
                        />
                    </Column>
                </ControlField>

                <ControlField control={controls.application} label={content.application?.label} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            list="application"
                            name="application"
                            placeholder={content.application?.placeholder}
                            options={['test']}
                            defaultValue={defaultValues?.application}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.level} label={content.level?.label} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            list="level"
                            name="level"
                            placeholder={content.level?.placeholder}
                            options={['test']}
                            defaultValue={defaultValues?.level}
                        />
                    </Column>
                </ControlField>
            </>
        )
    }
}

export default LearningOutcomeOfferFieldset
