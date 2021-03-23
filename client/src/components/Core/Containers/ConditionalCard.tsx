import classNames from 'classnames'
import React from 'react'
import styles from './ConditionalCard.module.scss'
import { WarningBlock } from './WarningBlock'

interface Props {
    className?: string
    warning?: boolean
}

const InputContainer: React.FunctionComponent<Props> = ({ className, children, warning }) => {
    const containerClassNames = classNames(styles.container, className, {
        [styles.warning]: warning,
    })

    if (warning) {
        return <WarningBlock>{children}</WarningBlock>
    }
    return <div className={containerClassNames}>{children}</div>
}

export default InputContainer
