import {
    DocumentNode,
    OperationVariables,
    PureQueryOptions,
    RefetchQueriesFunction,
    TypedDocumentNode,
} from '@apollo/client'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import React, { useState } from 'react'
import { DocumentUploadModal } from '../Modals/DocumentUploadModal'

interface Props<TVariables> {
    onSuccessfullUpload?: () => void
    createDocument: DocumentNode | TypedDocumentNode<any, OperationVariables>
    createRefetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction
    createVariables?: (file: File) => Promise<TVariables>
}

export const DocumentUploadButtonContainer = <TVariables extends unknown>(props: Props<TVariables>) => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)
    const { createVariables, createDocument, createRefetchQueries } = props

    return (
        <>
            <Button type={ButtonType.primary} icon={IconType.add} onClick={() => setIsVisible(true)}>
                {i18n._(t`Document uploaden`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <DocumentUploadModal
                    onUploadSuccess={() => setIsVisible(false)}
                    onClose={() => setIsVisible(false)}
                    createDocument={createDocument}
                    createRefetchQueries={createRefetchQueries}
                    createVariables={createVariables}
                />
            </Modal>
        </>
    )
}
