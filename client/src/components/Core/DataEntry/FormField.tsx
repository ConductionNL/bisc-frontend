import React from 'react'
import styles from './FormField.module.scss'

interface Props {
    label?: string
}

const FormField: React.FunctionComponent<Props> = ({ label, children }) => {
    return (
        <div className={styles.container}>
            {label !== undefined && <label className={styles.label}>{label}</label>}
            {children}
        </div>
    )
}

export default FormField
