import classNames from 'classnames'
import React from 'react'
import { StudentDossierEventEnum } from 'temp/TEMPORARYgraphql'
import styles from './FilesEventsDetailContainer.module.scss'

interface Props {
    type?: StudentDossierEventEnum
}

export const FilesEventsDetailContainer: React.FC<Props> = ({ type, children }) => {
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === StudentDossierEventEnum.FINAL_TALK,
        [styles.comment]: type === StudentDossierEventEnum.REMARK,
        [styles.followUp]: type === StudentDossierEventEnum.FOLLOW_UP_TALK,
        [styles.storytelling]: type === StudentDossierEventEnum.INFO_FOR_STORYTELLING,
        [styles.intake]: type === StudentDossierEventEnum.INTAKE,
        [styles.default]: !type,
    })

    return (
        <div className={containerClassNames}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>{children}</div>
        </div>
    )
}
