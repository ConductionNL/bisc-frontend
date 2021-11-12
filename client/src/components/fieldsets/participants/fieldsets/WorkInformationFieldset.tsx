import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    intakeDayTimeActivitiesEnumTranslations,
    studentJobDaytimeActivitiesEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import React, { ChangeEventHandler, useState } from 'react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Input from 'components/Core/DataEntry/Input'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { IntakeDayTimeActivities, Maybe } from 'api/types/types'

interface Props {
    prefillData?: WorkInformationPrefillData
    readOnly?: boolean
}

export interface WorkInformationPrefillData {
    'intake.trainedForJob'?: Maybe<string>
    'intake.lastJob'?: Maybe<string>
    'intake.dayTimeActivities'?: Maybe<IntakeDayTimeActivities[]>
    'intake.dayTimeActivitiesOther'?: Maybe<string>
}

export interface WorkInformationFieldsetModel {
    'intake.trainedForJob'?: Maybe<string>
    'intake.lastJob'?: Maybe<string>
    'intake.dayTimeActivities'?: Maybe<IntakeDayTimeActivities[]>
    'intake.dayTimeActivitiesOther'?: Maybe<string>
}

export const WorkInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const defaultDayTimeActivities = prefillData?.['intake.dayTimeActivities'] || []

    const [otherDayTimeActivity, setOtherDayTimeActivity] = useState<boolean>(
        defaultDayTimeActivities.includes(IntakeDayTimeActivities.Other)
    )

    const onChangeOtherDayTimeActivity: ChangeEventHandler<HTMLInputElement> = event => {
        setOtherDayTimeActivity(event.currentTarget.checked)
    }

    const intakeDayTimeActivitiesOptions = getIntakeDayTimeActivitiesOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Werk`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Voor welk werk ben je opgeleid`)} horizontal={true}>
                        <Paragraph>{prefillData?.['intake.trainedForJob']}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Waar heb je voor het laatst gewerkt?`)} horizontal={true}>
                        <Paragraph>{prefillData?.['intake.lastJob']}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Hoe ziet je dagbesteding eruit`)} horizontal={true}>
                        {renderDayTimeActivitiesCheckboxes()}
                    </Field>
                    {otherDayTimeActivity && (
                        <Field label={i18n._(t`Andere dagbesteding`)} horizontal={true}>
                            <Paragraph>{prefillData?.['intake.dayTimeActivitiesOther']}</Paragraph>
                        </Field>
                    )}
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Werk`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Voor welk werk ben je opgeleid`)} horizontal={true}>
                    <Input
                        name="intake.trainedForJob"
                        placeholder={i18n._(t`Welk werk`)}
                        defaultValue={prefillData?.['intake.trainedForJob'] ?? undefined}
                    />
                </Field>

                <Field
                    label={i18n._(t`Waar heb je voor het laatst gewerkt?`)}
                    horizontal={true}
                    description={'Kan ook vrijwilligerswerk zijn.'}
                >
                    <Input
                        name="intake.lastJob"
                        placeholder={i18n._(t`Waar gewerkt`)}
                        defaultValue={prefillData?.['intake.lastJob'] ?? undefined}
                    />
                </Field>

                <Field label={i18n._(t`Hoe ziet je dagbesteding eruit`)} horizontal={true}>
                    <Column spacing={4}>
                        {renderDayTimeActivitiesCheckboxes()}
                        {otherDayTimeActivity && (
                            <Input
                                name="intake.dayTimeActivitiesOther"
                                placeholder={i18n._(t`Andere dagbesteding`)}
                                defaultValue={prefillData?.['intake.dayTimeActivitiesOther'] ?? undefined}
                            />
                        )}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderDayTimeActivitiesCheckboxes() {
        if (readOnly) {
            const selectedIntakeDayTimeActivities = prefillData?.['intake.dayTimeActivities'] || []

            return selectedIntakeDayTimeActivities.map((selectedOption, index) => {
                return (
                    <Row key={index}>
                        <p>{intakeDayTimeActivitiesOptions.find(option => option.value === selectedOption)?.label}</p>
                    </Row>
                )
            })
        }

        return intakeDayTimeActivitiesOptions.map((option, index) => {
            return (
                <React.Fragment key={index}>
                    <Checkbox
                        label={option.label}
                        name={`intake.dayTimeActivities[]`}
                        value={option.value}
                        defaultChecked={prefillData?.['intake.dayTimeActivities']?.includes(option.value)}
                        onChange={event => {
                            if (option.value === IntakeDayTimeActivities.Other) {
                                onChangeOtherDayTimeActivity(event)
                            }
                        }}
                    />
                </React.Fragment>
            )
        })
    }

    function getIntakeDayTimeActivitiesOptions() {
        return Object.values(IntakeDayTimeActivities).map(value => ({
            label: intakeDayTimeActivitiesEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}
