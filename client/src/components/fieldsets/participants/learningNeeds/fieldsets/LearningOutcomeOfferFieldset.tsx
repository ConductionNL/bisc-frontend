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
import { LearningNeedApplicationEnum, LearningNeedLevelEnum, LearningNeedTopicEnum } from 'generated/graphql'
import React from 'react'

interface Props extends ConnectedFieldsetProps<Fields> {
    defaultValues?: LearningOutcomeOfferFieldsetDefaultValues
    readOnly?: boolean
}

export interface LearningOutcomeOfferFieldsetModel {
    outComesGoal: string
    outComesTopic: LearningNeedTopicEnum
    outComesApplication: LearningNeedApplicationEnum
    outComesLevel: LearningNeedLevelEnum
}

export interface LearningOutcomeOfferFieldsetDefaultValues {
    outComesGoal: string
    outComesTopic: LearningNeedTopicEnum
    outComesApplication: LearningNeedApplicationEnum
    outComesLevel: LearningNeedLevelEnum
}

type Fields = 'outComesGoal' | 'outComesTopic' | 'outComesApplication' | 'outComesLevel'

const LearningOutcomeOfferFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()

    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Leeruitkomst aanbod`),
            outComesGoal: {
                label: i18n._(t`Werkwoord`),
                placeholder: i18n._(t`Werkwoord`),
            },
            outComesTopic: {
                label: i18n._(t`Onderwerp`),
                placeholder: i18n._(t`Selecteer onderwerl`),
            },
            outComesApplication: {
                label: i18n._(t`Toepassing`),
                placeholder: i18n._(t`Selecteer toepassing`),
            },
            outComesLevel: {
                label: i18n._(t`Niveau`),
                placeholder: i18n._(t`Selecteer niveau`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            outComesGoal: {},
            outComesTopic: {},
            outComesApplication: {},
            outComesLevel: {},
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
                    <ControlField control={controls.outComesGoal} label={content.outComesGoal?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.outComesGoal}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.outComesTopic}
                        label={content.outComesTopic?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.outComesTopic}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.outComesApplication}
                        label={content.outComesApplication?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.outComesApplication}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.outComesLevel}
                        label={content.outComesLevel?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.outComesLevel}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField control={controls.outComesGoal} label={content.outComesGoal?.label} horizontal={true}>
                    <Input
                        name="goal"
                        placeholder={content.outComesGoal?.placeholder}
                        defaultValue={defaultValues?.outComesGoal}
                    />
                </ControlField>

                <ControlField control={controls.outComesTopic} label={content.outComesTopic?.label} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            name="topic"
                            placeholder={content.outComesTopic?.placeholder}
                            options={renderOutComesTopicOptions()}
                            defaultValue={defaultValues?.outComesTopic}
                        />
                    </Column>
                </ControlField>

                <ControlField
                    control={controls.outComesApplication}
                    label={content.outComesApplication?.label}
                    horizontal={true}
                >
                    <Column spacing={2}>
                        <Select
                            name="application"
                            placeholder={content.outComesApplication?.placeholder}
                            options={['test']}
                            defaultValue={defaultValues?.outComesApplication}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.outComesLevel} label={content.outComesLevel?.label} horizontal={true}>
                    <Paragraph>{defaultValues?.outComesLevel}</Paragraph>
                    <Column spacing={2}>
                        <Select
                            name="level"
                            placeholder={content.outComesLevel?.placeholder}
                            options={['test']}
                            defaultValue={defaultValues?.outComesLevel}
                        />
                    </Column>
                </ControlField>
            </>
        )
    }

    function renderOutComesTopicOptions() {
        const ParticipationOfferCourseEnumTranslations = {
            [LearningNeedTopicEnum.Attitude]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.Behaviour]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.DigitalCommunication]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.DigitalProcessingInformation]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.DigitalSearchingInformation]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.DigitalUsingIctSystems]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.DutchReading]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.DutchWriting]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.Knowledge]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.MathGeometry]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.MathLinks]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.MathNumbers]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.MathProportion]: i18n._(t`Rekenen`),
            [LearningNeedTopicEnum.Other]: i18n._(t`Rekenen`),
        }

        return Object.values(ParticipationOfferCourseEnumTranslations)
    }
}

export default LearningOutcomeOfferFieldset
