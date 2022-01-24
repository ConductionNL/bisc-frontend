import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { ConfirmModal } from 'components/Core/Modal/ConfirmModal'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useState } from 'react'

interface Props {
    member: any // TODO: BISC-314
    onRemove?: () => void
}

export const RemoveTeamMemberButtonContainer: React.FunctionComponent<Props> = props => {
    const { member } = props

    const [modalOpen, setModalOpen] = useState(false)
    const { i18n } = useLingui()
    // const { mutate, loading } = useRemoveTeamMember(teamId) TODO: BISC-314

    return (
        <Row justifyContent="flex-end">
            <Button type={ButtonType.secondary} onClick={() => setModalOpen(true)}>
                <Icon type={IconType.close} />
            </Button>
            <ConfirmModal
                modalOpen={modalOpen}
                title={i18n._('Medewerker uit team halen')}
                message={
                    <Paragraph>
                        {i18n._('Weet je zeker dat je ')}
                        <strong>{member.name}</strong>
                        {i18n._(' uit het team wilt verwijderen?')}
                    </Paragraph>
                }
                confirmButtonLabel={i18n._('Uit team halen')}
                danger={true}
                // loading={loading} // TODO: BISC-314
                onClose={() => setModalOpen(false)}
                onConfirm={handleRemove}
            />
        </Row>
    )

    // TODO: BISC-314
    // eslint-disable-next-line require-await
    async function handleRemove() {
        try {
            // await mutate()
            NotificationsManager.success(i18n._(`Verwijderd uit team`))

            props.onRemove?.()
            setModalOpen(false)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
