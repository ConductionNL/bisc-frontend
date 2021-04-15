import React, { useContext } from 'react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import styles from './FilesEventsDetailReadHeader.module.scss'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { EventDetailTypes } from '../../../EventDetailFieldView'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { FilesEventsFieldsetContextState } from '../../../Context/FilesEventsFieldsetContextState'
import classNames from 'classnames'

interface Props {
    type: EventDetailTypes
    metaData: MetaData
}

interface MetaData {
    date: string
    name: string
}

export const FilesEventsDetailReadHeader: React.FC<Props> = ({ type, metaData }) => {
    const { i18n } = useLingui()
    const { showReadOnly } = useContext(FilesEventsFieldsetContextState)

    const containerClassNames = classNames(styles.headerContainer, {
        [styles.finalInterview]: type === EventDetailTypes.finalInterview,
        [styles.comment]: type === EventDetailTypes.comment,
        [styles.followUp]: type === EventDetailTypes.followUp,
        [styles.storytelling]: type === EventDetailTypes.storyTelling,
        [styles.intake]: type === EventDetailTypes.intake,
        [styles.default]: !type,
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
            <div className={styles.titleContainer}>
                <SectionTitle title={EventDetailTypesTranslations[type]} />
                <Paragraph className={styles.subtitle}>{`${metaData.date} • ${metaData.name}`}</Paragraph>
            </div>
            <Button
                className={styles.editIcon}
                round={true}
                type={ButtonType.tertiary}
                icon={IconType.edit}
                onClick={() => showReadOnly(false)}
            />
        </div>
    )
}
