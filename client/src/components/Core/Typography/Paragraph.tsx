import React from 'react'
import styles from './Paragraph.module.scss'
import classNames from 'classnames'

interface Props {
    centered?: boolean
    bold?: boolean
    italic?: boolean
    error?: boolean
}

const Paragraph: React.FunctionComponent<Props> = props => {
    const { children, centered, error, italic, bold } = props

    return (
        <p
            className={classNames(styles.paragraph, {
                [styles.centered]: centered === true,
                [styles.bold]: bold === true,
                [styles.italic]: italic === true,
                [styles.leftAligned]: centered === false,
                [styles.isError]: error === true,
            })}
        >
            {children}
        </p>
    )
}

export default Paragraph
