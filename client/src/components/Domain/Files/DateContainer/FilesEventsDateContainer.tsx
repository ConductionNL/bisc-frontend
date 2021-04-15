import React from 'react'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from './FilesEventsDateContainer.module.scss'

interface Props {
    title?: string
    subtitle?: Subtitle
}

interface Subtitle {
    month?: string
    year?: string
}
export const FilesEventsDateContainer: React.FC<Props> = ({ title, subtitle }) => {
    return (
        <div className={styles.container}>
            <Paragraph className={styles.title}>{title}</Paragraph>
            <Paragraph className={styles.subtitle}>
                {subtitle ? `${subtitle.month} ${subtitle.year}` : 'Datum'}
            </Paragraph>
            <div className={styles.dottedLine} />
        </div>
    )
}
