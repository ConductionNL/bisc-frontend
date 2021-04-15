import classNames from 'classnames'
import React from 'react'
import { EventDetailTypes } from '../EventDetailFieldView'
import styles from './FilesEventsDetailContainer.module.scss'

interface Props {
    type?: EventDetailTypes
}

export const FilesEventsDetailContainer: React.FC<Props> = ({ type, children }) => {
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === EventDetailTypes.finalInterview,
        [styles.comment]: type === EventDetailTypes.comment,
        [styles.followUp]: type === EventDetailTypes.followUp,
        [styles.storytelling]: type === EventDetailTypes.storyTelling,
        [styles.intake]: type === EventDetailTypes.intake,
        [styles.default]: !type,
    })

    return (
        <div className={containerClassNames}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>{children}</div>
        </div>
    )
}
