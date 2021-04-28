import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import PageTitle, { PageTitleSize } from 'components/Core/Text/PageTitle'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React from 'react'
import { FilesEventsDetailContainer } from '../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import styles from './FilesEventsSuccessView.module.scss'

export const FilesEventsSuccesView: React.FC = () => {
    return (
        <FilesEventsDetailContainer type={'success'}>
            <div className={styles.contentContainer}>
                <div className={styles.iconContainer}>
                    <Icon type={IconType.checkmark} className={styles.icon} />
                </div>
                <SectionTitle title={'Gebeurtenis succesvol toegevoegd'} heading={'H4'} className={styles.title} />
            </div>
        </FilesEventsDetailContainer>
    )
}
