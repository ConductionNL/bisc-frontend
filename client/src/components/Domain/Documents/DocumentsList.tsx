import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import React, { useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { DocumentDeleteModal } from './DocumentDeleteModal'

interface Props {
    data: DocumentType[]
    onItemDelete?: (item?: DocumentType) => void
}

interface DocumentType {
    id: string
    fileName: string
    createdAt: string
    filePath: string
}

export const DocumentsList = (props: Props) => {
    const { data, onItemDelete } = props
    const { i18n } = useLingui()

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [deleteModalData, setDeleteModalData] = useState<undefined | DocumentType>(undefined)

    return (
        <>
            <Table
                flex={1}
                lastItemIsIcon={true}
                headers={[i18n._(t`BESTAND`), i18n._(t`GEÜPLOAD OP`), '']}
                rows={getRows()}
            />
            <Modal isOpen={deleteModalOpen}>
                <DocumentDeleteModal
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={handleOnItemDelete}
                    onDeleteSuccess={() => setDeleteModalOpen(false)}
                    id={deleteModalData?.id ?? ''}
                    fileName={deleteModalData?.fileName ?? ''}
                />
            </Modal>
        </>
    )

    function getRows() {
        if (!data) {
            return []
        }

        return data.map(item => [
            <TableLink href={item.filePath} text={item.fileName} />,
            <p>{DateFormatters.formattedDate(item.createdAt)}</p>,
            <Button
                type={ButtonType.secondary}
                icon={IconType.delete}
                onClick={() => handleOnItemOpenDeleteModal(item)}
            />,
        ])
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
