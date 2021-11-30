import { PureQueryOptions, RefetchQueriesFunction } from '@apollo/client'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { LearningNeed } from 'api/types/types'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import React, { useState } from 'react'
import { DeleteLearningNeedModal } from '../Modals/DeleteLearningNeedModal'

interface Props {
    onSuccessDelete: () => void
    learningNeed: LearningNeed
}

export const DeleteLearningNeedButtonContainer = (props: Props) => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)
    const { onSuccessDelete, learningNeed } = props

    return (
        <>
            <Button type={ButtonType.secondary} danger={true} icon={IconType.delete} onClick={() => setIsVisible(true)}>
                {i18n._(t`Leervraag verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <DeleteLearningNeedModal
                    learningNeed={learningNeed}
                    onDeleteSuccess={handleOnSuccess}
                    onClose={() => setIsVisible(false)}
                />
            </Modal>
        </>
    )

    function handleOnSuccess() {
        setIsVisible(false)
        onSuccessDelete()
    }
}
