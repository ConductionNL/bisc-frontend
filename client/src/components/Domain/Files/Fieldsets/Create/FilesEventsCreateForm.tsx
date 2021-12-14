import React from 'react'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Button, { ButtonType } from 'components/Core/Button/Button'
import styles from '../SharedEventDetailFieldset.module.scss'
import Row from 'components/Core/Layout/Row/Row'
import classNames from 'classnames'
import Form from 'components/Core/Form/Form'
import { FilesEventsDetailContainer } from '../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { Forms } from 'utils/forms'
import { usePostContactMoment } from 'api/contactMoment/contactMoment'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { useParams } from 'react-router'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { getMappedFileEventFormData } from '../../mappers/fileEventFormDataMapper'
import { FileEventFormData, FileEventFormFields } from '../FileEventFormFields'

interface Props {
    onClickCancel: () => void
    handleSuccess: () => void
}

export const FilesEventsCreateForm: React.FC<Props> = ({ onClickCancel, handleSuccess }) => {
    const { mutate, loading, error } = usePostContactMoment()
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()

    return (
        <MutationErrorProvider mutationError={error?.data}>
            <Form onSubmit={handleCreate}>{renderFormFields()}</Form>
        </MutationErrorProvider>
    )

    function renderFormFields() {
        return (
            <FilesEventsDetailContainer type={'default'}>
                <FileEventFormFields />
                <div className={classNames(styles.buttons, styles.createButtons)}>
                    <Row justifyContent="flex-end">
                        <Button
                            disabled={loading}
                            className={styles.button}
                            type={ButtonType.secondary}
                            onClick={onClickCancel}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} className={styles.button}>
                            {i18n._(t`Gebeurtenis toevoegen`)}
                        </Button>
                    </Row>
                </div>
            </FilesEventsDetailContainer>
        )
    }

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FileEventFormData>(e)
        const input = getMappedFileEventFormData(formData, taalhuisParticipantId)

        try {
            await mutate(input)

            handleSuccess()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
