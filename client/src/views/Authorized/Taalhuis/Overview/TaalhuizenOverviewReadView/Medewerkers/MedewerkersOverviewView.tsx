import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import LabelTag, { LabelColor } from '../../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import { Table } from '../../../../../../components/Core/Table/Table'
import { TableLink } from '../../../../../../components/Core/Table/TableLink'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../../routes'
import { medewerkersMock } from './medewerkers'

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

const MedewerkersView: React.FunctionComponent<Props> = () => {
    const { data, loading, error } = useMockQuery<FormModel[]>(medewerkersMock)
    const { i18n } = useLingui()

    return renderSections()

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

        const list = data.map(medewerker => {
            return [
                <TableLink
                    text={`${medewerker.achternaam}, ${medewerker.tussenvoegsel}`}
                    to={routes.authorized.taalhuis.medewerkers.read(medewerker.id, medewerker.achternaam)}
                />,
                <p>{medewerker.roepnaam}</p>,
                <LabelTag label={medewerker.rol} color={LabelColor.yellow} />,
                <p>{medewerker.aangemaakt}</p>,
                <p>{medewerker.bewerkt}</p>,
            ]
        })

        return list
    }
}
export default MedewerkersView
