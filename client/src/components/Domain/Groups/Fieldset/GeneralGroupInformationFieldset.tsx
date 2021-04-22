import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import TextArea from 'components/Core/DataEntry/TextArea'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Link from 'components/Core/Link/Link'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import React from 'react'
import { AanbiederEmployeeType } from 'temp/TEMPORARYgraphql'
import { NameFormatters } from 'utils/formatters/name/Name'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { GroupMentorsFieldset, GroupMentorsFieldsetFormModel } from './GroupMentorsFieldset'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: GeneralGroupInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface GeneralGroupInformationFieldsetFormModel extends GroupMentorsFieldsetFormModel {
    location?: string
    participantsMin?: string
    participantsMax?: string
    evaluation?: string
}

export interface GeneralGroupInformationFieldsetPrefillData {
    location?: string
    participantsMin?: number
    participantsMax?: number
    evaluation?: string
    mentors?: AanbiederEmployeeType[]
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
                        <Paragraph>{prefillData?.location}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls?.participantsMin}
                        label={content.participantsMin?.label}
                        horizontal={true}
                    >
                        <Paragraph>{prefillData?.participantsMin}</Paragraph>
                    </ControlField>
                    <ControlField
                        control={controls?.participantsMax}
                        label={content.participantsMax?.label}
                        horizontal={true}
                    >
                        <Paragraph>{prefillData?.participantsMax}</Paragraph>
                    </ControlField>
                    <ControlField control={controls?.evaluation} label={content.evaluation?.label} horizontal={true}>
                        <Paragraph>{prefillData?.evaluation}</Paragraph>
                    </ControlField>
                    <ControlField control={controls?.evaluation} label={content.evaluation?.label} horizontal={true}>
                        {prefillData?.mentors?.map(mentor => (
                            <Link>
                                <Icon type={IconType.profile} />
                                {NameFormatters.formattedFullname({
                                    givenName: mentor.givenName,
                                    additionalName: mentor.additionalName,
                                    familyName: mentor.familyName,
                                })}
                            </Link>
                        ))}
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
                    <TextArea
                        name="evaluation"
                        placeholder={content.evaluation?.placeholder}
                        validators={controls.evaluation?.validators}
                        defaultValue={prefillData?.evaluation}
                    />
                </ControlField>
                <ControlField control={controls?.evaluation} label={content.evaluation?.label} horizontal={true}>
                    <GroupMentorsFieldset defaultMentors={prefillData?.mentors} />
                </ControlField>
            </Column>
        </Section>
    )
}
