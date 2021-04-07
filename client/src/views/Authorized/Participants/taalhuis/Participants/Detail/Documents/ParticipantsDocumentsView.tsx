import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { DocumentUploadButtonContainer } from 'components/Domain/Documents/Containers/DocumentUploadButtonContainer'
import { DocumentsList } from 'components/Domain/Documents/Lists/DocumentsList'

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
            fileName: 'bestand.pdf',
            createdAt: new Date().toString(),
            filePath: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
        },
    ])

    return (
        <>
            <Headline title={i18n._(t`Documenten`)} spacingType={SpacingType.small} />
            <Column spacing={12}>
                <Column spacing={4}>
                    <TaalhuisParticipantsDetailTabs activeTabId={Tabs.documents} routeState={routeState} />
                    <Row justifyContent={'flex-end'}>
                        <DocumentUploadButtonContainer />
                    </Row>
                </Column>
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

        return <DocumentsList data={data} />
    }
}
