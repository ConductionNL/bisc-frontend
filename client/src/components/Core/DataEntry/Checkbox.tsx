import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Checkbox.module.scss'

export enum CheckboxColor {
    orange = 'orange',
    green = 'green',
}
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    inputClassName?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    color?: CheckboxColor
}

const Checkbox: React.FunctionComponent<Props> = props => {
    const { className, color = CheckboxColor.orange, inputClassName, name } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles.orange]: color === CheckboxColor.orange,
        [styles.green]: color === CheckboxColor.green,
    })

    return (
        <div className={containerClassNames}>
            <input name={name} className={classNames(styles.inputField, inputClassName)} type="checkbox" {...props} />
            <Icon className={styles.checkmark} type={IconType.checkmark} />
        </div>
    )
}

export default Checkbox
