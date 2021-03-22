import classNames from 'classnames'
import React from 'react'
import Label from '../Label/Label'
import Paragraph from '../Typography/Paragraph'
import styles from './Field.module.scss'

export interface FieldProps {
    label?: string
    description?: string
    className?: string
    RightComponent?: JSX.Element
    loading?: boolean
    required?: boolean
    horizontal?: boolean
    displayBlock?: boolean
    evenContainers?: boolean
    grow?: boolean
}

const Field: React.FunctionComponent<FieldProps> = ({
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
    grow,
}) => {
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-horizontal']]: horizontal,
        [styles.evenContainers]: evenContainers,
        [styles.grow]: grow,
    })

    return (
        <div className={containerClassNames}>
            {loading && <label className={styles.loading}>loading</label>}
            {label && (
                <div className={styles.labelContainer}>
                    <Label text={label} required={required} />
                    {description && <Paragraph className={styles.description}>{description}</Paragraph>}
                    {RightComponent}
                </div>
            )}
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
