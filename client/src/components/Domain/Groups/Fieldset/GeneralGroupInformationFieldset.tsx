import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import React from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: GeneralGroupInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface GeneralGroupInformationFieldsetFormMode {
    location?: string
    participantsMin?: string
    participantsMax?: string
    evaluation?: string
    mentors?: string // string because the browser does this to arrays
}

export interface GeneralGroupInformationFieldsetPrefillData {
    location?: string
    participantsMin?: string
    participantsMax?: string
    evaluation?: string
    mentors?: string[]
}

type Fields = 'location' | 'participantsMin' | 'participantsMax' | 'evaluation' | 'mentors'

export const GeneralInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Vestiging`),
            location: {
                label: i18n._(t`Locatie`),
                placeholder: i18n._(t`Locatie`),
            },
            participantsMin: {
                label: i18n._(t`Minimum deelnemers`),
                placeholder: i18n._(t`Minimum`),
            },
            participantsMax: {
                label: i18n._(t`Maximum deelnemers`),
                placeholder: i18n._(t`Maximun`),
            },
            evaluation: {
                label: i18n._(t`Evaluatie`),
                placeholder: i18n._(t`Evaluatie`),
            },
            mentors: {
                label: i18n._(t`Begeleiders`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            location: {
                required: true,
                validators: [GenericValidators.required],
            },
            participantsMax: {},
            participantsMin: {},
            evaluation: {},
            mentors: {},
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls?.location} label={content.location?.label} horizontal={true}>
                        <Input
                            name="location"
                            placeholder={content.location?.placeholder}
                            validators={controls.location?.validators}
                            defaultValue={prefillData?.location}
                        />
                    </ControlField>
                    <ControlField
                        control={controls?.participantsMin}
                        label={content.participantsMin?.label}
                        horizontal={true}
                    >
                        <Input
                            name="minimum"
                            placeholder={content.participantsMin?.placeholder}
                            validators={controls.participantsMin?.validators}
                            defaultValue={prefillData?.participantsMin}
                        />
                    </ControlField>
                    <ControlField
                        control={controls?.participantsMax}
                        label={content.participantsMax?.label}
                        horizontal={true}
                    >
                        <Input
                            name="participantsMax"
                            placeholder={content.participantsMax?.placeholder}
                            validators={controls.participantsMax?.validators}
                            defaultValue={prefillData?.participantsMax}
                        />
                    </ControlField>
                    <ControlField control={controls?.evaluation} label={content.evaluation?.label} horizontal={true}>
                        <Input
                            name="evaluation"
                            placeholder={content.evaluation?.placeholder}
                            validators={controls.evaluation?.validators}
                            defaultValue={prefillData?.evaluation}
                        />
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={content.title}>
            <Column spacing={4}>
                <ControlField control={controls?.location} label={content.location?.label} horizontal={true}>
                    <Input
                        name="location"
                        placeholder={content.location?.placeholder}
                        validators={controls.location?.validators}
                        defaultValue={prefillData?.location}
                    />
                </ControlField>
                <ControlField
                    control={controls?.participantsMin}
                    label={content.participantsMin?.label}
                    horizontal={true}
                >
                    <Input
                        name="minimum"
                        placeholder={content.participantsMin?.placeholder}
                        validators={controls.participantsMin?.validators}
                        defaultValue={prefillData?.participantsMin}
                    />
                </ControlField>
                <ControlField
                    control={controls?.participantsMax}
                    label={content.participantsMax?.label}
                    horizontal={true}
                >
                    <Input
                        name="participantsMax"
                        placeholder={content.participantsMax?.placeholder}
                        validators={controls.participantsMax?.validators}
                        defaultValue={prefillData?.participantsMax}
                    />
                </ControlField>
                <ControlField control={controls?.evaluation} label={content.evaluation?.label} horizontal={true}>
                    <Input
                        name="evaluation"
                        placeholder={content.evaluation?.placeholder}
                        validators={controls.evaluation?.validators}
                        defaultValue={prefillData?.evaluation}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}
