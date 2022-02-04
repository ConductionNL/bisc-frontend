import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
// import Tab from 'components/Core/TabSwitch/Tab'
// import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { tabPaths, Tabs, tabTranslations } from '../constants'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { GetStudentField, useGetStudents } from 'api/student/student'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { DateFormatters } from 'utils/formatters/Date/Date'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Tab from 'components/Core/TabSwitch/Tab'
import { IntakeStatus, Student } from 'api/types/types'
import { InfiniteScrollPageQuery } from 'components/Core/InfiniteScrollPageQuery/InfiniteScrollPageQuery'

export const ParticipantsOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const { data: registrationsData } = useGetStudents({
        intakeStatus: IntakeStatus.Pending,
        limit: 1,
        fields: [GetStudentField.Id],
    })
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(`Deelnemers`)} />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        activeTabId={Tabs.participants}
                        onChange={props => history.push(tabPaths[props.tabid as Tabs])}
                    >
                        <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                        <Tab
                            label={tabTranslations[Tabs.registrations]}
                            tabid={Tabs.registrations}
                            indicatorCount={registrationsData?.total}
                        />
                    </TabSwitch>
                </Row>
                <Row justifyContent="flex-end">
                    <Button icon={IconType.add} onClick={() => history.push(taalhuisRoutes.participants.create)}>
                        {i18n._(`Nieuwe deelnemer`)}
                    </Button>
                </Row>
                <InfiniteScrollPageQuery
                    queryHook={() =>
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useGetStudents({
                            intakeStatus: IntakeStatus.Accepted,
                            fields: [
                                GetStudentField.Id,
                                GetStudentField.PersonGivenName,
                                GetStudentField.PersonAdditionalName,
                                GetStudentField.PersonFamilyName,
                                GetStudentField.TeamName,
                                GetStudentField.MentorPersonGivenName,
                                GetStudentField.MentorPersonAdditionalName,
                                GetStudentField.MentorPersonFamilyName,
                            ],
                        })
                    }
                >
                    {renderList}
                </InfiniteScrollPageQuery>
            </Column>
        </>
    )

    function renderList(students: Student[]) {
        return (
            <Table
                flex={1}
                headers={[
                    i18n._(`Achternaam`),
                    i18n._(`Roepnaam`),
                    i18n._(`Team`),
                    i18n._(`Begeleider`),
                    // i18n._(`Lopende Deeln.`), DATA NOT AVAILABLE amount of active participations
                    // i18n._(`Afgeronde Deeln.`), DATA NOT AVAILABLE amount of finished participations
                    i18n._(`Aangemaakt`),
                ]}
                rows={getRows(students)}
            />
        )
    }

    function getRows(students: Student[]) {
        return students.map(student => {
            return [
                <TableLink
                    text={(student.person && NameFormatters.formattedLastName(student.person)) || '-'}
                    to={routes.authorized.taalhuis.participants.detail(student.id).index}
                />,
                <Paragraph>{student.person?.givenName}</Paragraph>,
                <Paragraph>{student.team?.name}</Paragraph>,
                <Paragraph>
                    {student.mentor?.person && NameFormatters.formattedFullname(student.mentor?.person)}
                </Paragraph>,
                // <Paragraph /> DATA NOT AVAILABLE amount of active participations,
                // <Paragraph /> DATA NOT AVAILABLE amount of finished participations,
                <Paragraph>{DateFormatters.formattedDate(student['@dateCreated'])}</Paragraph>,
            ]
        })
    }
}
