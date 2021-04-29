import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import {
    AanbiederParticipantTab,
    AanbiederParticipantTabs,
} from 'components/Domain/Aanbieder/AanbiederParticipants/Tabs/AanbiederParticipantTabs'
import { ParticipantIntakeFields } from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
import { useStudentQuery } from 'generated/graphql'
import React from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'
import { AanbiederParticipantDetailLocationStateProps } from './AanbiederParticipantDetailView'

interface Props {
    routeState: AanbiederParticipantDetailLocationStateProps
}

export const AanbiederParticipantDetailOverviewView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useStudentQuery({ variables: { studentId: routeState.participantId } })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            {/* TODO: add breadcrumb */}
            <Headline
                spacingType={SpacingType.small}
                title={NameFormatters.formattedFullname(data?.student.personDetails)}
            />
            <Column spacing={10}>
                <AanbiederParticipantTabs routeState={routeState} currentTab={AanbiederParticipantTab.overview} />
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <ParticipantIntakeFields data={data} readOnly={true} />
    }
}
