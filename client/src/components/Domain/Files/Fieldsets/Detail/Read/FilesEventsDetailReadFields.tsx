import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from '../../SharedEventDetailFieldset.module.scss'
import {
    FilesEventsDetailContainer,
    FilesEventsDetailContainerTypes,
} from '../../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { FilesEventsDetailReadHeader } from './FilesEventsDetailReadHeader/FilesEventsDetailReadHeader'
import { StudentDossierEvent } from 'generated/graphql'

interface Props {
    data: StudentDossierEvent
}

export const FilesEventsDetailReadFields: React.FC<Props> = ({ data }) => {
    const { i18n } = useLingui()

    return (
        <FilesEventsDetailContainer type={data.event as FilesEventsDetailContainerTypes}>
            <div className={styles.contentContainer}>
                <FilesEventsDetailReadHeader
                    type={data.event}
                    metaData={{
                        date: data.eventDate,
                        name: 'TODO',
                        // name: data.createdByProviderEmployee.givenName,
                    }}
                />
                <div className={styles.descriptionContainer}>
                    <Column spacing={4}>
                        <Paragraph className={styles.sectionTitle}>{i18n._(t`Omschrijving`)}</Paragraph>
                        <Paragraph>{data.eventDescription}</Paragraph>
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
