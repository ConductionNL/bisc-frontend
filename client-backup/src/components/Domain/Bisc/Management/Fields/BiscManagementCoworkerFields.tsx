export {}
// import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
// import AccountInformationFieldset, {
//     AccountInformationFieldsetFormModel,
// } from 'components/fieldsets/shared/AccountInformationFieldset'
// import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
// import { BiscEmployeeQuery } from 'generated/graphql'
// import React from 'react'

// interface Props {
//     defaultFieldValues?: BiscEmployeeQuery
//     editable?: boolean
// }

// export interface BiscManagementCoworkersFieldsContainerFormModel
//     extends InformationFieldsetModel,
//         AccountInformationFieldsetFormModel {}

// export const BiscManagementCoworkerFieldsContainer: React.FunctionComponent<Props> = props => {
//     const { editable, defaultFieldValues } = props

//     return (
//         <>
//             <InformationFieldset
//                 prefillData={{
//                     familyName: defaultFieldValues?.biscEmployee.familyName,
//                     additionalName: defaultFieldValues?.biscEmployee.additionalName,
//                     callSign: defaultFieldValues?.biscEmployee.givenName,
//                     phonenumber: defaultFieldValues?.biscEmployee.telephone,
//                 }}
//                 readOnly={!editable}
//             />
//             <HorizontalRule />
//             <AccountInformationFieldset
//                 hideRoles={true}
//                 prefillData={{
//                     email: defaultFieldValues?.biscEmployee.email,
//                     createdAt: defaultFieldValues?.biscEmployee.dateCreated,
//                     updatedAt: defaultFieldValues?.biscEmployee.dateModified,
//                 }}
//                 readOnly={!editable}
//             />
//         </>
//     )
// }
