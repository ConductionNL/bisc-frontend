import React, { useContext } from 'react'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Button, { ButtonType } from 'components/Core/Button/Button'
import DateInput from 'components/Core/DataEntry/DateInput'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { EventDetailTypes } from '../EventDetailFieldset'
import styles from '../EventDetailFieldset.module.scss'
import Row from 'components/Core/Layout/Row/Row'
import classNames from 'classnames'
import { EventFieldsContext, EventsContextProvider } from '../Context/EventFieldsetContextState'

interface Props {}
interface EventDetailFieldsetModel {
    events: string
    date: string
    description: string
}

export const EventDetailCreateFieldsets: React.FC<Props> = () => {
    const { createView, showCreateView } = useContext(EventFieldsContext)

    const EventDetailTypesTranslations = {
        [EventDetailTypes.finalInterview]: i18n._(t`Eindgesprek`),
        [EventDetailTypes.comment]: i18n._(t`Opmerking`),
        [EventDetailTypes.followUp]: i18n._(t`Vervolggesprek`),
        [EventDetailTypes.storyTelling]: i18n._(t`Informatie voor storytelling`),
        [EventDetailTypes.intake]: i18n._(t`Intake`),
    }

    return (
        <EventsContextProvider>
            <div className={styles.container}>
                <div className={styles.border} />
                <div className={styles.contentContainer}>
                    <Column spacing={8}>
                        <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                            <Select
                                list="events"
                                name="events"
                                placeholder={i18n._(t`Selecteer type`)}
                                options={getEventOptions()}
                            />
                        </Field>
                        <Field label={i18n._(t`Datum`)} required={true}>
                            <DateInput required={true} name="date" placeholder={i18n._(t`01/01/2020`)} />
                        </Field>
                        <Field label={i18n._(t`Omschrijving`)} required={true}>
                            <TextArea
                                growHeight={true}
                                name="description"
                                placeholder={i18n._(t`Geadviseerd aanbod`)}
                                validators={[GenericValidators.required]}
                            />
                        </Field>
                    </Column>
                </div>
                <div className={classNames(styles.buttons, styles.createButtons)}>
                    <Row justifyContent="flex-end">
                        <Button
                            className={styles.button}
                            type={ButtonType.secondary}
                            onClick={() => showCreateView(!createView)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} className={styles.button}>
                            {i18n._(t`Gebeurtenis toevoegen`)}
                        </Button>
                    </Row>
                </div>
            </div>
        </EventsContextProvider>
    )

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
