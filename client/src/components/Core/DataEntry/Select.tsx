import classNames from 'classnames'
import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Select.module.scss'
import Input from './Input'
import { Validator } from 'utils/validators/types'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    options: (string | OptionsType)[]
    grow?: boolean
    list?: string
    onChangeValue?: (value: string | undefined) => void
    validators?: Validator<string | null>[]
    ref?: React.MutableRefObject<undefined>
}

interface OptionsType {
    value: string
    label: string
}

const Select: React.FunctionComponent<Props> = props => {
    const { disabled, options, className, onChangeValue, grow, list = 'list' } = props
    const [open, setOpen] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string | undefined>()
    const [filteredOptions, setFilteredOptions] = useState<(string | OptionsType)[]>()
    const containerClassNames = classNames(styles.container, className, {
        [styles.grow]: grow,
    })

    return (
        <div className={containerClassNames}>
            <div className={styles.selectTrigger}>
                <Input
                    list={list}
                    grow={true}
                    {...props}
                    className={styles.input}
                    value={selectedValue}
                    onChangeValue={value => {
                        setOpen(true)
                        setSelectedValue(value)
                        handleSearch(value)
                    }}
                />
                <Icon
                    className={classNames(styles.arrow, {
                        [styles.disabledArrow]: !!disabled,
                    })}
                    type={getIconType(open)}
                    onClick={() => !disabled && setOpen(!open)}
                />
            </div>

            {renderList(filteredOptions ?? options)}
        </div>
    )

    function renderList(listArrray: (string | OptionsType)[]) {
        if (!open) {
            return null
        }

        return (
            <datalist id={list} className={styles.options}>
                {listArrray.map(option => (
                    <option
                        key={(option as OptionsType).label ?? (option as string)}
                        onClick={() => {
                            setOpen(!open)
                            setSelectedValue((option as OptionsType).label ?? (option as string))
                            onChangeValue?.((option as OptionsType).label ?? (option as string))
                        }}
                        value={(option as OptionsType).value ?? (option as string)}
                        label={(option as OptionsType).label ?? (option as string)}
                    />
                ))}
            </datalist>
        )
    }

    function getPossibleNames(name: string, str: string) {
        const queryString = str
            .split('')
            .map(x => {
                return `(?=.*${x})`
            })
            .join('')
        const regex = new RegExp(`${queryString}`, 'g')
        return name.match(regex)
    }

    function handleSearch(value: string) {
        const query = value.toLowerCase()
        const filteredOptionsList = options.filter(option => {
            if (isOptionsType(option)) {
                const optionSubstring = (option as OptionsType).label.substring(0, 3).toLowerCase()
                return (
                    (option as OptionsType).label.toLowerCase().includes(query) ||
                    getPossibleNames(optionSubstring, query)
                )
            }

            const optionSubstring = (option as string).substring(0, 3).toLowerCase()
            return (option as string).toLowerCase().includes(query) || getPossibleNames(optionSubstring, query)
        })

        if (filteredOptionsList.length > 0) {
            setFilteredOptions(filteredOptionsList)
        } else {
            setFilteredOptions(undefined)
        }
    }

    function getIconType(state: boolean): IconType {
        const iconType = state === false ? IconType.arrowDown : IconType.arrowUp
        return iconType
    }

    function isOptionsType(value: any): boolean {
        return (value as OptionsType).label !== undefined
    }
}

export default Select
