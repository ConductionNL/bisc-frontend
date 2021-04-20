import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
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
import { ParticipationGroupFormationEnum } from 'generated/graphql'
import React from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props extends ConnectedFieldsetProps<Fields> {
    defaultValues?: DetailsInformationFieldsetDefaultValues
    readOnly?: boolean
}

export interface DetailsInformationFieldsetModel {
    formality: DetailsInformationFieldsetFormalityEnum
    groupFormation: string
    teachingHours: string
    certificate: string
    startDate: string
    endDate: string
    engagements: string
}

export enum DetailsInformationFieldsetFormalityEnum {
    formal = 'formal',
    nonFormal = 'non-formal',
}

export interface DetailsInformationFieldsetDefaultValues {
    formality: string
    groupFormation: string
    teachingHours: string
    certificate: string
    startDate: string
    endDate: string
    engagements: string
}

type Fields = 'formality' | 'groupFormation' | 'teachingHours' | 'certificate' | 'startDate' | 'endDate' | 'engagements'

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
            teachingHours: {
                label: i18n._(t`Totaal aantal lesuren per deelname`),
                placeholder: i18n._(t`Urenaantal`),
            },
            certificate: {
                label: i18n._(t`Uitreiking certificaat`),
            },
            startDate: {
                label: i18n._(t`Startdatum`),
                placeholder: i18n._(t`YY/MM/YYYY`),
            },
            endDate: {
                label: i18n._(t`Einddatum`),
                placeholder: i18n._(t`YY/MM/YYYY`),
            },
            engagements: {
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
            teachingHours: {
                required: true,
                validators: [GenericValidators.required],
            },
            certificate: {
                required: true,
                validators: [GenericValidators.required],
            },
            startDate: {},
            endDate: {},
            engagements: {},
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
                        <Paragraph>{defaultValues?.formality}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.groupFormation}
                        label={content.groupFormation?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.groupFormation}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls.teachingHours}
                        label={content.teachingHours?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.teachingHours}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.certificate} label={content.certificate?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.certificate}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.startDate} label={content.startDate?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.startDate}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.endDate} label={content.endDate?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.endDate}</Paragraph>
                    </ControlField>
                    <ControlField control={controls.engagements} label={content.engagements?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.engagements}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField control={controls.formality} label={content.formality?.label} horizontal={true}>
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
                </ControlField>
                <ControlField control={controls.formality} label={content.formality?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Select
                            list="groupFormation"
                            name="groupFormation"
                            placeholder={content?.formality?.placeholder}
                            options={getGroupFormationOptions()}
                            defaultValue={defaultValues?.groupFormation}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.teachingHours} label={content.teachingHours?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Input
                            name="teachingHours"
                            placeholder={content?.teachingHours?.placeholder}
                            defaultValue={defaultValues?.teachingHours}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.certificate} label={content.certificate?.label} horizontal={true}>
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
                </ControlField>
                <ControlField control={controls.startDate} label={content.startDate?.label} horizontal={true}>
                    <Column spacing={4}>
                        <DateInput
                            name="startDate"
                            placeholder={content?.startDate?.placeholder}
                            defaultValue={defaultValues?.startDate}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.endDate} label={content.endDate?.label} horizontal={true}>
                    <Column spacing={4}>
                        <DateInput
                            name="endDate"
                            placeholder={content?.endDate?.placeholder}
                            defaultValue={defaultValues?.endDate}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.engagements} label={content.engagements?.label} horizontal={true}>
                    <TextArea
                        name="engagements"
                        placeholder={content?.engagements?.placeholder}
                        defaultValue={defaultValues?.engagements}
                    />
                </ControlField>
            </>
        )
    }

    function getGroupFormationOptions() {
        return Object.values(ParticipationGroupFormationEnum).map(groupFormatiom => ({
            value: groupFormatiom,
            label: groupFormationTypeTranslations[groupFormatiom] ?? 'NOT SUPPORTED',
        }))
    }
}

export default DetailsInformationFieldset
