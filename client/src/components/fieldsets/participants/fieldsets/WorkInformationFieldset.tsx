import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Checkbox from '../../../Core/DataEntry/Checkbox'
import Input from '../../../Core/DataEntry/Input'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'

interface Props {
    prefillData?: WorkInformationFieldsetModel
    readOnly?: boolean
}

export interface WorkInformationFieldsetModel {
    trained: string
    lastWorkplace: string
    dayTimeActivities: string[]
}

const WorkInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const dayTimeActivities = [
        {
            name: 'dayTimeActivities',
            value: 'Op zoek naar werk',
            text: i18n._(t`Op zoek naar werk`),
        },
        {
            name: 'dayTimeActivities',
            value: 'Re-integratie',
            text: i18n._(t`Re-integratie`),
        },
        {
            name: 'dayTimeActivities',
            value: 'Studie/school',
            text: i18n._(t`Studie/school`),
        },
        {
            name: 'dayTimeActivities',
            value: 'Vrijwilligerswerk',
            text: i18n._(t`Vrijwilligerswerk`),
        },
        {
            name: 'dayTimeActivities',
            value: 'Werk',
            text: i18n._(t`Werk`),
        },
        {
            name: 'dayTimeActivities',
            value: 'Anders',
            text: i18n._(t`Anders, namelijk:`),
        },
    ]

    if (readOnly) {
        return (
            <Section title={i18n._(t`Werk`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Voor welk werk ben je opgeleid`)} horizontal={true}>
                        <p>{prefillData?.trained}</p>
                    </Field>
                    <Field label={i18n._(t`Waar heb je voor het laatst gewerkt?`)} horizontal={true}>
                        <p>{prefillData?.lastWorkplace}</p>
                    </Field>
                    <Field label={i18n._(t`Hoe ziet je dagbesteding eruit?`)} horizontal={true}>
                        {renderDayTimeActivitiesCheckboxes()}
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Werk`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Voor welk werk ben je opgeleid`)} horizontal={true}>
                    <Input name="trained" placeholder={i18n._(t`Welk werk`)} defaultValue={prefillData?.trained} />
                </Field>

                <Field
                    label={i18n._(t`Waar heb je voor het laatst gewerkt?`)}
                    horizontal={true}
                    description={'Kan ook vrijwilligerswerk zijn.'}
                >
                    <Input
                        name="lastWorkplace"
                        placeholder={i18n._(t`Waar gewerkt`)}
                        defaultValue={prefillData?.lastWorkplace}
                    />
                </Field>

                <Field label={i18n._(t`Hoe ziet je dagbesteding eruit?`)} horizontal={true}>
                    <Column spacing={4}>
                        {renderDayTimeActivitiesCheckboxes()}
                        <Input
                            name="dayTimeActivities"
                            placeholder={i18n._(t`Andere dagbesteding`)}
                            defaultValue={undefined}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderDayTimeActivitiesCheckboxes() {
        if (readOnly && prefillData?.dayTimeActivities) {
            return prefillData.dayTimeActivities.map((activity, index) => {
                return (
                    <Row key={index}>
                        <p>{activity}</p>
                    </Row>
                )
            })
        }

        return dayTimeActivities.map((activity, index) => {
            return (
                <Row key={index}>
                    <Checkbox
                        name={activity.name}
                        value={activity.value}
                        defaultChecked={prefillData?.dayTimeActivities.includes(activity.value)}
                    />
                    <p>{activity.text}</p>
                </Row>
            )
        })
    }
}

export default WorkInformationFieldset
