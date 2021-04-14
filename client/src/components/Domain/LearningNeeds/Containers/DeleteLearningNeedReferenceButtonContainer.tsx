import { PureQueryOptions, RefetchQueriesFunction } from '@apollo/client'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import React, { useState } from 'react'
import { DeleteLearningNeedReferenceModal } from '../Modals/DeleteLearningNeedReferenceModal'

interface Props {
    onSuccessfullDelete: () => void
    refetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction
    variables?: {
        id: string
    } // this should be temporary
    learningNeedName: string
}

export const DeleteLearningNeedReferenceButtonContainer = (props: Props) => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)
    const { onSuccessfullDelete, variables } = props

    return (
        <>
            <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setIsVisible(true)}>
                {i18n._(t`Verwijzing verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <DeleteLearningNeedReferenceModal
                    onDeleteSuccess={handleOnSuccess}
                    onClose={() => setIsVisible(false)}
                    variables={variables}
                />
            </Modal>
        </>
    )

    function handleOnSuccess() {
        setIsVisible(false)
        onSuccessfullDelete()
    }
}
