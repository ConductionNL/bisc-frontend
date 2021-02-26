import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useParams } from 'react-router-dom'
import LabelTag, { LabelColor } from '../../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import { Table } from '../../../../../../components/Core/Table/Table'
import { TableLink } from '../../../../../../components/Core/Table/TableLink'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../../routes'
import { coworkersMock } from './mocks/coworkers'

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
interface Params {
    id: string
    name: string
}

const TaalhuisCoworkersOverviewView: React.FunctionComponent<Props> = () => {
    const { data, loading, error } = useMockQuery<FormModel[]>(coworkersMock)
    const { i18n } = useLingui()
    const { id, name } = useParams<Params>()

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

        const list = data.map(coworker => {
            return [
                <TableLink
                    text={`${coworker.achternaam}, ${coworker.tussenvoegsel}`}
                    to={routes.authorized.taalhuis.read.detail.index(id, name, coworker.id)}
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
export default TaalhuisCoworkersOverviewView
