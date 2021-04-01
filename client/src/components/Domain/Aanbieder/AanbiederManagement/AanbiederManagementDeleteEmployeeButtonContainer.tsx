import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'

import Button, { ButtonType } from 'components/Core/Button/Button'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
import Column from 'components/Core/Layout/Column/Column'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import Row from 'components/Core/Layout/Row/Row'
import { IconType } from 'components/Core/Icon/IconType'
import { useDeleteAanbiederMutation } from 'generated/graphql'

interface Props {
    employeeId: string
    employeeName: string
    loading: boolean
    onSuccessfulDelete?: () => void
}

export const AanbiederManagementDeleteEmployeeButtonContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)

    const [deleteEmployee, { loading: deleteLoading }] = useDeleteAanbiederMutation()

    const { loading } = props

    return (
        <>
            <Button
                type={ButtonType.quaternary}
                danger={true}
                icon={IconType.delete}
                loading={loading}
                onClick={() => setIsVisible(true)}
            >
                {i18n._(t`Medewerker verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <ModalView
                    onClose={() => setIsVisible(false)}
                    ContentComponent={renderContent()}
                    BottomComponent={renderButtons()}
                />
            </Modal>
        </>
    )

    function renderContent() {
        const { employeeName } = props
        const message =
            'Weet je zeker dat je het medewerker wilt verwijderen? Deze medewerker zal geen toegang meer hebben tot de applicatie.'

        return (
            <Column spacing={6}>
                <SectionTitle heading="H4" title={i18n._(t`Medewerker ${employeeName} verwijderen`)} />
                <Paragraph>{i18n._(t({ id: message }))}</Paragraph>
            </Column>
        )
    }

    function renderButtons() {
        return (
            <Row justifyContent="flex-end">
                <Button type={ButtonType.secondary} disabled={deleteLoading} onClick={() => setIsVisible(false)}>
                    {i18n._(t`Annuleren`)}
                </Button>
                <Button
                    danger={true}
                    type={ButtonType.primary}
                    icon={IconType.delete}
                    onClick={handleDelete}
                    loading={deleteLoading}
                >
                    {i18n._(t`Verwijderen`)}
                </Button>
            </Row>
        )
    }

    async function handleDelete() {
        const { employeeId, onSuccessfulDelete } = props

        const response = await deleteEmployee({ variables: { id: employeeId } })

        if (response.errors?.length) {
            setIsVisible(false)
            return
        }

        setIsVisible(false)

        if (onSuccessfulDelete) {
            onSuccessfulDelete()
        }
    }
}
