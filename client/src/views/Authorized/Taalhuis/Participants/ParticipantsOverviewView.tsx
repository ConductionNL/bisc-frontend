import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useStudentsQuery } from 'generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
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
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { tabPaths, Tabs, tabTranslations } from '../constants'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export const ParticipantsOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const { data, loading, error } = useStudentsQuery({
        variables: {
            languageHouseId: userContext.user?.organization.id || '',
        },
    })
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Deelnemers`)} />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        defaultActiveTabId={Tabs.participants}
                        onChange={props => history.push(tabPaths[props.tabid as Tabs])}
                    >
                        <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                        <Tab
                            label={tabTranslations[Tabs.registrations]}
                            tabid={Tabs.registrations}
                            // indicatorCount={8} DATA NOT AVAILABLE amount of registrations
                        />
                    </TabSwitch>
                </Row>
                <Row justifyContent="flex-end">
                    <Button icon={IconType.add} onClick={() => history.push(taalhuisRoutes.participants.create)}>
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
                    // i18n._(t`Lopende Deeln.`), DATA NOT AVAILABLE amount of active participations
                    // i18n._(t`Afgeronde Deeln.`), DATA NOT AVAILABLE amount of finished participations
                    i18n._(t`Aangemaakt`),
                    i18n._(t`Bewerkt`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data?.students?.edges?.length) {
            return []
        }

        return data.students.edges.map(participant => [
            <TableLink
                to={{
                    pathname: taalhuisRoutes.participants.detail(participant?.node?.id).index,
                    search: '',
                    hash: '',
                    state: {
                        participantId: participant?.node?.id,
                        participantName: NameFormatters.formattedFullname(
                            {
                                givenName: participant?.node?.personDetails.givenName,
                                additionalName: participant?.node?.personDetails.additionalName,
                                familyName: participant?.node?.personDetails.familyName,
                            } as any /* todo */
                        ),
                    },
                }}
                text={NameFormatters.formattedLastName(
                    {
                        additionalName: participant?.node?.personDetails.additionalName,
                        familyName: participant?.node?.personDetails.familyName,
                    } as any /* todo */
                )}
            />,
            <Paragraph>{participant?.node?.personDetails.givenName}</Paragraph>,
            // <Paragraph /> DATA NOT AVAILABLE amount of active participations,
            // <Paragraph /> DATA NOT AVAILABLE amount of finished participations,
            <Paragraph>
                {participant?.node?.dateCreated && DateFormatters.formattedDate(participant?.node?.dateCreated)}
            </Paragraph>,
            // TODO: re-implement after field is added to Student type
            // <Paragraph>{participant?.node?.dateModified && DateFormatters.formattedDate(participant?.node?.dateModified)}</Paragraph>,
        ])
    }
}
