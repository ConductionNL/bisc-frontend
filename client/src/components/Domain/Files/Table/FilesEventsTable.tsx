import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Label from 'components/Core/Label/Label'
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
    const { showCreateView, showReadOnly, createView } = useContext(FilesEventsFieldsetContextState)

    const MonthAbbreviationsTranslations = {
        [MonthAbbreviations.jan]: i18n._(t`jan`),
        [MonthAbbreviations.feb]: i18n._(t`feb`),
        [MonthAbbreviations.mrt]: i18n._(t`mrt`),
        [MonthAbbreviations.apr]: i18n._(t`apr`),
        [MonthAbbreviations.mei]: i18n._(t`mei`),
        [MonthAbbreviations.jun]: i18n._(t`jun`),
        [MonthAbbreviations.jul]: i18n._(t`jul`),
        [MonthAbbreviations.aug]: i18n._(t`aug`),
        [MonthAbbreviations.sep]: i18n._(t`sep`),
        [MonthAbbreviations.okt]: i18n._(t`okt`),
        [MonthAbbreviations.nov]: i18n._(t`nov`),
        [MonthAbbreviations.dec]: i18n._(t`dec`),
    }

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

    function renderCreateListItem() {
        return (
            <div className={styles.row}>
                <div className={classNames(styles.tableRow, styles.dateRow)}>
                    <FilesEventsDateContainer title={'?'} />
                </div>
                <div className={classNames(styles.tableRow, styles.eventsRow)}>
                    <FilesEventsListItem onClick={undefined} />
                </div>
            </div>
        )
    }

    function renderRows() {
        return rows?.map((item, index) => {
            const { date, ...rest } = item
            const extractedDateNumbers = date.match(/(\d{2})[\/](\d{2})[\/](\d{4})/)

            return (
                <div className={styles.row} key={index}>
                    <div className={classNames(styles.tableRow, styles.dateRow)}>
                        <FilesEventsDateContainer
                            title={extractedDateNumbers?.[1]}
                            subtitle={{
                                month: getMonthAbbreviation(extractedDateNumbers?.[2]),
                                year: extractedDateNumbers?.[3],
                            }}
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
                abbrevation = MonthAbbreviationsTranslations.jan
                break
            case '02':
                abbrevation = MonthAbbreviationsTranslations.feb
                break
            case '03':
                abbrevation = MonthAbbreviationsTranslations.mrt
                break
            case '04':
                abbrevation = MonthAbbreviationsTranslations.apr
                break
            case '05':
                abbrevation = MonthAbbreviationsTranslations.mei
                break
            case '06':
                abbrevation = MonthAbbreviationsTranslations.jun
                break
            case '07':
                abbrevation = MonthAbbreviationsTranslations.jul
                break
            case '08':
                abbrevation = MonthAbbreviationsTranslations.aug
                break
            case '09':
                abbrevation = MonthAbbreviationsTranslations.sep
                break
            case '10':
                abbrevation = MonthAbbreviationsTranslations.okt
                break
            case '11':
                abbrevation = MonthAbbreviationsTranslations.nov
                break
            case '12':
                abbrevation = MonthAbbreviationsTranslations.dec
                break
        }

        return abbrevation
    }
}
