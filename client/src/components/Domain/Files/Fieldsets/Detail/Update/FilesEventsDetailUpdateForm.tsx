import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import React, { useState } from 'react'
import styles from '../../SharedEventDetailFieldset.module.scss'
import Form from 'components/Core/Form/Form'
import { FilesEventsDetailContainer } from '../../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { Forms } from 'utils/forms'
import Modal from 'components/Core/Modal/Modal'
import { FilesEventsDeleteModal } from './FilesEventsDeleteModal'
import { ContactMoment } from 'api/types/types'
import { usePutContactMoment } from 'api/contactMoment/contactMoment'
import { FileEventFormData, FileEventFormFields } from '../../FileEventFormFields'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { getMappedFileEventFormData } from 'components/Domain/Files/mappers/fileEventFormDataMapper'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { useParams } from 'react-router'

interface Props {
    defaultValues: ContactMoment
    onClickCancel: () => void
    handleSuccess: () => void
    onDelete: () => void
}

export const FilesEventsDetailUpdateForm: React.FC<Props> = props => {
    const { defaultValues, onClickCancel, handleSuccess, onDelete } = props

    const { mutate, loading, error } = usePutContactMoment(defaultValues.id)
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()

    return (
        <MutationErrorProvider mutationError={error?.data}>
            <Form onSubmit={handleEdit}>{renderFormFields()}</Form>
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <FilesEventsDeleteModal
                    data={defaultValues}
                    onClose={() => setModalIsVisible(false)}
                    onSuccess={onDelete}
                />
            </Modal>
        </MutationErrorProvider>
    )

    function renderFormFields() {
        return (
            <FilesEventsDetailContainer type={defaultValues.type}>
                <FileEventFormFields defaultValues={defaultValues} />
                <div className={styles.buttons}>
                    <div className={styles.leftButtonsContainer}>
                        <Button
                            className={styles.button}
                            icon={IconType.delete}
                            type={ButtonType.secondary}
                            onClick={() => setModalIsVisible(true)}
                        >
                            {i18n._(t`Verwijderen`)}
                        </Button>
                    </div>
                    <div className={styles.rightButtonsContainer}>
                        <Button className={styles.button} type={ButtonType.secondary} onClick={onClickCancel}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} className={styles.button}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </div>
                </div>
            </FilesEventsDetailContainer>
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FileEventFormData>(e)
        const input = getMappedFileEventFormData(formData, taalhuisParticipantId)

        try {
            await mutate(input)

            handleSuccess()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
