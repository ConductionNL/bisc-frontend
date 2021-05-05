export {}
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import Input from 'components/Core/DataEntry/Input'
// import Select from 'components/Core/DataEntry/Select'
// import ControlField from 'components/Core/Field/ControlField'
// import Section from 'components/Core/Field/Section'
// import Column from 'components/Core/Layout/Column/Column'
// import Paragraph from 'components/Core/Typography/Paragraph'
// import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
// import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
// import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
// import React from 'react'
// import { GroupTypeCourseEnum } from 'generated/graphql'
// import { GenericValidators } from 'utils/validators/GenericValidators'
// import { groupCourseTypeTranslations } from '../Translations/groupTranslations'

// interface Props extends ConnectedFieldsetProps<Fields> {
//     prefillData?: GroupFieldsetPrefillData
//     readOnly?: boolean
// }

// export interface GroupFieldsetFormModel {
//     groupName?: string
//     groupCourseType?: GroupTypeCourseEnum
// }
// export interface GroupFieldsetPrefillData {
//     groupName?: string
//     groupCourseType?: GroupTypeCourseEnum
// }

// type Fields = 'groupName' | 'groupCourseType'
// export const GroupFieldset: React.FunctionComponent<Props> = props => {
//     const { prefillData, readOnly, fieldNaming, fieldControls } = props
//     const { i18n } = useLingui()
//     const content = useFieldsetContent<Fields>(
//         {
//             title: i18n._(t`Vestiging`),
//             groupName: {
//                 label: i18n._(t`Naam groep`),
//                 placeholder: i18n._(t`Naam`),
//             },
//             groupCourseType: {
//                 label: i18n._(t`Type cursus`),
//                 placeholder: i18n._(t`Selecteer type...`),
//             },
//         },
//         fieldNaming
//     )
//     const controls = useFieldsetControl<Fields>(
//         {
//             groupName: {
//                 required: true,
//                 validators: [GenericValidators.required],
//             },
//             groupCourseType: {
//                 validators: [GenericValidators.required],
//             },
//         },
//         fieldControls
//     )

//     if (readOnly) {
//         return (
//             <Section title={content.title}>
//                 <Column spacing={4}>
//                     <ControlField control={controls.groupName} label={content.groupName?.label} horizontal={true}>
//                         <Paragraph>{prefillData?.groupName}</Paragraph>
//                     </ControlField>

//                     <ControlField
//                         control={controls.groupCourseType}
//                         label={content.groupCourseType?.label}
//                         horizontal={true}
//                     >
//                         <Paragraph>
//                             {(prefillData?.groupCourseType &&
//                                 groupCourseTypeTranslations[prefillData?.groupCourseType]) ??
//                                 'TRANSLATION NOT SUPPORTED'}
//                         </Paragraph>
//                     </ControlField>
//                 </Column>
//             </Section>
//         )
//     }

//     return (
//         <Section title={content.title}>
//             <Column spacing={4}>
//                 <ControlField control={controls?.groupName} label={content.groupName?.label} horizontal={true}>
//                     <Input
//                         name="branch"
//                         placeholder={content.groupName?.placeholder}
//                         validators={controls.groupName?.validators}
//                         defaultValue={prefillData?.groupName}
//                     />
//                 </ControlField>

//                 <ControlField
//                     control={controls?.groupCourseType}
//                     label={content?.groupCourseType?.label}
//                     horizontal={true}
//                 >
//                     <Select
//                         defaultValue={prefillData?.groupCourseType}
//                         name={'typeCourse'}
//                         options={getTypeCoursesOptions()}
//                         placeholder={content.groupCourseType?.placeholder}
//                         validators={controls.groupCourseType?.validators}
//                     />
//                 </ControlField>
//             </Column>
//         </Section>
//     )

//     function getTypeCoursesOptions() {
//         return Object.values(GroupTypeCourseEnum).map(typeCourse => ({
//             label: groupCourseTypeTranslations[typeCourse] ?? 'TRANSLATION NOT SUPPORTED',
//             value: typeCourse,
//         }))
//     }
// }
