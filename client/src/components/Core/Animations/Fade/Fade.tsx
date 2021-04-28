import classNames from 'classnames'
import React, { useImperativeHandle, useRef } from 'react'
import styles from './Fade.module.scss'

interface Props {
    className?: string
    ref: any
}

export const Fade: React.FC<Props> = React.forwardRef(({ className, children, ref }) => {
    const containerClassNames = classNames(styles.fade, className)

    useImperativeHandle(ref, () => ({
        fadeInFadeOut: () => {
            console.log('test')
        },
    }))

    return <div className={containerClassNames}>{children}</div>
})
