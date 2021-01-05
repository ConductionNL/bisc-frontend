import React from 'react'
import styles from './Paragraph.module.scss'
import classNames from 'classnames'

interface Props {
    centered?: boolean
    error?: boolean
}

const Paragraph: React.FunctionComponent<Props> = ({ children, centered, error }) => {
    return (
        <p
            className={classNames(styles.paragraph, {
                [styles.centered]: centered === true,
                [styles.leftAligned]: centered === false,
                [styles.isError]: error === true,
            })}
        >
            {children}
        </p>
    )
}

export default Paragraph
