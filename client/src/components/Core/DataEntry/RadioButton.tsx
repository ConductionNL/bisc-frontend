import React from 'react'
import styles from './RadioButton.module.scss'

interface Props {
    className?: string
    value?: string | ReadonlyArray<string> | number;
    checked?: boolean
    disabled?: boolean
    name: string
}

const RadioButton: React.FunctionComponent<Props> = ({ disabled, checked, name, value }) => {
    return (
        <div className={styles.container}>
            <input className={styles.inputField} name={name} type="radio" disabled={disabled} checked={checked} value={value}/>
            <div className={styles.radio} />
        </div>
    )
}

export default RadioButton
