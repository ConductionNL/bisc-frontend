import classNames from 'classnames'
import React, { FocusEvent, FocusEventHandler, useRef, useState } from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Select.module.scss'
import Input from './Input'
import { Validator } from 'utils/validators/types'
import { FilterteredDataRenderer } from '../Renderers/FilteredDataRenderer'
import isObject from 'lodash/isObject'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    options: (string | OptionsType)[]
    grow?: boolean
    onChangeValue?: (value?: string) => void
    validators?: Validator<string | null>[]
    ref?: React.MutableRefObject<undefined>
}

interface OptionsType {
    value: string
    label: string
}

const Select: React.FunctionComponent<Props> = props => {
    const { disabled, options, className, onChangeValue, grow, name } = props
    const [open, setOpen] = useState<boolean>(false)
    const [selectedLabel, setSelectedLabel] = useState<string | undefined>('')
    const [selectedValue, setSelectedValue] = useState<string | undefined>('')
    const containerClassNames = classNames(styles.container, className, {
        [styles.grow]: grow,
    })

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
                            name=""
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
                        <input type={'hidden'} name={name} value={selectedValue} />
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
