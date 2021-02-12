import React from 'react'
import styles from './RadioButton.module.scss'

interface Props {
    className?: string
    value?: string
    checked?: boolean
    disabled?: boolean
}

const RadioButton: React.FunctionComponent<Props> = ({ disabled, checked }) => {
    return (
        <div className={styles.container}>
            <input className={styles.inputField} type="radio" disabled={disabled} checked={checked} />
            <div className={styles.radio} />
        </div>
    )
}

export default RadioButton
