import { Fade } from 'components/Core/Animations/Fade/Fade'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import PageTitle, { PageTitleSize } from 'components/Core/Text/PageTitle'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React, { useRef } from 'react'
import { FilesEventsDetailContainer } from '../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import styles from './FilesEventsSuccessView.module.scss'

export const FilesEventsSuccesView: React.FC = () => {
    const fadeRef = useRef<any>(null)

    return (
        <Fade className={styles.fade} ref={fadeRef}>
            <FilesEventsDetailContainer type={'success'}>
                <div className={styles.contentContainer}>
                    <div
                        className={styles.iconContainer}
                        onClick={() => {
                            if (fadeRef && fadeRef.current) {
                                fadeRef.current.fadeInFadeOut()
                            }
                        }}
                    >
                        <Icon type={IconType.checkmark} className={styles.icon} />
                    </div>
                    <SectionTitle title={'Gebeurtenis succesvol toegevoegd'} heading={'H4'} className={styles.title} />
                </div>
            </FilesEventsDetailContainer>
        </Fade>
    )
}
