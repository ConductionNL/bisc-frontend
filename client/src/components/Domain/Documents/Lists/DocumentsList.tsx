import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Document } from 'api/types/types'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { DownloadFileContainer } from '../DownloadFile'
import { DocumentDeleteModal } from '../Modals/DocumentDeleteModal'

interface Props {
    data: Document[]
}

export const DocumentsList = (props: Props) => {
    const { data } = props
    const { i18n } = useLingui()

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [deleteModalData, setDeleteModalData] = useState<undefined | Document>(undefined)

    return (
        <>
            <Table flex={[1, 1, 0.25]} headers={[i18n._(t`BESTAND`), i18n._(t`GEÜPLOAD OP`), '']} rows={getRows()} />
            {deleteModalData && (
                <Modal isOpen={deleteModalOpen}>
                    <DocumentDeleteModal
                        onClose={() => setDeleteModalOpen(false)}
                        onDeleteSuccess={() => window.location.reload()}
                        document={deleteModalData}
                    />
                </Modal>
            )}
        </>
    )

    function getRows() {
        if (!data) {
            return []
        }

        return data.map(item => [
            <Row spacing={2}>
                <Icon type={IconType.download} />
                <DownloadFileContainer document={item}>
                    {(downloadFile, loading) => <TableLink onClick={downloadFile} text={item.file.name} />}
                </DownloadFileContainer>
            </Row>,
            <Paragraph>{DateFormatters.formattedDate(item['@dateCreated'])}</Paragraph>,
            <Button
                type={ButtonType.secondary}
                icon={IconType.delete}
                onClick={() => handleOnItemOpenDeleteModal(item)}
            />,
        ])
    }

    function handleOnItemOpenDeleteModal(item: Document) {
        setDeleteModalOpen(true)
        setDeleteModalData(item)
    }
}
