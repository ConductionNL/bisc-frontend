import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetDocuments } from 'api/document/document'
import { Document } from 'api/types/types'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { DocumentUploadButtonContainer } from 'components/Domain/Documents/Containers/DocumentUploadButtonContainer'
import { DocumentsList } from 'components/Domain/Documents/Lists/DocumentsList'
import {
    TaalhuisParticipantDetailTabs,
    TaalhuisParticipantDetailTabsEnum,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import React from 'react'
import { useParams } from 'react-router'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'

export const ParticipantsDocumentsOverviewView: React.FunctionComponent = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetDocuments(taalhuisParticipantId)}>
            {data => renderPageContent(data.results)}
        </PageQuery>
    )

    function renderPageContent(documents: Document[]) {
        return (
            <>
                <Headline title={i18n._(t`Documenten`)} spacingType={SpacingType.small} />
                <Column spacing={12}>
                    <Column spacing={4}>
                        <TaalhuisParticipantDetailTabs activeTabId={TaalhuisParticipantDetailTabsEnum.Documents} />
                        <Row justifyContent={'flex-end'}>
                            <DocumentUploadButtonContainer
                                studentId={taalhuisParticipantId}
                                onUpload={() => window.location.reload()}
                            />
                        </Row>
                    </Column>
                    <DocumentsList data={documents} />
                </Column>
            </>
        )
    }
}
