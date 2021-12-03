import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useDeleteParticipation } from 'api/participation/participation'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import React, { useState } from 'react'
import { DeleteLearningNeedReferenceModal } from '../Modals/DeleteLearningNeedReferenceModal'

interface Props {
    onSuccessfullDelete: () => void
    participationId: string
    learningNeedName: string
}

export const DeleteLearningNeedReferenceButtonContainer = (props: Props) => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)
    const { participationId } = props
    const { mutate, loading } = useDeleteParticipation(participationId)

    return (
        <>
            <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setIsVisible(true)}>
                {i18n._(t`Verwijzing verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <DeleteLearningNeedReferenceModal
                    onDelete={handleDelete}
                    onClose={() => setIsVisible(false)}
                    loading={loading}
                />
            </Modal>
        </>
    )

    async function handleDelete() {
        const { onSuccessfullDelete } = props

        try {
            await mutate()

            NotificationsManager.success(
                i18n._(t`Verwijzing is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            setIsVisible(false)
            onSuccessfullDelete()

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
