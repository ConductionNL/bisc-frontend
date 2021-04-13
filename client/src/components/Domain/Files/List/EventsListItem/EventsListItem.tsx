import classNames from 'classnames'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import styles from './EventListItem.module.scss'

interface Props {
    type: DossierEventType
    data: EventDataType
}

interface EventDataType {
    id: string
    title: string
    name: string
    description: string
}

type DossierEventType = 'finalInterview' | 'comment' | 'followUp' | 'storytelling' | 'intake'

export const EventsListItem: React.FC<Props> = props => {
    const { type, data } = props
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === 'finalInterview',
        [styles.comment]: type === 'comment',
        [styles.followUp]: type === 'followUp',
        [styles.storytelling]: type === 'storytelling',
        [styles.intake]: type === 'intake',
    })
    return (
        <div className={containerClassNames}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>
                <div className={styles.titleContainer}>
                    <Paragraph className={styles.title}>{data.title}</Paragraph>
                    <Paragraph className={styles.subtitle}>{data.name}</Paragraph>
                </div>
                <div className={styles.descriptionContainer}>
                    <Paragraph>{data.description}</Paragraph>
                </div>
            </div>
        </div>
    )
}
