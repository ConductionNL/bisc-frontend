import classNames from 'classnames'
import React from 'react'
import styles from './Input.module.scss'

interface Props {
    name: string
    placeholder?: string
    className?: string
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
    value?: string
    grow?: boolean
    errorMessage?: string
    disabled?: boolean
    required?: boolean
    onChange?: (value: string) => void
}

const Input: React.FunctionComponent<Props> = ({
    className,
    placeholder,
    type,
    value,
    errorMessage,
    disabled,
    required,
    onChange,
    name,
    grow,
}) => {
    return (
        <div
            className={classNames(styles.container, className, {
                [styles.hasErrorMessage]: !!errorMessage,
                [styles.grow]: grow,
            })}
        >
            <input
                name={name}
                className={styles.inputField}
                placeholder={placeholder}
                type={type}
                required={required}
                value={value}
                disabled={disabled}
                onChange={handleOnChange}
            />
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    )

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value

        onChange?.(value)
    }
}

export default Input
