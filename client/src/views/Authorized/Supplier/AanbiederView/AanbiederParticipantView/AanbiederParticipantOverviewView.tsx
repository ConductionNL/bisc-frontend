import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { AanbiederParticipantTab, AanbiederParticipantTabs } from 'components/Domain/Aanbieder/AanbiederParticipantTab'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { aanbiederParticipantDetail, AanbiederParticipantDetail } from '../mocks'

interface Props {
    participantId: number
}

// TODO
export const AanbiederParticipantOverviewView: React.FunctionComponent<Props> = ({ participantId }) => {
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<AanbiederParticipantDetail>(aanbiederParticipantDetail)

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Deelnemers`)} />
            <Column spacing={10}>
                <AanbiederParticipantTabs currentTab={AanbiederParticipantTab.overview} />
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

        // TODO: do something with the data here
        return null
    }
}
