import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Checkbox.module.scss'

interface Props {
    className?: string
    value?: string
    checked?: boolean
    disabled?: boolean
    name: string
}

const Checkbox: React.FunctionComponent<Props> = ({ disabled, checked, name }) => {
    return (
        <div className={styles.container}>
            <input name={name} className={styles.inputField} type="checkbox" disabled={disabled} checked={checked} />
            <Icon className={styles.checkmark} type={IconType.checkmark} />
        </div>
    )
}

export default Checkbox
