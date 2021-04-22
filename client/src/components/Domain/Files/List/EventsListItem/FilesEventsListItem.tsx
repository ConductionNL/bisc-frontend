import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { StudentDossierEventEnum, StudentDossierEventType } from 'generated/graphql'
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
            [styles.finalInterview]: data?.event === StudentDossierEventEnum.FinalTalk,
            [styles.comment]: data?.event === StudentDossierEventEnum.Remark,
            [styles.followUp]: data?.event === StudentDossierEventEnum.FollowUpTalk,
            [styles.storytelling]: data?.event === StudentDossierEventEnum.InfoForStorytelling,
            [styles.intake]: data?.event === StudentDossierEventEnum.Intake,
            [styles.default]: !data,
        },
        {
            [styles.isActive]: isActive,
        }
    )

    const EventDetailTypesTranslations = {
        [StudentDossierEventEnum.FinalTalk]: i18n._(t`Eindgesprek`),
        [StudentDossierEventEnum.Remark]: i18n._(t`Opmerking`),
        [StudentDossierEventEnum.FollowUpTalk]: i18n._(t`Vervolggesprek`),
        [StudentDossierEventEnum.InfoForStorytelling]: i18n._(t`Informatie voor storytelling`),
        [StudentDossierEventEnum.Intake]: i18n._(t`Intake`),
    }

    if (data) {
        return (
            <div className={containerClassNames} onClick={onClick}>
                <div className={styles.border} />
                <div className={styles.contentContainer}>
                    <div className={styles.titleContainer}>
                        <Paragraph className={styles.title}>{EventDetailTypesTranslations[data.event]}</Paragraph>
                        <Paragraph className={styles.subtitle}>{data.createdByProviderEmployee.givenName}</Paragraph>
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
