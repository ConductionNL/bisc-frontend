import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { FilesEventsTable } from '../Table/FilesEventsTable'
import {
    FilesEventEnvironment,
    FilesEventsFieldsetContextState,
} from '../Fieldsets/Context/FilesEventsFieldsetContextState'
import { StudentDossierEvent } from 'generated/graphql'
import { useHistory } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

interface Props {
    data?: StudentDossierEvent[]
    environment?: FilesEventEnvironment
}

export const FilesEventsDetailFormContainer: React.FC<Props> = ({ data, environment }) => {
    const { showCreateView, showEnvironmentView } = useContext(FilesEventsFieldsetContextState)
    const { i18n } = useLingui()
    const history = useHistory()

    if (environment === 'aanbieder') {
        showEnvironmentView('aanbieder')
        return <FilesEventsTable rows={data} onDelete={() => history.push(supplierRoutes.management.coworkers.index)} />
    }

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

            <FilesEventsTable rows={data} onDelete={() => history.push(taalhuisRoutes.management.coworkers.index)} />
        </>
    )
}
