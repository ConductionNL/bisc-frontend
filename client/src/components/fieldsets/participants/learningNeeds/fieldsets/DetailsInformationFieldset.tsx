import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ParticipationGroupFormationEnum } from 'generated/graphql'
import React from 'react'

interface Props {
    defaultValues?: DetailsInformationFieldsetDefaultValues
    readOnly?: boolean
}

export interface DetailsInformationFieldsetModel {
    detailsIsFormal: boolean
    detailsGroupFormation: ParticipationGroupFormationEnum
    detailsTotalClassHours: number
    detailsCertificateWillBeAwarded: boolean
    detailsStartDate: Date
    detailsEndDate: Date
    detailsEngagements: string
}

export interface DetailsInformationFieldsetDefaultValues {
    detailsIsFormal: boolean
    detailsGroupFormation: ParticipationGroupFormationEnum
    detailsTotalClassHours: number
    detailsCertificateWillBeAwarded: boolean
    detailsStartDate: Date
    detailsEndDate: Date
    detailsEngagements: string
}

const DetailsInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Details`)}>
            <Column spacing={4}>{renderFieldsets()}</Column>
        </Section>
    )

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Formaliteit`)} horizontal={true}>
                        <Paragraph>{defaultValues?.detailsIsFormal}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Groepsvorming`)} horizontal={true}>
                        <Paragraph>{defaultValues?.detailsGroupFormation}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Totaal aantal lesuren per deelname`)} horizontal={true}>
                        <Paragraph>{defaultValues?.detailsTotalClassHours}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Uitreiking certificaat`)} horizontal={true}>
                        <Paragraph>{defaultValues?.detailsCertificateWillBeAwarded}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Startdatum`)} horizontal={true}>
                        <Paragraph>{defaultValues?.detailsStartDate}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Einddatum`)} horizontal={true}>
                        <Paragraph>{defaultValues?.detailsEndDate}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Afspraken over deelname`)} horizontal={true}>
                        <Paragraph>{defaultValues?.detailsEngagements}</Paragraph>
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field label={i18n._(t`Formaliteit`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'formality'} value="formal" />
                            <p>{i18n._(t`Formeel`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'formality'} value="non-formal" />
                            <p>{i18n._(t`Non-formeel`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Groepsvorming`)} horizontal={true}>
                    <Column spacing={4}>
                        <Select
                            list="groupFormation"
                            name="groupFormation"
                            placeholder={i18n._(t`Selecteer groepsvorming`)}
                            options={['Individueel', 'In een groep']}
                            defaultValue={defaultValues?.detailsGroupFormation}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Totaal aantal lesuren per deelname`)} horizontal={true}>
                    <Column spacing={4}>
                        <Input
                            name="teachingHours"
                            placeholder={i18n._(t`Urenaantal`)}
                            defaultValue={defaultValues?.detailsTotalClassHours}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Uitreiking certificaat`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'certificate'} value="yes" />
                            <p>{i18n._(t`Ja`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'certificate'} value="no" />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Startdatum`)} horizontal={true}>
                    <Column spacing={4}>
                        <DateInput
                            name="startDate"
                            placeholder={i18n._(t`YY/MM/YYYY`)}
                            defaultValue={`${defaultValues?.detailsStartDate}`}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Einddatum`)} horizontal={true}>
                    <Column spacing={4}>
                        <DateInput
                            name="endDate"
                            placeholder={i18n._(t`YY/MM/YYYY`)}
                            defaultValue={`${defaultValues?.detailsEndDate}`}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Afspraken over deelname`)} horizontal={true}>
                    <TextArea
                        name="engagements"
                        placeholder={i18n._(t`Afspraken`)}
                        defaultValue={defaultValues?.detailsEngagements}
                    />
                </Field>
            </>
        )
    }
}

export default DetailsInformationFieldset
