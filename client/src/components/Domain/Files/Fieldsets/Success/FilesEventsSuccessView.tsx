export {}
// import { t } from '@lingui/macro'
// import { useLingui } from '@lingui/react'
// import { Fade } from 'components/Domain/Files/Fieldsets/Animations/Fade/Fade'
// import Icon from 'components/Core/Icon/Icon'
// import { IconType } from 'components/Core/Icon/IconType'
// import SectionTitle from 'components/Core/Text/SectionTitle'
// import React, { useEffect, useRef } from 'react'
// import { Handle } from 'utils/refs/refs'
// import { FilesEventsDetailContainer } from '../../FilesEventsDetailContainer/FilesEventsDetailContainer'
// import styles from './FilesEventsSuccessView.module.scss'

// export const FilesEventsSuccesView: React.FC = () => {
//     const fadeRef = useRef<Handle<typeof Fade> | null>(null)
//     const { i18n } = useLingui()

//     useEffect(() => {
//         if (fadeRef && fadeRef.current) {
//             fadeRef.current.fadeInFadeOut()
//         }
//     }, [fadeRef])

//     return (
//         <Fade className={styles.fade} ref={fadeRef}>
//             <FilesEventsDetailContainer type={'success'}>
//                 <div className={styles.contentContainer}>
//                     <div className={styles.iconContainer}>
//                         <Icon type={IconType.checkmark} className={styles.icon} />
//                     </div>
//                     <SectionTitle
//                         title={i18n._(t`Gebeurtenis succesvol toegevoegd`)}
//                         heading={'H4'}
//                         className={styles.title}
//                     />
//                 </div>
//             </FilesEventsDetailContainer>
//         </Fade>
//     )
// }
