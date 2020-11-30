import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

interface Props {
    className?: string
    disabled?: boolean
    loading?: boolean
    submit?: boolean
    onClick?: () => void
    stretch?: boolean
    href?: string
}

const Button: React.FunctionComponent<Props> = ({
    className,
    children,
    disabled,
    submit,
    onClick,
    loading,
    stretch,
    href,
}) => {
    const buttonType = submit ? 'submit' : 'button'
    const buttonIsDisabled = disabled || loading

    if (href) {
        return (
            <a
                href={href}
                className={classNames(styles.container, className, {
                    [styles.isStretched]: stretch,
                    [styles.isDisabled]: disabled,
                })}
                onClick={onClick}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            type={buttonType}
            className={classNames(styles.container, className, {
                [styles.isStretched]: stretch,
                [styles.isDisabled]: disabled,
            })}
            disabled={buttonIsDisabled}
            onClick={onClick}
        >
            {loading ? 'Loading...' : children}
        </button>
    )
}

export default Button
