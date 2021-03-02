import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './DateInput.module.scss'
import Input from './Input'

interface Props {
    className?: string
    inputClassName?: string
    value?: string
    checked?: boolean
    disabled?: boolean
    name?: string
    placeholder?: string
    id?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DateInput: React.FunctionComponent<Props> = ({
    disabled,
    checked,
    name,
    onChange,
    value,
    id,
    placeholder,
    className,
    inputClassName,
}) => {
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <Input
                name={name}
                className={classNames(styles.inputField, inputClassName)}
                type="date"
                id={id}
                placeholder={placeholder}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default DateInput
