import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from '../../SharedEventDetailFieldset.module.scss'
import { EventDataType } from '../../../Table/FilesEventsTable'
import { FilesEventsDetailContainer } from '../../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { FilesEventsDetailReadHeader } from './FilesEventsDetailReadHeader/FilesEventsDetailReadHeader'

interface Props {
    data: EventDataType
}

export const FilesEventsDetailReadFields: React.FC<Props> = ({ data }) => {
    const { i18n } = useLingui()

    return (
        <FilesEventsDetailContainer type={data.type}>
            <div className={styles.contentContainer}>
                <FilesEventsDetailReadHeader
                    type={data.type}
                    metaData={{
                        date: data.date,
                        name: data.name,
                    }}
                />
                <div className={styles.descriptionContainer}>
                    <Column spacing={4}>
                        <Paragraph className={styles.sectionTitle}>{i18n._(t`Omschrijving`)}</Paragraph>
                        <Paragraph>{data.description}</Paragraph>
                        <Paragraph className={styles.sectionTitle}>{i18n._(t`Checklist`)}</Paragraph>
                        <div className={styles.containerList}>
                            <ul>
                                <li>{i18n._(t`Welk aanbod volg je?`)}</li>
                                <li>{i18n._(t`Past het aanbod bij wat je wil leren?`)}</li>
                                <li>{i18n._(t`Ben je tevreden over wat je leert?`)}</li>
                                <li>{i18n._(t`Gebruik je wat je leert al in je dagelijks leven?`)}</li>
                                <li>{i18n._(t`Zou je wat anders willen leren?`)}</li>
                            </ul>
                        </div>
                    </Column>
                </div>
            </div>
        </FilesEventsDetailContainer>
    )
}
