import React from 'react'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Button, { ButtonType } from 'components/Core/Button/Button'
import DateInput from 'components/Core/DataEntry/DateInput'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import styles from '../SharedEventDetailFieldset.module.scss'
import Row from 'components/Core/Layout/Row/Row'
import classNames from 'classnames'
import Form from 'components/Core/Form/Form'
import { FilesEventsDetailContainer } from '../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { Forms } from 'utils/forms'
import { StudentDossierEventEnum } from 'generated/enums'
import { usePostContactMoment } from 'api/contactMoment/contactMoment'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { useParams } from 'react-router'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { FileEventFormFields, getMappedFileEventFormData } from '../../mappers/fileEventFormDataMapper'

interface Props {
    onClickCancel: () => void
    handleSuccess: () => void
}

export const FilesEventsCreateForm: React.FC<Props> = ({ onClickCancel, handleSuccess }) => {
    const { mutate, loading, error } = usePostContactMoment()
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()

    const EventDetailTypesTranslations = {
        [StudentDossierEventEnum.FinalTalk]: i18n._(t`Eindgesprek`),
        [StudentDossierEventEnum.Remark]: i18n._(t`Opmerking`),
        [StudentDossierEventEnum.FollowUpTalk]: i18n._(t`Vervolggesprek`),
        [StudentDossierEventEnum.InfoForStorytelling]: i18n._(t`Informatie voor storytelling`),
        [StudentDossierEventEnum.Intake]: i18n._(t`Intake`),
    }

    return (
        <MutationErrorProvider mutationError={error?.data}>
            <Form onSubmit={handleCreate}>{renderFormFields()}</Form>
        </MutationErrorProvider>
    )

    function renderFormFields() {
        return (
            <FilesEventsDetailContainer type={'default'}>
                <div className={styles.contentContainer}>
                    <Column spacing={8}>
                        <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                            <Select
                                list="type"
                                name="type"
                                placeholder={i18n._(t`Selecteer type`)}
                                options={getEventOptions()}
                            />
                        </Field>
                        <Field label={i18n._(t`Datum`)} required={true}>
                            <DateInput name="date" placeholder={i18n._(t`01/01/2020`)} />
                        </Field>
                        <Field label={i18n._(t`Omschrijving`)} required={true}>
                            <TextArea
                                growHeight={true}
                                name="explanation"
                                placeholder={i18n._(t`Omschrijving van de gebeurtenis…`)}
                            />
                        </Field>
                    </Column>
                </div>
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

        const formData = Forms.getFormDataFromFormEvent<FileEventFormFields>(e)
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

    function getEventOptions() {
        const values = Object.values(StudentDossierEventEnum)

        const options = values.map(value => {
            return {
                value,
                label: EventDetailTypesTranslations[value],
            }
        })

        return options
    }
}
