import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Button, { ButtonType } from 'components/Core/Button/Button'
import DateInput from 'components/Core/DataEntry/DateInput'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { GenericValidators } from 'utils/validators/GenericValidators'
import styles from './EventDetailFieldset.module.scss'

interface Props {
    type: EventDetailTypes
    readOnly: boolean
    defaultValues?: any
    onClickEdit?: () => void
    onClickDelete?: () => void
    onClickCancel?: () => void
    loading?: boolean
    date?: string
    name?: string
    description?: string
}

export enum EventDetailTypes {
    finalInterview = 'finalInterview',
    comment = 'comment',
    followUp = 'followUp',
    storyTelling = 'storyTelling',
    intake = 'intake',
}

export const EventDetailFieldset: React.FC<Props> = props => {
    const {
        type,
        readOnly,
        defaultValues,
        onClickEdit,
        onClickDelete,
        onClickCancel,
        loading,
        date,
        name,
        description,
    } = props
    const { i18n } = useLingui()

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

    if (readOnly) {
        return (
            <div className={containerClassNames}>
                <div className={styles.border} />
                <div className={styles.contentContainer}>
                    <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>
                            <SectionTitle title={EventDetailTypesTranslations[type]} />
                            <Paragraph className={styles.subtitle}>{`${date} • ${name}`}</Paragraph>
                        </div>
                        <Button
                            className={styles.editIcon}
                            round={true}
                            type={ButtonType.tertiary}
                            icon={IconType.edit}
                            onClick={onClickEdit}
                        />
                    </div>
                    <div className={styles.descriptionContainer}>
                        <Column spacing={4}>
                            <Paragraph className={styles.sectionTitle}>{i18n._(t`Omschrijving`)}</Paragraph>
                            <Paragraph>{description}</Paragraph>
                            <Paragraph className={styles.sectionTitle}>{i18n._(t`Checklist`)}</Paragraph>
                            <div className={styles.containerList}>
                                <ul>
                                    <li>Welk aanbod volg je?</li>
                                    <li>Past het aanbod bij wat je wil leren?</li>
                                    <li>Ben je tevreden over wat je leert?</li>
                                    <li>Gebruik je wat je leert al in je dagelijks leven?</li>
                                    <li>Zou je wat anders willen leren?</li>
                                </ul>
                            </div>
                        </Column>
                    </div>
                </div>
            </div>
        )
    }

    if (defaultValues) {
        return (
            <div className={containerClassNames}>
                <div className={styles.border} />
                <div className={styles.contentContainer}>
                    <Column spacing={8}>
                        <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                            <Select
                                list="cursusType"
                                name="cursusType"
                                placeholder={i18n._(t`Selecteer type`)}
                                options={getEventOptions()}
                            />
                        </Field>
                        <Field label={i18n._(t`Datum`)} required={true}>
                            <DateInput
                                required={true}
                                name="endDate"
                                placeholder={i18n._(t`01/01/2020`)}
                                defaultValue={defaultValues?.endDateCurrentEducation}
                            />
                        </Field>
                        <Field label={i18n._(t`Omschrijving`)} required={true}>
                            <TextArea
                                name="advisedOffers"
                                placeholder={i18n._(t`Geadviseerd aanbod`)}
                                defaultValue={defaultValues?.advisedOffers}
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
                            onClick={onClickDelete}
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
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>
                <Column spacing={8}>
                    <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                        <Select
                            list="cursusType"
                            name="cursusType"
                            placeholder={i18n._(t`Selecteer type`)}
                            options={getEventOptions()}
                        />
                    </Field>
                    <Field label={i18n._(t`Datum`)} required={true}>
                        <DateInput
                            required={true}
                            name="endDate"
                            placeholder={i18n._(t`01/01/2020`)}
                            defaultValue={defaultValues?.endDateCurrentEducation}
                        />
                    </Field>
                    <Field label={i18n._(t`Omschrijving`)} required={true}>
                        <TextArea
                            name="advisedOffers"
                            placeholder={i18n._(t`Geadviseerd aanbod`)}
                            defaultValue={defaultValues?.advisedOffers}
                            validators={[GenericValidators.required]}
                        />
                    </Field>
                </Column>
            </div>
            <div className={styles.buttons}>
                <Row justifyContent="flex-end">
                    <Button className={styles.button} type={ButtonType.secondary} onClick={onClickCancel}>
                        {i18n._(t`Annuleren`)}
                    </Button>

                    <Button type={ButtonType.primary} submit={true} loading={loading} className={styles.button}>
                        {i18n._(t`Gebeurtenis toevoegen`)}
                    </Button>
                </Row>
            </div>
        </div>
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
