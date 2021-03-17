import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
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
import { UserContext } from '../../../../../components/Providers/UserProvider/context'
import { useRegistrationsQuery } from '../../../../../generated/graphql'
import { routes } from '../../../../../routes/routes'
import { tabPaths, Tabs, tabTranslations } from '../constants'

interface Props {}

export const RegistrationsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const { data, loading, error } = useRegistrationsQuery({
        variables: {
            taalhuisId: userContext.user?.taalhuisid || '',
        },
    })
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
                    message={i18n._(t`Het is niet gelukt om de gegevens op te halen, probeer het opnieuw`)}
                />
            )
        }
        return (
            <Table
                flex={1}
                headers={[
                    i18n._(t`achternaam`),
                    i18n._(t`roepnaam`),
                    i18n._(t`aangemeld door.`),
                    i18n._(t`aangemeld per`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }
        return data.registrations.map(registration => [
            <TableLink
                to={routes.authorized.participants.taalhuis.registrations.detail.index({
                    registrationid: `${registration.id}`,
                    registrationname: registration.familyName,
                })}
                text={registration.givenName}
            />,
            <p>{registration.givenName}</p>,
            <p>[NO DATA]</p>,
            <p>{registration.dateCreated}</p>,
        ])
    }
}
