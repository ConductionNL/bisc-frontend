import React from 'react'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Button, { ButtonType } from 'components/Core/Button/Button'
import DateInput from 'components/Core/DataEntry/DateInput'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import { GenericValidators } from 'utils/validators/GenericValidators'
import styles from '../SharedEventDetailFieldset.module.scss'
import Row from 'components/Core/Layout/Row/Row'
import classNames from 'classnames'
import Form from 'components/Core/Form/Form'
import { FilesEventsDetailContainer } from '../../FilesEventsDetailContainer/FilesEventsDetailContainer'
import { Forms } from 'utils/forms'
import { useMockMutation } from 'hooks/UseMockMutation'
import { StudentDossierEventEnum } from 'generated/enums'

interface Props {
    onClickCancel: () => void
    handleSuccess: () => void
}
interface FormModel {
    events: string
    date: string
    description: string
}

export const FilesEventsCreateForm: React.FC<Props> = ({ onClickCancel, handleSuccess }) => {
    const [createFilesEvents, { loading }] = useMockMutation({}, false)

    const EventDetailTypesTranslations = {
        [StudentDossierEventEnum.FinalTalk]: i18n._(t`Eindgesprek`),
        [StudentDossierEventEnum.Remark]: i18n._(t`Opmerking`),
        [StudentDossierEventEnum.FollowUpTalk]: i18n._(t`Vervolggesprek`),
        [StudentDossierEventEnum.InfoForStorytelling]: i18n._(t`Informatie voor storytelling`),
        [StudentDossierEventEnum.Intake]: i18n._(t`Intake`),
    }

    return (
        <Form onSubmit={handleCreate}>
            <FilesEventsDetailContainer type={'default'}>
                <div className={styles.contentContainer}>
                    <Column spacing={8}>
                        <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                            <Select
                                list="events"
                                name="events"
                                placeholder={i18n._(t`Selecteer type`)}
                                options={getEventOptions()}
                                validators={[GenericValidators.required]}
                            />
                        </Field>
                        <Field label={i18n._(t`Datum`)} required={true}>
                            <DateInput required={true} name="date" placeholder={i18n._(t`01/01/2020`)} />
                        </Field>
                        <Field label={i18n._(t`Omschrijving`)} required={true}>
                            <TextArea
                                growHeight={true}
                                name="description"
                                placeholder={i18n._(t`Omschrijving van de gebeurtenis…`)}
                                validators={[GenericValidators.required]}
                            />
                        </Field>
                    </Column>
                </div>
                <div className={classNames(styles.buttons, styles.createButtons)}>
                    <Row justifyContent="flex-end">
                        <Button className={styles.button} type={ButtonType.secondary} onClick={onClickCancel}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} className={styles.button}>
                            {i18n._(t`Gebeurtenis toevoegen`)}
                        </Button>
                    </Row>
                </div>
            </FilesEventsDetailContainer>
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createFilesEvents(formData)

        if (response?.errors?.length || !response?.data) {
            return
        }

        handleSuccess?.()
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
