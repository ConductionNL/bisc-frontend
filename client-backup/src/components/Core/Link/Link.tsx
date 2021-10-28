import React from 'react'
import styles from './Link.module.scss'
import classNames from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
    className?: string
    to?: string
    href?: string
    target?: string
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const Link: React.FunctionComponent<Props> = props => {
    const { to, href, children, target, className, onClick } = props
    const linkClassNames = classNames(styles.link, className)
    if (!to) {
        return (
            <a className={linkClassNames} href={href} target={target} rel="noreferrer" onClick={onClick}>
                {children}
            </a>
        )
    }
    return (
        <RouterLink className={linkClassNames} to={to} target={target}>
            <span>{children}</span>
        </RouterLink>
    )
}

export default Link
