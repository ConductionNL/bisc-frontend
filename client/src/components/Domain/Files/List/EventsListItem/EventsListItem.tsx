import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { EventDetailTypes } from '../../Fieldsets/EventDetailFieldView'
import styles from './EventListItem.module.scss'

interface Props {
    data: EventListItemType
    isActive?: boolean
    onClick: () => void
}

export interface EventListItemType {
    type: EventDetailTypes
    id: string
    name: string
    description: string
}

export const EventsListItem: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { data, onClick, isActive } = props

    const containerClassNames = classNames(
        styles.container,
        {
            [styles.finalInterview]: data.type === EventDetailTypes.finalInterview,
            [styles.comment]: data.type === EventDetailTypes.comment,
            [styles.followUp]: data.type === EventDetailTypes.followUp,
            [styles.storytelling]: data.type === EventDetailTypes.storyTelling,
            [styles.intake]: data.type === EventDetailTypes.intake,
        },
        {
            [styles.isActive]: isActive,
        }
    )

    const EventDetailTypesTranslations = {
        [EventDetailTypes.finalInterview]: i18n._(t`Eindgesprek`),
        [EventDetailTypes.comment]: i18n._(t`Opmerking`),
        [EventDetailTypes.followUp]: i18n._(t`Vervolggesprek`),
        [EventDetailTypes.storyTelling]: i18n._(t`Informatie voor storytelling`),
        [EventDetailTypes.intake]: i18n._(t`Intake`),
    }

    return (
        <div className={containerClassNames} onClick={onClick}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>
                <div className={styles.titleContainer}>
                    <Paragraph className={styles.title}>{EventDetailTypesTranslations[data.type]}</Paragraph>
                    <Paragraph className={styles.subtitle}>{data.name}</Paragraph>
                </div>
                <div className={styles.descriptionContainer}>
                    <Paragraph>{data.description}</Paragraph>
                </div>
            </div>
        </div>
    )
}
