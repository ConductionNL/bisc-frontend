import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './ConditionalCard.module.scss'

interface Props {
    className?: string
    warning?: boolean
}

const InputContainer: React.FunctionComponent<Props> = ({ className, children, warning }) => {
    const containerClassNames = classNames(styles.container, className, {
        [styles.warning]: warning,
    })

    if (warning) {
        return (
            <div className={containerClassNames}>
                <div className={styles.warningIconContainer}>
                    <Icon className={styles.warningIcon} type={IconType.warning} />
                </div>
                {children}
            </div>
        )
    }
    return <div className={containerClassNames}>{children}</div>
}

export default InputContainer
