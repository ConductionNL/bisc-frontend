import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Label from 'components/Core/Label/Label'
import React from 'react'
import { EventDetailFieldset, EventDetailTypes } from '../Fieldsets/EventDetailFieldset'
import styles from './EventTable.module.scss'

interface Props {
    rows?: JSX.Element[][]
}

export const EventTable: React.FunctionComponent<Props> = ({ rows }) => {
    const { i18n } = useLingui()

    return (
        <div>
            <div className={styles.tableContainer}>
                <div className={styles.tableHeaderContainer}>
                    <div className={styles.tableRow}>{renderHeaders(['Datum', 'Gebeurtenis'])}</div>
                    <div className={styles.tableRow}>
                        <Label className={styles.title} text={'Details'} />
                    </div>
                </div>
                <div className={styles.containerBody}>
                    <div>{renderRows()}</div>
                    <div>
                        <EventDetailFieldset
                            type={EventDetailTypes.intake}
                            readOnly={true}
                            defaultValues={true}
                            description={i18n._(
                                t`Proin imperdiet mauris eget gravida faucibus. In sed venenatis elit. 
                    Praesent viverra eleifend quam quis mattis. Duis vitae volutpat lorem, ac eleifend nunc. 
                    Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. 
                    In sed molestie ex, non efficitur dolor.`
                            )}
                        />
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
        return rows?.map((row, index) => (
            <div className={styles.row} key={index}>
                {row.map((item, i) => {
                    if (i === 0) {
                        return (
                            <div key={i} className={classNames(styles.tableRow, styles.dateRow)}>
                                {item}
                            </div>
                        )
                    }

                    return (
                        <div key={i} className={classNames(styles.tableRow, styles.eventsRow)}>
                            {item}
                        </div>
                    )
                })}
            </div>
        ))
    }
}
