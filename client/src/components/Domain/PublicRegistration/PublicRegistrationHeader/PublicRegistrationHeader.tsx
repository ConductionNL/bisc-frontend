import React from 'react'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from './PublicRegistrationHeader.module.scss'
import PageTitle, { PageTitleSize } from 'components/Core/Text/PageTitle'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'

interface Props {
    title: string
    subtitle?: string
    description?: string
}

export const PublicRegistrationHeader: React.FC<Props> = props => {
    const { title, subtitle, description } = props
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <PageTitle title={title} size={PageTitleSize.large} className={styles.title} />
                <Paragraph className={styles.subtitle}>{subtitle}</Paragraph>
                <Paragraph>{description}</Paragraph>
            </div>
            <Icon type={IconType.providers} className={styles.providers} />
            <Icon type={IconType.shape} className={styles.shape} />
            <Icon type={IconType.profile} className={styles.profile} />
            <Icon type={IconType.attendee} className={styles.attendee} />
        </div>
    )
}
