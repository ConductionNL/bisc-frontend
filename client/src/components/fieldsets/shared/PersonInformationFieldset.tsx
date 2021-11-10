import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import { Maybe } from 'generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { GenericValidators } from 'utils/validators/GenericValidators'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import { genderTranslations } from '../participants/translations/participantsTranslations'
import { StudentGenderEnum } from 'generated/enums'
import { Gender, Person } from 'api/types/types'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: PersonInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface PersonInformationFieldsetPrefillData {
    familyName?: string | null
    additionalName?: string | null
    givenName?: string | null
    gender?: StudentGenderEnum | null
    birthday?: string | null
    countryOfOrigin?: string | null
}

export interface PersonInformationFieldsetModel {
    familyName: string
    additionalName?: string
    givenName: string
    gender?: Gender
    birthday?: string
    countryOfOrigin?: Maybe<string>
}

type Fields = 'familyName' | 'additionalName' | 'givenName' | 'gender' | 'birthday' | 'countryOfOrigin'

const PersonInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Persoonsgegevens`),
            givenName: {
                label: i18n._(t`Roepnaam`),
                placeholder: i18n._(t`Roepnaam`),
            },
            additionalName: {
                label: i18n._(t`Tussenvoegsel`),
                placeholder: i18n._(t`Tussenvoegsel`),
            },
            familyName: {
                label: i18n._(t`Achternaam`),
                placeholder: i18n._(t`Achternaam`),
            },
            gender: {
                label: i18n._(t`Geslacht`),
                placeholder: i18n._(t`Geslacht`),
            },
            birthday: {
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
            givenName: {
                validators: [GenericValidators.required],
                required: true,
            },
            additionalName: {},
            familyName: {
                validators: [GenericValidators.required],
                required: true,
            },
            gender: {},
            birthday: {},
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
                    <ControlField control={controls.givenName} label={content.givenName?.label} horizontal={true}>
                        <Paragraph>{prefillData?.givenName}</Paragraph>
                    </ControlField>

                    <ControlField control={controls.familyName} label={content.familyName?.label} horizontal={true}>
                        <Paragraph>
                            {NameFormatters.formattedLastName({
                                additionalName: prefillData?.additionalName || undefined,
                                familyName: prefillData?.familyName || undefined,
                            })}
                        </Paragraph>
                    </ControlField>

                    <ControlField control={controls.gender} label={content.gender?.label} horizontal={true}>
                        <Paragraph>{prefillData?.gender && genderTranslations[prefillData?.gender]}</Paragraph>
                    </ControlField>

                    <ControlField control={controls.birthday} label={content.birthday?.label} horizontal={true}>
                        <Paragraph>
                            {prefillData?.birthday && DateFormatters.formattedDate(prefillData?.birthday)}
                        </Paragraph>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Persoonsgegevens`)}>
            <Column spacing={4}>
                <ControlField control={controls.givenName} label={content?.givenName?.label} horizontal={true}>
                    <Input
                        name="givenName"
                        placeholder={content.givenName?.placeholder}
                        defaultValue={prefillData?.givenName ?? undefined}
                    />
                </ControlField>

                <ControlField
                    control={controls.additionalName}
                    label={content?.additionalName?.label}
                    horizontal={true}
                >
                    <Input
                        name="additionalName"
                        placeholder={content.additionalName?.placeholder}
                        defaultValue={prefillData?.additionalName ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.familyName} label={content.familyName?.label} horizontal={true}>
                    <Input
                        name="familyName"
                        placeholder={content.familyName?.placeholder}
                        defaultValue={prefillData?.familyName ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.gender} label={content?.gender?.label} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'gender'}
                            value={StudentGenderEnum.Male}
                            label={i18n._(t`Man`)}
                            defaultChecked={prefillData?.gender === StudentGenderEnum.Male}
                        />
                        <RadioButton
                            name={'gender'}
                            value={StudentGenderEnum.Female}
                            label={i18n._(t`Vrouw`)}
                            defaultChecked={prefillData?.gender === StudentGenderEnum.Female}
                        />
                        <RadioButton
                            name={'gender'}
                            value={StudentGenderEnum.X}
                            label={i18n._(t`X`)}
                            defaultChecked={prefillData?.gender === StudentGenderEnum.X}
                        />
                    </Column>
                </ControlField>

                <ControlField control={controls.birthday} label={content.birthday?.label} horizontal={true}>
                    <DateInput name="birthday" placeholder={content.birthday?.placeholder} />
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
