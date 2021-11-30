import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetStudent } from 'api/student/student'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { Page } from 'components/Core/Page/Page'
import { ParticipantIntakeFields } from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
import {
    TaalhuisParticipantDetailTabs,
    Tabs,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

export const ParticipantsIntakeView: React.FunctionComponent = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const { data: student, loading, error } = useGetStudent(taalhuisParticipantId)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !student) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Page>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Deelnemer ${NameFormatters.formattedFullname(student.person)}`)}
                    spacingType={SpacingType.small}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
                />
                <Column spacing={10}>
                    <TaalhuisParticipantDetailTabs activeTabId={Tabs.Intake} />
                    <ParticipantIntakeFields student={student} readOnly={true} />
                </Column>
            </Column>
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        onClick={() =>
                            history.push(taalhuisRoutes.participants.detail(taalhuisParticipantId).data.update)
                        }
                    >
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </Page>
    )
}
