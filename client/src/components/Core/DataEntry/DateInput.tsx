import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { Validator } from 'utils/validators/types'
import styles from './DateInput.module.scss'
import Input from './Input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    validators?: Validator<string | null>[]
    grow?: boolean
}

const DateInput: React.FunctionComponent<Props> = props => {
    const { onChange, validators, className, grow } = props
    const containerClassNames = classNames(styles.container, className, { [styles.grow]: grow })
    const [, setError] = useState<string | null>(null)
    const date = useRef<HTMLInputElement>(null)

    return (
        <div className={containerClassNames}>
            <Input
                grow={true}
                className={classNames(styles.inputField, className)}
                type="date"
                {...props}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
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
