import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { EventDataType, EventTable } from '../Table/EventTable'
import { EventFieldsContext } from '../Fieldsets/Context/EventFieldsetContextState'

interface Props {
    data?: EventDataType[]
}

export const EventDetailFormContainer: React.FC<Props> = ({ data }) => {
    const { showCreateView } = useContext(EventFieldsContext)
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

            <EventTable rows={data} />
        </>
    )
}
