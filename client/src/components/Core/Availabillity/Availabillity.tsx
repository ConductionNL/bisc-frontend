import React from 'react'
import classNames from 'classnames'

import styles from './Availabillity.module.scss'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Checkbox from '../DataEntry/Checkbox'
import times from 'lodash/times'

interface Props {
    className?: string
}

const Availabillity: React.FunctionComponent<Props> = props => {
    const { className } = props
    const containerClassNames = classNames(styles.container, className)
    const days = [
        i18n._(t`Ma`),
        i18n._(t`Di`),
        i18n._(t`Wo`),
        i18n._(t`Do`),
        i18n._(t`Vr`),
        i18n._(t`Za`),
        i18n._(t`Zo`),
    ]

    return (
        <table className={containerClassNames}>
            <thead className={styles.thead}>
                <tr>
                    <th />

                    {days.map(day => (
                        <th>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.td}>
                        <p>{i18n._(t`Ochtend`)}</p>
                        <p>{i18n._(t`06:00 - 12:00`)}</p>
                    </td>
                    {renderCheckboxes('morning')}
                </tr>
                <tr>
                    <td className={styles.td}>
                        <p>{i18n._(t`Middag`)}</p>
                        <p>{i18n._(t`12:00 - 18:00`)}</p>
                    </td>
                    {renderCheckboxes('midday')}
                </tr>
                <tr>
                    <td className={styles.td}>
                        <p>{i18n._(t`Avond`)}</p>
                        <p>{i18n._(t`18:00 - 00:00`)}</p>
                    </td>
                    {renderCheckboxes('evening')}
                </tr>
            </tbody>
        </table>
    )

    function renderCheckboxes(timeOfDay: string) {
        return times(7, n => (
            <td key={n} className={styles.checkBoxTd}>
                <Checkbox name={`${timeOfDay}-${days[n]}`} />
            </td>
        ))
    }
}

export default Availabillity
