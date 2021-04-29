import classNames from 'classnames'
import isObject from 'lodash/isObject'
import React, { FocusEvent, useEffect, useState } from 'react'
import { Validator } from 'utils/validators/types'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import { FilterteredDataRenderer } from '../Renderers/FilteredDataRenderer'
import Input from './Input'
import styles from './Select.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    options: (string | OptionsType)[]
    grow?: boolean
    onChangeValue?: (value?: string) => void
    validators?: Validator<string | null>[]
    ref?: React.MutableRefObject<undefined>
}

export interface OptionsType {
    value: string
    label: string
}

const Select: React.FunctionComponent<Props> = props => {
    const { disabled, options, className, onChangeValue, grow, name, defaultValue } = props
    const [open, setOpen] = useState<boolean>(false)

    const [selectedLabel, setSelectedLabel] = useState<string | undefined>('')
    const [selectedValue, setSelectedValue] = useState<string | number | readonly string[]>('')
    const containerClassNames = classNames(styles.container, className, {
        [styles.grow]: grow,
    })

    useEffect(() => {
        const defaultOption =
            options &&
            options.find(option => (isObject(option) ? option.value === defaultValue : option === defaultValue))
        const defaultSelectLabel = isObject(defaultOption) ? defaultOption.label : defaultOption
        const defaultSelectValue = isObject(defaultOption) ? defaultOption.value : defaultOption
        if (defaultSelectLabel) {
            setSelectedLabel(defaultSelectLabel)
        }
        if (defaultSelectValue) {
            setSelectedValue(defaultSelectValue)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue])

    return (
        <FilterteredDataRenderer<string | OptionsType>
            options={options}
            filterMethod={filterMethod}
            render={({ results, searchList }) => (
                <div className={containerClassNames} onFocus={() => setOpen(true)} onBlur={handleOnBlur}>
                    <div className={styles.selectTrigger}>
                        <Input
                            grow={true}
                            {...props}
                            type="text"
                            value={selectedLabel ? selectedLabel : selectedValue}
                            className={styles.input}
                            onChangeValue={value => {
                                searchList?.(value)
                                setSelectedValue(value)
                            }}
                            autoComplete="off"
                        >
                            {renderList(results)}
                        </Input>
                        <input type={'hidden'} readOnly={true} name={name} value={selectedValue} />
                        <Icon
                            className={classNames(styles.arrow, {
                                [styles.disabledArrow]: !!disabled,
                            })}
                            type={getIconType(open)}
                        />
                    </div>
                </div>
            )}
        />
    )

    function renderList(list?: (string | OptionsType)[]) {
        if (!open || !list) {
            return
        }

        return (
            <div id={`${name}-select-list`} className={styles.options}>
                {renderListItems(list)}
            </div>
        )
    }

    function renderListItems(list: (string | OptionsType)[]) {
        return list.map((option, index, array) => {
            const value = isObject(option) ? option.value : option
            const label = isObject(option) ? option.label : option

            return (
                <span
                    key={`${index}-${array.length}`}
                    onClick={() => {
                        setOpen(!open)
                        setSelectedValue(value)
                        isObject(option) && setSelectedLabel(label)
                        onChangeValue?.(value)
                    }}
                >
                    {label}
                </span>
            )
        })
    }

    function handleOnBlur(e?: FocusEvent) {
        // timeout is needed for checking if list is active element
        setTimeout(() => {
            if (document.activeElement!.id === `${name}-select-list`) {
                return
            }
            setOpen(false)
        }, 100)
    }

    function filterMethod(options?: (string | OptionsType)[], value?: string) {
        const filteredOptions =
            options?.filter(option => {
                const optionValue = isObject(option) ? option.value.toLowerCase() : option.toLowerCase()
                const optionIncludesValue = value ? optionValue.includes(value?.toLowerCase()) : false

                return optionIncludesValue
            }) || []

        return filteredOptions
    }

    function getIconType(state: boolean): IconType {
        const iconType = state === false ? IconType.arrowDown : IconType.arrowUp
        return iconType
    }
}

export default Select
