import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import LabelTag, { LabelColor } from '../../Core/DataDisplay/LabelTag/LabelTag'
import Checkbox from '../../Core/DataEntry/Checkbox'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: GuidanceInformationFieldsetModel
    readOnly?: true
}

export interface GuidanceInformationFieldsetModel {
    lastname: string
    insertion: string
    callSign: string
    phonenumber: string
}

const GuidanceInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true} required={true}>
                        <p>{'X'}</p>
                    </Field>

                    <Field label={i18n._(t`Voorkeur vrijwilligerswerk`)} horizontal={true}>
                        <p>{'1234 AB'}</p>
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <p>{'Utrecht'}</p>
                    </Field>

                    <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                        <p>{'06 - 123 456 78'}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Begeleiding`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Doelgroep voorkeur`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <Checkbox name={'no'} value="no" />
                            <p>N1</p>
                        </Row>
                        <Row>
                            <Checkbox name={'yes'} value="ja" />
                            <p>N2</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Voorkeur vrijwilligerswerk`)} horizontal={true}>
                    <Input
                        name="communitywork"
                        placeholder={i18n._(t`Voorkeur`)}
                        validators={[GenericValidators.required]}
                        defaultValue={'Voorkeur'}
                    />
                </Field>
                <Field
                    label={i18n._(t`Hoe ben je bij het Taalhuis terecht gekomen voor vrijwilligerswerk?`)}
                    horizontal={true}
                >
                    <Input
                        name="£££"
                        placeholder={i18n._(t``)}
                        validators={[GenericValidators.required]}
                        defaultValue={'Via mijn buurvrouw'}
                    />
                </Field>

                <Field label={i18n._(t`Ervaring met de doelgroep`)} horizontal={true} required={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'no'} value="no" />
                            <p>Bellen</p>
                        </Row>
                        <Row>
                            <RadioButton name={'yes'} value="ja" />
                            <p>Ja, namelijk</p>
                        </Row>
                        <Row>
                            <Input
                                name="anders"
                                placeholder={i18n._(t`Anders`)}
                                validators={[GenericValidators.required]}
                                defaultValue={'In asielzoekerscentrum gewerkters'}
                            />
                        </Row>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default GuidanceInformationFieldset
