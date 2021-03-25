import React from 'react'
import classNames from 'classnames'

import styles from './LabelWithIcon.module.scss'
import Paragraph from '../Typography/Paragraph'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'

interface Props {
    className?: string
    text: string
    icon: IconType
}

const LabelWithIcon: React.FunctionComponent<Props> = props => {
    const { className, text, icon } = props
    const containerClassNames = classNames(styles.container, className)
    return (
        <div className={containerClassNames}>
            <Icon type={icon} className={styles.icon} />
            <Paragraph>{text}</Paragraph>
        </div>
    )
}

export default LabelWithIcon
