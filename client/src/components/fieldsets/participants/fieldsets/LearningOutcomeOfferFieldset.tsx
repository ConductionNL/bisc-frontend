export {}
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import ConditionalCard from 'components/Core/Containers/ConditionalCard'
// import Input from 'components/Core/DataEntry/Input'
// import Select from 'components/Core/DataEntry/Select'
// import ControlField from 'components/Core/Field/ControlField'
// import Field from 'components/Core/Field/Field'
// import Section from 'components/Core/Field/Section'
// import Column from 'components/Core/Layout/Column/Column'
// import Paragraph from 'components/Core/Typography/Paragraph'
// import {
//     learningNeedApplicationTranslations,
//     learningNeedLevelTranslations,
//     learningNeedTopicTranslations,
// } from 'components/Domain/LearningNeeds/Translations/LearningNeedTranslations'
// import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
// import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
// import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
// import { LearningNeedApplicationEnum, LearningNeedLevelEnum, LearningNeedTopicEnum } from 'generated/graphql'
// import React, { useState } from 'react'

// interface Props extends ConnectedFieldsetProps<Fields> {
//     defaultValues?: LearningOutComeOfferDefaultValues
//     readOnly?: boolean
// }

// export interface LearningOutcomeOfferFieldsetModel {
//     outComesGoal: string
//     outComesTopic: LearningNeedTopicEnum
//     outComesTopicOther?: string
//     outComesApplication: LearningNeedApplicationEnum
//     outComesApplicationOther?: string
//     outComesLevel: LearningNeedLevelEnum
//     outComesLevelOther?: string
// }

// export interface LearningOutComeOfferDefaultValues {
//     outComesGoal?: string
//     outComesTopic?: LearningNeedTopicEnum
//     outComesTopicOther?: string
//     outComesApplication?: LearningNeedApplicationEnum
//     outComesApplicationOther?: string
//     outComesLevel?: LearningNeedLevelEnum
//     outComesLevelOther?: string
// }

// type Fields =
//     | 'outComesGoal'
//     | 'outComesTopic'
//     | 'outComesApplication'
//     | 'outComesApplicationTopicOther'
//     | 'outComesLevel'
//     | 'outComesTopicOther'
//     | 'outComesLevelOther'

// const LearningOutcomeOfferFieldset: React.FunctionComponent<Props> = props => {
//     const { defaultValues, readOnly, fieldNaming, fieldControls } = props
//     const { i18n } = useLingui()
//     const [outComesTopicValue, setOutComesTopicValue] = useState<string>()
//     const [outComesApplicationValue, setOutComesApplicationValue] = useState<string>()
//     const [outComesLevelOtherValue, setOutComesLevelOtherValue] = useState<string>()

//     const content = useFieldsetContent<Fields>(
//         {
//             title: i18n._(t`Leeruitkomst aanbod`),
//             outComesGoal: {
//                 label: i18n._(t`Werkwoord`),
//                 placeholder: i18n._(t`Werkwoord`),
//             },
//             outComesTopic: {
//                 label: i18n._(t`Onderwerp`),
//                 placeholder: i18n._(t`Selecteer onderwerp`),
//             },
//             outComesApplication: {
//                 label: i18n._(t`Toepassing`),
//                 placeholder: i18n._(t`Selecteer toepassing`),
//             },
//             outComesApplicationTopicOther: {
//                 placeholder: i18n._(t`Anders`),
//             },
//             outComesTopicOther: {
//                 placeholder: i18n._(t`Anders`),
//             },
//             outComesLevel: {
//                 label: i18n._(t`Niveau`),
//                 placeholder: i18n._(t`Selecteer niveau`),
//             },
//             outComesLevelOther: {
//                 placeholder: i18n._(t`Anders`),
//             },
//         },
//         fieldNaming
//     )
//     const controls = useFieldsetControl<Fields>(
//         {
//             outComesGoal: {},
//             outComesTopic: {},
//             outComesApplication: {},
//             outComesLevel: {},
//         },
//         fieldControls
//     )

//     return (
//         <Section title={content.title}>
//             <Column spacing={4}>{renderFieldsets()}</Column>
//         </Section>
//     )

//     function renderFieldsets() {
//         if (readOnly) {
//             return (
//                 <>
//                     <ControlField control={controls.outComesGoal} label={content.outComesGoal?.label} horizontal={true}>
//                         <Paragraph>{defaultValues?.outComesGoal}</Paragraph>
//                     </ControlField>
//                     <ControlField
//                         control={controls.outComesTopic}
//                         label={content.outComesTopic?.label}
//                         horizontal={true}
//                     >
//                         <Paragraph>{defaultValues?.outComesTopic}</Paragraph>
//                     </ControlField>
//                     <ControlField
//                         control={controls.outComesApplication}
//                         label={content.outComesApplication?.label}
//                         horizontal={true}
//                     >
//                         <Paragraph>{defaultValues?.outComesApplication}</Paragraph>
//                     </ControlField>
//                     <ControlField
//                         control={controls.outComesLevel}
//                         label={content.outComesLevel?.label}
//                         horizontal={true}
//                     >
//                         <Paragraph>{defaultValues?.outComesLevel}</Paragraph>
//                     </ControlField>
//                 </>
//             )
//         }

