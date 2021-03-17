import classNames from 'classnames'
import React from 'react'
import Paragraph from '../Typography/Paragraph'
import styles from './Label.module.scss'

export interface LabelProps {
    text: string
    description?: string
    className?: string
    required?: boolean
    RightComponent?: JSX.Element
}

const Label: React.FunctionComponent<LabelProps> = ({ text, description, className, required, RightComponent }) => {
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <label
                className={classNames(styles.label, {
                    [styles.isRequired]: required,
                })}
            >
                {text}
            </label>

            {description && <Paragraph className={styles.description}>{description}</Paragraph>}
            {RightComponent}
        </div>
    )
}

export default Label
