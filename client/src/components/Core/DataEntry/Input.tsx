import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { Validator } from '../../../utils/validators/types'
import styles from './Input.module.scss'

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChangeValue?: (value: string) => void
    validators?: Validator<string | null>[]
    grow?: boolean
}

const Input: React.FunctionComponent<BaseInputProps> = props => {
    const { grow, className, validators, onChange, onChangeValue, onBlur, children, ...restProps } = props
    const input = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)
    // NOTE: Removes props that are not available in a native input

    return (
        <div
            className={classNames(styles.container, className, {
                [styles.hasErrorMessage]: !!error,
                [styles.grow]: grow,
            })}
        >
            <input
                ref={input}
                {...restProps}
                className={styles.inputField}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                children={undefined}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
            {children}
        </div>
    )

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        onChange?.(event)
        onChangeValue?.(value)
    }

    function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        onBlur?.(event)

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
