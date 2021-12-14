import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { usePostDocument } from 'api/document/document'
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
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React, { ChangeEvent, useState } from 'react'
import { toBase64SingleFile } from 'utils/files/files'
import { Forms } from 'utils/forms'

interface Props {
    requestClose: () => void
    onUploadSuccess: () => void
    studentId: string
}

export const DocumentUploadModal = (props: Props) => {
    const { i18n } = useLingui()
    const [file, setFile] = useState<File | undefined>(undefined)
    let fileRef: null | HTMLInputElement = null
    const { requestClose, onUploadSuccess, studentId } = props

    const { mutate, loading, error } = usePostDocument()

    return (
        <Form onSubmit={handleUpload}>
            <ModalView
                onClose={requestClose}
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
                        <Button type={ButtonType.secondary} onClick={requestClose} disabled={loading}>
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
            <MutationErrorProvider mutationError={error?.data}>
                <ButtonFileInput
                    onChangeFiles={handleOnFileUploadChange}
                    type={ButtonType.tertiary}
                    icon={IconType.add}
                    id={'fileUpload'}
                    name={'fileUpload'}
                    onRef={ref => (fileRef = ref)}
                    visuallyHidden={!!file}
                    errorPath={['file.base64.1', 'file.base64.2', 'file.filename']}
                >
                    {i18n._(t`Bestand selecteren`)}
                </ButtonFileInput>

                {file && renderUploadedItem()}
            </MutationErrorProvider>
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

        try {
            await mutate({
                participant: studentId,
                file: {
                    filename: formData.fileUpload.name,
                    base64: await toBase64SingleFile(formData.fileUpload),
                },
            })

            NotificationsManager.success(
                i18n._(t`Document is geupload`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )
            onUploadSuccess()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
