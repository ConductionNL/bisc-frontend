import React from 'react'
import styles from './TableLink.module.scss'
import { Link as RouterLink } from 'react-router-dom'
import classNames from 'classnames'
import { Location } from 'history'

interface Props<T> {
    className?: string
    to: string | Location<T>
    target?: string
    text: string
}

export const TableLink = <T extends unknown>({ className, to, text, target }: Props<T>) => {
    const tableLinkClassNames = classNames(styles.link, className)
    return (
        <RouterLink className={tableLinkClassNames} to={to} target={target}>
            <span>{text}</span>
        </RouterLink>
    )
}
