import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useBiscEmployeesQuery } from 'generated/graphql'
import { AddressIterableType } from 'graphql/types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import { Table } from '../../../../../components/Core/Table/Table'
import { routes } from '../../../../../routes/routes'

interface Props {}

export const CoworkerOverviewView: React.FunctionComponent<Props> = () => {
    const { data, loading, error } = useBiscEmployeesQuery()
    const history = useHistory()

    return (
        <>
            <Headline title={i18n._(t`Medewerkers`)} spacingType={SpacingType.small} />

            <Column spacing={10}>
                <Row justifyContent="flex-end">
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.bisc.management.coworkers.create)}
                    >
                        {i18n._(t`Nieuwe medewerker`)}
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

        return (
            <Table
                flex={1}
                headers={[i18n._(t`achternaam`), i18n._(t`roepnaam`)]}
                // headers={[i18n._(t`achternaam`), i18n._(t`roepnaam`), i18n._(t`aangemaakt`), i18n._(t`bewerkt`)]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }

        const list = data.employees!.edges!.map(edge => {
            const employee = edge!.node!

            return [
                <TableLink
                    to={{
                        pathname: routes.authorized.bisc.management.coworkers.detail(employee.id).index,
                        hash: '',
                        search: '',
                        state: {
                            coworkerId: employee.id,
                            coworkerName: NameFormatters.formattedFullname(employee),
                        },
                    }}
                    text={NameFormatters.formattedLastName(employee)}
                />,
                <Paragraph>{employee.givenName}</Paragraph>,
                // <Paragraph>{DateFormatters.formattedDate(coworker.dateCreated)}</Paragraph>,
                // <Paragraph>{DateFormatters.formattedDate(coworker.dateModified)}</Paragraph>,
            ]
        })

        return list
    }
}
