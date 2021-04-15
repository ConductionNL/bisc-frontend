import React from 'react'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from './FilesEventsDateContainer.module.scss'

interface Props {
    day?: string
    month?: string
    year?: string
}
export const FilesEventsDateContainer: React.FC<Props> = ({ day, month, year }) => {
    return (
        <div className={styles.container}>
            <Paragraph className={styles.title}>{day}</Paragraph>
            <Paragraph className={styles.subtitle}>{`${month} ${year}`}</Paragraph>
        </div>
    )
}
