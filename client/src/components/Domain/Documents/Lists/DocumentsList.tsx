import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import React, { useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { DocumentDeleteModal } from '../Modals/DocumentDeleteModal'

interface Props {
    data: DocumentType[]
    deleteDisabled?: boolean
    onItemDelete?: (item?: DocumentType) => void
}

interface DocumentType {
    id: string
    fileName: string
    createdAt: string
    filePath: string
}

export const DocumentsList = (props: Props) => {
    const { data, onItemDelete, deleteDisabled } = props
    const { i18n } = useLingui()

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [deleteModalData, setDeleteModalData] = useState<undefined | DocumentType>(undefined)

    return (
        <>
            <Table flex={0.25} headers={getHeader()} rows={getRows()} />
            <Modal isOpen={deleteModalOpen}>
                <DocumentDeleteModal
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={handleOnItemDelete}
                    onDeleteSuccess={() => setDeleteModalOpen(false)}
                    // TODO: real id needs o be coupled + Delete variables props should be added to make it shared between document screens
                    variables={{ id: '' }}
                    refetchQueries={[]}
                    fileName={deleteModalData?.fileName ?? ''}
                />
            </Modal>
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
                    <TableLink href={item.filePath} text={item.fileName} />,
                    <p>{DateFormatters.formattedDate(item.createdAt)}</p>,
                ]
            }

            return [
                <TableLink href={item.filePath} text={item.fileName} />,
                <p>{DateFormatters.formattedDate(item.createdAt)}</p>,
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

    function handleOnItemDelete() {
        if (onItemDelete) {
            onItemDelete(deleteModalData)
        }
    }
}
