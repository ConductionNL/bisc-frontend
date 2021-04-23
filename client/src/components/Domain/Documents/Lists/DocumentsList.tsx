import { DocumentNode, PureQueryOptions, RefetchQueriesFunction, TypedDocumentNode, useMutation } from '@apollo/client'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import React, { useState } from 'react'
import { downloadBase64 } from 'utils/files/files'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { DocumentDeleteModal } from '../Modals/DocumentDeleteModal'

interface Props<TDeleteVariables, TDownloadVariables> {
    data: DocumentType[]
    deleteDisabled?: boolean
    onItemDelete?: (item?: DocumentType) => void
    onItemDownload?: (item?: DocumentType) => void

    deleteDocument?: DocumentNode | TypedDocumentNode<any, TDeleteVariables>
    deleteRefetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction
    deleteVariables?: TDeleteVariables

    downloadDocument: DocumentNode | TypedDocumentNode<any, TDownloadVariables>
    downloadRefetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction
    downloadVariables?: TDownloadVariables
    downloadMutationName: string
}

interface DocumentType {
    id: string
    filename: string
    dateCreated: string
}

export const DocumentsList = <TDeleteVariables extends object, TDownloadVariables>(
    props: Props<TDeleteVariables, TDownloadVariables>
) => {
    const {
        data,
        onItemDelete,
        onItemDownload,
        deleteDisabled,
        deleteRefetchQueries,
        deleteDocument,
        deleteVariables,
        downloadDocument,
        downloadRefetchQueries,
        downloadVariables,
        downloadMutationName,
    } = props
    const { i18n } = useLingui()

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [deleteModalData, setDeleteModalData] = useState<undefined | DocumentType>(undefined)
    const [download, { loading }] = useMutation(downloadDocument)

    return (
        <>
            <Table flex={[1, 1, 0.25]} lastItemIsIcon={!deleteDisabled} headers={getHeader()} rows={getRows()} />
            {!deleteDisabled && deleteDocument && (
                <Modal isOpen={deleteModalOpen}>
                    <DocumentDeleteModal
                        onClose={() => setDeleteModalOpen(false)}
                        onDelete={handleOnItemDelete}
                        onDeleteSuccess={() => setDeleteModalOpen(false)}
                        variables={deleteVariables}
                        document={deleteDocument}
                        refetchQueries={deleteRefetchQueries}
                        fileName={deleteModalData?.filename ?? ''}
                    />
                </Modal>
            )}
        </>
    )

    function getHeader() {
        if (deleteDisabled) {
            return [i18n._(t`BESTAND`), i18n._(t`GEÜPLOAD OP`)]
        }

        return [i18n._(t`BESTAND`), i18n._(t`GEÜPLOAD OP`), '']
    }

    function getRows() {
        if (!data) {
            return []
        }

        return data.map(item => {
            // TODO: add icon to tablelink
            if (deleteDisabled) {
                return [
                    !loading ? (
                        <TableLink onClick={() => handleDownload(item)} text={item.filename} />
                    ) : (
                        <Spinner type={Animation.simpleSpinner} />
                    ),
                    <p>{DateFormatters.formattedDate(item.dateCreated)}</p>,
                ]
            }

            return [
                !loading ? (
                    <TableLink onClick={() => handleDownload(item)} text={item.filename} />
                ) : (
                    <Spinner type={Animation.simpleSpinner} />
                ),
                <p>{DateFormatters.formattedDate(item.dateCreated)}</p>,
                <Button
                    type={ButtonType.secondary}
                    icon={IconType.delete}
                    onClick={() => handleOnItemOpenDeleteModal(item)}
                />,
            ]
        })
    }

    function handleOnItemOpenDeleteModal(item: DocumentType) {
        setDeleteModalOpen(true)
        setDeleteModalData(item)
    }

    async function handleDownload(item: DocumentType) {
        if (onItemDownload) {
            onItemDownload(item)
        }
        const response = await download({ variables: downloadVariables, refetchQueries: downloadRefetchQueries })

        if (response.errors || !response.data) {
            return
        }

        downloadBase64(response.data[downloadMutationName].base64data, item.filename)
    }

    function handleOnItemDelete() {
        if (onItemDelete) {
            onItemDelete(deleteModalData)
        }
    }
}
