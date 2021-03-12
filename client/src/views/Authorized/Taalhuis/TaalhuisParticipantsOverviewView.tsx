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
import Tab from '../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../components/Core/TabSwitch/types'
import { useMockQuery } from '../../../components/hooks/useMockQuery'
import { routes } from '../../../routes/routes'
import { ParticipantsMock, taalhuizenParticipantsMock } from './TaalhuizenDetail/mocks/participants'
import { TaalhuisFormModel, taalhuizenMock } from './TaalhuizenDetail/mocks/taalhuizen'

interface Props {}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

interface FormModel {
    lastName: string
    name: string
    runningParticipants: string
    completedParticipants: string
    createdAt: string
    editedAt: string
}

export const TaalhuisParticipantsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<ParticipantsMock[]>(taalhuizenParticipantsMock)
    const history = useHistory()

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.gegevens) {
            // history.push(routes.authorized.taalhuis.read.data({ taalhuisid, taalhuisname }))
        }
    }

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Deelnemers`)} />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch onChange={handleTabSwitch} defaultActiveTabId={TabId.coworkers}>
                        <Tab label={i18n._(t`Deelnemers`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Aanmeldingen`)} tabid={TabId.coworkers} />
                    </TabSwitch>
                </Row>
                <Row justifyContent="flex-end">
                    <Button icon={IconType.add} onClick={undefined}>
                        {i18n._(t`Nieuwe deelnemer`)}
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
                    i18n._(t`ACHTERNAAM`),
                    i18n._(t`ROEPNAAM`),
                    i18n._(t`Lopende Deeln.`),
                    i18n._(t`Afgeronde Deeln.`),
                    i18n._(t`Aangemaakt`),
                    i18n._(t`Bewerkt`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }
        return data.map(item => [
            <Link to={''}>{item.lastName}</Link>,
            <p>{item.name}</p>,
            <p>{item.runningParticipants}</p>,
            <p>{item.completedParticipants}</p>,
            <p>{item.createdAt}</p>,
            <p>{item.editedAt}</p>,
        ])
    }
}
