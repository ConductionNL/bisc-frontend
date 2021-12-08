import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Label from 'components/Core/Label/Label'
import React, { useContext, useState } from 'react'
import { FilesEventsDateContainer } from '../DateContainer/FilesEventsDateContainer'
import { FilesEventsFieldsetContextState } from '../Fieldsets/Context/FilesEventsFieldsetContextState'
import { EventDetailFieldView } from '../Fieldsets/EventDetailFieldView'
import { FilesEventsListItem } from '../List/EventsListItem/FilesEventsListItem'
import styles from './FilesEventsTable.module.scss'
import { ContactMoment } from 'api/types/types'
import { getMonthAbbreviation } from 'utils/formatters/Date/Date'

interface Props {
    rows: ContactMoment[]
    onDelete: () => void
}

export const FilesEventsTable: React.FunctionComponent<Props> = ({ rows, onDelete }) => {
    const { i18n } = useLingui()
    const [detailData, setDetailData] = useState<ContactMoment>()
    const { showCreateView, showReadOnly, createView } = useContext(FilesEventsFieldsetContextState)

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
                    <div className={styles.scrollContainer}>
                        {createView && renderCreateListItem()}
                        {renderRows()}
                    </div>
                    <div className={styles.eventDetailContainer}>
                        <EventDetailFieldView onDelete={onDelete} defaultValues={detailData} />
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

    function renderCreateListItem() {
        return (
            <div className={styles.row}>
                <div className={classNames(styles.tableRow, styles.dateRow)}>
                    <FilesEventsDateContainer title={'TODO'} />
                </div>
                <div className={classNames(styles.tableRow, styles.eventsRow)}>
                    <FilesEventsListItem />
                </div>
            </div>
        )
    }

    function renderRows() {
        return rows?.map((item, index) => {
            const date = new Date(item.date)

            return (
                <div className={styles.row} key={index}>
                    <div className={classNames(styles.tableRow, styles.dateRow)}>
                        <FilesEventsDateContainer
                            title={date.getDate().toString()}
                            subtitle={{
                                month: getMonthAbbreviation(date.getMonth()),
                                year: date.getFullYear().toString(),
                            }}
                        />
                    </div>
                    <div className={classNames(styles.tableRow, styles.eventsRow)}>
                        <FilesEventsListItem
                            data={item}
                            onClick={() => {
                                setDetailData(item)
                                showCreateView(false)
                                showReadOnly(true)
                            }}
                            isActive={!createView && detailData?.id === item.id}
                        />
                    </div>
                </div>
            )
        })
    }
}
