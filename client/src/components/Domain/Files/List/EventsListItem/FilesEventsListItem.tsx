import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import styles from './FilesEventsListItem.module.scss'
import { ContactMoment, ContactType } from 'api/types/types'

interface Props {
    data?: ContactMoment
    isActive?: boolean
    onClick?: () => void
}

export const FilesEventsListItem: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { data, onClick, isActive } = props

    const containerClassNames = classNames(
        styles.container,
        {
            [styles.finalInterview]: data?.type === ContactType.FinalTalk,
            [styles.comment]: data?.type === ContactType.Remark,
            [styles.followUp]: data?.type === ContactType.FollowUp,
            [styles.storytelling]: data?.type === ContactType.StoryTelling,
            [styles.intake]: data?.type === ContactType.Intake,
            [styles.default]: !data,
        },
        {
            [styles.isActive]: isActive,
        }
    )

    const EventDetailTypesTranslations = {
        [ContactType.FinalTalk]: i18n._(t`Eindgesprek`),
        [ContactType.Remark]: i18n._(t`Opmerking`),
        [ContactType.FollowUp]: i18n._(t`Vervolggesprek`),
        [ContactType.StoryTelling]: i18n._(t`Informatie voor storytelling`),
        [ContactType.Intake]: i18n._(t`Intake`),
    }

    if (data) {
        return (
            <div className={containerClassNames} onClick={onClick}>
                <div className={styles.border} />
                <div className={styles.contentContainer}>
                    <div className={styles.titleContainer}>
                        <Paragraph className={styles.title}>{EventDetailTypesTranslations[data.type]}</Paragraph>
                        <Paragraph className={styles.subtitle}>{data.employee.person.givenName}</Paragraph>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <Paragraph>{data.explanation}</Paragraph>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={containerClassNames} onClick={onClick}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>
                <div className={styles.titleContainer}>
                    <Paragraph className={styles.title}>{i18n._(t`Nieuwe gebeurtenis`)}</Paragraph>
                </div>
                <div className={styles.descriptionContainer}>
                    <Paragraph className={styles.description}>{i18n._(t`Hier komt de omschrijving…`)}</Paragraph>
                </div>
            </div>
        </div>
    )
}
