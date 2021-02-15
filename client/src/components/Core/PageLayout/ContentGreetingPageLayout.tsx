import React from 'react'
import classNames from 'classnames'

import styles from './ContentGreetingPageLayout.module.scss'
import PageTitle, { PageTitleSize } from '../Text/PageTitle'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'

interface Props {
    className?: string
    ContentComponent: JSX.Element
    greeting?: string
}

const ContentGreetingPageLayout: React.FunctionComponent<Props> = props => {
    const { greeting, ContentComponent, className } = props
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            <div className={styles.contentContainer}>{ContentComponent}</div>
            <div className={styles.greetingContainer}>
                {greeting && <PageTitle title={greeting} size={PageTitleSize.large} className={styles.greeting} />}
                <Icon type={IconType.providers} className={styles.providers} />
                <Icon type={IconType.profile} className={styles.profile} />
                <Icon type={IconType.attendee} className={styles.attendee} />
                <Icon type={IconType.shape} className={styles.shape} />
            </div>
        </div>
    )
}

export default ContentGreetingPageLayout
