import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { EducationGroupType } from 'api/types/types'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import { groupFormationTypeTranslations } from 'components/Domain/Groups/Translations/groupTranslations'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props extends ConnectedFieldsetProps<Fields> {
    defaultValues?: DetailsInformationFieldsetDefaultValues
    readOnly?: boolean
}

export interface DetailsInformationFieldsetModel {
    detailsIsFormal: string
    detailsGroupFormation: EducationGroupType
    detailsTotalClassHours: string
    detailsCertificateWillBeAwarded: DetailsCertificateWillBeAwarded
    detailsStartDate: string
    detailsEndDate: string
    detailsEngagements: string
}

export enum DetailsInformationFieldsetFormalityEnum {
    formal = 'formal',
    nonFormal = 'non-formal',
}
export enum DetailsCertificateWillBeAwarded {
    Yes = 'yes',
    No = 'no',
}
export interface DetailsInformationFieldsetDefaultValues {
    detailsIsFormal?: boolean
    detailsGroupFormation?: EducationGroupType
    detailsTotalClassHours?: number
    detailsCertificateWillBeAwarded?: boolean
    detailsStartDate?: string
    detailsEndDate?: string
    detailsEngagements?: string
}

type Fields =
    | 'detailsIsFormal'
    | 'detailsGroupFormation'
    | 'detailsTotalClassHours'
    | 'detailsCertificateWillBeAwarded'
    | 'detailsStartDate'
    | 'detailsEndDate'
    | 'detailsEngagements'

const DetailsInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Details`),
            detailsIsFormal: {
                label: i18n._(t`Formaliteit`),
            },
            detailsGroupFormation: {
                label: i18n._(t`Groepsvorming`),
                placeholder: i18n._(t`Selecteer groepsvorming`),
            },
            detailsTotalClassHours: {
                label: i18n._(t`Totaal aantal lesuren per deelname`),
                placeholder: i18n._(t`Urenaantal`),
            },
            detailsCertificateWillBeAwarded: {
                label: i18n._(t`Uitreiking certificaat`),
            },
            detailsStartDate: {
                label: i18n._(t`Startdatum`),
                placeholder: 'DD/MM/YYYY',
            },
            detailsEndDate: {
                label: i18n._(t`Einddatum`),
                placeholder: 'DD/MM/YYYY',
            },
            detailsEngagements: {
                label: i18n._(t`Afspraken over deelname`),
                placeholder: i18n._(t`Afspraken`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            detailsIsFormal: {
                required: true,
                validators: [GenericValidators.required],
            },
            detailsGroupFormation: {
                required: true,
                validators: [GenericValidators.required],
            },
            detailsTotalClassHours: {
                required: true,
                validators: [GenericValidators.required],
            },
            detailsCertificateWillBeAwarded: {
                required: true,
                validators: [GenericValidators.required],
            },
            detailsStartDate: {},
            detailsEndDate: {},
            detailsEngagements: {},
        },
        fieldControls
    )

    return (
        <Section title={i18n._(t`Details`)}>
            <Column spacing={4}>{renderFieldsets()}</Column>
        </Section>
    )

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <ControlField
                        control={controls.detailsIsFormal}
                        label={content.detailsIsFormal?.label}
                        horizontal={true}
                    >
                        <Paragraph>
                            {defaultValues?.detailsIsFormal ? i18n._(t`Formeel`) : i18n._(t`Non-formeel`)}
                        </Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.detailsGroupFormation}
                        label={content.detailsGroupFormation?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.detailsGroupFormation}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.detailsTotalClassHours}
                        label={content.detailsTotalClassHours?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.detailsTotalClassHours}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.detailsCertificateWillBeAwarded}
                        label={content.detailsCertificateWillBeAwarded?.label}
                        horizontal={true}
                    >
                        <Paragraph>
                            {defaultValues?.detailsCertificateWillBeAwarded ? i18n._(t`Ja`) : i18n._(t`Nee`)}
                        </Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.detailsStartDate}
                        label={content.detailsStartDate?.label}
                        horizontal={true}
                    >
                        <Paragraph>{DateFormatters.formattedDate(defaultValues?.detailsStartDate)}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.detailsEndDate}
                        label={content.detailsEndDate?.label}
                        horizontal={true}
                    >
                        <Paragraph>{DateFormatters.formattedDate(defaultValues?.detailsEndDate)}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.detailsEngagements}
                        label={content.detailsEngagements?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.detailsEngagements}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField
                    control={controls.detailsIsFormal}
                    label={content.detailsIsFormal?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Row>
                            <RadioButton
                                name={'detailsIsFormal'}
                                value="formal"
                                defaultChecked={defaultValues?.detailsIsFormal}
                                label={i18n._(t`Formeel`)}
                            />
                        </Row>
                        <Row>
                            <RadioButton name={'detailsIsFormal'} value="non-formal" label={i18n._(t`Non-formeel`)} />
                        </Row>
                    </Column>
                </ControlField>
                <ControlField
                    control={controls.detailsGroupFormation}
                    label={content.detailsGroupFormation?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Select
                            list="detailsGroupFormation"
                            name="detailsGroupFormation"
                            placeholder={content?.detailsGroupFormation?.placeholder}
                            options={getGroupFormationOptions()}
                            defaultValue={defaultValues?.detailsGroupFormation}
                        />
                    </Column>
                </ControlField>
                <ControlField
                    control={controls.detailsTotalClassHours}
                    label={content.detailsTotalClassHours?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Input
                            name="detailsTotalClassHours"
                            placeholder={content?.detailsTotalClassHours?.placeholder}
                            defaultValue={defaultValues?.detailsTotalClassHours}
                        />
                    </Column>
                </ControlField>
                <ControlField
                    control={controls.detailsCertificateWillBeAwarded}
                    label={content.detailsCertificateWillBeAwarded?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Row>
                            <RadioButton
                                name={'detailsCertificateWillBeAwarded'}
                                value="yes"
                                defaultChecked={defaultValues?.detailsCertificateWillBeAwarded}
                                label={i18n._(t`Ja`)}
                            />
                        </Row>
                        <Row>
                            <RadioButton name={'detailsCertificateWillBeAwarded'} value="no" label={i18n._(t`Nee`)} />
                        </Row>
                    </Column>
                </ControlField>
                <ControlField
                    control={controls.detailsStartDate}
                    label={content.detailsStartDate?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <DateInput
                            name="detailsStartDate"
                            placeholder={content?.detailsStartDate?.placeholder}
                            defaultValue={defaultValues?.detailsStartDate}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.detailsEndDate} label={content.detailsEndDate?.label} horizontal={true}>
                    <Column spacing={4}>
                        <DateInput
                            name="detailsEndDate"
                            placeholder={content?.detailsEndDate?.placeholder}
                            defaultValue={defaultValues?.detailsEndDate}
                        />
                    </Column>
                </ControlField>
                <ControlField
                    control={controls.detailsEngagements}
                    label={content.detailsEngagements?.label}
                    horizontal={true}
                >
                    <TextArea
                        name="detailsEngagements"
                        placeholder={content?.detailsEngagements?.placeholder}
                        defaultValue={defaultValues?.detailsEngagements}
                    />
                </ControlField>
            </>
        )
    }

    function getGroupFormationOptions() {
        return Object.values(EducationGroupType).map(groupFormatiom => ({
            value: groupFormatiom,
            label: groupFormationTypeTranslations[groupFormatiom] ?? 'NOT SUPPORTED',
        }))
    }
}

export default DetailsInformationFieldset
