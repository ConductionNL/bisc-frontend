import React from 'react'
import styles from './TableLink.module.scss'
import { Link as RouterLink } from 'react-router-dom'
import classNames from 'classnames'
import { Location } from 'history'

interface Props {
    className?: string
    to: string | Location
    target?: string
    text: string
}

export const TableLink: React.FunctionComponent<Props> = ({ className, to, text, target }) => {
    const tableLinkClassNames = classNames(styles.link, className)
    return (
        <RouterLink className={tableLinkClassNames} to={to} target={target}>
            <span>{text}</span>
        </RouterLink>
    )
}
