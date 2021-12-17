import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
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
// import Tab from 'components/Core/TabSwitch/Tab'
// import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
// import { tabPaths, Tabs, tabTranslations } from '../constants'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { useGetStudents } from 'api/student/student'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import { DateFormatters } from 'utils/formatters/Date/Date'

export const ParticipantsOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const { data, loading, error, loadMore } = useGetStudents()
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Deelnemers`)} />
            <Column spacing={10}>
                {/* <Row justifyContent="flex-start">
                    <TabSwitch
                        activeTabId={Tabs.participants}
                        onChange={props => history.push(tabPaths[props.tabid as Tabs])}
                    >
                        <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                        <Tab
                            label={tabTranslations[Tabs.registrations]}
                            tabid={Tabs.registrations}
                            // indicatorCount={8} DATA NOT AVAILABLE amount of registrations
                        />
                    </TabSwitch>
                </Row> */}
                <Row justifyContent="flex-end">
                    <Button icon={IconType.add} onClick={() => history.push(taalhuisRoutes.participants.create)}>
                        {i18n._(t`Nieuwe deelnemer`)}
                    </Button>
                </Row>
                <InfiniteScroll
                    loadMore={loadMore}
                    isLoading={loading || !data}
                    isLoadingMore={loading && !!data}
                    totalPages={data?.pages}
                >
                    {renderList()}
                </InfiniteScroll>
            </Column>
        </>
    )

    function renderList() {
        if (!data && loading) {
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
                    i18n._(t`Achternaam`),
                    i18n._(t`Roepnaam`),
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
        if (!data) {
            return []
        }

        return data.results.map(student => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName(student.person)}
                    to={routes.authorized.taalhuis.participants.detail(student.id).index}
                />,
                <Paragraph>{student.person.givenName}</Paragraph>,
                // <Paragraph /> DATA NOT AVAILABLE amount of active participations,
                // <Paragraph /> DATA NOT AVAILABLE amount of finished participations,
                <Paragraph>{DateFormatters.formattedDate(student['@dateCreated'])}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(student['@dateModified'])}</Paragraph>,
            ]
        })
    }
}
