import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { StudentCivicIntegrationRequirementEnum, StudentCivicIntegrationRequirementReasonEnum } from 'generated/enums'
import { Maybe } from 'generated/graphql'
import React, { ChangeEventHandler, useState } from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import DateInput from 'components/Core/DataEntry/DateInput'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    civicIntegrationRequirementReasonTranslations,
    civicIntegrationRequirementTranslations,
} from '../translations/participantsTranslations'

interface Props {
    prefillData?: CivicIntegrationFieldsetModel
    readOnly?: boolean
}

export interface CivicIntegrationFieldsetModel {
    civicIntegrationRequirement?: Maybe<StudentCivicIntegrationRequirementEnum>
    civicIntegrationRequirementReason?: Maybe<StudentCivicIntegrationRequirementReasonEnum>
    civicIntegrationRequirementFinishDate?: Maybe<string>
}

const CivicIntegrationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const [civicIntegrationRequirement, setCivicIntegrationRequirement] = useState<
        Maybe<StudentCivicIntegrationRequirementEnum> | undefined
    >(prefillData?.civicIntegrationRequirement)

    const onChangeCivicIntegrationRequirement: ChangeEventHandler<HTMLInputElement> = event => {
        setCivicIntegrationRequirement(event.currentTarget.value as StudentCivicIntegrationRequirementEnum)
    }

    if (readOnly) {
        return (
            <Section title={i18n._(t`Inburgeringsplichtig`)}>
                {/* <Column spacing={4}>
                    <Field label={i18n._(t`Inburgeringsplichtig`)} horizontal={true}>
                        <p>{prefillData?.civicIntegrationRequirement && civicIntegrationRequirementTranslations[prefillData?.civicIntegrationRequirement]}</p>
                    </Field>
                    <Field label={i18n._(t`Reden`)} horizontal={true}>
                        <p>{prefillData?.civicIntegrationRequirementReason && civicIntegrationRequirementReasonTranslations[prefillData?.civicIntegrationRequirementReason]}</p>
                    </Field>
                </Column> */}
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Inburgeringsplichtig`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Inburgeringsplichtig`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'civicIntegrationRequirement'}
                            value={StudentCivicIntegrationRequirementEnum.No}
                            checked={civicIntegrationRequirement === StudentCivicIntegrationRequirementEnum.No}
                            onChange={onChangeCivicIntegrationRequirement}
                            label={i18n._(t`Nee`)}
                        />
                        {civicIntegrationRequirement === StudentCivicIntegrationRequirementEnum.No && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Selecteer de reden`)}>
                                    <Select
                                        list="civicIntegrationRequirementReason"
                                        name="civicIntegrationRequirementReason"
                                        placeholder={i18n._(t`Selecteer reden`)}
                                        options={Object.values(StudentCivicIntegrationRequirementReasonEnum).map(
                                            value => ({
                                                value,
                                                label: civicIntegrationRequirementReasonTranslations[value] || value,
                                            })
                                        )}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            name={'civicIntegrationRequirement'}
                            value={StudentCivicIntegrationRequirementEnum.Yes}
                            checked={civicIntegrationRequirement === StudentCivicIntegrationRequirementEnum.Yes}
                            onChange={onChangeCivicIntegrationRequirement}
                            label={i18n._(t`Ja`)}
                        />
                        {civicIntegrationRequirement === StudentCivicIntegrationRequirementEnum.Yes && (
                            <ConditionalCard warning={true}>
                                <Paragraph>
                                    {i18n._(
                                        t`De inburgering moet eerst worden afgerond voor aan activiteiten van het Taalhuis kan worden deelgenomen.`
                                    )}
                                </Paragraph>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            name={'civicIntegrationRequirement'}
                            value={StudentCivicIntegrationRequirementEnum.CurrentlyWorkingOnIntegration}
                            checked={
                                civicIntegrationRequirement ===
                                StudentCivicIntegrationRequirementEnum.CurrentlyWorkingOnIntegration
                            }
                            onChange={onChangeCivicIntegrationRequirement}
                            label={i18n._(t`Volgt momenteel inburgering`)}
                        />
                        {civicIntegrationRequirement ===
                            StudentCivicIntegrationRequirementEnum.CurrentlyWorkingOnIntegration && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Datum van afronding?`)}>
                                    <DateInput
                                        name={'civicIntegrationRequirementFinishDate'}
                                        placeholder={i18n._(t`DD / MM / JJJJ`)}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default CivicIntegrationFieldset
