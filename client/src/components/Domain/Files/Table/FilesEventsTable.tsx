import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Label from 'components/Core/Label/Label'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useContext, useState } from 'react'
import { FilesEventsFieldsetContextState } from '../Fieldsets/Context/FilesEventsFieldsetContextState'
import { EventDetailFieldView } from '../Fieldsets/EventDetailFieldView'
import { EventListItemType, FilesEventsListItem } from '../List/EventsListItem/FilesEventsListItem'
import styles from './EventTable.module.scss'

interface Props {
    rows?: EventDataType[]
}

export interface EventDataType extends EventListItemType {
    date: string
}

export const FilesEventsTable: React.FunctionComponent<Props> = ({ rows }) => {
    const { i18n } = useLingui()
    const [detailData, setDetailData] = useState<EventDataType>()
    const { showCreateView, showReadOnly } = useContext(FilesEventsFieldsetContextState)

    return (
        <div>
            <div className={styles.tableContainer}>
                <div className={styles.tableHeaderContainer}>
                    <div className={styles.tableRow}>{renderHeaders([i18n._(t`Datum`), i18n._(t`Gebeurtenis`)])}</div>
                    <div className={styles.detailsLabel}>
                        <Label className={styles.title} text={i18n._(t`Details`)} />
                    </div>
                </div>
                <div className={styles.containerBody}>
                    <div className={styles.scrollContainer}>{renderRows()}</div>
                    <div className={styles.eventDetailContainer}>
                        <EventDetailFieldView defaultValues={detailData} />
                    </div>
                </div>
            </div>
        </div>
    )

    function renderHeaders(headers: string[]) {
        return headers.map((title, i) => {
            if (i === 0) {
                return (
                    <div key={i} className={classNames(styles.tableRow, styles.dateRow)}>
                        <Label className={styles.title} text={title} />
                    </div>
                )
            }

            return (
                <div key={i} className={classNames(styles.tableRow, styles.eventsRow)}>
                    <Label className={styles.title} text={title} />
                </div>
            )
        })
    }

    function renderRows() {
        return rows?.map((item, index) => {
            const { date, ...rest } = item
            return (
                <div className={styles.row} key={index}>
                    <div className={classNames(styles.tableRow, styles.dateRow)}>
                        <Paragraph>{item.date}</Paragraph>
                    </div>
                    <div className={classNames(styles.tableRow, styles.eventsRow)}>
                        <FilesEventsListItem
                            data={rest}
                            onClick={() => {
                                setDetailData(item)
                                showCreateView(false)
                                showReadOnly(false)
                            }}
                            isActive={detailData?.id === rest.id}
                        />
                    </div>
                </div>
            )
        })
    }
}
