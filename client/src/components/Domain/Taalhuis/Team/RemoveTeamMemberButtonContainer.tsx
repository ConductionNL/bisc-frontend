import { useLingui } from '@lingui/react'
import { OrganizationEmployee } from 'api/types/types'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { ConfirmModal } from 'components/Core/Modal/ConfirmModal'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useState } from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    member: OrganizationEmployee
    onRemove?: (closeModal: () => void) => void
    loading?: boolean
}

export const RemoveTeamMemberButtonContainer: React.FunctionComponent<Props> = props => {
    const { member, loading, onRemove } = props
    const [modalOpen, setModalOpen] = useState(false)
    const { i18n } = useLingui()

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
                        <strong>{NameFormatters.formattedFullname(member.person)}</strong>
                        {i18n._(' uit het team wilt verwijderen?')}
                    </Paragraph>
                }
                confirmButtonLabel={i18n._('Uit team halen')}
                danger={true}
                loading={loading}
                onClose={() => setModalOpen(false)}
                onConfirm={() => onRemove?.(() => setModalOpen(false))}
            />
        </Row>
    )
}
