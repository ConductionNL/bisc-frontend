import React from 'react'
import styles from './FormField.module.scss'

interface Props {
    label?: string
    link?: string
    loading?: boolean
}

const FormField: React.FunctionComponent<Props> = ({ label, loading, link, children }) => {
    return (
        <div className={styles.container}>
            {loading && <label className={styles.loading}>loading</label>}
            <div className={styles.labelContainer}>
                {label && <label className={styles.label}>{label}</label>}
                {link && (
                    <a className={styles.link} href={link} target="_blank" rel="noreferrer">
                        Link
                    </a>
                )}
            </div>
            {children}
        </div>
    )
}

export default FormField
