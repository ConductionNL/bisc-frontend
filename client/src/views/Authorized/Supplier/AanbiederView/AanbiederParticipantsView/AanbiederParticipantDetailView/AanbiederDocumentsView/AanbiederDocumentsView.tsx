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
import { DocumentsList } from 'components/Domain/Documents/Lists/DocumentsList'
import {
    DeleteStudentDocumentDocument,
    DeleteStudentDocumentMutationVariables,
    DownloadStudentDocumentDocument,
    DownloadStudentDocumentMutationVariables,
    StudentDocumentsDocument,
    useStudentDocumentsQuery,
} from 'generated/graphql'
import React from 'react'
import { AanbiederParticipantDetailLocationStateProps } from '../AanbiederParticipantDetailView'

interface Props {
    routeState: AanbiederParticipantDetailLocationStateProps
}

export const AanbiederDocumentsView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const { data, loading, error } = useStudentDocumentsQuery({
        variables: {
            studentId: routeState.participantId,
        },
    })

    return (
        <>
            {/*  TODO: add breadcrumbs  */}
            <Headline title={i18n._(t`Documenten`)} spacingType={SpacingType.small} />
            <Column spacing={10}>
                <AanbiederParticipantTabs routeState={routeState} currentTab={AanbiederParticipantTab.documents} />
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
                downloadMutationName={'downloadStudentDocument'}
            />
        )
    }
}
