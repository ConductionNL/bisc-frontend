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
    onChange?: (value: string) => void
}

const Dropdown: React.FunctionComponent<Props> = ({ disabled, placeholder, options, onChange }) => {
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
                    onChange={selectedValue => handleSearch(selectedValue)}
                    disabled={disabled}
                />
                <Icon className={styles.arrow} type={getIconType(open)} onClick={() => set(!open)} />
            </div>
            {open && (
                <div className={styles.options}>
                    {filteredOptions
                        ? filteredOptions.map(option => (
                              <span
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

    function handleSearch(value: string) {
        const query = value.toLowerCase()
        const filteredOptionsList = options.filter(option => {
            return option.toLowerCase().includes(query)
        })

        setFilteredOptions(filteredOptionsList)
    }

    function getIconType(state: boolean): IconType {
        const iconType = state === false ? IconType.arrowDown : IconType.arrowUp
        return iconType
    }
}

export default Dropdown
