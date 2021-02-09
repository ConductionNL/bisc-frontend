import React from 'react'
import styles from './FormField.module.scss'

interface Props {
    label?: string
    loading?: boolean
}

const FormField: React.FunctionComponent<Props> = ({ label, loading, children }) => {
    return (
        <div className={styles.container}>
            {loading && <label className={styles.loading}>loading</label>}
            {label !== undefined && <label className={styles.label}>{label}</label>}
            {children}
        </div>
    )
}

export default FormField
