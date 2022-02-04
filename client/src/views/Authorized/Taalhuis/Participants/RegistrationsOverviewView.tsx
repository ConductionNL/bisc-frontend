import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
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
import { IntakeStatus } from 'api/types/types'
import { GetStudentField, useGetStudents } from 'api/student/student'
import { InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import { routes } from 'routes/routes'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {}

export const RegistrationsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { data, loading, error, loadMore } = useGetStudents({
        intakeStatus: IntakeStatus.Pending,
        fields: [
            GetStudentField.Id,
            GetStudentField.PersonGivenName,
            GetStudentField.PersonAdditionalName,
            GetStudentField.PersonFamilyName,
            GetStudentField.TeamName,
            GetStudentField.IntakeReferringPersonGivenName,
            GetStudentField.IntakeReferringPersonAdditionalName,
            GetStudentField.IntakeReferringPersonFamilyName,
        ],
    })
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Aanmeldingen`)} />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        activeTabId={Tabs.registrations}
                        onChange={props => history.push(tabPaths[props.tabid as Tabs])}
                    >
                        <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                        <Tab
                            label={tabTranslations[Tabs.registrations]}
                            tabid={Tabs.registrations}
                            indicatorCount={data?.total}
                        />
                    </TabSwitch>
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
                    i18n._(t`Aangemeld door`),
                    i18n._(t`Team`),
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

        return data.results.map(student => {
            return [
                <TableLink
                    text={(student.person && NameFormatters.formattedLastName(student.person)) || '-'}
                    to={routes.authorized.taalhuis.participants.registrations.detail(student.id)}
                />,
                <Paragraph>{student.person?.givenName}</Paragraph>,
                <Paragraph>
                    {(student.intake?.referringPerson &&
                        NameFormatters.formattedLastName(student.intake?.referringPerson)) ||
                        '-'}
                </Paragraph>,
                <Paragraph>{student.team?.name}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(student['@dateCreated'])}</Paragraph>,
            ]
        })
    }
}
