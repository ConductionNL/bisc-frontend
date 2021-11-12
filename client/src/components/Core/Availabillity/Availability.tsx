import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import times from 'lodash/times'
import React, { useEffect, useRef, useState } from 'react'
import { omitDeep } from 'utils/objects/objects'
import Checkbox from '../DataEntry/Checkbox'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import { Availability as AvailabilityEnum } from 'api/types/types'
import styles from './Availability.module.scss'

interface Props {
    className?: string
    defaultValue?: AvailabilityEnum[]
    compareValue?: AvailabilityEnum[]
    readOnly?: boolean
    name?: string
}

enum Days {
    monday = 'MONDAY',
    tuesday = 'TUESDAY',
    wednesday = 'WEDNESDAY',
    thursday = 'THURSDAY',
    friday = 'FRIDAY',
    saturday = 'SATURDAY',
    sunday = 'SUNDAY',
}
enum TimeOfDay {
    morning = 'MORNING',
    afternoon = 'AFTERNOON',
    evening = 'EVENING',
}
export type AvailabilityType = AvaialbleRecord & AvailableTypenames & AvailableRootTypenames
type AvaialbleRecord = Record<Days, Record<TimeOfDay, boolean>>
type AvailableTypenames = Partial<Record<Days, Partial<Record<'__typename', string>>>>
type AvailableRootTypenames = Partial<Record<'__typename', string>>

export const Availability: React.FunctionComponent<Props> = props => {
    const { className, defaultValue, compareValue, readOnly } = props
    const containerClassNames = classNames(styles.container, className)
    const inputRef = useRef<HTMLInputElement>(null)

    const defaultAvailabillity = {
        MONDAY: {
            MORNING: false,
            EVENING: false,
            AFTERNOON: false,
        },
        TUESDAY: {
            MORNING: false,
            EVENING: false,
            AFTERNOON: false,
        },
        WEDNESDAY: {
            MORNING: false,
            EVENING: false,
            AFTERNOON: false,
        },
        THURSDAY: {
            MORNING: false,
            EVENING: false,
            AFTERNOON: false,
        },
        FRIDAY: {
            MORNING: false,
            EVENING: false,
            AFTERNOON: false,
        },
        SATURDAY: { MORNING: false, EVENING: false, AFTERNOON: false },
        SUNDAY: { MORNING: false, EVENING: false, AFTERNOON: false },
    } as AvailabilityType

    const [available, setAvailable] = useState<AvailabilityType>(defaultAvailabillity)
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

    useEffect(() => {
        handleOnMount()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue])

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
            <input type={'hidden'} name={'available'} ref={inputRef} />
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
                inline={true}
                value={id}
                onChange={handleOnChange}
                id={id}
                defaultChecked={checked}
            />
        )
    }

    function handleOnMount() {
        let draftState = cloneDeep(defaultValue ? defaultValue : defaultAvailabillity) as AvailabilityType
        omitDeep(draftState, '__typename')

        updateFormState(draftState)
        setAvailable(draftState)
    }

    function handleOnChange() {
        if (table.current) {
            let availableMoments: string[] = []
            table.current
                .querySelectorAll('.availabillity-checkbox:checked')
                .forEach(element => availableMoments.push(element.id))
            let draftState = cloneDeep(available)

            availableMoments.forEach(availableMoment => {
                const splittedAvailableMoment = availableMoment.split('-')
                const timeOfDay = splittedAvailableMoment[0] as TimeOfDay
                const day = splittedAvailableMoment[1] as Days
                delete draftState[day].__typename
                delete draftState.__typename
                draftState[day][timeOfDay] = true
            })

            updateFormState(draftState)
            setAvailable(draftState)
        }
    }

    function updateFormState(state: AvailabilityType) {
        if (inputRef && inputRef.current) {
            // Form onchange did not detect changes on hidden inpup, so this bit was needed to send the right values
            const inputValSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
            inputValSetter?.call(inputRef.current, JSON.stringify(state))
            const event = new Event('input', { bubbles: true })
            inputRef.current.dispatchEvent(event)
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

        return false
        // return compareValue && compareValue[`${day}_${timeOfDay}` as AvailabilityEnum]
    }
}
