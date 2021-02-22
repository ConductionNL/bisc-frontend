import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { Validator } from '../../../utils/validators/types'

import styles from './Input.module.scss'

interface Props {
    name: string
    placeholder?: string
    className?: string
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
    value?: string
    grow?: boolean
    disabled?: boolean
    required?: boolean
    onChange?: (value: string) => void
    validators?: Validator<string | null>[]
}

const Input: React.FunctionComponent<Props> = ({
    className,
    placeholder,
    type,
    value,
    disabled,
    required,
    onChange,
    name,
    grow,
    validators,
}) => {
    const input = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)
    return (
        <div
            className={classNames(styles.container, className, {
                [styles.hasErrorMessage]: !!error,
                [styles.grow]: grow,
            })}
        >
            <input
                ref={input}
                name={name}
                className={styles.inputField}
                placeholder={placeholder}
                type={type}
                required={required}
                value={value}
                disabled={disabled}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    )

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value

        onChange?.(value)
    }

    function handleOnBlur(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value

        validators?.every(validator => {
            const result = validator(value)
            if (result) {
                setError(result)
                input.current?.setCustomValidity(result)
                return false
            }
            setError(result)
            input.current?.setCustomValidity('')
            return true
        })
    }
}

export default Input
