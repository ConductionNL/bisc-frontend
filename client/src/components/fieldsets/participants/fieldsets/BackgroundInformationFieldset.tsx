import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import { YearInput } from 'components/Core/DataEntry/YearInput'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    studentFoundViaEnumTranslations,
    studentNetworkEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { IntakeFoundVia, IntakeNetwork, IntakeParticipationLadder, Maybe } from 'api/types/types'

interface Props {
    prefillData?: BackgroundInformationPrefillData
    readOnly?: boolean
}

export interface BackgroundInformationFieldsetModel {
    'intake.foundVia'?: Maybe<IntakeFoundVia>
    'intake.foundViaOther'?: Maybe<string>
    'intake.wentToLanguageHouseBefore'?: Maybe<'YES' | 'NO'>
    'intake.wentToLanguageHouseBeforeReason'?: Maybe<string>
    'intake.wentToLanguageHouseBeforeYear'?: Maybe<string>
    'intake.network'?: Maybe<IntakeNetwork[]>
    'intake.participationLadder'?: Maybe<IntakeParticipationLadder>
}

export interface BackgroundInformationPrefillData {
    'intake.foundVia'?: Maybe<IntakeFoundVia>
    'intake.foundViaOther'?: Maybe<string>
    'intake.wentToLanguageHouseBefore'?: Maybe<boolean>
    'intake.wentToLanguageHouseBeforeReason'?: Maybe<string>
    'intake.wentToLanguageHouseBeforeYear'?: Maybe<number>
    'intake.network'?: Maybe<IntakeNetwork[]>
    'intake.participationLadder'?: Maybe<IntakeParticipationLadder>
}

