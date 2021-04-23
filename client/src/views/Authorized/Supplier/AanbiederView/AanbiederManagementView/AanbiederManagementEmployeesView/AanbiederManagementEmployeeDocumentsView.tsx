import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import {
    AanbiederManagementEmployeeTab,
    AanbiederManagementEmployeeTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementEmployeeTabs'
import { DocumentUploadButtonContainer } from 'components/Domain/Documents/Containers/DocumentUploadButtonContainer'
import { DocumentsList } from 'components/Domain/Documents/Lists/DocumentsList'
import { useMockQuery } from 'components/hooks/useMockQuery'
import {
    CreateProviderEmployeeDocumentDocument,
    DeleteProviderEmployeeDocumentDocument,
    DeleteProviderEmployeeDocumentMutationVariables,
    DownloadProviderEmployeeDocumentDocument,
    DownloadProviderEmployeeDocumentMutationVariables,
    ProviderEmployeeDocumentsDocument,
    useProviderEmployeeDocumentsQuery,
} from 'generated/graphql'
import React from 'react'
import { AanbiederManagementEmployeesLocationStateProps } from './AanbiederManagementEmployeesView'

interface Props {
    routeState: AanbiederManagementEmployeesLocationStateProps
}

export const AanbiederManagementEmployeeDocumentsView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useProviderEmployeeDocumentsQuery({
        variables: {
            providerEmployeeId: routeState.employeeId,
        },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Beheer`)} />
            <Column spacing={12}>
                <Column spacing={4}>
                    {renderTabs()}
                    <Row justifyContent={'flex-end'}>
                        <DocumentUploadButtonContainer
                            createDocument={CreateProviderEmployeeDocumentDocument}
                            createVariables={async file => {
                                const base64data = await toBase64(file)

                                return {
                                    providerEmployeeDocumentId: routeState.employeeId,
                                    base64data,
                                    filename: file.name,
                                }
                            }}
                            createRefetchQueries={[
                                {
                                    query: ProviderEmployeeDocumentsDocument,
                                    variables: { providerEmployeeId: routeState.employeeId },
                                },
                            ]}
                        />
                    </Row>
                </Column>
                {renderList()}
            </Column>
        </>
    )

    function renderTabs() {
        return (
            <AanbiederManagementEmployeeTabs
                currentTab={AanbiederManagementEmployeeTab.overview}
                routeState={routeState}
            />
        )
    }

    function renderList() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <DocumentsList<
                DeleteProviderEmployeeDocumentMutationVariables,
                DownloadProviderEmployeeDocumentMutationVariables
            >
                data={data.providerEmployeeDocuments}
                deleteDocument={DeleteProviderEmployeeDocumentDocument}
                deleteVariables={{ providerEmployeeDocumentId: routeState.employeeId }}
                deleteRefetchQueries={[
                    {
                        query: ProviderEmployeeDocumentsDocument,
                        variables: { providerEmployeeId: routeState.employeeId },
                    },
                ]}
                downloadDocument={DownloadProviderEmployeeDocumentDocument}
                downloadVariables={{ providerEmployeeDocumentId: routeState.employeeId }}
                downloadMutationName={'downloadProviderEmployeeDocument'}
            />
        )
    }
}
function toBase64(file: File) {
    throw new Error('Function not implemented.')
}
