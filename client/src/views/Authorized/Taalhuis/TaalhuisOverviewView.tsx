import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import Headline, { SpacingType } from '../../../components/Chrome/Headline'
import Button from '../../../components/Core/Button/Button'
import ErrorBlock from '../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../components/Core/Icon/IconType'
import Center from '../../../components/Core/Layout/Center/Center'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'
import { Table } from '../../../components/Core/Table/Table'
import { useMockQuery } from '../../../components/hooks/useMockQuery'
import { routes } from '../../../routes'
import { TaalhuisFormModel, taalhuizenMock } from './TaalhuizenDetail/mocks/taalhuizen'

interface Props {}

export const TaalhuisOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<TaalhuisFormModel[]>(taalhuizenMock)
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Taalhuizen`)} />
            <Column spacing={6}>
                <Row justifyContent="flex-end">
                    <Button icon={IconType.add} onClick={() => history.push(routes.authorized.taalhuis.create)}>
                        {i18n._(t`Nieuwe taalhuis`)}
                    </Button>
                </Row>
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return <Table flex={1} headers={[i18n._(t`NAAM`), i18n._(t`ADRES`), i18n._(t`PLAATS`)]} rows={getRows()} />
    }

    function getRows() {
        if (!data) {
            return []
        }
        return data.map(item => [
            <Link
                to={routes.authorized.taalhuis.read.data({ taalhuisid: item.id.toString(), taalhuisname: item.name })}
            >
                {item.name}
            </Link>,
            <p>{item.adres}</p>,
            <p>{item.city}</p>,
        ])
    }
}
