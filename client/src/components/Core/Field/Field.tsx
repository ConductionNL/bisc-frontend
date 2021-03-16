import classNames from 'classnames'
import React from 'react'
import Paragraph from '../Typography/Paragraph'
import styles from './Field.module.scss'

interface Props {
    label?: string
    description?: string
    className?: string
    RightComponent?: JSX.Element
    loading?: boolean
    required?: boolean
    horizontal?: boolean
    displayBlock?: boolean
    evenContainers?: boolean
}

const Field: React.FunctionComponent<Props> = ({
    label,
    loading,
    RightComponent,
    required,
    children,
    className,
    description,
    horizontal,
    displayBlock,
    evenContainers,
}) => {
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-horizontal']]: horizontal,
        [styles.evenContainers]: evenContainers,
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
                {description && <Paragraph className={styles.description}>{description}</Paragraph>}
                {RightComponent}
            </div>
            <div
                className={classNames(styles.childrenContainer, {
                    [styles.displayBlock]: displayBlock,
                })}
            >
                {children}
            </div>
        </div>
    )
}

export default Field
