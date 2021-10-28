import classNames from 'classnames'
import { FilesEventsFieldsetContextState } from 'components/Domain/Files/Fieldsets/Context/FilesEventsFieldsetContextState'
import { forwardRef, PropsWithRef, Ref, useContext, useImperativeHandle, useState } from 'react'
import styles from './Fade.module.scss'

interface Props {
    className?: string
    children?: JSX.Element
}

export const Fade = forwardRef((props: PropsWithRef<Props>, ref: Ref<{ fadeInFadeOut: () => void }>) => {
    const { className, children } = props
    const [style, setStyle] = useState<string>()
    const { showSuccessView } = useContext(FilesEventsFieldsetContextState)
    const [removeComponent, setRemoveComponent] = useState<boolean>()
    const containerClassNames = classNames(className, style, {
        [styles.remove]: removeComponent,
    })
    useImperativeHandle(ref, () => ({ fadeInFadeOut }))

    function fadeInFadeOut() {
        setStyle(styles.fade)
        setTimeout(() => {
            setRemoveComponent(true)
            showSuccessView(false)
        }, 3000)
    }

    return <div className={containerClassNames}>{children}</div>
})