//         return (
//             <>
//                 <ControlField control={controls.outComesGoal} label={content.outComesGoal?.label} horizontal={true}>
//                     <Input
//                         name="goal"
//                         placeholder={content.outComesGoal?.placeholder}
//                         defaultValue={defaultValues?.outComesGoal ?? undefined}
//                     />
//                 </ControlField>

//                 <ControlField control={controls.outComesTopic} label={content.outComesTopic?.label} horizontal={true}>
//                     <Column spacing={2}>
//                         <Select
//                             list="topic"
//                             name="topic"
//                             placeholder={content.outComesTopic?.placeholder}
//                             options={renderOutComesTopicOptions()}
//                             onChangeValue={value => setOutComesTopicValue(value)}
//                             defaultValue={defaultValues?.outComesTopic ?? undefined}
//                         />
//                         {outComesTopicValue === LearningNeedTopicEnum.Other && (
//                             <ConditionalCard>
//                                 <Field label={i18n._(t`Toepassing`)}>
//                                     <Input
//                                         name="outComesTopicOther"
//                                         required={true}
//                                         placeholder={content.outComesTopicOther?.placeholder}
//                                         defaultValue={defaultValues?.outComesTopicOther ?? undefined}
//                                     />
//                                 </Field>
//                             </ConditionalCard>
//                         )}
//                     </Column>
//                 </ControlField>

//                 <ControlField
//                     control={controls.outComesApplication}
//                     label={content.outComesApplication?.label}
//                     horizontal={true}
//                 >
//                     <Column spacing={2}>
//                         <Select
//                             list="application"
//                             name="application"
//                             placeholder={content.outComesApplication?.placeholder}
//                             options={renderOutComesApplicationsTopicOptions()}
//                             onChangeValue={value => setOutComesApplicationValue(value)}
//                             defaultValue={defaultValues?.outComesApplication ?? undefined}
//                         />
//                         {outComesApplicationValue === LearningNeedApplicationEnum.Other && (
//                             <ConditionalCard>
//                                 <Field>
//                                     <Input
//                                         name="applicationOther"
//                                         placeholder={content.outComesApplicationTopicOther?.placeholder}
//                                         defaultValue={defaultValues?.outComesApplicationOther ?? undefined}
//                                     />
//                                 </Field>
//                             </ConditionalCard>
//                         )}
//                     </Column>
//                 </ControlField>
//                 <ControlField control={controls.outComesLevel} label={content.outComesLevel?.label} horizontal={true}>
//                     <Column spacing={2}>
//                         <Select
//                             list="level"
//                             name="level"
//                             placeholder={content.outComesLevel?.placeholder}
//                             options={renderOutComesLevelOptions()}
//                             onChangeValue={value => setOutComesLevelOtherValue(value)}
//                             defaultValue={defaultValues?.outComesLevel ?? undefined}
//                         />
//                         {outComesLevelOtherValue === LearningNeedLevelEnum.Other && (
//                             <ConditionalCard>
//                                 <Field>
//                                     <Input
//                                         name="outComesLevelOther"
//                                         placeholder={content.outComesLevelOther?.placeholder}
//                                         defaultValue={defaultValues?.outComesLevelOther ?? undefined}
//                                     />
//                                 </Field>
//                             </ConditionalCard>
//                         )}
//                     </Column>
//                 </ControlField>
//             </>
//         )
//     }

//     function renderOutComesTopicOptions() {
//         return Object.values(LearningNeedTopicEnum).map(value => ({
//             value,
//             label: learningNeedTopicTranslations[value] ?? 'NOT SUPPORTED',
//         }))
//     }

//     function renderOutComesApplicationsTopicOptions() {
//         return Object.values(LearningNeedApplicationEnum).map(value => ({
//             value,
//             label: learningNeedApplicationTranslations[value] ?? 'NOT SUPPORTED',
//         }))
//     }

//     function renderOutComesLevelOptions() {
//         return Object.values(LearningNeedLevelEnum).map(value => ({
//             value,
//             label: learningNeedLevelTranslations[value] ?? 'NOT SUPPORTED',
//         }))
//     }
// }
// export default LearningOutcomeOfferFieldset
