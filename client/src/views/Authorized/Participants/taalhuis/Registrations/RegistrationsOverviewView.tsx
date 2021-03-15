import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import { Table } from '../../../../../components/Core/Table/Table'
import { TableLink } from '../../../../../components/Core/Table/TableLink'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../routes/routes'
import { RegistrationsMock, taalhuizenRegistrationsMock } from '../../mocks/registrations'
import { tabPaths, Tabs, tabTranslations } from '../constants'

interface Props {}

export const RegistrationsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<RegistrationsMock[]>(taalhuizenRegistrationsMock)
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Aanmeldingen`)} />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        defaultActiveTabId={Tabs.registrations}
                        onChange={props => history.push(tabPaths[props.tabid as Tabs])}
                    >
                        <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                        <Tab label={tabTranslations[Tabs.registrations]} tabid={Tabs.registrations} />
                    </TabSwitch>
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
                    message={i18n._(t`Wij konden de registrations niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return (
            <Table
                flex={1}
                headers={[
                    i18n._(t`ACHTERNAAM`),
                    i18n._(t`ROEPNAAM`),
                    i18n._(t`Aangemeld door.`),
                    i18n._(t`Aangemeld per`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }
        return data.map(coworker => [
            <TableLink
                to={routes.authorized.participants.taalhuis.registrations.detail.index({
                    registrationid: `${coworker.id}`,
                    registrationname: coworker.firstName,
                })}
                text={coworker.lastName}
            />,
            <p>{coworker.firstName}</p>,
            <p>{coworker.subscribedBy}</p>,
            <p>{coworker.registeredPer}</p>,
        ])
    }
}
