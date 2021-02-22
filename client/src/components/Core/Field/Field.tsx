import classNames from 'classnames'
import React from 'react'
import styles from './Field.module.scss'

interface Props {
    label?: string
    className?: string
    RightComponent?: JSX.Element
    loading?: boolean
    required?: boolean
    horizontal?: boolean
}

const Field: React.FunctionComponent<Props> = ({
    label,
    loading,
    RightComponent,
    required,
    children,
    className,
    horizontal,
}) => {
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-horizontal']]: horizontal,
    })

    return (
        <div className={containerClassNames}>
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
            <div className={styles.childrenContainer}>{children}</div>
        </div>
    )
}

export default Field
