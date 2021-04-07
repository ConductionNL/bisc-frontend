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
    list: string
    onChangeValue?: (value: string | undefined) => void
    validators?: Validator<string | null>[]
    ref?: React.MutableRefObject<undefined>
}

interface OptionsType {
    value: string
    label: string
}

const Select: React.FunctionComponent<Props> = props => {
    const { disabled, options, className, onChangeValue, grow, list } = props
    const [open, setOpen] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string | undefined>()
    const [filteredOptions, setFilteredOptions] = useState<(string | OptionsType)[]>()
    const containerClassNames = classNames(styles.container, className, {
        [styles.grow]: grow,
    })

    return (
        <div className={containerClassNames}>
            <Input
                grow={true}
                {...props}
                list={list}
                className={styles.input}
                value={selectedValue}
                onChangeValue={value => {
                    setOpen(true)
                    setSelectedValue(value)
                    handleSearch(value)
                }}
                onClick={() => !disabled && setOpen(!open)}
            />

            {renderList(filteredOptions ?? options)}
        </div>
    )

    function renderList(listArrray: (string | OptionsType)[]) {
        if (!open) {
            return null
        }

        return (
            <datalist id={list}>
                {listArrray.map(option => {
                    const value = typeof option === 'string' ? option : option.value
                    const label = typeof option === 'string' ? option : option.label
                    return (
                        <option
                            key={value}
                            onClick={() => {
                                setOpen(!open)
                                setSelectedValue(value)
                                onChangeValue?.(value)
                            }}
                            value={label}
                            label={value}
                        />
                    )
                })}
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
            const value = typeof option === 'string' ? option : option.label

            const optionSubstring = value.substring(0, 3).toLowerCase()
            return value.toLowerCase().includes(query) || getPossibleNames(optionSubstring, query)
        })

        if (filteredOptionsList.length > 0) {
            setFilteredOptions(filteredOptionsList)
        } else {
            setFilteredOptions(undefined)
        }
    }
}

export default Select
