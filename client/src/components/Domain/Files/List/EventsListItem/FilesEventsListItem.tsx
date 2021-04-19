import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { StudentDossierEventEnum, StudentDossierEventType } from 'temp/TEMPORARYgraphql'
import styles from './FilesEventsListItem.module.scss'

interface Props {
    data?: StudentDossierEventType
    isActive?: boolean
    onClick?: () => void
}

export const FilesEventsListItem: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { data, onClick, isActive } = props

    const containerClassNames = classNames(
        styles.container,
        {
            [styles.finalInterview]: data?.event === StudentDossierEventEnum.FINAL_TALK,
            [styles.comment]: data?.event === StudentDossierEventEnum.REMARK,
            [styles.followUp]: data?.event === StudentDossierEventEnum.FOLLOW_UP_TALK,
            [styles.storytelling]: data?.event === StudentDossierEventEnum.INFO_FOR_STORYTELLING,
            [styles.intake]: data?.event === StudentDossierEventEnum.INTAKE,
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
                        <Paragraph className={styles.title}>{EventDetailTypesTranslations[data.event]}</Paragraph>
                        <Paragraph className={styles.subtitle}>{data.createdByAanbiederEmployee.givenName}</Paragraph>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <Paragraph>{data.eventDescription}</Paragraph>
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
