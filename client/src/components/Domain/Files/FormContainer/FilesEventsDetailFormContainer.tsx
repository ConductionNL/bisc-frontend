import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { FilesEventsTable } from '../Table/FilesEventsTable'
import { FilesEventsFieldsetContextState } from '../Fieldsets/Context/FilesEventsFieldsetContextState'
import { StudentDossierEventType } from 'temp/TEMPORARYgraphql'

interface Props {
    data?: StudentDossierEventType[]
}

export const FilesEventsDetailFormContainer: React.FC<Props> = ({ data }) => {
    const { showCreateView } = useContext(FilesEventsFieldsetContextState)
    const { i18n } = useLingui()

    return (
        <>
            <Row justifyContent="flex-end">
                <Button
                    icon={IconType.add}
                    onClick={() => {
                        showCreateView(true)
                    }}
                >
                    {i18n._(t`Gebeurtenis toevoegen`)}
                </Button>
            </Row>

            <FilesEventsTable rows={data} />
        </>
    )
}
