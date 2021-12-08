import classNames from 'classnames'
import React from 'react'
import styles from './FilesEventsDetailContainer.module.scss'
import { ContactType } from 'api/types/types'

interface Props {
    type: FilesEventsDetailContainerTypes
}

export type FilesEventsDetailContainerTypes = ContactType | 'success' | 'default'

export const FilesEventsDetailContainer: React.FC<Props> = ({ type, children }) => {
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === ContactType.FinalTalk,
        [styles.comment]: type === ContactType.Remark,
        [styles.followUp]: type === ContactType.FollowUp,
        [styles.storytelling]: type === ContactType.StoryTelling,
        [styles.intake]: type === ContactType.Intake,
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
