import classNames from 'classnames'
import capitalize from 'lodash/capitalize'
import React from 'react'
import Spinner from '../Feedback/Spinner/Spinner'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Button.module.scss'

interface Props {
    type?: ButtonType
    id: string
    name: string
    onRef?: React.LegacyRef<HTMLInputElement>
    className?: string
    disabled?: boolean
    loading?: boolean
    danger?: boolean
    big?: boolean
    round?: boolean
    submit?: boolean
    onChangeFiles?: React.ChangeEventHandler<HTMLInputElement>
    onClick?: () => void
    visuallyHidden?: boolean
    stretch?: boolean
    href?: string
    icon?: IconType
    iconPosition?: 'top' | 'right' | 'bottom' // left is default
    stopClickPropagation?: boolean
    preventDefault?: boolean
}

export enum ButtonType {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary',
    quaternary = 'quarternary',
    arrowLink = 'arrowLink',
}

export const ButtonFileInput: React.FunctionComponent<Props> = props => {
    const { disabled, loading, onChangeFiles, icon, big, name, visuallyHidden } = props
    const buttonClassName = getButtonClassName()

    return renderButton()

    function getButtonClassName() {
        const { iconPosition, className, disabled, loading, stretch, danger, big, round, type } = props
        const position = capitalize(iconPosition ? iconPosition : 'left')
        const buttonType = type ? type : ButtonType.primary

        return classNames(styles.button, className, {
            [styles[`icon-is${position}`]]: position,
            [styles[buttonType]]: buttonType,
            [styles.isStretched]: stretch,
            [styles.isDisabled]: disabled,
            [styles.isLoading]: loading,
            [styles.isDanger]: danger,
            [styles.isBig]: big,
            [styles.isRound]: round,
            [styles['visually-hidden']]: visuallyHidden,
        })
    }

    function renderButton() {
        const { id, onRef } = props
        const buttonIsDisabled = disabled || loading

        return (
            <>
                <label htmlFor={id} className={buttonClassName} onClick={handleClick}>
                    {renderInner()}
                </label>
                <input
                    ref={onRef}
                    type="file"
                    disabled={buttonIsDisabled}
                    onChange={onChangeFiles}
                    hidden={true}
                    id={id}
                    name={name}
                />
            </>
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
                {loading && <Spinner small={!big} className={styles.spinner} />}
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
