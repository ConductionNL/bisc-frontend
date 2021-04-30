import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { StudentDossierEventType } from 'generated/graphql'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'

interface Props {
    onClose: () => void
    data: StudentDossierEventType
}

export const FilesEventsDeleteModal: React.FC<Props> = ({ onClose }) => {
    const history = useHistory()
    const { i18n } = useLingui()
    const [deleteFilesEvents, { loading }] = useMockMutation({}, false)

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Gebeurtenis verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`
                                Weet je zeker dat je de gebeurtenis wilt verwijderen?`)}
                    </Paragraph>
                </Column>
            }
            BottomComponent={
                <>
                    <Button type={ButtonType.secondary} onClick={onClose}>
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
        const response = await deleteFilesEvents(true)

        if (response?.errors?.length || !response?.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Gebeurtenis is verwijderd`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )

        history.push(routes.authorized.management.bisc.coworkers.index)
    }
}