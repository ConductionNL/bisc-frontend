import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: TemporaryPersonInformationFieldsetModel
    readOnly?: true
}

export interface TemporaryPersonInformationFieldsetModel {
    lastName: string
    insertion: string
    nickName: string
    gender: string
    dateOfBirth: string
}

export enum Roles {
    coordinator = 'coordinator',
    mentor = 'mentor',
    volunteer = 'volunteer',
}

// This fieldset is temporary and should not be used in the future
const TemporaryPersonInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Persoonsgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                        <p>{`${prefillData?.lastName}, ${prefillData?.insertion}`}</p>
                    </Field>

                    <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                        <p>{prefillData?.nickName}</p>
                    </Field>
                    <Field label={i18n._(t`Geslacht`)} horizontal={true}>
                        <p>{prefillData?.gender}</p>
                    </Field>

                    <Field label={i18n._(t`Geboortedatum`)} horizontal={true}>
                        <p>{prefillData?.dateOfBirth}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Persoonsgegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                    <Input
                        name="lastName"
                        placeholder={i18n._(t`Achternaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.lastName}
                    />
                </Field>
                <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                    <Input
                        name="insertion"
                        placeholder={i18n._(t`Tussenvoegsel`)}
                        defaultValue={prefillData?.insertion}
                    />
                </Field>
                <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                    <Input
                        name="nickName"
                        placeholder={i18n._(t`Roepnaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.insertion}
                    />
                </Field>
                <Field label={i18n._(t`Geslacht`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'gender'} value="male" />
                            <p>{i18n._(t`Man`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'gender'} value="female" />
                            <p>{i18n._(t`Vrouw`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'gender'} value="x" />
                            <p>{i18n._(t`X`)}</p>
                        </Row>
                    </Column>
                </Field>

                <Field label={i18n._(t`Geboortedatum`)} horizontal={true}>
                    <DateInput name="date-of-birth" placeholder={i18n._(t`Land`)} />
                </Field>
            </Column>
        </Section>
    )
}

export default TemporaryPersonInformationFieldset
