import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import { useLanguageHousesQuery } from 'generated/graphql'
import { AddressIterableType } from 'graphql/types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { AdressFormatters } from 'utils/formatters/Address/Address'

interface Props {}

export const TaalhuisOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { data, loading, error } = useLanguageHousesQuery()
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Taalhuizen`)} />
            <Column spacing={6}>
                <Row justifyContent="flex-end">
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.bisc.taalhuizen.create,
                            })
                        }
                    >
                        {i18n._(t`Nieuw taalhuis`)}
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

        return data.languageHouses!.edges!.map(edge => {
            const languageHouse = edge!.node!
            const address: AddressIterableType = languageHouse.address && languageHouse.address[0]

            return [
                <TableLink
                    to={{
                        pathname: routes.authorized.bisc.taalhuizen.detail.index,
                        hash: '',
                        search: '',
                        state: {
                            taalhuisId: languageHouse.id,
                            taalhuisName: languageHouse.name,
                        },
                    }}
                    text={languageHouse.name}
                />,
                <p>
                    {AdressFormatters.formattedAddress({
                        street: address?.street,
                        houseNumber: address?.houseNumber,
                        postalCode: address?.postalCode,
                    })}
                </p>,
                <p>{address?.locality}</p>,
            ]
        })
    }
}
