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
} from 'components/Domain/Aanbieder/AanbiederParticipants/AanbiederParticipantTabs'
import { DocumentsList } from 'components/Domain/Documents/Lists/DocumentsList'
import { useMockQuery } from 'components/hooks/useMockQuery'
import React from 'react'

interface Props {
    participantId: string
}

export const AanbiederDocumentsView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    // TODO: add query
    const { data, loading, error } = useMockQuery([
        {
            id: 'my id',
            fileName: 'bestand.pdf',
            createdAt: new Date().toString(),
            filePath: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
        },
    ])

    return (
        <>
            {/*  TODO: add breadcrumbs  */}
            <Headline title={i18n._(t`Documenten`)} spacingType={SpacingType.small} />
            <Column spacing={10}>
                <AanbiederParticipantTabs currentTab={AanbiederParticipantTab.documents} />
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

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <DocumentsList data={data} deleteDisabled={true} />
    }
}
