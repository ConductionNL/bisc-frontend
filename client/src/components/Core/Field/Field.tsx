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
}) => {
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-horizontal']]: horizontal,
        [styles.evenContainers]: evenContainers,
    })

    return (
        <div className={containerClassNames}>
            {loading && <label className={styles.loading}>loading</label>}
            {label && (
                <Label text={label} required={required} RightComponent={RightComponent} description={description} />
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
