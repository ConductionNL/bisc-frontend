import classNames from 'classnames'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { EventDetailTypes } from '../../Fieldsets/EventDetailFieldView'
import styles from './EventListItem.module.scss'

interface Props {
    data: EventListItemType
    onClick: () => void
}

export interface EventListItemType {
    type: EventDetailTypes
    id: string
    event: string
    name: string
    description: string
}

export const EventsListItem: React.FC<Props> = props => {
    const { data } = props
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: data.type === EventDetailTypes.finalInterview,
        [styles.comment]: data.type === EventDetailTypes.comment,
        [styles.followUp]: data.type === EventDetailTypes.followUp,
        [styles.storytelling]: data.type === EventDetailTypes.storyTelling,
        [styles.intake]: data.type === EventDetailTypes.intake,
    })
    return (
        <div className={containerClassNames}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>
                <div className={styles.titleContainer}>
                    <Paragraph className={styles.title}>{data.event}</Paragraph>
                    <Paragraph className={styles.subtitle}>{data.name}</Paragraph>
                </div>
                <div className={styles.descriptionContainer}>
                    <Paragraph>{data.description}</Paragraph>
                </div>
            </div>
        </div>
    )
}
