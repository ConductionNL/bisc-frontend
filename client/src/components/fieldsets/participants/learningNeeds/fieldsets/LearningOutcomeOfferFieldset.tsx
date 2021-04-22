import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
import ControlField from 'components/Core/Field/ControlField'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import { LearningNeedApplicationEnum, LearningNeedLevelEnum, LearningNeedTopicEnum } from 'generated/graphql'
import React, { useState } from 'react'
import { CreateParticipationInputType } from 'temp/TEMPORARYgraphql'

interface Props extends ConnectedFieldsetProps<Fields> {
    defaultValues?: LearningOutComeOfferDefaultValues
    readOnly?: boolean
}

export interface LearningOutcomeOfferFieldsetModel {
    outComesGoal: string
    outComesTopic: string
    outComesTopicOther?: string
    outComesApplication: string
    outComesApplicationOther?: string
    outComesLevel: string
    outComesLevelOther?: string
}

interface LearningOutComeOfferDefaultValues {
    outComesGoal?: string
    outComesTopic?: LearningNeedTopicEnum
    outComesTopicOther?: string
    outComesApplication?: LearningNeedApplicationEnum
    outComesApplicationOther?: string
    outComesLevel?: LearningNeedLevelEnum
    outComesLevelOther?: string
}

type Fields =
    | 'outComesGoal'
    | 'outComesTopic'
    | 'outComesApplication'
    | 'outComesApplicationTopicOther'
    | 'outComesLevel'
    | 'outComesTopicOther'
    | 'outComesLevelOther'

const LearningOutcomeOfferFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const [outComesTopicValue, setOutComesTopicValue] = useState<string>()
    const [outComesApplicationValue, setOutComesApplicationValue] = useState<string>()
    const [outComesLevelOtherValue, setOutComesLevelOtherValue] = useState<string>()

    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Leeruitkomst aanbod`),
            outComesGoal: {
                label: i18n._(t`Werkwoord`),
                placeholder: i18n._(t`Werkwoord`),
            },
            outComesTopic: {
                label: i18n._(t`Onderwerp`),
                placeholder: i18n._(t`Selecteer onderwerp`),
            },
            outComesApplication: {
                label: i18n._(t`Toepassing`),
                placeholder: i18n._(t`Selecteer toepassing`),
            },
            outComesApplicationTopicOther: {
                placeholder: i18n._(t`Anders`),
            },
            outComesTopicOther: {
                placeholder: i18n._(t`Anders`),
            },
            outComesLevel: {
                label: i18n._(t`Niveau`),
                placeholder: i18n._(t`Selecteer niveau`),
            },
            outComesLevelOther: {
                placeholder: i18n._(t`Anders`),
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
        <Section title={content.title}>
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
                        defaultValue={defaultValues?.outComesGoal ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.outComesTopic} label={content.outComesTopic?.label} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            list="topic"
                            name="topic"
                            placeholder={content.outComesTopic?.placeholder}
                            options={renderOutComesTopicOptions()}
                            onChangeValue={value => setOutComesTopicValue(value)}
                            defaultValue={defaultValues?.outComesTopic ?? undefined}
                        />
                        {outComesTopicValue === LearningNeedTopicEnum.Other && (
                            <ConditionalCard>
                                <Field>
                                    <Input
                                        name="outComesTopicOther"
                                        required={true}
                                        placeholder={content.outComesTopicOther?.placeholder}
                                        defaultValue={defaultValues?.outComesTopicOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </ControlField>

                <ControlField
                    control={controls.outComesApplication}
                    label={content.outComesApplication?.label}
                    horizontal={true}
                >
                    <Column spacing={2}>
                        <Select
                            list="application"
                            name="application"
                            placeholder={content.outComesApplication?.placeholder}
                            options={renderOutComesApplicationsTopicOptions()}
                            onChangeValue={value => setOutComesApplicationValue(value)}
                            defaultValue={defaultValues?.outComesApplication ?? undefined}
                        />
                        {outComesApplicationValue === LearningNeedApplicationEnum.Other && (
                            <ConditionalCard>
                                <Field>
                                    <Input
                                        name="applicationOther"
                                        placeholder={content.outComesApplicationTopicOther?.placeholder}
                                        defaultValue={defaultValues?.outComesApplicationOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </ControlField>
                <ControlField control={controls.outComesLevel} label={content.outComesLevel?.label} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            list="level"
                            name="level"
                            placeholder={content.outComesLevel?.placeholder}
                            options={renderOutComesLevelOptions()}
                            onChangeValue={value => setOutComesLevelOtherValue(value)}
                            defaultValue={defaultValues?.outComesLevel ?? undefined}
                        />
                        {outComesLevelOtherValue === LearningNeedLevelEnum.Other && (
                            <ConditionalCard>
                                <Field>
                                    <Input
                                        name="outComesLevelOther"
                                        placeholder={content.outComesLevelOther?.placeholder}
                                        defaultValue={defaultValues?.outComesLevelOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </ControlField>
            </>
        )
    }

    function renderOutComesTopicOptions() {
        const keys = Object.values(LearningNeedTopicEnum)

        const learningNeedOutComeTopicTranslations: { [K in LearningNeedTopicEnum]: string } = {
            [LearningNeedTopicEnum.Attitude]: i18n._(t`Houding`),
            [LearningNeedTopicEnum.Behaviour]: i18n._(t`Gedrag`),
            [LearningNeedTopicEnum.DigitalCommunication]: i18n._(t`Digitale communicatie`),
            [LearningNeedTopicEnum.DigitalProcessingInformation]: i18n._(t`Digitale verwerking informatie`),
            [LearningNeedTopicEnum.DigitalSearchingInformation]: i18n._(t`Digitale zoekvaardigheden`),
            [LearningNeedTopicEnum.DigitalUsingIctSystems]: i18n._(t`Digital `),
            [LearningNeedTopicEnum.DutchReading]: i18n._(t`Nederlands lezen`),
            [LearningNeedTopicEnum.DutchWriting]: i18n._(t`Nederlands schrijven`),
            [LearningNeedTopicEnum.Knowledge]: i18n._(t`Kennis`),
            [LearningNeedTopicEnum.Skills]: i18n._(t`Vaardigheden`),
            [LearningNeedTopicEnum.MathGeometry]: i18n._(t`Wiskundige meetkunde`),
            [LearningNeedTopicEnum.MathLinks]: i18n._(t`Wiskundige koppelingen`),
            [LearningNeedTopicEnum.MathNumbers]: i18n._(t`Wiskundige cijfers`),
            [LearningNeedTopicEnum.MathProportion]: i18n._(t`Wiskundig aandeel`),
            [LearningNeedTopicEnum.Other]: i18n._(t`Anders`),
        }

        const options = keys.map(key => {
            return {
                label: learningNeedOutComeTopicTranslations[key],
                value: key,
            }
        })

        return options
    }

    function renderOutComesApplicationsTopicOptions() {
        const keys = Object.values(LearningNeedApplicationEnum)
        const outComesApplicationsTopicOptions: { [K in LearningNeedApplicationEnum]: string } = {
            [LearningNeedApplicationEnum.FamilyAndParenting]: i18n._(t`Gezin en ouderschap`),
            [LearningNeedApplicationEnum.LaborMarketAndWork]: i18n._(t`Arbeidsmarkt en werk`),
            [LearningNeedApplicationEnum.HealthAndWellbeing]: i18n._(t`Gezondheid`),
            [LearningNeedApplicationEnum.AdministrationAndFinance]: i18n._(t`Administratie en financiën`),
            [LearningNeedApplicationEnum.HousingAndNeighborhood]: i18n._(t`Huisvesting en buurt`),
            [LearningNeedApplicationEnum.Selfreliance]: i18n._(t`Zelfredzaamheid`),
            [LearningNeedApplicationEnum.Other]: i18n._(t`Anders`),
        }

        const options = keys.map(key => {
            return {
                label: outComesApplicationsTopicOptions[key],
                value: key,
            }
        })

        return options
    }

    function renderOutComesLevelOptions() {
        const keys = Object.values(LearningNeedLevelEnum)
        const outComesLevelOptions: { [K in LearningNeedLevelEnum]: string } = {
            [LearningNeedLevelEnum.Inflow]: i18n._(t`Instroom`),
            [LearningNeedLevelEnum.Nlqf1]: i18n._(t`NLQF1`),
            [LearningNeedLevelEnum.Nlqf2]: i18n._(t`NLQF2`),
            [LearningNeedLevelEnum.Nlqf3]: i18n._(t`NLQF3`),
            [LearningNeedLevelEnum.Nlqf4]: i18n._(t`NLQF4`),
            [LearningNeedLevelEnum.Other]: i18n._(t`Anders`),
        }

        const options = keys.map(key => {
            return {
                label: outComesLevelOptions[key],
                value: key,
            }
        })

        return options
    }
}

export default LearningOutcomeOfferFieldset
