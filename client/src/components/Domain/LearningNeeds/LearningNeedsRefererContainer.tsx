import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'
import styles from './LearningNeedsRefererContainer.module.scss'

interface Props {
    labels: string[]
}

export const RefererContainer: React.FC<Props> = ({ labels }) => {
    return (
        <div className={styles.container}>
            {labels.map((label, index) => {
                return (
                    <>
                        <LabelTag key={index} label={label} color={LabelColor.grey} />
                        {index + 1 !== labels.length && <Icon type={IconType.arrowRight} className={styles.icon} />}
                    </>
                )
            })}
        </div>
    )
}
