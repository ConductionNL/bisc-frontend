import classNames from 'classnames'
import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Password.module.scss'

interface Props {
    placeholder?: string
    className?: string
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
    value?: string
    errorMessage?: string
    disabled?: boolean
    onChange?: (value: string) => void
}

const Password: React.FunctionComponent<Props> = ({
    className,
    placeholder,
    value,
    errorMessage,
    disabled,
    onChange,
}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [inputType, setInputType] = useState<string>('password')

    return (
        <div
            className={classNames(styles.container, className, {
                [styles.hasErrorMessage]: !!errorMessage,
            })}
        >
            <div className={styles.passwordFieldContainer}>
                <input
                    className={styles.inputField}
                    placeholder={placeholder}
                    type={inputType}
                    value={value}
                    disabled={disabled}
                    onChange={e => {
                        handleOnChange(e)
                    }}
                />
                <Icon
                    className={classNames(styles.eye, {
                        [styles.disabledEye]: !!disabled,
                    })}
                    type={getIconType(visible)}
                    onClick={() => handlePasswordVisibility(visible)}
                />
            </div>
        </div>
    )

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value

        onChange?.(value)
    }

    function getIconType(state: boolean): IconType {
        const iconType = state ? IconType.openEye : IconType.closedEye
        return iconType
    }

    function handlePasswordVisibility(state: boolean) {
        const type = state ? 'password' : 'text'
        if (!disabled) {
            setVisible(!visible)
            setInputType(type)
        }
    }
}

export default Password
