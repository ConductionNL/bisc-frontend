export {}
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import { studentReadingTestResultEnumTranslations } from 'components/Domain/Participation/translations/translations'
// import { Maybe, StudentReadingTestResultEnum } from 'generated/graphql'
// import React from 'react'
// import Select from '../../../Core/DataEntry/Select'
// import Field from '../../../Core/Field/Field'
// import Section from '../../../Core/Field/Section'
// import Column from '../../../Core/Layout/Column/Column'

// interface Props {
//     prefillData?: ReadingTestInformationFieldsetModel
//     readOnly?: boolean
// }

// export interface ReadingTestInformationFieldsetModel {
//     readingTestResults?: Maybe<StudentReadingTestResultEnum>
// }

// const ReadingTestInformationFieldset: React.FunctionComponent<Props> = props => {
//     const { prefillData, readOnly } = props
//     const { i18n } = useLingui()

//     if (readOnly) {
//         return (
//             <Section title={i18n._(t`Leestest`)}>
//                 <Column spacing={4}>
//                     <Field label={i18n._(t`Resultaat`)} horizontal={true}>
//                         <p style={{ maxWidth: '279px' }}>
//                             {
//                                 getStudentReadingTestResultEnumTranslations().find(
//                                     option => option.value === prefillData?.readingTestResults
//                                 )?.label
//                             }
//                         </p>
//                     </Field>
//                 </Column>
//             </Section>
//         )
//     }

//     return (
//         <Section title={i18n._(t`Leestest`)}>
//             <Column spacing={4}>
//                 <Field label={i18n._(t`Resultaat`)} horizontal={true}>
//                     <Select
//                         name="readingTestResults"
//                         placeholder={i18n._(t`Selecteer`)}
//                         options={getStudentReadingTestResultEnumTranslations()}
//                         defaultValue={prefillData?.readingTestResults ?? undefined}
//                     />
//                 </Field>
//             </Column>
//         </Section>
//     )

//     function getStudentReadingTestResultEnumTranslations() {
//         return Object.values(StudentReadingTestResultEnum).map(value => ({
//             label: studentReadingTestResultEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
//             value,
//         }))
//     }
// }

// export default ReadingTestInformationFieldset
