import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Checkbox.module.scss'

interface Props {
    className?: string
    value?: string
    checked?: boolean
    disabled?: boolean
}

const Checkbox: React.FunctionComponent<Props> = ({ disabled, checked }) => {
    return (
        <div className={classNames(styles.container)}>
            <input className={styles.inputField} type="checkbox" disabled={disabled} checked={checked} />
            <Icon className={styles.checkmark} type={IconType.checkmark} />
        </div>
    )
}

export default Checkbox
