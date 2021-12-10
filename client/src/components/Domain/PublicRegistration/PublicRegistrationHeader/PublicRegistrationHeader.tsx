import React from 'react'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from './PublicRegistrationHeader.module.scss'
import PageTitle, { PageTitleSize } from 'components/Core/Text/PageTitle'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { LandingPageContainer } from 'components/Domain/LandingPage/LandingPageContainer'
import Center from 'components/Core/Layout/Center/Center'

interface Props {
    title: string
    subtitle?: string
    description?: string
    success?: boolean
}

export const PublicRegistrationHeader: React.FC<Props> = props => {
    const { title, subtitle, description, success } = props
    const { i18n } = useLingui()

    if (success) {
        return (
            <div className={styles.successContainer}>
                <LandingPageContainer>
                    <Center>
                        <div className={styles.contentContainer}>
                            <div className={styles.iconContainer}>
                                <Icon type={IconType.checkmark} className={styles.checkmark} />
                            </div>
                            <PageTitle
                                title={i18n._(t`Deelnemer succesvol aangemeld`)}
                                size={PageTitleSize.large}
                                className={styles.title}
                            />
                        </div>
                    </Center>
                </LandingPageContainer>
            </div>
        )
    }

    return (
        <div className={styles.defaultContainer}>
            <LandingPageContainer>
                <div className={styles.contentContainer}>
                    <PageTitle title={title} size={PageTitleSize.large} className={styles.title} />
                    <Paragraph className={styles.subtitle}>{subtitle}</Paragraph>
                    <Paragraph>{description}</Paragraph>
                </div>
            </LandingPageContainer>
            <Icon type={IconType.providers} className={styles.providers} />
            <Icon type={IconType.shape} className={styles.shape} />
            <Icon type={IconType.profile} className={styles.profile} />
            <Icon type={IconType.attendee} className={styles.attendee} />
        </div>
    )
}
