import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { DocumentsList } from 'components/Domain/Documents/DocumentsList'
import {
    TaalhuisParticipantsDetailTabs,
    Tabs,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { useMockQuery } from 'components/hooks/useMockQuery'
import React from 'react'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsDocumentsOverviewView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery([
        {
            id: 'my id',
            fileName: 'Bestand.txt',
            createdAt: new Date().toString(),
            filePath: './',
        },
    ])

    return (
        <>
            <Headline title={i18n._(t`Documenten`)} spacingType={SpacingType.small} />
            <TaalhuisParticipantsDetailTabs activeTabId={Tabs.documents} routeState={routeState} />
            {renderList()}
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

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <DocumentsList data={data} />
    }
}
