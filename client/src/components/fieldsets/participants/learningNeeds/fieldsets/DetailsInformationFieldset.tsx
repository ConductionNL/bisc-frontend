import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { EducationGroupType, Maybe, ParticipationFormality } from 'api/types/types'
import DateInput from 'components/Core/DataEntry/DateInput'
// import Input from 'components/Core/DataEntry/Input'
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
import { DateFormatters, Dates } from 'utils/formatters/Date/Date'
import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props extends ConnectedFieldsetProps<Fields> {
    defaultValues?: DetailsInformationFieldsetDefaultValues
    readOnly?: boolean
}

export interface DetailsInformationFieldsetModel {
    formality?: Maybe<ParticipationFormality>
    groupFormation?: Maybe<EducationGroupType>
    startParticipation?: Maybe<Date>
    endParticipation?: Maybe<Date>
    agreement?: Maybe<string>
    degree?: Maybe<boolean>
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
    formality?: Maybe<ParticipationFormality>
    groupFormation?: Maybe<EducationGroupType>
    startParticipation?: Maybe<Date>
    endParticipation?: Maybe<Date>
    agreement?: Maybe<string>
    degree?: Maybe<boolean>
}

type Fields = keyof DetailsInformationFieldsetDefaultValues

const DetailsInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Details`),
            formality: {
                label: i18n._(t`Formaliteit`),
            },
            groupFormation: {
                label: i18n._(t`Groepsvorming`),
                placeholder: i18n._(t`Selecteer groepsvorming`),
            },
            // detailsTotalClassHours: {
            //     label: i18n._(t`Totaal aantal lesuren per deelname`),
            //     placeholder: i18n._(t`Urenaantal`),
            // },
            degree: {
                label: i18n._(t`Uitreiking certificaat`),
            },
            startParticipation: {
                label: i18n._(t`Startdatum`),
                placeholder: 'DD/MM/YYYY',
            },
            endParticipation: {
                label: i18n._(t`Einddatum`),
                placeholder: 'DD/MM/YYYY',
            },
            agreement: {
                label: i18n._(t`Afspraken over deelname`),
                placeholder: i18n._(t`Afspraken`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            formality: {
                required: true,
                validators: [GenericValidators.required],
            },
            groupFormation: {
                required: true,
                validators: [GenericValidators.required],
            },
            // detailsTotalClassHours: {
            //     required: true,
            //     validators: [GenericValidators.required],
            // },
            degree: {
                required: true,
                validators: [GenericValidators.required],
            },
            startParticipation: {},
            endParticipation: {},
            agreement: {},
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
                    <ControlField control={controls.formality} label={content.formality?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.formality ? i18n._(t`Formeel`) : i18n._(t`Non-formeel`)}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.groupFormation}
                        label={content.groupFormation?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.groupFormation}</Paragraph>
                    </ControlField>
                    {/* <ControlField
                        control={controls.detailsTotalClassHours}
                        label={content.detailsTotalClassHours?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.detailsTotalClassHours}</Paragraph>
                    </ControlField> */}
                    <ControlField control={controls.degree} label={content.degree?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.degree ? i18n._(t`Ja`) : i18n._(t`Nee`)}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.startParticipation}
                        label={content.startParticipation?.label}
                        horizontal={true}
                    >
                        <Paragraph>{DateFormatters.formattedDate(defaultValues?.startParticipation)}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.endParticipation}
                        label={content.endParticipation?.label}
                        horizontal={true}
                    >
                        <Paragraph>{DateFormatters.formattedDate(defaultValues?.endParticipation)}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.agreement} label={content.agreement?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.agreement}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField control={controls.formality} label={content.formality?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton
                                name={'formality'}
                                value={ParticipationFormality.Formal}
                                defaultChecked={defaultValues?.formality === ParticipationFormality.Formal}
                                label={i18n._(t`Formeel`)}
                            />
                        </Row>
                        <Row>
                            <RadioButton
                                name={'formality'}
                                value={ParticipationFormality.NonFormal}
                                label={i18n._(t`Non-formeel`)}
                            />
                        </Row>
                    </Column>
                </ControlField>
                <ControlField control={controls.groupFormation} label={content.groupFormation?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Select
                            list="groupFormation"
                            name="groupFormation"
                            placeholder={content?.groupFormation?.placeholder}
                            options={getGroupFormationOptions()}
                            defaultValue={defaultValues?.groupFormation ?? undefined}
                        />
                    </Column>
                </ControlField>
                {/* <ControlField
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
                </ControlField> */}
                <ControlField control={controls.degree} label={content.degree?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton
                                name={'degree'}
                                value="yes"
                                defaultChecked={defaultValues?.degree ?? undefined}
                                label={i18n._(t`Ja`)}
                            />
                        </Row>
                        <Row>
                            <RadioButton name={'degree'} value="no" label={i18n._(t`Nee`)} />
                        </Row>
                    </Column>
                </ControlField>
                <ControlField
                    control={controls.startParticipation}
                    label={content.startParticipation?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <DateInput
                            name="startParticipation"
                            placeholder={content?.startParticipation?.placeholder}
                            defaultValue={Dates.toString(defaultValues?.startParticipation)}
                        />
                    </Column>
                </ControlField>
                <ControlField
                    control={controls.endParticipation}
                    label={content.endParticipation?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <DateInput
                            name="endParticipation"
                            placeholder={content?.endParticipation?.placeholder}
                            defaultValue={Dates.toString(defaultValues?.endParticipation ?? undefined)}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.agreement} label={content.agreement?.label} horizontal={true}>
                    <TextArea
                        name="agreement"
                        placeholder={content?.agreement?.placeholder}
                        defaultValue={defaultValues?.agreement ?? undefined}
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
