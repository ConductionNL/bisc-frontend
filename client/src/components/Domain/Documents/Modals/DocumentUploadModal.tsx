import {
    DocumentNode,
    OperationVariables,
    PureQueryOptions,
    RefetchQueriesFunction,
    TypedDocumentNode,
    useMutation,
} from '@apollo/client'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { ButtonFileInput } from 'components/Core/Button/ButtonFileInput'
import ContentTag from 'components/Core/DataDisplay/ContentTag/ContentTag'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Field from 'components/Core/Field/Field'
import Form from 'components/Core/Form/Form'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React, { ChangeEvent, useState } from 'react'
import { Forms } from 'utils/forms'

interface Props<TVariables> {
    onClose: () => void
    onUploadSuccess: () => void
    onUpload?: () => void
    createDocument: DocumentNode | TypedDocumentNode<any, OperationVariables>
    createRefetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction
    createVariables?: (file: File) => Promise<TVariables>
}

export const DocumentUploadModal = <TVariables extends unknown>(props: Props<TVariables>) => {
    const { i18n } = useLingui()
    const [file, setFile] = useState<File | undefined>(undefined)
    let fileRef: null | HTMLInputElement = null
    const { onClose, onUploadSuccess, createDocument, createRefetchQueries, createVariables } = props
    // mutation should be reusable here, so this should be refatored to a generic useQuery so it can be used on different screens
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [mutation, { loading }] = useMutation(createDocument)
    return (
        <Form onSubmit={handleUpload}>
            <ModalView
                onClose={onClose}
                ContentComponent={
                    <Column spacing={6}>
                        <SectionTitle title={i18n._(t`Document toevoegen`)} heading="H4" />
                        <Column spacing={2}>
                            <Field
                                label={i18n._(t`Bestand`)}
                                horizontal={true}
                                displayBlock={true}
                                evenContainers={true}
                            >
                                {renderRightComponent()}
                            </Field>
                        </Column>
                    </Column>
                }
                BottomComponent={
                    <>
                        <Button type={ButtonType.secondary} onClick={onClose} disabled={loading}>
                            {i18n._(t`Annuleren`)}
                        </Button>
                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Uploaden`)}
                        </Button>
                    </>
                }
            />
        </Form>
    )

    function renderRightComponent() {
        return (
            <>
                <ButtonFileInput
                    onChangeFiles={handleOnFileUploadChange}
                    type={ButtonType.tertiary}
                    icon={IconType.add}
                    id={'fileUpload'}
                    name={'fileUpload'}
                    onRef={ref => (fileRef = ref)}
                    visuallyHidden={!!file}
                >
                    {i18n._(t`Bestand selecteren`)}
                </ButtonFileInput>

                {file && renderUploadedItem()}
            </>
        )
    }

    function renderUploadedItem() {
        return (
            <ContentTag>
                <label>
                    <span>
                        <Icon type={IconType.document} />
                    </span>
                    {file?.name}
                </label>

                <Button
                    type={ButtonType.secondary}
                    danger={true}
                    icon={IconType.delete}
                    onClick={handleOnRemoveUploadedItem}
                />
            </ContentTag>
        )
    }

    function handleOnFileUploadChange(event: ChangeEvent<HTMLInputElement>) {
        setFile((event.target as { files: FileList }).files[0])
    }

    function handleOnRemoveUploadedItem() {
        setFile(undefined)

        if (fileRef && fileRef.files) {
            fileRef.files = new DataTransfer().files
        }
    }

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<{ fileUpload: File }>(e)
        let variables = undefined
        if (createVariables) {
            variables = await createVariables(formData.fileUpload)
        }

        const response = await mutation({
            variables: variables && (variables as OperationVariables),
            refetchQueries: createRefetchQueries,
        })

        if (!response || response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Document is geupload`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )

        onUploadSuccess()
    }
}