export const BackgroundInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const [wentToLanguageHouseBefore, setWentToLanguageHouseBefore] = useState<boolean | undefined>(
        prefillData?.['intake.wentToLanguageHouseBefore'] === true
    )

    const onChangeWentToLanguageHouseBefore: ChangeEventHandler<HTMLInputElement> = event => {
        setWentToLanguageHouseBefore(event.currentTarget.value === 'YES')
    }

    const [foundVia, setFoundVia] = useState<IntakeFoundVia | undefined>(prefillData?.['intake.foundVia'] ?? undefined)
    const networkOptions = getStudentNetworkOptions()
    const foundViaOptions = getFoundViaOptions()

    useEffect(() => {
        setFoundVia(prefillData?.['intake.foundVia'] ?? undefined)
    }, [prefillData])

    if (readOnly) {
        return (
            <Section title={i18n._(t`Achtergrond`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Hoe ben je bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {prefillData?.['intake.foundVia'] &&
                                    studentFoundViaEnumTranslations[prefillData?.['intake.foundVia']]}
                            </Paragraph>
                            {prefillData?.['intake.foundVia'] === IntakeFoundVia.Other && (
                                <ConditionalCard>
                                    <Column spacing={5}>
                                        <Field label={i18n._(t`Gevonden via`)}>
                                            <Paragraph>{prefillData?.['intake.foundViaOther']}</Paragraph>
                                        </Field>
                                    </Column>
                                </ConditionalCard>
                            )}
                        </Column>
                    </Field>

                    <Field label={i18n._(t`Ben je eerder bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {prefillData?.['intake.wentToLanguageHouseBefore'] === true &&
                                    i18n._(t`Ja, namelijk...`)}
                                {prefillData?.['intake.wentToLanguageHouseBefore'] === false && i18n._(t`Nee`)}
                            </Paragraph>
                            {wentToLanguageHouseBefore && (
                                <ConditionalCard>
                                    <Column spacing={5}>
                                        <Field label={i18n._(t`Reden`)}>
                                            <Paragraph>
                                                {prefillData?.['intake.wentToLanguageHouseBeforeReason']}
                                            </Paragraph>
                                        </Field>

                                        <Field label={i18n._(t`Jaar`)}>
                                            <Paragraph>
                                                {prefillData?.['intake.wentToLanguageHouseBeforeYear']}
                                            </Paragraph>
                                        </Field>
                                    </Column>
                                </ConditionalCard>
                            )}
                        </Column>
                    </Field>

                    <Field
                        label={i18n._(t`Netwerk:  met wie heb je contact, met wie praat je zoal?`)}
                        horizontal={true}
                    >
                        {renderIntakeNetworkCheckboxes()}
                    </Field>

                    <Field
                        label={i18n._(t`Waar bevindt de taalleerder zich op de participatieladder`)}
                        horizontal={true}
                    >
                        <p>{prefillData?.['intake.participationLadder']}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Achtergrond`)}>
            <Column spacing={10}>
                <Field label={i18n._(t`Hoe ben je bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                    <Column spacing={4}>
                        <Select
                            list="intake.foundVia"
                            name="intake.foundVia"
                            placeholder={i18n._(t`Selecteer reden`)}
                            options={foundViaOptions}
                            onChangeValue={value => setFoundVia(value as IntakeFoundVia)}
                            defaultValue={prefillData?.['intake.foundVia'] ?? undefined}
                        />
                        {foundVia === IntakeFoundVia.Other && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Gevonden via`)}>
                                        <Input
                                            name="intake.foundViaOther"
                                            placeholder={i18n._(t`Reden`)}
                                            defaultValue={prefillData?.['intake.foundViaOther'] ?? undefined}
                                        />
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>

                <Field label={i18n._(t`Ben je eerder bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'intake.wentToLanguageHouseBefore'}
                            value={'YES'}
                            label={i18n._(t`Ja, namelijk...`)}
                            onChange={onChangeWentToLanguageHouseBefore}
                            defaultChecked={prefillData?.['intake.wentToLanguageHouseBefore'] === true}
                        />
                        {wentToLanguageHouseBefore && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Reden`)}>
                                        <Input
                                            name="intake.wentToLanguageHouseBeforeReason"
                                            placeholder={i18n._(t`Reden`)}
                                            defaultValue={
                                                prefillData?.['intake.wentToLanguageHouseBeforeReason'] ?? undefined
                                            }
                                        />
                                    </Field>
                                    <Field label={i18n._(t`Jaar`)}>
                                        <YearInput
                                            name="intake.wentToLanguageHouseBeforeYear"
                                            placeholder={i18n._(t`Jaar, bijvoorbeeld: 2021`)}
                                            defaultValue={
                                                prefillData?.['intake.wentToLanguageHouseBeforeYear'] ?? undefined
                                            }
                                        />
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            name={'intake.wentToLanguageHouseBefore'}
                            value={'NO'}
                            label={i18n._(t`Nee`)}
                            onChange={onChangeWentToLanguageHouseBefore}
                            defaultChecked={prefillData?.['intake.wentToLanguageHouseBefore'] === false}
                        />
                    </Column>
                </Field>

                <Field label={i18n._(t`Netwerk: met wie heb je contact, met wie praat je zoal?`)} horizontal={true}>
                    <Column spacing={4}>{renderIntakeNetworkCheckboxes()}</Column>
                </Field>

                <Field label={i18n._(t`Waar bevindt de taalleerder zich op de participatieladder`)} horizontal={true}>
                    <Column spacing={4}>
                        {Object.values(IntakeParticipationLadder).map((participationLadderValue, index) => (
                            <RadioButton
                                key={index}
                                name={'intake.participationLadder'}
                                value={participationLadderValue}
                                label={i18n._(t`${participationLadderValue}`)} // value is used as label
                                defaultChecked={
                                    prefillData?.['intake.participationLadder'] === participationLadderValue
                                }
                            />
                        ))}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderIntakeNetworkCheckboxes() {
        if (readOnly) {
            const selectedIntakeNetworks = prefillData?.['intake.network'] || []

            return selectedIntakeNetworks.map((network, index) => {
                return (
                    <Row key={index}>
                        <p>{networkOptions.find(networkOption => networkOption.value === network)?.label}</p>
                    </Row>
                )
            })
        }

        return networkOptions.map((network, index) => {
            return (
                <React.Fragment key={index}>
                    <Checkbox
                        label={network.label}
                        name={`intake.network[]`}
                        value={network.value}
                        defaultChecked={prefillData?.['intake.network']?.includes(network.value)}
                    />
                </React.Fragment>
            )
        })
    }

    function getFoundViaOptions() {
        return Object.values(IntakeFoundVia).map(value => ({
            label: studentFoundViaEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }

    function getStudentNetworkOptions() {
        return Object.values(IntakeNetwork).map(value => ({
            label: studentNetworkEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}
