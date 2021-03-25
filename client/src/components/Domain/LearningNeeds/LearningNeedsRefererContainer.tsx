import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'
import styles from './LearningNeedsRefererContainer.module.scss'

interface Props {
    labels: JSX.Element[]
}

export const RefererContainer: React.FC<Props> = ({ labels }) => {
    return (
        <div className={styles.container}>
            {labels.map((label, index) => {
                return (
                    <>
                        {label}
                        {index + 1 !== labels.length && <Icon type={IconType.breadcrumb} className={styles.icon} />}
                    </>
                )
            })}
        </div>
    )
}
