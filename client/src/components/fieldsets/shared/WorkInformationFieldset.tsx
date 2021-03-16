import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Checkbox from '../../Core/DataEntry/Checkbox'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: WorkInformationFieldsetModel
    readOnly?: true
}

export interface WorkInformationFieldsetModel {
    trained: string
    lastWorkplace: string
    dayTimeActivities: string
}

const WorkInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

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
                        <p>{prefillData?.dayTimeActivities}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Werk`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Voor welk werk ben je opgeleid`)} horizontal={true}>
                    <Input name="trained" placeholder={i18n._(t`Welk werk`)} defaultValue={undefined} />
                </Field>

                <Field
                    label={i18n._(t`Waar heb je voor het laatst gewerkt?`)}
                    horizontal={true}
                    description={'Kan ook vrijwilligerswerk zijn.'}
                >
                    <Input name="lastWorkplace" placeholder={i18n._(t`Waar gewerkt`)} defaultValue={undefined} />
                </Field>

                <Field label={i18n._(t`Hoe ziet je dagbesteding eruit?`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <Checkbox name={'dayTimeActivities'} />
                            <p>{i18n._(t`Op zoek naar werk`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'dayTimeActivities'} />
                            <p>{i18n._(t`Re-integratie`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'dayTimeActivities'} />
                            <p>{i18n._(t`Studie/school`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'dayTimeActivities'} />
                            <p>{i18n._(t`Vrijwilligerswerk`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'dayTimeActivities'} />
                            <p>{i18n._(t`Werk`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'dayTimeActivities'} />
                            <p>{i18n._(t`Anders, namelijk`)}</p>
                        </Row>
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
}

export default WorkInformationFieldset
