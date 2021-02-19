import styles from './ModalContainer.module.scss'
import React from 'react'
import classNames from 'classnames'
import { ClassValue } from 'classnames/types'

interface Props {
    className?: ClassValue
}

const Modal: React.FunctionComponent<Props> = ({ className, children }) => {
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <div className={styles.contentContainer}>{children}</div>
        </div>
    )
}

export default Modal
