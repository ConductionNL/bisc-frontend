import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ProviderEmployeeGenderEnum, StudentGenderEnum } from 'generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import ControlField from '../../Core/Field/ControlField'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'
import { genderTranslations } from '../participants/translations/participantsTranslations'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: PersonInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface PersonInformationFieldsetPrefillData {
    lastName?: string | null
    insertion?: string | null
    nickName?: string | null
    gender?: StudentGenderEnum | ProviderEmployeeGenderEnum | null
    dateOfBirth?: string | null
    countryOfOrigin?: string | null
}

export interface PersonInformationFieldsetModel {
    lastName: string
    insertion?: string
    nickName: string
    gender?: StudentGenderEnum | ProviderEmployeeGenderEnum
    dateOfBirth?: string
    countryOfOrigin?: string
}

type Fields = 'lastName' | 'insertion' | 'nickName' | 'gender' | 'dateOfBirth' | 'gender' | 'countryOfOrigin'

const PersonInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Persoonsgegevens`),
            lastName: {
                label: i18n._(t`Achternaam`),
                placeholder: i18n._(t`Achternaam`),
            },
            insertion: {
                label: i18n._(t`Tussenvoegsel`),
                placeholder: i18n._(t`Tussenvoegsel`),
            },
            nickName: {
                label: i18n._(t`Roepnaam`),
                placeholder: i18n._(t`Roepnaam`),
            },
            gender: {
                label: i18n._(t`Geslacht`),
                placeholder: i18n._(t`Geslacht`),
            },
            dateOfBirth: {
                label: i18n._(t`Geboortedatum`),
                placeholder: i18n._(t`Geboortedatum`),
            },
            countryOfOrigin: {
                label: i18n._(t`Land van herkomst`),
                placeholder: i18n._(t`Land`),
            },
        },
        fieldNaming
    )

    const controls = useFieldsetControl<Fields>(
        {
            insertion: {},
            lastName: {
                validators: [GenericValidators.required],
                required: true,
            },
            nickName: {
                validators: [GenericValidators.required],
                required: true,
            },
            gender: {},
            dateOfBirth: {},
            countryOfOrigin: {
                validators: [GenericValidators.required],
                required: true,
            },
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.lastName} label={content.lastName?.label} horizontal={true}>
                        <Paragraph>
                            {NameFormatters.formattedLastName({
                                additionalName: prefillData?.insertion,
                                familyName: prefillData?.lastName,
                            })}
                        </Paragraph>
                    </ControlField>

                    <ControlField control={controls.nickName} label={content.nickName?.label} horizontal={true}>
                        <Paragraph>{prefillData?.nickName}</Paragraph>
                    </ControlField>

                    <ControlField control={controls.gender} label={content.gender?.label} horizontal={true}>
                        <Paragraph>
                        {prefillData?.gender && genderTranslations[prefillData?.gender]}
                        </Paragraph>
                    </ControlField>

                    <ControlField control={controls.dateOfBirth} label={content.dateOfBirth?.label} horizontal={true}>
                        <Paragraph>{prefillData?.dateOfBirth && DateFormatters.formattedDate(prefillData?.dateOfBirth)}</Paragraph>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Persoonsgegevens`)}>
            <Column spacing={4}>
                <ControlField control={controls.lastName} label={content.lastName?.label} horizontal={true}>
                    <Input
                        name="lastName"
                        placeholder={content.lastName?.placeholder}
                        defaultValue={prefillData?.lastName ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.insertion} label={content?.insertion?.label} horizontal={true}>
                    <Input
                        name="insertion"
                        placeholder={content.insertion?.placeholder}
                        defaultValue={prefillData?.insertion ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.nickName} label={content?.nickName?.label} horizontal={true}>
                    <Input
                        name="nickName"
                        placeholder={content.nickName?.placeholder}
                        defaultValue={prefillData?.nickName ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.gender} label={content?.gender?.label} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton name={'gender'} value="male" label={i18n._(t`Man`)} />
                        <RadioButton name={'gender'} value="female" label={i18n._(t`Vrouw`)} />
                        <RadioButton name={'gender'} value="x" label={i18n._(t`X`)} />
                    </Column>
                </ControlField>

                <ControlField control={controls.dateOfBirth} label={content.dateOfBirth?.label} horizontal={true}>
                    <DateInput name="dateOfBirth" placeholder={content.dateOfBirth?.placeholder} />
                </ControlField>

                <ControlField
                    control={controls.countryOfOrigin}
                    label={content.countryOfOrigin?.label}
                    horizontal={true}
                >
                    <Input
                        name="country"
                        placeholder={i18n._(t`Land`)}
                        defaultValue={prefillData?.countryOfOrigin ?? undefined}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default PersonInformationFieldset
