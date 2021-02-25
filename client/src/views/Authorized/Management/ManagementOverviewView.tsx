import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Breadcrumb from '../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import ErrorBlock from '../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../components/Core/Icon/IconType'
import Center from '../../../components/Core/Layout/Center/Center'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'
import { Table } from '../../../components/Core/Table/Table'
import PageTitle, { PageTitleSize } from '../../../components/Core/Text/PageTitle'
import { useMockQuery } from '../../../components/hooks/useMockQuery'
import { routes } from '../../../routes'
import { medewerkersMock } from './coworkers/coworkers'

interface Props {}

export interface FormModel {
    id: number
    achternaam: string
    tussenvoegsel: string
    roepnaam: string
    telefoonnummer: string
    email: string
    rol: string
    aangemaakt: string
    bewerkt: string
}

export const ManagementOverviewView: React.FunctionComponent<Props> = () => {
    const { data, loading, error } = useMockQuery<FormModel[]>(medewerkersMock)
    const history = useHistory()

    return (
        <>
            <Breadcrumbs>
                <Breadcrumb text={i18n._(t`test 1`)} to={routes.authorized.kitchensink} />
                <Breadcrumb text={i18n._(t`test 1`)} />
                <Breadcrumb text={i18n._(t`test 1`)} />
                <Breadcrumb text={i18n._(t`test 1`)} />
            </Breadcrumbs>
            <PageTitle title={i18n._(t`Beheer overview`)} size={PageTitleSize.default} />
            <Column spacing={12}>
                <Row justifyContent="flex-end">
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.management.coworkers.create)}
                    >
                        Nieuwe medewerker
                    </Button>
                </Row>
                {renderSections()}
            </Column>
        </>
    )

    function renderSections() {
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
                headers={[i18n._(t`achternaam`), i18n._(t`roepnaam`), i18n._(t`aangemaakt`), i18n._(t`bewerkt`)]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }

        const list = data.map(medewerker => {
            return [
                <p>{`${medewerker.achternaam}, ${medewerker.tussenvoegsel}`}</p>,
                <p>{medewerker.roepnaam}</p>,
                <p>{medewerker.aangemaakt}</p>,
                <p>{medewerker.bewerkt}</p>,
            ]
        })

        return list
    }
}
