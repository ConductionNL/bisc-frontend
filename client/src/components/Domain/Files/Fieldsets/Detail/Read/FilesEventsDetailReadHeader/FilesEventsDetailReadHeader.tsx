export {}
// import React, { useContext } from 'react'
// import Button, { ButtonType } from 'components/Core/Button/Button'
// import { IconType } from 'components/Core/Icon/IconType'
// import styles from './FilesEventsDetailReadHeader.module.scss'
// import SectionTitle from 'components/Core/Text/SectionTitle'
// import Paragraph from 'components/Core/Typography/Paragraph'
// import { useLingui } from '@lingui/react'
// import { t } from '@lingui/macro'
// import { FilesEventsFieldsetContextState } from '../../../Context/FilesEventsFieldsetContextState'
// import classNames from 'classnames'
// import { StudentDossierEventEnum } from 'generated/graphql'

// interface Props {
//     type: StudentDossierEventEnum
//     metaData: MetaData
// }

// interface MetaData {
//     date: string
//     name: string
// }

// export const FilesEventsDetailReadHeader: React.FC<Props> = ({ type, metaData }) => {
//     const { i18n } = useLingui()
//     const { showReadOnly, environment } = useContext(FilesEventsFieldsetContextState)

//     const containerClassNames = classNames(styles.headerContainer, {
//         [styles.finalInterview]: type === StudentDossierEventEnum.FinalTalk,
//         [styles.comment]: type === StudentDossierEventEnum.Remark,
//         [styles.followUp]: type === StudentDossierEventEnum.FollowUpTalk,
//         [styles.storytelling]: type === StudentDossierEventEnum.InfoForStorytelling,
//         [styles.intake]: type === StudentDossierEventEnum.Intake,
//         [styles.default]: !type,
//     })

//     const EventDetailTypesTranslations = {
//         [StudentDossierEventEnum.FinalTalk]: i18n._(t`Eindgesprek`),
//         [StudentDossierEventEnum.Remark]: i18n._(t`Opmerking`),
//         [StudentDossierEventEnum.FollowUpTalk]: i18n._(t`Vervolggesprek`),
//         [StudentDossierEventEnum.InfoForStorytelling]: i18n._(t`Informatie voor storytelling`),
//         [StudentDossierEventEnum.Intake]: i18n._(t`Intake`),
//     }

//     return (
//         <div className={containerClassNames}>
//             <div className={styles.titleContainer}>
//                 <SectionTitle title={EventDetailTypesTranslations[type]} />
//                 <Paragraph className={styles.subtitle}>{`${metaData.date} • ${metaData.name}`}</Paragraph>
//             </div>
//             {renderEditButton()}
//         </div>
//     )

//     function renderEditButton() {
//         if (environment === 'aanbieder') {
//             return null
//         }

//         return (
//             <Button
//                 className={styles.editIcon}
//                 round={true}
//                 type={ButtonType.tertiary}
//                 icon={IconType.edit}
//                 onClick={() => showReadOnly(false)}
//             />
//         )
//     }
// }
