import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import ConditionalCard from '../../../Core/Containers/ConditionalCard'
import Checkbox from '../../../Core/DataEntry/Checkbox'
import DateInput from '../../../Core/DataEntry/DateInput'
import RadioButton from '../../../Core/DataEntry/RadioButton'
import Select from '../../../Core/DataEntry/Select'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'

interface Props {
    prefillData?: BackgroundInformationFieldsetModel
    readOnly?: boolean
}

export interface BackgroundInformationFieldsetModel {
    foundVia: string
    foundViaBefore: string
    network: string[]
    participationLadder: string
}

const BackgroundInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Achtergrond`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Hoe ben je bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                        <p>{prefillData?.foundVia}</p>
                    </Field>

                    <Field label={i18n._(t`Ben je eerder bij het digi(Taalhuis terecht gekomen?`)} horizontal={true}>
                        <p>{prefillData?.foundViaBefore}</p>
                    </Field>

                    <Field
                        label={i18n._(t`Netwerk:  met wie heb je contact, met wie praat je zoal?`)}
                        horizontal={true}
                    >
                        <p>{prefillData?.network}</p>
                    </Field>

                    <Field
                        label={i18n._(t`Waar bevindt de taalleerder zich op de participatieladder`)}
                        horizontal={true}
                    >
                        <p>{prefillData?.participationLadder}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Achtergrond`)}>
            <Column spacing={10}>
                <Field label={i18n._(t`Hoe ben je bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                    <Select
                        name="foundVia"
                        placeholder={i18n._(t`Selecteer reden`)}
                        options={['test']}
                        defaultValue={prefillData?.foundVia}
                    />
                </Field>
                <Field label={i18n._(t`Ben je eerder bij het digi(Taalhuis terecht gekomen?`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'foundViaBefore'} value="yes" />
                            <p>{i18n._(t`Ja, namelijk:`)}</p>
                        </Row>
                        <ConditionalCard>
                            <Column spacing={4}>
                                <Field label={i18n._(t`Reden`)}>
                                    <Select name="reason" placeholder={i18n._(t`Selecteer reden`)} options={['test']} />
                                </Field>
                                <Field label={i18n._(t`Jaar`)}>
                                    <DateInput name="date" placeholder={i18n._(t`01/01/2020`)} />
                                </Field>
                            </Column>
                        </ConditionalCard>
                        <Row>
                            <RadioButton name={'foundViaBefore'} value="no" />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Netwerk:  met wie heb je contact, met wie praat je zoal?`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <Checkbox name={'network'} />
                            <p>{i18n._(t`Gezindsleden`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'network'} />
                            <p>{i18n._(t`Buren`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'network'} />
                            <p>{i18n._(t`Familie (buiten gezin om)`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'network'} />
                            <p>{i18n._(t`Weduwe/Hulpverleners`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'network'} />
                            <p>{i18n._(t`Vrienden, kennissen`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'network'} />
                            <p>{i18n._(t`Mensen bij moskee of kerk`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'network'} />
                            <p>{i18n._(t`Ik ken mensen met wie ik mijn eigen taal spreek`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'network'} />
                            <p>{i18n._(t`Weduwe/Ik ken mensen met wie ik Nederlands spreek`)}</p>
                        </Row>
                    </Column>
                </Field>

                <Field label={i18n._(t`Waar bevindt de taalleerder zich op de participatieladder`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'participationLadder'} value="isolated" />
                            <p>{i18n._(t`1 geïsoleerd`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'participationLadder'} value="social contacts" />
                            <p>{i18n._(t`2 sociale contacten`)}</p>
                        </Row>
                        <Row>
                            <RadioButton
                                name={'participationLadder'}
                                value="participation in organized activities
"
                            />
                            <p>{i18n._(t`3 deelname georganiseerde activiteiten`)}</p>
                        </Row>
                        <Row>
                            <RadioButton
                                name={'participationLadder'}
                                value="volunteer work / social activation
"
                            />
                            <p>{i18n._(t`4 vrijwilligers werk/maatschappelijke activering`)}</p>
                        </Row>
                        <Row>
                            <RadioButton
                                name={'participationLadder'}
                                value="paid work with support
"
                            />
                            <p>{i18n._(t`5 betaald werk met ondersteuning`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'participationLadder'} value="paid work" />
                            <p>{i18n._(t`6 betaald werk`)}</p>
                        </Row>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default BackgroundInformationFieldset
