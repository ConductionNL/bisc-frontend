import React from 'react'
import classNames from 'classnames'

import styles from './SectionTitle.module.scss'

interface Props {
    title: string
    className?: string
    size?: 'H3' | 'H4' | 'H5' | 'H6' | 'H7' | 'H8'
}

const SectionTitle: React.FunctionComponent<Props> = props => {
    const { title } = props
    const titleClassName = getTitleClassName()

    return <h2 className={titleClassName}>{title}</h2>

    function getTitleClassName() {
        const { className, size } = props

        return classNames(styles.title, className, {
            [styles.h3]: size === 'H3',
            [styles.h4]: size === 'H4',
            [styles.h5]: size === 'H5',
            [styles.h6]: size === 'H6',
            [styles.h7]: size === 'H7',
            [styles.h8]: size === 'H8',
        })
    }
}

export default SectionTitle
