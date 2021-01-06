import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'
import { IconType } from '../Icon/IconType'
import Icon from '../Icon/Icon'

interface Props {
    type?: ButtonType
    className?: string
    disabled?: boolean
    loading?: boolean
    danger?: boolean
    big?: boolean
    submit?: boolean
    form?: boolean
    onClick?: () => void
    stretch?: boolean
    href?: string
    icon?: IconType
    stopClickPropagation?: boolean
    preventDefault?: boolean
}

export enum ButtonType {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary',
    arrowLink = 'arrowLink',
    iconOnly = 'iconOnly',
}

const Button: React.FunctionComponent<Props> = props => {
    const { className, disabled, loading, href, stretch, type, icon, danger, big } = props

    const buttonType = type ? type : ButtonType.primary
    const buttonClassName = classNames(styles.container, className, {
        [styles[buttonType]]: buttonType,
        [styles.isStretched]: stretch,
        [styles.isDisabled]: disabled,
        [styles.isLoading]: loading,
        [styles.isDanger]: danger,
        [styles.isBig]: big,
    })

    if (href) {
        return renderAnchorButton()
    }

    return renderButton()

    function renderAnchorButton() {
        return (
            <a href={href} className={buttonClassName} onClick={handleClick}>
                {renderInner()}
            </a>
        )
    }

    function renderButton() {
        const { submit, form } = props
        const type = submit ? 'submit' : form ? 'submit' : 'button'
        const buttonIsDisabled = disabled || loading

        return (
            <button type={type} className={buttonClassName} disabled={buttonIsDisabled} onClick={handleClick}>
                {renderInner()}
            </button>
        )
    }

    function renderInner() {
        const { children } = props

        return (
            <span className={styles.inner}>
                {icon && <Icon type={icon} className={styles.icon} />}
                {children}
            </span>
        )
    }

    function handleClick(event: React.MouseEvent) {
        const { onClick, disabled, stopClickPropagation, preventDefault } = props

        if (disabled) {
            return
        }

        if (stopClickPropagation && event.stopPropagation) {
            event.stopPropagation()
        }

        if (preventDefault && event.preventDefault) {
            event.preventDefault()
        }

        if (onClick) {
            onClick()
        }
    }
}

export default Button
