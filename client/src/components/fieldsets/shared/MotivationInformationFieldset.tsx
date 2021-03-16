import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Checkbox from '../../Core/DataEntry/Checkbox'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: MotivationInformationFieldsetModel
    readOnly?: true
}

export interface MotivationInformationFieldsetModel {
    skills: string[]
    triedThisBefore: string
    reasonWhy: string
    learningReason: string
    whyNowLearningReason: string
    learningPreference: string[]
    remark: string
}

const MotivationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Motivatie`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                        <p>{prefillData?.skills}</p>
                    </Field>

                    <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                        <p>{prefillData?.triedThisBefore}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                        <p>{prefillData?.reasonWhy}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                        <p>{prefillData?.learningReason}</p>
                    </Field>
                    <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                        <p>{prefillData?.whyNowLearningReason}</p>
                    </Field>
                    <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                        <p>{prefillData?.learningPreference}</p>
                    </Field>
                    <Field
                        label={i18n._(t`Opmerkingen voor afnemer`)}
                        horizontal={true}
                        description={i18n._(
                            t`Bijzonderheden bijv. over huis, lesnemer, gezin, wensen, taalniveau, dagbesteding etc.`
                        )}
                    >
                        <p>{prefillData?.remark}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Motivatie`)}>
            <Column spacing={10}>
                <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                    <Column spacing={8}>
                        <Field label={i18n._(t`DIGITAAL VAARDIG WORDEN`)}>
                            <Column spacing={3}>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Gezindsleden`)}</p>
                                </Row>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Buren`)}</p>
                                </Row>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Familie (buiten gezin om)`)}</p>
                                </Row>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Weduwe/Hulpverleners`)}</p>
                                </Row>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Vrienden, kennissen`)}</p>
                                </Row>
                            </Column>
                        </Field>
                        <Field label={i18n._(t`BETER LEREN LEZEN`)}>
                            <Column spacing={2}>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Voorlezen aan mijn (klein)kind`)}</p>
                                </Row>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Een bijsluiter begrijpen`)}</p>
                                </Row>
                            </Column>
                        </Field>
                        <Field label={i18n._(t`BETER LEREN SCHRIJVEN`)}>
                            <Column spacing={2}>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Sollicitatiebrief schrijven`)}</p>
                                </Row>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Een kaart aan familie kunnen sturen`)}</p>
                                </Row>
                            </Column>
                        </Field>
                        <Field label={i18n._(t`BETER LEREN REKENEN`)}>
                            <Column spacing={2}>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Mijn eigen administratie kunnen doen`)}</p>
                                </Row>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Hoeveelheden bij een recept kunnen uitrekenen`)}</p>
                                </Row>
                            </Column>
                        </Field>
                        <Field label={i18n._(t`ANDERS`)}>
                            <Column spacing={2}>
                                <Row>
                                    <Checkbox name={'skills'} />
                                    <p>{i18n._(t`Anders, namelijk:`)}</p>
                                </Row>

                                <Input name="callSign" placeholder={i18n._(t`Roepnaam`)} />
                            </Column>
                        </Field>
                    </Column>
                </Field>
                <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'tried-this-before'} value="yes" />
                            <p>{i18n._(t`Ja`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'tried-this-before'} value="no" />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                    <Input
                        name="reasonWhy"
                        placeholder={i18n._(t`Reden waarom`)}
                        defaultValue={prefillData?.reasonWhy}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                    <Input
                        name="learningReason"
                        placeholder={i18n._(t`Reden voor dit`)}
                        defaultValue={prefillData?.learningReason}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                    <Input
                        name="whyNowLearningReason"
                        placeholder={i18n._(t`Reden voor nu`)}
                        defaultValue={prefillData?.whyNowLearningReason}
                    />
                </Field>
                <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                    <Column spacing={2}>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`In een groep`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`Een-op-een`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`In thuis omgeving`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`In de bibliotheek of elders`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'learningPreference'} />
                            <p>{i18n._(t`Online`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field
                    label={i18n._(t`Opmerkingen voor afnemer`)}
                    description={
                        'Bijzonderheden bijv. over huis, lesnemer, gezin, wensen, taalniveau, dagbesteding etc.'
                    }
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Input
                            name="whyNowLearningReason"
                            placeholder={i18n._(t`Reden voor nu`)}
                            defaultValue={prefillData?.whyNowLearningReason}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default MotivationInformationFieldset
