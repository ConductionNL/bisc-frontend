import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Button, { ButtonType } from 'components/Core/Button/Button'
import DateInput from 'components/Core/DataEntry/DateInput'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import React, { useState } from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'
import styles from '../../SharedEventDetailFieldset.module.scss'
import Form from 'components/Core/Form/Form'
import {
    FilesEventsDetailContainer,
    FilesEventsDetailContainerTypes,
} from '../../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { Forms } from 'utils/forms'
import { useMockMutation } from 'hooks/UseMockMutation'
import { StudentDossierEvent } from 'generated/graphql'
import Modal from 'components/Core/Modal/Modal'
import { FilesEventsDeleteModal } from './FilesEventsDeleteModal'
import { StudentDossierEventEnum } from 'generated/enums'
import { NewSelectV2 } from 'components/Core/DataEntry/NewSelectV2'

interface Props {
    defaultValues: StudentDossierEvent
    onClickCancel: () => void
    handleSuccess: () => void
    onDelete: () => void
}

interface FormModel {
    events: string
    date: string
    description: string
}

export const FilesEventsDetailUpdateForm: React.FC<Props> = props => {
    const [editFilesEvents, { loading }] = useMockMutation({}, false)
    const { defaultValues, onClickCancel, handleSuccess, onDelete } = props
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)

    const EventDetailTypesTranslations = {
        [StudentDossierEventEnum.FinalTalk]: i18n._(t`Eindgesprek`),
        [StudentDossierEventEnum.Remark]: i18n._(t`Opmerking`),
        [StudentDossierEventEnum.FollowUpTalk]: i18n._(t`Vervolggesprek`),
        [StudentDossierEventEnum.InfoForStorytelling]: i18n._(t`Informatie voor storytelling`),
        [StudentDossierEventEnum.Intake]: i18n._(t`Intake`),
    }

    return (
        <Form onSubmit={handleEdit}>
            <FilesEventsDetailContainer type={defaultValues.event as FilesEventsDetailContainerTypes}>
                <div className={styles.contentContainer}>
                    <Column spacing={8}>
                        <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                            <NewSelectV2
                                list="events"
                                name="events"
                                placeholder={i18n._(t`Selecteer type`)}
                                options={getEventOptions()}
                                defaultValue={
                                    defaultValues.event
                                        ? {
                                              value:
                                                  EventDetailTypesTranslations[
                                                      defaultValues.event as StudentDossierEventEnum
                                                  ],
                                              label: defaultValues.event,
                                          }
                                        : undefined
                                }
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
                            onClick={() => setModalIsVisible(true)}
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
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <FilesEventsDeleteModal
                    data={defaultValues}
                    onClose={() => setModalIsVisible(false)}
                    onSuccess={onDelete}
                />
            </Modal>
        </Form>
    )

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await editFilesEvents(formData)

        if (response?.errors?.length || !response?.data) {
            return
        }

        handleSuccess()
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
