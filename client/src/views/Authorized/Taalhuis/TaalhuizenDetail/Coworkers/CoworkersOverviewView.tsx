import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button from '../../../../../components/Core/Button/Button'
import LabelTag, { LabelColor } from '../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import { Table } from '../../../../../components/Core/Table/Table'
import { TableLink } from '../../../../../components/Core/Table/TableLink'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../components/Core/TabSwitch/types'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { routes, TaalhuisDetailParams } from '../../../../../routes'

import { coworkersMock } from './mocks/coworkers'

interface Props {}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

export interface TaalhuisCoworkersFormModel {
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

const CoworkersOverviewView: React.FunctionComponent<Props> = () => {
    const { data, loading, error } = useMockQuery<TaalhuisCoworkersFormModel[]>(coworkersMock)
    const { i18n } = useLingui()
    const { taalhuisid, taalhuisname } = useParams<TaalhuisDetailParams>()
    const history = useHistory()

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.gegevens) {
            history.push(routes.authorized.taalhuis.read.data({ taalhuisid, taalhuisname }))
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`Medewerkers`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb
                            text={i18n._(t`${taalhuisname}`)}
                            to={routes.authorized.taalhuis.read.data({ taalhuisid, taalhuisname })}
                        />
                        <Breadcrumb
                            text={i18n._(t`Medewerkers`)}
                            to={routes.authorized.taalhuis.read.coworkers.overview({ taalhuisid, taalhuisname })}
                        />
                    </Breadcrumbs>
                }
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={handleTabSwitch} defaultActiveTabId={TabId.coworkers}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={TabId.coworkers} />
                    </TabSwitch>

                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push(routes.authorized.taalhuis.read.coworkers.create({ taalhuisid, taalhuisname }))
                        }
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
                headers={[
                    i18n._(t`achternaam`),
                    i18n._(t`roepnaam`),
                    i18n._(t`rol`),
                    i18n._(t`aangemaakt`),
                    i18n._(t`bewerkt`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }

        const list = data.map(coworker => {
            return [
                <TableLink
                    text={`${coworker.achternaam}, ${coworker.tussenvoegsel}`}
                    to={routes.authorized.taalhuis.read.coworkers.detail.data({
                        taalhuisid,
                        taalhuisname,
                        coworkerid: coworker.id.toString(),
                    })}
                />,
                <p>{coworker.roepnaam}</p>,
                <LabelTag label={coworker.rol} color={LabelColor.blue} />,
                <p>{coworker.aangemaakt}</p>,
                <p>{coworker.bewerkt}</p>,
            ]
        })

        return list
    }
}
export default CoworkersOverviewView
