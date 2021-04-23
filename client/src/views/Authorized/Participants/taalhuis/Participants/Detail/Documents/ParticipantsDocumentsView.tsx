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
    TaalhuisParticipantsDetailTabs,
    Tabs,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import {
    CreateStudentDocumentDocument,
    CreateStudentDocumentMutationVariables,
    DeleteStudentDocumentDocument,
    DeleteStudentDocumentMutationVariables,
    DownloadStudentDocumentDocument,
    DownloadStudentDocumentMutationVariables,
    StudentDocumentsDocument,
    useStudentDocumentsQuery,
} from 'generated/graphql'
import React from 'react'
import { toBase64SingleFile } from 'utils/files/files'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsDocumentsOverviewView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const { data, loading, error } = useStudentDocumentsQuery({
        variables: {
            studentId: routeState.participantId,
        },
    })

    return (
        <>
            <Headline title={i18n._(t`Documenten`)} spacingType={SpacingType.small} />
            <Column spacing={12}>
                <Column spacing={4}>
                    <TaalhuisParticipantsDetailTabs activeTabId={Tabs.Documents} routeState={routeState} />
                    <Row justifyContent={'flex-end'}>
                        <DocumentUploadButtonContainer<CreateStudentDocumentMutationVariables>
                            createDocument={CreateStudentDocumentDocument}
                            createRefetchQueries={[
                                {
                                    query: StudentDocumentsDocument,
                                    variables: {
                                        studentId: routeState.participantId,
                                    },
                                },
                            ]}
                            createVariables={async file => {
                                const base64data = await toBase64SingleFile(file)

                                return {
                                    input: {
                                        studentId: routeState.participantId,
                                        base64data,
                                        filename: file.name,
                                    },
                                }
                            }}
                        />
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

        return (
            <DocumentsList<DeleteStudentDocumentMutationVariables, DownloadStudentDocumentMutationVariables>
                data={data.studentDocuments}
                deleteDocument={DeleteStudentDocumentDocument}
                deleteVariables={{ studentDocumentId: routeState.participantId }}
                deleteRefetchQueries={[
                    {
                        query: StudentDocumentsDocument,
                        variables: { studentId: routeState.participantId },
                    },
                ]}
                downloadDocument={DownloadStudentDocumentDocument}
                downloadVariables={{ studentDocumentId: routeState.participantId }}
                downloadMutationName={'studentEmployeeDocument'}
            />
        )
    }
}
