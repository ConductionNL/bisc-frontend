import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { StudentDossierEventEnum } from '../../Fieldsets/EventDetailFieldView'
import styles from './FilesEventsListItem.module.scss'

interface Props {
    data?: EventListItemType
    isActive?: boolean
    onClick?: () => void
}

export interface EventListItemType {
    type: StudentDossierEventEnum
    id: string
    name: string
    description: string
}

export const FilesEventsListItem: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { data, onClick, isActive } = props

    const containerClassNames = classNames(
        styles.container,
        {
            [styles.finalInterview]: data?.type === StudentDossierEventEnum.FINAL_TALK,
            [styles.comment]: data?.type === StudentDossierEventEnum.REMARK,
            [styles.followUp]: data?.type === StudentDossierEventEnum.FOLLOW_UP_TALK,
            [styles.storytelling]: data?.type === StudentDossierEventEnum.INFO_FOR_STORYTELLING,
            [styles.intake]: data?.type === StudentDossierEventEnum.INTAKE,
            [styles.default]: !data,
        },
        {
            [styles.isActive]: isActive,
        }
    )

    const EventDetailTypesTranslations = {
        [StudentDossierEventEnum.FINAL_TALK]: i18n._(t`Eindgesprek`),
        [StudentDossierEventEnum.REMARK]: i18n._(t`Opmerking`),
        [StudentDossierEventEnum.FOLLOW_UP_TALK]: i18n._(t`Vervolggesprek`),
        [StudentDossierEventEnum.INFO_FOR_STORYTELLING]: i18n._(t`Informatie voor storytelling`),
        [StudentDossierEventEnum.INTAKE]: i18n._(t`Intake`),
    }

    if (data) {
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
