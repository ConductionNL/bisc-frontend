import styles from './Modal.module.scss'
import React, { useState } from 'react'
import classNames from 'classnames'
import { ClassValue } from 'classnames/types'
import Icon from '../../Icon/Icon'
import { IconType } from '../../Icon/IconType'
import SectionTitle from '../../Text/SectionTitle'
import Paragraph from '../../Typography/Paragraph'
import Button, { ButtonType } from '../../Button/Button'
import { NotificationsManager } from '../Notifications/NotificationsManager'
import HorizontalRule from '../../HorizontalRule/HorizontalRule'

interface Props {
    className?: ClassValue
    title: string
    message: string
}

const Modal: React.FunctionComponent<Props> = ({ title, message, className }) => {
    const [display, setDisplay] = useState<boolean>(true)
    const containerClassNames = classNames(styles.container, className)

    return renderModal()

    function renderModal() {
        if (!display) {
            return null
        }

        return (
            <div className={containerClassNames}>
                <div className={styles.contentContainer}>
                    <div className={styles.titleContainer}>
                        <SectionTitle title={title} heading="H4" />
                        <Icon type={IconType.close} className={styles.icon} onClick={() => setDisplay(false)} />
                    </div>
                    <Paragraph>{message}</Paragraph>

                    <HorizontalRule className={styles.line} />
                    <div className={styles.footerContainer}>
                        <div className={styles.buttonContainer}>
                            <Button
                                className={styles.button}
                                type={ButtonType.secondary}
                                onClick={() => setDisplay(false)}
                            >
                                Annuleren
                            </Button>
                            <Button
                                className={styles.button}
                                danger={true}
                                type={ButtonType.primary}
                                icon={IconType.delete}
                                onClick={() => NotificationsManager.success('title', 'test')}
                            >
                                Verwijderen
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal
