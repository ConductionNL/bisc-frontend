import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import ConditionalCard from '../../Core/Containers/ConditionalCard'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Select from '../../Core/DataEntry/Select'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: DutchNTFieldsetModel
    readOnly?: true
}

export interface DutchNTFieldsetModel {
    NTLevel: string
}

const DutchNTFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Adresgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true}>
                        <p>{prefillData?.NTLevel}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Adresgegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Ervaring met de doelgroep`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'NT-level'} value="NT1" />
                            <p>{i18n._(t`NT1`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'NT-level'} value="NT2" />
                            <p>{i18n._(t`NT2`)}</p>
                        </Row>
                        <ConditionalCard>
                            <Column spacing={5}>
                                <Field label={i18n._(t`In Nederland sinds`)}>
                                    <DateInput name="in-holland-since" placeholder={i18n._(t`JJJJ`)} />
                                </Field>

                                <Field label={i18n._(t`Welke taal spreek je het meest in het dagelijks leven?`)}>
                                    <Input name="level" placeholder={i18n._(t`Niveau`)} defaultValue={undefined} />
                                </Field>

                                <Field label={i18n._(t`Ken je het latijnse alfabet?`)}>
                                    <Column spacing={3}>
                                        <Row>
                                            <RadioButton name={'latin-alfabeth'} value="yes" />
                                            <p>{i18n._(t`Ja`)}</p>
                                        </Row>
                                        <Row>
                                            <RadioButton name={'latin-alfabeth'} value="no" />
                                            <p>{i18n._(t`Nee`)}</p>
                                        </Row>
                                    </Column>
                                </Field>

                                <Field label={i18n._(t`Laatst bekende taalniveau`)} horizontal={true}>
                                    <Select
                                        name="reason"
                                        placeholder={i18n._(t`Selecteer niveau`)}
                                        options={['test']}
                                    />
                                </Field>
                            </Column>
                        </ConditionalCard>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default DutchNTFieldset
