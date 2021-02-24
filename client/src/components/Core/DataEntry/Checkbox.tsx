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
    id?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FunctionComponent<Props> = ({ disabled, checked, name, onChange, value, id }) => {
    return (
        <div className={styles.container}>
            <input
                name={name}
                className={styles.inputField}
                type="checkbox"
                id={id}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
                value={value}
            />
            <Icon className={styles.checkmark} type={IconType.checkmark} />
        </div>
    )
}

export default Checkbox
