import classNames from 'classnames'
import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Dropdown.module.scss'
import Input from './Input'

interface Props {
    className?: string
    value?: string
    placeholder?: string
    disabled?: boolean
    options: string[]
}

const Dropdown: React.FunctionComponent<Props> = ({ disabled, placeholder, options }) => {
    const [open, set] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string>()
    const [filteredOptions, setFilteredOptions] = useState<string[]>()
    return (
        <div className={styles.container}>
            <div className={styles.selectTrigger}>
                <Input
                    className={styles.input}
                    placeholder={placeholder}
                    value={selectedValue}
                    onChange={selectedValue => {
                        set(true)
                        setSelectedValue(selectedValue)
                        handleSearch(selectedValue)
                    }}
                    disabled={disabled}
                />
                <Icon
                    className={classNames(styles.arrow, {
                        [styles.disabledArrow]: !!disabled,
                    })}
                    type={getIconType(open)}
                    onClick={() => !disabled && set(!open)}
                />
            </div>
            {open && (
                <div className={styles.options}>
                    {filteredOptions
                        ? filteredOptions.map(option => (
                              <span
                                  key={option}
                                  onClick={() => {
                                      set(!open)
                                      setSelectedValue(option)
                                  }}
                              >
                                  {option}
                              </span>
                          ))
                        : options.map(option => (
                              <span
                                  key={option}
                                  onClick={() => {
                                      set(!open)
                                      setSelectedValue(option)
                                  }}
                              >
                                  {option}
                              </span>
                          ))}
                </div>
            )}
        </div>
    )

    function checkName(name: string, str: string) {
        const pattern = str
            .split('')
            .map(x => {
                return `(?=.*${x})`
            })
            .join('')
        const regex = new RegExp(`${pattern}`, 'g')
        return name.match(regex)
    }

    function handleSearch(value: string) {
        const query = value.toLowerCase().substring(0, 3)
        const filteredOptionsList = options.filter(option => {
            const optionSubstring = option.substring(0, 3).toLowerCase()
            return option.toLowerCase().includes(query) || checkName(optionSubstring, query)
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
}

export default Dropdown
