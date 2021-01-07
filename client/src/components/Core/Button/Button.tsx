import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'
import { IconType } from '../Icon/IconType'
import Icon from '../Icon/Icon'
import Spinner from '../Feedback/Spinner/Spinner'

interface Props {
    type: ButtonType
    className?: string
    disabled?: boolean
    loading?: boolean
    danger?: boolean
    big?: boolean
    round?: boolean
    submit?: boolean
    form?: boolean
    onClick?: () => void
    stretch?: boolean
    href?: string
    icon?: IconType
    iconPosition?: 'Top' | 'Right' | 'Bottom' // left is default
    stopClickPropagation?: boolean
    preventDefault?: boolean
}

export enum ButtonType {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary',
    arrowLink = 'arrowLink',
}

const Button: React.FunctionComponent<Props> = props => {
    const { disabled, loading, href, icon, big } = props
    const buttonClassName = getButtonClassName()

    if (href) {
        return renderAnchorButton()
    }

    return renderButton()

    function getButtonClassName() {
        const { iconPosition, className, disabled, loading, stretch, type, danger, big, round } = props
        const position = iconPosition ? iconPosition : 'Left'

        return classNames(styles.button, className, {
            [styles[`icon-is${position}`]]: position,
            [styles[type]]: type,
            [styles.isStretched]: stretch,
            [styles.isDisabled]: disabled,
            [styles.isLoading]: loading,
            [styles.isDanger]: danger,
            [styles.isBig]: big,
            [styles.isRound]: round,
        })
    }

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
            <>
                <span className={styles.inner}>
                    {icon && <Icon type={icon} className={styles.icon} />}
                    {children}
                </span>
                {loading && <Spinner small={big ? undefined : true} className={styles.spinner} />}
            </>
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
