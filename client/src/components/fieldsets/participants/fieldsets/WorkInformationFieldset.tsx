export {}
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import Paragraph from 'components/Core/Typography/Paragraph'
// import { studentJobDaytimeActivitiesEnumTranslations } from 'components/Domain/Participation/translations/translations'
// import { Maybe, Scalars, StudentJobDaytimeActivitiesEnum } from 'generated/graphql'
// import React from 'react'
// import Checkbox from '../../../Core/DataEntry/Checkbox'
// import Input from '../../../Core/DataEntry/Input'
// import Field from '../../../Core/Field/Field'
// import Section from '../../../Core/Field/Section'
// import Column from '../../../Core/Layout/Column/Column'
// import Row from '../../../Core/Layout/Row/Row'

// interface Props {
//     prefillData?: WorkInformationFieldsetModel
//     readOnly?: boolean
// }

// export interface WorkInformationFieldsetModel {
//     trainedForJob?: Maybe<Scalars['String']>
//     lastJob?: Maybe<Scalars['String']>
//     dayTimeActivities?: Maybe<Array<StudentJobDaytimeActivitiesEnum>>
//     dayTimeActivitiesOther?: Maybe<Scalars['String']>
// }

// const WorkInformationFieldset: React.FunctionComponent<Props> = props => {
//     const { prefillData, readOnly } = props
//     const { i18n } = useLingui()

//     const dayTimeActivities = getStudentJobDaytimeActivitiesEnumOptions()

//     if (readOnly) {
//         return (
//             <Section title={i18n._(t`Werk`)}>
//                 <Column spacing={4}>
//                     <Field label={i18n._(t`Voor welk werk ben je opgeleid`)} horizontal={true}>
//                         <p>{prefillData?.trainedForJob}</p>
//                     </Field>
//                     <Field label={i18n._(t`Waar heb je voor het laatst gewerkt?`)} horizontal={true}>
//                         <p>{prefillData?.lastJob}</p>
//                     </Field>
//                     <Field label={i18n._(t`Hoe ziet je dagbesteding eruit?`)} horizontal={true}>
//                         <Column spacing={4}>
//                             {renderDayTimeActivitiesCheckboxes()}
//                             {prefillData?.dayTimeActivitiesOther && (
//                                 <Paragraph>{prefillData?.dayTimeActivitiesOther}</Paragraph>
//                             )}
//                         </Column>
//                     </Field>
//                 </Column>
//             </Section>
//         )
//     }

//     return (
//         <Section title={i18n._(t`Werk`)}>
//             <Column spacing={4}>
//                 <Field label={i18n._(t`Voor welk werk ben je opgeleid`)} horizontal={true}>
//                     <Input
//                         name="trained"
//                         placeholder={i18n._(t`Welk werk`)}
//                         defaultValue={prefillData?.trainedForJob ?? undefined}
//                     />
//                 </Field>

//                 <Field
//                     label={i18n._(t`Waar heb je voor het laatst gewerkt?`)}
//                     horizontal={true}
//                     description={'Kan ook vrijwilligerswerk zijn.'}
//                 >
//                     <Input
//                         name="lastJob"
//                         placeholder={i18n._(t`Waar gewerkt`)}
//                         defaultValue={prefillData?.lastJob ?? undefined}
//                     />
//                 </Field>

//                 <Field label={i18n._(t`Hoe ziet je dagbesteding eruit?`)} horizontal={true}>
//                     <Column spacing={4}>
//                         {renderDayTimeActivitiesCheckboxes()}

//                         <Input
//                             name="dayTimeActivitiesOther"
//                             placeholder={i18n._(t`Andere dagbesteding`)}
//                             defaultValue={prefillData?.dayTimeActivitiesOther ?? undefined}
//                         />
//                     </Column>
//                 </Field>
//             </Column>
//         </Section>
//     )

//     function renderDayTimeActivitiesCheckboxes() {
//         if (readOnly && prefillData?.dayTimeActivities) {
//             return prefillData.dayTimeActivities.map((activity, index) => {
//                 return (
//                     <Row key={index}>
//                         <Paragraph>{activity}</Paragraph>
//                     </Row>
//                 )
//             })
//         }

//         return dayTimeActivities.map((activity, index) => {
//             return (
//                 <Row key={index}>
//                     <Checkbox
//                         name={'dayTimeActivities'}
//                         value={activity.value}
//                         defaultChecked={
//                             !!prefillData?.dayTimeActivities?.find(
//                                 dayTimeActivity => dayTimeActivity === activity.value
//                             )
//                         }
//                     />
//                     <Paragraph>{activity.label}</Paragraph>
//                 </Row>
//             )
//         })
//     }

//     function getStudentJobDaytimeActivitiesEnumOptions() {
//         return Object.values(StudentJobDaytimeActivitiesEnum).map(value => ({
//             label: studentJobDaytimeActivitiesEnumTranslations[value],
//             value,
//         }))
//     }
// }

// export default WorkInformationFieldset
