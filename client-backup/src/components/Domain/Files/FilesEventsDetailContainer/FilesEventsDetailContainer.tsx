import classNames from 'classnames'
import React from 'react'
import { StudentDossierEventEnum } from 'generated/enums'
import styles from './FilesEventsDetailContainer.module.scss'

interface Props {
    type: FilesEventsDetailContainerTypes
}

export type FilesEventsDetailContainerTypes =
    | StudentDossierEventEnum.FinalTalk
    | StudentDossierEventEnum.Remark
    | StudentDossierEventEnum.FollowUpTalk
    | StudentDossierEventEnum.InfoForStorytelling
    | StudentDossierEventEnum.Intake
    | 'success'
    | 'default'

export const FilesEventsDetailContainer: React.FC<Props> = ({ type, children }) => {
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === StudentDossierEventEnum.FinalTalk,
        [styles.comment]: type === StudentDossierEventEnum.Remark,
        [styles.followUp]: type === StudentDossierEventEnum.FollowUpTalk,
        [styles.storytelling]: type === StudentDossierEventEnum.InfoForStorytelling,
        [styles.intake]: type === StudentDossierEventEnum.Intake,
        [styles.success]: type === 'success',
        [styles.default]: type === 'default',
    })

    return (
        <div className={styles.wrapper}>
            <div className={containerClassNames}>
                <div className={styles.border} />
                {children}
            </div>
        </div>
    )
}
