import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useDeleteDocument } from 'api/document/document'
import { Document } from 'api/types/types'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    onClose: () => void
    onDeleteSuccess: () => void
    document: Document
}

export const DocumentDeleteModal = (props: Props) => {
    const { i18n } = useLingui()
    const { onClose, onDeleteSuccess, document } = props

    const { mutate, loading } = useDeleteDocument(document.id)

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Document verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`Weet je zeker dat je het volgende document ${document.file.name} wilt verwijderen?`)}
                    </Paragraph>
                </Column>
            }
            BottomComponent={
                <>
                    <Button type={ButtonType.secondary} onClick={onClose} disabled={loading}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    <Button
                        danger={true}
                        type={ButtonType.primary}
                        icon={IconType.delete}
                        onClick={handleDelete}
                        loading={loading}
                    >
                        {i18n._(t`Verwijderen`)}
                    </Button>
                </>
            }
        />
    )

    async function handleDelete() {
        try {
            await mutate()

            NotificationsManager.success(
                i18n._(t`Document is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            onDeleteSuccess()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
