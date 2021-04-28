import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Button, { ButtonType } from 'components/Core/Button/Button'
import DateInput from 'components/Core/DataEntry/DateInput'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'
import styles from '../../SharedEventDetailFieldset.module.scss'
import Form from 'components/Core/Form/Form'
import { FilesEventsDetailContainer } from '../../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { Forms } from 'utils/forms'
import { useMockMutation } from 'hooks/UseMockMutation'
import { StudentDossierEventEnum, StudentDossierEventType } from 'generated/graphql'
import { FilesEventsSuccesView } from '../../Success/FilesEventsSuccessView'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'

interface Props {
    defaultValues: StudentDossierEventType
    onClickCancel: () => void
    handleSuccess: () => JSX.Element
}

interface FormModel {
    events: string
    date: string
    description: string
}

export const FilesEventsDetailUpdateForm: React.FC<Props> = ({ defaultValues, onClickCancel, handleSuccess }) => {
    const [editFilesEvents, { loading }] = useMockMutation({}, false)

    const EventDetailTypesTranslations = {
        [StudentDossierEventEnum.FinalTalk]: i18n._(t`Eindgesprek`),
        [StudentDossierEventEnum.Remark]: i18n._(t`Opmerking`),
        [StudentDossierEventEnum.FollowUpTalk]: i18n._(t`Vervolggesprek`),
        [StudentDossierEventEnum.InfoForStorytelling]: i18n._(t`Informatie voor storytelling`),
        [StudentDossierEventEnum.Intake]: i18n._(t`Intake`),
    }

    return (
        <Form onSubmit={handleEdit}>
            <FilesEventsDetailContainer type={defaultValues.event}>
                <div className={styles.contentContainer}>
                    <Column spacing={8}>
                        <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                            <Select
                                list="events"
                                name="events"
                                placeholder={i18n._(t`Selecteer type`)}
                                options={getEventOptions()}
                                defaultValue={EventDetailTypesTranslations[defaultValues.event]}
                            />
                        </Field>
                        <Field label={i18n._(t`Datum`)} required={true}>
                            <DateInput
                                required={true}
                                name="date"
                                placeholder={i18n._(t`01/01/2020`)}
                                defaultValue={defaultValues?.eventDate}
                            />
                        </Field>
                        <Field label={i18n._(t`Omschrijving`)} required={true}>
                            <TextArea
                                name="description"
                                growHeight={true}
                                placeholder={i18n._(t`Omschrijving van de gebeurtenis…`)}
                                defaultValue={defaultValues?.eventDescription}
                                validators={[GenericValidators.required]}
                            />
                        </Field>
                    </Column>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.leftButtonsContainer}>
                        <Button
                            className={styles.button}
                            icon={IconType.delete}
                            type={ButtonType.secondary}
                            onClick={handleDelete}
                        >
                            {i18n._(t`Verwijderen`)}
                        </Button>
                    </div>
                    <div className={styles.rightButtonsContainer}>
                        <Button className={styles.button} type={ButtonType.secondary} onClick={onClickCancel}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} className={styles.button}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </div>
                </div>
            </FilesEventsDetailContainer>
        </Form>
    )

    async function handleDelete() {}

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await editFilesEvents(formData)

        if (response?.errors?.length || !response?.data) {
            handleSuccess()
        }

        // handleSuccess()
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
