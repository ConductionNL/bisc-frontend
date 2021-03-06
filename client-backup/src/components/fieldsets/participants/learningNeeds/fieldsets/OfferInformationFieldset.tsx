export {}
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import Input from 'components/Core/DataEntry/Input'
// import Select from 'components/Core/DataEntry/Select'
// import Field from 'components/Core/Field/Field'
// import Section from 'components/Core/Field/Section'
// import Column from 'components/Core/Layout/Column/Column'
// import Paragraph from 'components/Core/Typography/Paragraph'
// import { ParticipationOfferCourseEnum } from 'generated/graphql'
// import React from 'react'

// interface Props {
//     defaultValues?: OfferInformationFieldsetDefaultValues
//     readOnly?: boolean
// }

// export interface OfferInformationFieldsetModel {
//     offerName?: string
//     courseType?: ParticipationOfferCourseEnum
// }

// export interface OfferInformationFieldsetDefaultValues {
//     offerName?: string
//     offerCourse?: ParticipationOfferCourseEnum
// }

// const OfferInformationFieldset: React.FunctionComponent<Props> = props => {
//     const { defaultValues, readOnly } = props
//     const { i18n } = useLingui()

//     const ParticipationOfferCourseEnumTranslations = {
//         [ParticipationOfferCourseEnum.Digital]: i18n._(t`Digitale vaardigheden`),
//         [ParticipationOfferCourseEnum.Language]: i18n._(t`Taal`),
//         [ParticipationOfferCourseEnum.Math]: i18n._(t`Rekenen`),
//         [ParticipationOfferCourseEnum.Other]: i18n._(t`Overige`),
//     }

//     if (readOnly) {
//         return (
//             <Section title={i18n._(t`Aanbieder`)}>
//                 <Column spacing={4}>
//                     <Field label={i18n._(t`Naam aanbod`)} horizontal={true}>
//                         <Paragraph>{defaultValues?.offerName}</Paragraph>
//                     </Field>
//                     <Field label={i18n._(t`Type cursus`)} horizontal={true}>
//                         <Paragraph>{defaultValues?.offerCourse}</Paragraph>
//                     </Field>
//                 </Column>
//             </Section>
//         )
//     }

//     return (
//         <Section title={i18n._(t`Aanbod`)}>
//             <Column spacing={4}>
//                 <Field label={i18n._(t`Naam aanbod`)} horizontal={true}>
//                     <Input
//                         name="offerName"
//                         placeholder={i18n._(t`Naam aanbod`)}
//                         defaultValue={defaultValues?.offerName ?? undefined}
//                     />
//                 </Field>
//                 <Field label={i18n._(t`Type cursus`)} horizontal={true}>
//                     <Column spacing={2}>
//                         <Select
//                             list="cursusType"
//                             name="cursusType"
//                             placeholder={i18n._(t`Selecteer type`)}
//                             options={participationOfferCourseOptions()}
//                         />
//                     </Column>
//                 </Field>
//             </Column>
//         </Section>
//     )

//     function participationOfferCourseOptions() {
//         const values = Object.values(ParticipationOfferCourseEnum)

//         const options = values.map(option => {
//             return {
//                 value: option,
//                 label: ParticipationOfferCourseEnumTranslations[option],
//             }
//         })

//         return options
//     }
// }

// export default OfferInformationFieldset
