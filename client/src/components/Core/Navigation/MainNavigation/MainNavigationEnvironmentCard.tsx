import classNames from 'classnames'
import React, { useEffect } from 'react'
import Icon from '../../Icon/Icon'
import { IconType } from '../../Icon/IconType'
import styles from './MainNavigationEnvironmentCard.module.scss'
import { MainNavigationType } from './types'

interface Props {
    className?: string
    name: string
    environment: string
    type: MainNavigationType | string
}

const MainNavigationEnvironmentCard: React.FunctionComponent<Props> = props => {
    const { className, name, environment, type } = props
    const container = classNames(styles.container, className, {
        [styles['is-bisc']]: type === MainNavigationType.Bisc,
        [styles['is-taalhuis']]: type === MainNavigationType.Taalhuis,
        [styles['is-aanbieder']]: type === MainNavigationType.Aanbieder,
    })

    useEffect(() => {
        document.title = `TOP - ${environment}`

        return function cleanup() {
            document.title = `TOP - Inloggen`
        }
    }, [environment])

    return (
        <div className={container}>
            <div className={styles.left}>
                <Icon type={IconType.logoShape} className={styles.logo} />
            </div>
            <div className={styles.right}>
                <p className={styles.name}>{name}</p>
                <p className={styles.environment}>{environment}</p>
            </div>
        </div>
    )
}

export default MainNavigationEnvironmentCard
