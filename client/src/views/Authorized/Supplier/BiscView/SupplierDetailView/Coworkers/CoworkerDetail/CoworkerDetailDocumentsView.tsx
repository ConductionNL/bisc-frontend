import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import { DocumentUploadButtonContainer } from 'components/Domain/Documents/Containers/DocumentUploadButtonContainer'
import { DocumentsList } from 'components/Domain/Documents/Lists/DocumentsList'
import {
    CreateProviderEmployeeDocumentDocument,
    CreateProviderEmployeeDocumentMutationVariables,
    DeleteProviderEmployeeDocumentDocument,
    DeleteProviderEmployeeDocumentMutationVariables,
    DownloadProviderEmployeeDocumentDocument,
    DownloadProviderEmployeeDocumentMutationVariables,
    ProviderEmployeeDocumentsDocument,
    useProviderEmployeeDocumentsQuery,
} from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { toBase64SingleFile } from 'utils/files/files'
import { CoworkersDetailLocationStateProps } from './CoworkerDetailView'

interface Props {
    routeState: CoworkersDetailLocationStateProps
}

enum Tabs {
    data = 'data',
    documenten = 'documenten',
}

const CoworkerDetailDocumentsView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useProviderEmployeeDocumentsQuery({
        variables: {
            providerEmployeeId: routeState.supplierId,
        },
    })

    return (
        <>
            <Headline
                title={i18n._(t`Documenten`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.bisc.aanbieders.overview,
                            breadcrumbItems.bisc.aanbieders.detail.index(routeState.supplierName, routeState),
                            breadcrumbItems.bisc.aanbieders.detail.coworkers.overview,
                        ]}
                    />
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={12}>
                <Column spacing={4}>
                    <Row>
                        <TabSwitch defaultActiveTabId={Tabs.documenten} onChange={handleTabSwitch}>
                            <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                            <Tab label={i18n._(t`Documenten`)} tabid={Tabs.documenten} />
                        </TabSwitch>
                    </Row>
                    <Row justifyContent={'flex-end'}>
                        <DocumentUploadButtonContainer<CreateProviderEmployeeDocumentMutationVariables>
                            createDocument={CreateProviderEmployeeDocumentDocument}
                            createVariables={async file => {
                                const base64data = await toBase64SingleFile(file)

                                return {
                                    input: {
                                        providerEmployeeId: routeState.coworkerId,
                                        base64data,
                                        filename: file.name,
                                    },
                                }
                            }}
                            createRefetchQueries={[
                                {
                                    query: ProviderEmployeeDocumentsDocument,
                                    variables: { providerEmployeeId: routeState.coworkerId },
                                },
                            ]}
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
            <DocumentsList<
                DeleteProviderEmployeeDocumentMutationVariables,
                DownloadProviderEmployeeDocumentMutationVariables
            >
                data={data.providerEmployeeDocuments}
                deleteDocument={DeleteProviderEmployeeDocumentDocument}
                deleteVariables={{ providerEmployeeDocumentId: routeState.coworkerId }}
                deleteRefetchQueries={[
                    {
                        query: ProviderEmployeeDocumentsDocument,
                        variables: { providerEmployeeId: routeState.supplierId },
                    },
                ]}
                downloadDocument={DownloadProviderEmployeeDocumentDocument}
                downloadVariables={{ providerEmployeeDocumentId: routeState.coworkerId }}
                downloadMutationName={'downloadProviderEmployeeDocument'}
            />
        )
    }

    function handleTabSwitch(tab: TabProps) {
        if (tab.tabid === Tabs.data) {
            history.push(routes.authorized.supplier.bisc.read.coworkers.detail.data.index)
        }
    }
}

export default CoworkerDetailDocumentsView
