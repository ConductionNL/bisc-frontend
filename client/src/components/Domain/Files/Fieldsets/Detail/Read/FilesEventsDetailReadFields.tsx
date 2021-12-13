import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from '../../SharedEventDetailFieldset.module.scss'
import { FilesEventsDetailContainer } from '../../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { FilesEventsDetailReadHeader } from './FilesEventsDetailReadHeader/FilesEventsDetailReadHeader'
import { ContactMoment } from 'api/types/types'
import { DateFormatters } from 'utils/formatters/Date/Date'
import nl2br from 'react-nl2br'

interface Props {
    data: ContactMoment
}

export const FilesEventsDetailReadFields: React.FC<Props> = ({ data }) => {
    const { i18n } = useLingui()

    return (
        <FilesEventsDetailContainer type={data.type}>
            <div className={styles.contentContainer}>
                <FilesEventsDetailReadHeader
                    type={data.type}
                    metaData={{
                        date: DateFormatters.formattedDate(data.date) || '',
                        name: data.employee.person.givenName,
                    }}
                />
                <div className={styles.descriptionContainer}>
                    <Column spacing={4}>
                        <Paragraph bold={true} className={styles.sectionTitle}>
                            {i18n._(t`Omschrijving`)}
                        </Paragraph>
                        <Paragraph>{nl2br(data.explanation)}</Paragraph>
                    </Column>
                </div>
            </div>
        </FilesEventsDetailContainer>
    )
}
