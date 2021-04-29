import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Checkbox.module.scss'

export enum CheckboxColor {
    orange = 'orange',
    green = 'green',
}
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    className?: string
    inputClassName?: string
    color?: CheckboxColor
    label?: string
}

const Checkbox: React.FunctionComponent<Props> = props => {
    const { className, color = CheckboxColor.orange, inputClassName, ...restProps } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles.orange]: color === CheckboxColor.orange,
        [styles.green]: color === CheckboxColor.green,
    })

    return (
        <label className={containerClassNames}>
            <input {...restProps} className={classNames(styles.inputField, inputClassName)} type="checkbox" />
            <Icon className={styles.checkmark} type={IconType.checkmark} />
            {props.label && (
                <span className={styles.label}>{props.label}</span>
            )}
        </label>
    )
}

export default Checkbox
