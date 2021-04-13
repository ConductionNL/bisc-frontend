import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import Button, { ButtonType } from 'components/Core/Button/Button'
import DateInput from 'components/Core/DataEntry/DateInput'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { EventDetailDefaultValues, EventDetailTypes } from '../EventDetailFieldset'
import styles from '../EventDetailFieldset.module.scss'

interface Props {
    type: EventDetailTypes
    defaultValues: EventDetailDefaultValues
    onClickCancel: () => void
}

interface EventDetailFieldsetModel {
    events: string
    date: string
    description: string
}

export const EventDetailUpdateFieldsets: React.FC<Props> = ({ type, defaultValues, onClickCancel }) => {
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === EventDetailTypes.finalInterview,
        [styles.comment]: type === EventDetailTypes.comment,
        [styles.followUp]: type === EventDetailTypes.followUp,
        [styles.storytelling]: type === EventDetailTypes.storyTelling,
        [styles.intake]: type === EventDetailTypes.intake,
    })

    const EventDetailTypesTranslations = {
        [EventDetailTypes.finalInterview]: i18n._(t`Eindgesprek`),
        [EventDetailTypes.comment]: i18n._(t`Opmerking`),
        [EventDetailTypes.followUp]: i18n._(t`Vervolggesprek`),
        [EventDetailTypes.storyTelling]: i18n._(t`Informatie voor storytelling`),
        [EventDetailTypes.intake]: i18n._(t`Intake`),
    }

    return (
        <div className={containerClassNames}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>
                <Column spacing={8}>
                    <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                        <Select
                            list="events"
                            name="events"
                            placeholder={i18n._(t`Selecteer type`)}
                            options={getEventOptions()}
                            defaultValue={defaultValues?.events}
                        />
                    </Field>
                    <Field label={i18n._(t`Datum`)} required={true}>
                        <DateInput
                            required={true}
                            name="date"
                            placeholder={i18n._(t`01/01/2020`)}
                            defaultValue={defaultValues?.date}
                        />
                    </Field>
                    <Field label={i18n._(t`Omschrijving`)} required={true}>
                        <TextArea
                            name="description"
                            placeholder={i18n._(t`Geadviseerd aanbod`)}
                            defaultValue={defaultValues?.description}
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

                    <Button type={ButtonType.primary} submit={true} className={styles.button}>
                        {i18n._(t`Opslaan`)}
                    </Button>
                </div>
            </div>
        </div>
    )

    async function handleDelete() {}

    function getEventOptions() {
        const values = Object.values(EventDetailTypes)

        const options = values.map(value => {
            return {
                value,
                label: EventDetailTypesTranslations[value],
            }
        })

        return options
    }
}
