import styles from './DeleteModal.module.scss'
import React, { useState } from 'react'
import { ClassValue } from 'classnames/types'
import Button, { ButtonType } from '../Button/Button'
import HorizontalRule from '../HorizontalRule/HorizontalRule'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import SectionTitle from '../Text/SectionTitle'
import Paragraph from '../Typography/Paragraph'
import Modal from './ModalContainer'

interface Props {
    className?: ClassValue
    title: string
    message: string
    onDelete: () => void
}

const DeleteModal: React.FunctionComponent<Props> = ({ className, title, message, onDelete, children }) => {
    const [display, setDisplay] = useState<boolean>(true)

    return renderModal()

    function renderModal() {
        if (!display) {
            return null
        }

        return (
            <Modal>
                <div className={styles.titleContainer}>
                    <SectionTitle title={title} heading="H4" />
                    <Icon type={IconType.close} className={styles.icon} onClick={() => setDisplay(false)} />
                </div>
                <Paragraph>{message}</Paragraph>

                <HorizontalRule className={styles.line} />
                <div className={styles.footerContainer}>
                    <div className={styles.buttonContainer}>
                        <Button className={styles.button} type={ButtonType.secondary} onClick={() => setDisplay(false)}>
                            Annuleren
                        </Button>
                        <Button
                            className={styles.button}
                            danger={true}
                            type={ButtonType.primary}
                            icon={IconType.delete}
                            onClick={onDelete}
                        >
                            Verwijderen
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default DeleteModal
