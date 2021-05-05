export {}
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import { IconButton } from 'components/Core/Button/IconButton'
// import { IconType } from 'components/Core/Icon/IconType'
// import Row from 'components/Core/Layout/Row/Row'
// import { Table } from 'components/Core/Table/Table'
// import { TableLink } from 'components/Core/Table/TableLink'
// import Paragraph from 'components/Core/Typography/Paragraph'
// import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'

// import React, { useState } from 'react'
// import { ProviderEmployeeType } from 'generated/graphql'
// import { DateFormatters } from 'utils/formatters/Date/Date'
// import { NameFormatters } from 'utils/formatters/name/Name'

// interface Props {
//     data: ProviderEmployeeType[]
//     onAddMentor: (data: ProviderEmployeeType) => void
//     onView: (data: ProviderEmployeeType) => void
// }

// export const GroupMentorsList = (props: Props) => {
//     const { data, onAddMentor, onView } = props
//     const { i18n } = useLingui()

//     return (
//         <>
//             <Table lastItemIsIcon={true} flex={1} headers={getHeader()} rows={getRows()} />
//         </>
//     )

//     function getHeader() {
//         return [
//             i18n._(t`ACHTERNAAM`),
//             i18n._(t`ROEPNAAM`),
//             i18n._(t`ROL`),
//             i18n._(t`AANGEMAAKT`),
//             i18n._(t`BEWERKT`),
//             '',
//         ]
//     }

//     function getRows() {
//         if (!data) {
//             return []
//         }

//         return data.map(item => [
//             <TableLink
//                 text={NameFormatters.formattedLastName({
//                     additionalName: item.additionalName,
//                     familyName: item.familyName,
//                 })}
//                 onClick={() => handleOnViewClick(item)}
//             />,
//             <Paragraph>{item.givenName}</Paragraph>,
//             <Row spacing={1}>
//                 {item.userRoles.map((role, i, a) => (
//                     <RoleLabelTag key={`${i}-${a.length}`} role={role.name} />
//                 ))}
//             </Row>,
//             <Paragraph>{DateFormatters.formattedDate(item.dateCreated)}</Paragraph>,
//             <Paragraph>{DateFormatters.formattedDate(item.dateModified)}</Paragraph>,
//             <Row>
//                 <IconButton icon={IconType.openEye} onClick={() => handleOnViewClick(item)} />
//                 <IconButton icon={IconType.add} onClick={() => handleOnAddMentor(item)} />
//             </Row>,
//         ])
//     }

//     function handleOnViewClick(item: ProviderEmployeeType) {
//         onView(item)
//     }

//     function handleOnAddMentor(item: ProviderEmployeeType) {
//         onAddMentor(item)
//     }
// }
