import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { DocumentUploadButtonContainer } from 'components/Domain/Documents/Containers/DocumentUploadButtonContainer'
import { DocumentsList } from 'components/Domain/Documents/Lists/DocumentsList'
import {
    TaalhuisParticipantDetailTabs,
    TaalhuisParticipantDetailTabsEnum,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import {
    useDocumentsQuery,
    CreateDocumentMutationVariables,
    CreateDocumentDocument,
    DocumentsDocument,
    Document,
    RemoveDocumentMutationVariables,
    DownloadDocumentMutationVariables,
    RemoveDocumentDocument,
    DownloadDocumentDocument,
} from 'generated/graphql'
import React from 'react'
import { useParams } from 'react-router'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { toBase64SingleFile } from 'utils/files/files'

export const ParticipantsDocumentsOverviewView: React.FunctionComponent = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const { data, loading, error } = useDocumentsQuery({
        // TODO
        // variables: { studentId: taalhuisParticipantId },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !data?.documents?.edges) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const documents: Document[] = []
    for (const edge of data.documents.edges) {
        if (edge?.node) {
            documents.push(edge.node)
        }
    }

    return (
        <>
            <Headline title={i18n._(t`Documenten`)} spacingType={SpacingType.small} />
            <Column spacing={12}>
                <Column spacing={4}>
                    <TaalhuisParticipantDetailTabs activeTabId={TaalhuisParticipantDetailTabsEnum.Documents} />
                    <Row justifyContent={'flex-end'}>
                        <DocumentUploadButtonContainer<CreateDocumentMutationVariables>
                            createDocument={CreateDocumentDocument}
                            createRefetchQueries={[
                                {
                                    query: DocumentsDocument,
                                    // TODO
                                    // variables: { studentId: taalhuisParticipantId },
                                },
                            ]}
                            createVariables={async file => {
                                const base64data = await toBase64SingleFile(file)

                                return {
                                    input: {
                                        studentId: taalhuisParticipantId,
                                        base64data,
                                        filename: file.name,
                                    },
                                }
                            }}
                        />
                    </Row>
                </Column>
                <DocumentsList<RemoveDocumentMutationVariables, DownloadDocumentMutationVariables>
                    data={documents}
                    deleteDocument={RemoveDocumentDocument}
                    deleteRefetchQueries={[
                        {
                            query: DocumentsDocument,
                            // TODO
                            // variables: { studentId: taalhuisParticipantId },
                        },
                    ]}
                    downloadDocument={DownloadDocumentDocument}
                    downloadMutationName={'studentEmployeeDocument'}
                />
            </Column>
        </>
    )
}
