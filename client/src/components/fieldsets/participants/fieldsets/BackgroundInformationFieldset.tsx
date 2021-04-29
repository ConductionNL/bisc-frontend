import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import { YearInput } from 'components/Core/DataEntry/YearInput'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    studentFoundViaEnumTranslations,
    studentNetworkEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import { Maybe, Scalars, StudentFoundViaEnum, StudentNetworkEnum } from 'generated/graphql'
import React, { useEffect, useState } from 'react'
import ConditionalCard from '../../../Core/Containers/ConditionalCard'
import Checkbox from '../../../Core/DataEntry/Checkbox'
import RadioButton from '../../../Core/DataEntry/RadioButton'
import Select from '../../../Core/DataEntry/Select'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'

interface Props {
    prefillData?: BackgroundInformationPrefillData
    readOnly?: boolean
}

export interface BackgroundInformationFieldsetModel {
    foundVia: StudentFoundViaEnum
    foundViaOther: string
    wentToLanguageHouseBefore: BackgroundInformationFieldsetWentToLanguageHouseBefore
    wentToLanguageHouseBeforeReason: string
    wentToLanguageHouseBeforeYear: string
    network: string
    participationLadder: string
}

export interface BackgroundInformationPrefillData {
    foundVia?: Maybe<StudentFoundViaEnum>
    foundViaOther?: Maybe<Scalars['String']>
    wentToLanguageHouseBefore?: Maybe<Scalars['Boolean']>
    wentToLanguageHouseBeforeReason?: Maybe<Scalars['String']>
    wentToLanguageHouseBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Array<StudentNetworkEnum>>
    participationLadder?: Maybe<Scalars['Int']>
}
export enum BackgroundInformationFieldsetWentToLanguageHouseBefore {
    yes = 'yes',
    no = 'no',
}
const BackgroundInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const [wentToLanguageHouseBefore, setWentToLanguageHouseBefore] = useState<boolean | undefined>(undefined)
    const [foundVia, setFoundVia] = useState<StudentFoundViaEnum | undefined>(undefined)
    const networks = getStudentNetworkOptions()
    const foundViaOptions = getFoundViaOptions()

    useEffect(() => {
        setFoundVia(prefillData?.foundVia ?? undefined)
    }, [prefillData])

    if (readOnly) {
        return (
            <Section title={i18n._(t`Achtergrond`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Hoe ben je bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                        <Paragraph>
                            {foundViaOptions.find(option => prefillData?.foundVia === option.value)?.label}
                        </Paragraph>
                        {prefillData?.foundVia === StudentFoundViaEnum.Other && (
                            <Paragraph italic={true}>{prefillData?.foundViaOther}</Paragraph>
                        )}
                    </Field>

                    <Field label={i18n._(t`Ben je eerder bij het digi(Taalhuis terecht gekomen?`)} horizontal={true}>
                        <Paragraph>
                            {prefillData?.wentToLanguageHouseBefore ? i18n._(t`Ja, namelijk:`) : i18n._(t`Nee`)}
                        </Paragraph>
                        {prefillData?.wentToLanguageHouseBefore && (
                            <ConditionalCard>
                                <Paragraph italic={true}>{prefillData?.wentToLanguageHouseBeforeReason}</Paragraph>
                                <Paragraph italic={true}>{prefillData?.wentToLanguageHouseBeforeYear}</Paragraph>
                            </ConditionalCard>
                        )}
                    </Field>

                    <Field
                        label={i18n._(t`Netwerk:  met wie heb je contact, met wie praat je zoal?`)}
                        horizontal={true}
                    >
                        {renderLearningNetworkCheckboxes()}
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
                        list="foundVia"
                        name="foundVia"
                        placeholder={i18n._(t`Selecteer reden`)}
                        options={foundViaOptions}
                        onChangeValue={value => setFoundVia(value as StudentFoundViaEnum)}
                        defaultValue={prefillData?.foundVia ?? undefined}
                    />
                </Field>

                {foundVia === StudentFoundViaEnum.Other && (
                    <ConditionalCard>
                        <Field label={i18n._(t`Gevonden via`)}>
                            <Input
                                name="foundViaOther"
                                placeholder={i18n._(t`Reden`)}
                                defaultValue={prefillData?.foundViaOther ?? undefined}
                            />
                        </Field>
                    </ConditionalCard>
                )}

                <Field label={i18n._(t`Ben je eerder bij het digi(Taalhuis terecht gekomen?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'wentToLanguageHouseBefore'}
                            value={BackgroundInformationFieldsetWentToLanguageHouseBefore.yes}
                            label={i18n._(t`Ja, namelijk:`)}
                            onChange={e => setWentToLanguageHouseBefore(e.target.value === 'yes')}
                        />
                        {wentToLanguageHouseBefore && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Reden`)}>
                                        <Input
                                            name="wentToLanguageHouseBeforeReason"
                                            placeholder={i18n._(t`Reden`)}
                                            defaultValue={prefillData?.wentToLanguageHouseBeforeReason ?? undefined}
                                        />
                                    </Field>
                                    <Field label={i18n._(t`Jaar`)}>
                                        <YearInput
                                            name="wentToLanguageHouseBeforeYear"
                                            placeholder={i18n._(t`Jaar, bijvoorbeeld: 2021`)}
                                            defaultValue={prefillData?.wentToLanguageHouseBeforeYear ?? undefined}
                                        />
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            name={'wentToLanguageHouseBefore'}
                            value={BackgroundInformationFieldsetWentToLanguageHouseBefore.no}
                            label={i18n._(t`Nee`)}
                            onChange={e => setWentToLanguageHouseBefore(e.target.value === 'yes')}
                        />
                    </Column>
                </Field>

                <Field label={i18n._(t`Netwerk:  met wie heb je contact, met wie praat je zoal?`)} horizontal={true}>
                    <Column spacing={4}>{renderLearningNetworkCheckboxes()}</Column>
                </Field>

                <Field label={i18n._(t`Waar bevindt de taalleerder zich op de participatieladder`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton name={'participationLadder'} value="1" label={i18n._(t`1 geïsoleerd`)} />
                        <RadioButton name={'participationLadder'} value="2" label={i18n._(t`2 sociale contacten`)} />
                        <RadioButton
                            name={'participationLadder'}
                            value="3"
                            label={i18n._(t`3 deelname georganiseerde activiteiten`)}
                        />
                        <RadioButton
                            name={'participationLadder'}
                            value="4"
                            label={i18n._(t`4 vrijwilligers werk/maatschappelijke activering`)}
                        />
                        <RadioButton
                            name={'participationLadder'}
                            value="5"
                            label={i18n._(t`5 betaald werk met ondersteuning`)}
                        />
                        <RadioButton name={'participationLadder'} value="6" label={i18n._(t`6 betaald werk`)} />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderLearningNetworkCheckboxes() {
        if (readOnly && prefillData?.network) {
            return prefillData?.network?.map((network, index) => {
                return (
                    <Row key={index}>
                        <p>{networks.find(networkOption => networkOption.value === network)?.label}</p>
                    </Row>
                )
            })
        }

        return networks.map((network, index) => {
            return (
                <Row key={index}>
                    <Checkbox
                        label={network.label}
                        name={'network'}
                        value={network.value}
                        defaultChecked={prefillData?.network?.includes(network.value)}
                    />
                </Row>
            )
        })
    }

    function getFoundViaOptions() {
        return Object.values(StudentFoundViaEnum).map(value => ({
            label: studentFoundViaEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }

    function getStudentNetworkOptions() {
        return Object.values(StudentNetworkEnum).map(value => ({
            label: studentNetworkEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}

export default BackgroundInformationFieldset
