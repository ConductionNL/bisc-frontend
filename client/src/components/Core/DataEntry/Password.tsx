import classNames from 'classnames'
import React, { useState } from 'react'
import zxcvbn from 'zxcvbn'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Password.module.scss'

enum securePasswordText {
    weak = 'Zwak wachtwoord',
    mediocre = 'Matig wachtwoord',
    strong = 'Sterk wachtwoord',
}

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
    const [passwordScore, setPasswordScore] = useState<number>()
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
                        handleSecureness(e)
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

            {displaySecureText(passwordScore)}
        </div>
    )

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value

        onChange?.(value)
    }

    function handleSecureness(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        const response = zxcvbn(value)

        if (!value) {
            setPasswordScore(undefined)
            return
        }

        setPasswordScore(response.score + 1)
    }

    function getIconType(state: boolean): IconType {
        const iconType = state === false ? IconType.closedEye : IconType.openEye
        return iconType
    }

    function handlePasswordVisibility(state: boolean) {
        const type = state === false ? 'password' : 'text'
        if (!disabled) {
            setVisible(!visible)
            setInputType(type)
        }
    }

    function displaySecureText(score: number | undefined) {
        if (!score) {
            return undefined
        }

        if (score <= 2) {
            return (
                <div className={classNames(styles.secureContainer, styles.weak)}>
                    <p className={styles.secureTitle}>{securePasswordText.weak}</p>
                    <p className={styles.secureParagraph}>Maak gebruik van speciale tekens, hoofdletters en cijfers</p>
                    <div className={styles.secureBarContainer}>
                        <div className={styles.secureBar} style={{ width: `${(score / 6) * 100}%` }} />
                    </div>
                </div>
            )
        } else if (score <= 3) {
            return (
                <div className={classNames(styles.secureContainer, styles.mediocre)}>
                    <p className={styles.secureTitle}>{securePasswordText.mediocre}</p>
                    <p className={styles.secureParagraph}>Maak gebruik van speciale tekens, hoofdletters en cijfers</p>
                    <div className={styles.secureBarContainer}>
                        <div className={styles.secureBar} style={{ width: `${(score / 6) * 100}%` }} />
                    </div>
                </div>
            )
        }

        return (
            <div className={classNames(styles.secureContainer, styles.strong)}>
                <p className={styles.secureTitle}>{securePasswordText.strong}</p>
                <p className={styles.secureParagraph}>Maak gebruik van speciale tekens, hoofdletters en cijfers</p>
                <div className={styles.secureBarContainer}>
                    <div className={styles.secureBar} style={{ width: `${(score / 6) * 100}%` }} />
                </div>
            </div>
        )
    }
}

export default Password
