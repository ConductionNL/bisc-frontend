import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { EventDetailDefaultValues, EventDetailTypes } from '../EventDetailFieldset'
import styles from '../EventDetailFieldset.module.scss'

interface Props {
    type: EventDetailTypes
    data: EventDetailDefaultValues
    onClickEdit: () => void
}

export const EventDetailReadFields: React.FC<Props> = ({ type, data, onClickEdit }) => {
    const { i18n } = useLingui()

    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === EventDetailTypes.finalInterview,
        [styles.comment]: type === EventDetailTypes.comment,
        [styles.followUp]: type === EventDetailTypes.followUp,
        [styles.storytelling]: type === EventDetailTypes.storyTelling,
        [styles.intake]: type === EventDetailTypes.intake,
    })

    const EventDetailTypesTranslations = {
        [EventDetailTypes.finalInterview]: i18n._(t`Eindgesprek`),
        [EventDetailTypes.comment]: i18n._(t`Opmerking`),
        [EventDetailTypes.followUp]: i18n._(t`Vervolggesprek`),
        [EventDetailTypes.storyTelling]: i18n._(t`Informatie voor storytelling`),
        [EventDetailTypes.intake]: i18n._(t`Intake`),
    }

    return (
        <div className={containerClassNames}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.titleContainer}>
                        <SectionTitle title={EventDetailTypesTranslations[type]} />
                        <Paragraph className={styles.subtitle}>{`${data.date} • ${data.name}`}</Paragraph>
                    </div>
                    <Button
                        className={styles.editIcon}
                        round={true}
                        type={ButtonType.tertiary}
                        icon={IconType.edit}
                        onClick={onClickEdit}
                    />
                </div>
                <div className={styles.descriptionContainer}>
                    <Column spacing={4}>
                        <Paragraph className={styles.sectionTitle}>{i18n._(t`Omschrijving`)}</Paragraph>
                        <Paragraph>{data.description}</Paragraph>
                        <Paragraph className={styles.sectionTitle}>{i18n._(t`Checklist`)}</Paragraph>
                        <div className={styles.containerList}>
                            <ul>
                                <li>Welk aanbod volg je?</li>
                                <li>Past het aanbod bij wat je wil leren?</li>
                                <li>Ben je tevreden over wat je leert?</li>
                                <li>Gebruik je wat je leert al in je dagelijks leven?</li>
                                <li>Zou je wat anders willen leren?</li>
                            </ul>
                        </div>
                    </Column>
                </div>
            </div>
        </div>
    )
}
