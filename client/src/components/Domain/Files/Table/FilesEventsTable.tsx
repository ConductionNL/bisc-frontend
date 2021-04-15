import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Label from 'components/Core/Label/Label'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useContext, useState } from 'react'
import { FilesEventsDateContainer } from '../DateContainer/FilesEventsDateContainer'
import { FilesEventsFieldsetContextState } from '../Fieldsets/Context/FilesEventsFieldsetContextState'
import { EventDetailFieldView } from '../Fieldsets/EventDetailFieldView'
import { EventListItemType, FilesEventsListItem } from '../List/EventsListItem/FilesEventsListItem'
import styles from './FilesEventsTable.module.scss'

interface Props {
    rows?: EventDataType[]
}

export interface EventDataType extends EventListItemType {
    date: string
}

enum MonthAbbreviations {
    jan = 'jan',
    feb = 'feb',
    mrt = 'mrt',
    apr = 'apr',
    mei = 'mei',
    jun = 'jun',
    jul = 'jul',
    aug = 'aug',
    sep = 'sep',
    okt = 'okt',
    nov = 'nov',
    dec = 'dec',
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
            const extractDateNumbers = date.match(/(\d{2})[\/](\d{2})[\/](\d{4})/)

            return (
                <div className={styles.row} key={index}>
                    <div className={classNames(styles.tableRow, styles.dateRow)}>
                        <FilesEventsDateContainer
                            day={extractDateNumbers?.[1]}
                            month={getMonthAbbreviation(extractDateNumbers?.[2])}
                            year={extractDateNumbers?.[3]}
                        />
                    </div>
                    <div className={classNames(styles.tableRow, styles.eventsRow)}>
                        <FilesEventsListItem
                            data={rest}
                            onClick={() => {
                                setDetailData(item)
                                showCreateView(false)
                                showReadOnly(true)
                            }}
                            isActive={detailData?.id === rest.id}
                        />
                    </div>
                </div>
            )
        })
    }

    function getMonthAbbreviation(month: string | undefined) {
        let abbrevation: string = ''
        switch (month) {
            case '01':
                abbrevation = MonthAbbreviations.jan
                break
            case '02':
                abbrevation = MonthAbbreviations.feb
                break
            case '03':
                abbrevation = MonthAbbreviations.mrt
                break
            case '04':
                abbrevation = MonthAbbreviations.apr
                break
            case '05':
                abbrevation = MonthAbbreviations.mei
                break
            case '06':
                abbrevation = MonthAbbreviations.jun
                break
            case '07':
                abbrevation = MonthAbbreviations.jul
                break
            case '08':
                abbrevation = MonthAbbreviations.aug
                break
            case '09':
                abbrevation = MonthAbbreviations.sep
                break
            case '10':
                abbrevation = MonthAbbreviations.okt
                break
            case '11':
                abbrevation = MonthAbbreviations.nov
                break
            case '12':
                abbrevation = MonthAbbreviations.dec
                break
        }

        return abbrevation
    }
}
