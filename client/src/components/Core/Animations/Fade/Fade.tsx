import classNames from 'classnames'
import React, { forwardRef, PropsWithRef, Ref, useImperativeHandle } from 'react'
import styles from './Fade.module.scss'

interface Props {
    className?: string
    children?: JSX.Element
}

export const Fade = forwardRef((props: PropsWithRef<Props>, ref: Ref<{ fadeInFadeOut: () => void }>) => {
    const { className } = props
    const containerClassNames = classNames(styles.fade, className)
    useImperativeHandle(ref, () => ({ fadeInFadeOut }))

    function fadeInFadeOut() {
        console.log('Saying hello')
    }

    return <div className={containerClassNames} />
})
