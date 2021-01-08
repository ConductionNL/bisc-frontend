import React from 'react'
import classNames from 'classnames'
import capitalize from 'lodash/capitalize'

import styles from './Notifications.module.scss'
import { NotificationEvent } from '../../../../utils/notifications'
import Paragraph from '../../Typography/Paragraph'
import SectionTitle from '../../Text/SectionTitle'
import Column from '../../Layout/Column/Column'
import Icon from '../../Icon/Icon'
import { IconType } from '../../Icon/IconType'
import Row from '../../Layout/Row/Row'

interface Props {
    notificationEvent: NotificationEvent
    title: string
    message: string
}

const Notifications: React.FunctionComponent<Props> = props => {
    const { notificationEvent, title, message } = props
    const className = classNames(styles.container, {
        [styles[`is${capitalize(notificationEvent)}`]]: notificationEvent,
    })

    return (
        <Row className={className}>
            <Column className={styles.iconContainer}>
                <Icon type={IconType.checkmark} className={styles.icon} />
            </Column>
            <Column className={styles.textContainer}>
                <SectionTitle title={title} heading="H5" className={styles.text} />
                <Paragraph className={styles.text}>{message}</Paragraph>
            </Column>
        </Row>
    )
}

export default Notifications
