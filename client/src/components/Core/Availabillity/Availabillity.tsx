import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import times from 'lodash/times'
import React, { useRef, useState } from 'react'
import Checkbox from '../DataEntry/Checkbox'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Availabillity.module.scss'

interface Props {
    className?: string
    defaultValue?: AvailabillityType
    compareValue?: AvailabillityType
    readOnly?: boolean
}

enum Days {
    monday = 'monday',
    tuesday = 'tuesday',
    wednesday = 'wednesday',
    thursday = 'thursday',
    friday = 'friday',
    saturday = 'saturday',
    sunday = 'sunday',
}
enum TimeOfDay {
    morning = 'morning',
    afternoon = 'afternoon',
    evening = 'evening',
}
export type AvailabillityType = Record<Days, Record<TimeOfDay, boolean>>

const Availabillity: React.FunctionComponent<Props> = props => {
    const { className, defaultValue, compareValue, readOnly } = props
    const containerClassNames = classNames(styles.container, className)
    const defaultAvailabillity = {
        monday: {
            morning: false,
            evening: false,
            afternoon: false,
        },
        tuesday: {
            morning: false,
            evening: false,
            afternoon: false,
        },
        wednesday: {
            morning: false,
            evening: false,
            afternoon: false,
        },
        thursday: {
            morning: false,
            evening: false,
            afternoon: false,
        },
        friday: {
            morning: false,
            evening: false,
            afternoon: false,
        },
        saturday: { morning: false, evening: false, afternoon: false },
        sunday: { morning: false, evening: false, afternoon: false },
    } as AvailabillityType
    const [available, setAvailable] = useState<AvailabillityType>(defaultValue ? defaultValue : defaultAvailabillity)
    const days = [
        {
            label: i18n._(t`Ma`),
            value: Days.monday,
        },
        {
            label: i18n._(t`Di`),
            value: Days.tuesday,
        },
        {
            label: i18n._(t`Wo`),
            value: Days.wednesday,
        },
        {
            label: i18n._(t`Do`),
            value: Days.thursday,
        },
        {
            label: i18n._(t`Vr`),
            value: Days.friday,
        },
        {
            label: i18n._(t`Za`),
            value: Days.saturday,
        },
        {
            label: i18n._(t`Zo`),
            value: Days.sunday,
        },
    ]
    const table = useRef<HTMLTableElement>(null)

    return (
        <>
            <table ref={table} className={containerClassNames}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.headerBlank} />

                        {days.map((day, i) => (
                            <th key={i}>
                                <p className={styles.headerName}>{day.label}</p>
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
                        {renderCheckboxes('afternoon')}
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
            <input type={'hidden'} name={'available'} value={JSON.stringify(available)} />
        </>
    )

    function renderCheckboxes(timeOfDay: string) {
        return times(7, n => {
            const id = `${timeOfDay}-${days[n].value}`

            return (
                <td key={n} className={styles.checkBoxTd}>
                    {renderCheckbox(id)}
                </td>
            )
        })
    }

    function renderCheckbox(id: string) {
        const checked = idIsActiveInAvailabillity(id)
        const compareActive = idIsActiveInCompareAvailabillity(id)

        if (readOnly) {
            if (checked) {
                return (
                    <Icon
                        type={IconType.checkmark}
                        className={classNames(styles.readOnlyAvailable, { [styles.compareActive]: compareActive })}
                    />
                )
            }
            return <Icon type={IconType.close} className={styles.readOnlyUnavailable} />
        }

        return (
            <Checkbox
                inputClassName={classNames('availabillity-checkbox', { [styles.compareActive]: compareActive })}
                value={id}
                onChange={handleOnChange}
                id={id}
                checked={checked}
            />
        )
    }

    function handleOnChange() {
        if (table.current) {
            let availableMoments: string[] = []
            table.current
                .querySelectorAll('.availabillity-checkbox:checked')
                .forEach(element => availableMoments.push(element.id))

            let draftState = cloneDeep(defaultAvailabillity)

            availableMoments.forEach(availableMoment => {
                const splittedAvailableMoment = availableMoment.split('-')
                const timeOfDay = splittedAvailableMoment[0] as TimeOfDay
                const day = splittedAvailableMoment[1] as Days
                draftState[day][timeOfDay] = true
            })

            setAvailable(draftState)
        }
    }

    function idIsActiveInAvailabillity(id: string) {
        const splittedAvailableMoment = id.split('-')
        const timeOfDay = splittedAvailableMoment[0] as TimeOfDay
        const day = splittedAvailableMoment[1] as Days

        return available && available[day][timeOfDay]
    }

    function idIsActiveInCompareAvailabillity(id: string) {
        const splittedAvailableMoment = id.split('-')
        const timeOfDay = splittedAvailableMoment[0] as TimeOfDay
        const day = splittedAvailableMoment[1] as Days

        return compareValue && compareValue[day][timeOfDay]
    }
}

export default Availabillity
