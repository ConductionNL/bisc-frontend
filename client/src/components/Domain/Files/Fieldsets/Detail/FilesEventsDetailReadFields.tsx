import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { EventDetailTypes } from '../EventDetailFieldView'
import styles from '../EventDetailFieldset.module.scss'
import { EventDataType } from '../../Table/FilesEventsTable'
import { FilesEventsDetailContainer } from '../FilesEventsDetailContainer/FilesEventsDetailContainer'

interface Props {
    data: EventDataType
    onClickEdit: () => void
}

export const FilesEventsDetailReadFields: React.FC<Props> = ({ data, onClickEdit }) => {
    const { i18n } = useLingui()

    const EventDetailTypesTranslations = {
        [EventDetailTypes.finalInterview]: i18n._(t`Eindgesprek`),
        [EventDetailTypes.comment]: i18n._(t`Opmerking`),
        [EventDetailTypes.followUp]: i18n._(t`Vervolggesprek`),
        [EventDetailTypes.storyTelling]: i18n._(t`Informatie voor storytelling`),
        [EventDetailTypes.intake]: i18n._(t`Intake`),
    }

    return (
        <FilesEventsDetailContainer type={data.type}>
            <div className={styles.contentContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.titleContainer}>
                        <SectionTitle title={EventDetailTypesTranslations[data.type]} />
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
        </FilesEventsDetailContainer>
    )
}
