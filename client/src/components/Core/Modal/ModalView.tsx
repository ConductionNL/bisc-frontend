import classNames from 'classnames'
import { ClassValue } from 'classnames/types'
import React, { useState } from 'react'
import Button, { ButtonType } from '../Button/Button'
import HorizontalRule from '../HorizontalRule/HorizontalRule'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import Column from '../Layout/Column/Column'
import Row from '../Layout/Row/Row'
import SectionTitle from '../Text/SectionTitle'
import Paragraph from '../Typography/Paragraph'
import styles from './ModalView.module.scss'

interface Props {
    className?: ClassValue
    title: string
    message: string
    onClose: () => void
    BottomComponent: JSX.Element
}

const DeleteModal: React.FunctionComponent<Props> = props => {
    const { BottomComponent, className, title, message, onClose } = props
    const containerClassNames = classNames(styles.container, className)

    const handleOnClose = () => {
        onClose()
    }

    return (
        <div className={containerClassNames}>
            <Column spacing={6} className={styles.contentContainer}>
                <SectionTitle title={title} heading="H4" />
                <Paragraph>{message}</Paragraph>
            </Column>
            <HorizontalRule spacingDisabled={true} />
            <div className={styles.footerContainer}>
                <Row>{BottomComponent}</Row>
            </div>
            <div className={styles.close}>
                <Button onClick={handleOnClose} type={ButtonType.secondary}>
                    <Icon type={IconType.close} />
                </Button>
            </div>
        </div>
    )
}

export default DeleteModal
