import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { Validator } from '../../../utils/validators/types'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './DateInput.module.scss'
import Input from './Input'

interface Props {
    className?: string
    inputClassName?: string
    value?: string
    disabled?: boolean
    name?: string
    validators?: Validator<string | null>[]
    placeholder?: string
    id?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DateInput: React.FunctionComponent<Props> = ({
    disabled,
    name,
    onChange,
    value,
    id,
    validators,
    placeholder,
    className,
    inputClassName,
}) => {
    const containerClassNames = classNames(styles.container, className)
    const [error, setError] = useState<string | null>(null)
    const date = useRef<HTMLInputElement>(null)

    return (
        <div className={containerClassNames}>
            <Input
                name={name}
                className={classNames(styles.inputField, inputClassName)}
                type="date"
                id={id}
                placeholder={placeholder}
                disabled={disabled}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(event)
    }

    function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
        const value = event.currentTarget.value

        validators?.every(validator => {
            const result = validator(value)
            if (result) {
                setError(result)
                date.current?.setCustomValidity(result)
                return false
            }
            setError(result)
            date.current?.setCustomValidity('')
            return true
        })
    }
}

export default DateInput
