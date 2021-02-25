import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import times from 'lodash/times'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import Checkbox from '../DataEntry/Checkbox'
import styles from './Availabillity.module.scss'

interface Props {
    className?: string
}

const Availabillity: React.FunctionComponent<Props> = props => {
    const { className } = props
    const containerClassNames = classNames(styles.container, className)
    const [available, setAvailable] = useState<string[]>([])
    const days = [
        i18n._(t`Ma`),
        i18n._(t`Di`),
        i18n._(t`Wo`),
        i18n._(t`Do`),
        i18n._(t`Vr`),
        i18n._(t`Za`),
        i18n._(t`Zo`),
    ]
    const table = useRef<HTMLTableElement>(null)

    const handleOnChange = () => {
        if (table.current) {
            let availableMoments: string[] = []
            table.current
                .querySelectorAll('.availabillity-checkbox:checked')
                .forEach(element => availableMoments.push(element.id))
            setAvailable(availableMoments)
        }
    }

    return (
        <>
            <table ref={table} className={containerClassNames}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.headerBlank} />

                        {days.map((day, i) => (
                            <th key={i}>
                                <p className={styles.headerName}>{day}</p>
                            </th>
                        ))}
                        <th className={styles.headerpaddingRight} />
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    <tr>
                        <td className={styles.sectionOfDayWrapper}>
                            <p className={styles.sectionOfDay}>{i18n._(t`Ochtend`)}</p>
                            <p className={styles.timeOfDay}>{i18n._(t`06:00 - 12:00`)}</p>
                        </td>
                        {renderCheckboxes('morning')}
                        <td />
                    </tr>
                    <tr>
                        <td className={styles.sectionOfDayWrapper}>
                            <p className={styles.sectionOfDay}>{i18n._(t`Middag`)}</p>
                            <p className={styles.timeOfDay}>{i18n._(t`12:00 - 18:00`)}</p>
                        </td>
                        {renderCheckboxes('midday')}
                        <td />
                    </tr>
                    <tr>
                        <td className={styles.sectionOfDayWrapper}>
                            <p className={styles.sectionOfDay}>{i18n._(t`Avond`)}</p>
                            <p className={styles.timeOfDay}>{i18n._(t`18:00 - 00:00`)}</p>
                        </td>
                        {renderCheckboxes('evening')}
                        <td />
                    </tr>
                </tbody>
            </table>
            <input type={'hidden'} name={'available'} value={available} />
        </>
    )

    function renderCheckboxes(timeOfDay: string) {
        return times(7, n => (
            <td key={n} className={styles.checkBoxTd}>
                <Checkbox
                    inputClassName={'availabillity-checkbox'}
                    value={`${timeOfDay}-${days[n]}`}
                    onChange={handleOnChange}
                    id={`${timeOfDay}-${days[n]}`}
                />
            </td>
        ))
    }
}

export default Availabillity
