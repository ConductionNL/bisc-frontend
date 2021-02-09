import classNames from 'classnames'
import React from 'react'
import styles from './Input.module.scss'

interface Props {
    placeholder?: string
    className?: string
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
    value?: string
    errorMessage?: string
    disabled?: boolean
    onChange?: (value: string) => void
}

const Input: React.FunctionComponent<Props> = ({
    className,
    placeholder,
    type,
    value,
    errorMessage,
    disabled,
    onChange,
}) => {
    return (
        <div
            className={classNames(styles.container, className, {
                [styles.hasErrorMessage]: !!errorMessage,
            })}
        >
            <input
                className={styles.inputField}
                placeholder={placeholder}
                type={type}
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
