import classNames from 'classnames'
import React from 'react'
import { StudentDossierEventEnum } from 'generated/graphql'
import styles from './FilesEventsDetailContainer.module.scss'

interface Props {
    type?: StudentDossierEventEnum
}

export const FilesEventsDetailContainer: React.FC<Props> = ({ type, children }) => {
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === StudentDossierEventEnum.FinalTalk,
        [styles.comment]: type === StudentDossierEventEnum.Remark,
        [styles.followUp]: type === StudentDossierEventEnum.FollowUpTalk,
        [styles.storytelling]: type === StudentDossierEventEnum.InfoForStorytelling,
        [styles.intake]: type === StudentDossierEventEnum.Intake,
        [styles.default]: !type,
    })

    return (
        <div className={containerClassNames}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>{children}</div>
        </div>
    )
}
