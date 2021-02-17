import classNames from 'classnames'
import React from 'react'
import styles from './FormField.module.scss'

interface Props {
    label?: string
    RightComponent?: JSX.Element
    loading?: boolean
    required?: boolean
}

const FormField: React.FunctionComponent<Props> = ({ label, loading, RightComponent, required, children }) => {
    return (
        <div className={styles.container}>
            {loading && <label className={styles.loading}>loading</label>}
            <div className={styles.labelContainer}>
                {label && (
                    <label
                        className={classNames(styles.label, {
                            [styles.isRequired]: required,
                        })}
                    >
                        {label}
                    </label>
                )}
                {RightComponent}
            </div>
            {children}
        </div>
    )
}

export default FormField
