export {}
// import React, { useEffect, useState } from 'react'
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import classNames from 'classnames'

// import { EmailValidators } from '../../../../utils/validators/EmailValidators'
// import Input from '../../../Core/DataEntry/Input'
// import Select, { OptionsType } from '../../../Core/DataEntry/Select'
// import Field from '../../../Core/Field/Field'
// import Section from '../../../Core/Field/Section'
// import Column from '../../../Core/Layout/Column/Column'
// import styles from './RefererInformationFieldset.module.scss'
// import Paragraph from 'components/Core/Typography/Paragraph'
// import { Maybe, StudentReferringOrganizationEnum } from 'generated/graphql'
// import { GenericValidators } from 'utils/validators/GenericValidators'
// import { studentReferringOrganizationEnumTranslations } from 'components/Domain/Participation/translations/translations'

// interface Props {
//     prefillData?: RefererInformationPrefillData
//     readOnly?: boolean
//     className?: string
// }

// export interface RefererInformationFieldsetModel {
//     referringOrganization?: StudentReferringOrganizationEnum
//     referringOrganizationOther?: string
//     referrerEmailAddress?: string
// }

// export interface RefererInformationPrefillData {
//     referringOrganization?: Maybe<StudentReferringOrganizationEnum>
//     referringOrganizationOther?: Maybe<string>
//     referrerEmailAddress?: Maybe<string>
// }

// const RefererInformationFieldset: React.FunctionComponent<Props> = props => {
//     const { prefillData, readOnly, className } = props
//     const { i18n } = useLingui()
//     const [referringOrganization, setreferringOrganization] = useState<StudentReferringOrganizationEnum | undefined>(
//         undefined
//     )
//     const containerClassName = classNames(styles, className)
//     const options = getStudentReferringOrganizationEnumOptions()

//     useEffect(() => {
//         setreferringOrganization(prefillData?.referringOrganization ?? undefined)
//     }, [prefillData?.referringOrganization])

//     if (readOnly) {
//         return (
//             <Section className={containerClassName} title={i18n._(t`Verwijzer`)}>
//                 <Column spacing={4}>
//                     <Field label={i18n._(t`Verwijzende instantie`)} horizontal={true}>
//                         <Paragraph className={styles.paragraph}>
//                             {options.find(option => option.value === prefillData?.referringOrganization)?.label}
//                         </Paragraph>
//                         {prefillData?.referringOrganization === StudentReferringOrganizationEnum.Other && (
//                             <Paragraph italic={true}>{prefillData?.referringOrganizationOther}</Paragraph>
//                         )}
//                     </Field>

//                     <Field label={i18n._(t`E-mailadres verwijzer`)} horizontal={true}>
//                         <Paragraph className={styles.paragraph}>{prefillData?.referrerEmailAddress}</Paragraph>
//                     </Field>
//                 </Column>
//             </Section>
//         )
//     }

//     return (
//         <Section title={i18n._(t`Verwijzer`)}>
//             <Column spacing={4}>
//                 <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
//                     <Select
//                         onChangeValue={value => setreferringOrganization(value as StudentReferringOrganizationEnum)}
//                         list="referringOrganization"
//                         name="referringOrganization"
//                         placeholder={i18n._(t`Selecteer verwijzer`)}
//                         options={options}
//                         defaultValue={prefillData?.referringOrganization ?? undefined}
//                         validators={[value => GenericValidators.selectedOptionFromOptions(value, options)]}
//                     />
//                 </Field>
//                 {referringOrganization === StudentReferringOrganizationEnum.Other && (
//                     <Field label={i18n._(t`Verwijzer anders`)} horizontal={true}>
//                         <Input
//                             name="referringOrganizationOther"
//                             placeholder={i18n._(t`Anders`)}
//                             defaultValue={prefillData?.referringOrganizationOther ?? undefined}
//                             validators={[GenericValidators.required]}
//                         />
//                     </Field>
//                 )}
//                 <Field label={i18n._(t`E-mailadres verwijzer`)} horizontal={true}>
//                     <Input
//                         name="referrerEmailAddress"
//                         placeholder={i18n._(t`instantie@email.nl`)}
//                         defaultValue={prefillData?.referrerEmailAddress ?? undefined}
//                         validators={[EmailValidators.isEmailAddress]}
//                     />
//                 </Field>
//             </Column>
//         </Section>
//     )

//     function getStudentReferringOrganizationEnumOptions(): OptionsType[] {
//         return Object.values(StudentReferringOrganizationEnum).map(value => ({
//             label: studentReferringOrganizationEnumTranslations[value] ?? 'TRANSLATION MISSING',
//             value: value,
//         }))
//     }
// }

// export default RefererInformationFieldset
