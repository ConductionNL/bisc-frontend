export {}
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import Button, { ButtonType } from 'components/Core/Button/Button'
// import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
// import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
// import { IconType } from 'components/Core/Icon/IconType'
// import Center from 'components/Core/Layout/Center/Center'
// import Row from 'components/Core/Layout/Row/Row'
// import { ModalViewBig } from 'components/Core/Modal/ModalViewBig'
// import { UserContext } from 'components/Providers/UserProvider/context'
// import { ProviderEmployeeType, useProviderEmployeesQuery } from 'generated/graphql'
// import React, { useContext, useState } from 'react'
// import { GroupMentorsList } from '../Lists/GroupsMentorsList'
// import { GroupMentorDetailModalGroup, GroupMentorDetailModalSectionView } from './GroupMentorDetailModalSectionView'

// interface Props {
//     onClose: () => void
//     onSubmit: (data: ProviderEmployeeType) => void
//     group?: GroupMentorDetailModalGroup
// }

// export const GroupAddMentorModal: React.FunctionComponent<Props> = props => {
//     const { onClose, onSubmit, group } = props
//     const [selectedAanbiederEmployee, setSelectedAanbiederEmployee] = useState<ProviderEmployeeType | null>(null)

//     const userContext = useContext(UserContext)
//     const { data: list, loading: listLoading, error: listError } = useProviderEmployeesQuery({
//         variables: {
//             providerId: userContext.user?.organizationId ?? '',
//         },
//     })
//     const { i18n } = useLingui()

//     return (
//         <ModalViewBig
//             title={i18n._(t`Begeleider toevoegen`)}
//             onClose={onClose}
//             ContentComponent={renderContent()}
//             BottomComponent={renderBottomComponent()}
//         />
//     )

//     function renderContent() {
//         if (!selectedAanbiederEmployee) {
//             return renderList()
//         }

//         return <GroupMentorDetailModalSectionView selectedAanbiederEmployee={selectedAanbiederEmployee} group={group} />
//     }
//     function renderList() {
//         if (listLoading) {
//             return (
//                 <Center>
//                     <Spinner type={Animation.simpleSpinner} />
//                 </Center>
//             )
//         }

//         if (listError || !list) {
//             return (
//                 <ErrorBlock
//                     title={i18n._(t`Er ging iets fout`)}
//                     message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
//                 />
//             )
//         }

//         return (
//             <>
//                 <GroupMentorsList
//                     onAddMentor={item => handleOnAddMentor(item)}
//                     onView={item => setSelectedAanbiederEmployee(item)}
//                     data={list.providerEmployees}
//                 />
//             </>
//         )
//     }

//     function renderBottomComponent() {
//         if (!selectedAanbiederEmployee) {
//             return undefined // undefined because check is already done in modalView and ts did not like null
//         }
//         return (
//             <Row justifyContent={'space-between'} grow={true}>
//                 <Button
//                     icon={IconType.arrowLeft}
//                     type={ButtonType.secondary}
//                     onClick={() => setSelectedAanbiederEmployee(null)}
//                 >
//                     {i18n._(t`Terug naar begeleidersoverzicht`)}
//                 </Button>
//                 <Row spacing={1}>
//                     <Button type={ButtonType.secondary} onClick={() => onClose()}>
//                         {i18n._(t`Annuleren`)}
//                     </Button>

//                     <Button
//                         type={ButtonType.primary}
//                         onClick={() => handleOnAddMentor(selectedAanbiederEmployee)}
//                     >
//                         {i18n._(t`Begeleider toevoegen`)}
//                     </Button>
//                 </Row>
//             </Row>
//         )
//     }

//     function handleOnAddMentor(item: ProviderEmployeeType) {
//         onSubmit(item)
//         onClose()
//     }
// }
