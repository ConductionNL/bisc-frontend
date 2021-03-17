import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import ConditionalCard from '../../../Core/Containers/ConditionalCard'
import DateInput from '../../../Core/DataEntry/DateInput'
import RadioButton from '../../../Core/DataEntry/RadioButton'
import Select from '../../../Core/DataEntry/Select'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'
import Paragraph from '../../../Core/Typography/Paragraph'

interface Props {
    prefillData?: CivicIntegrationFieldsetModel
    readOnly?: true
}

export interface CivicIntegrationFieldsetModel {
    civicIntegrationRequirement: string
    reason: string
}

const CivicIntegrationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Inburgeringsplichtig`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Inburgeringsplichtig`)} horizontal={true}>
                        <p>{prefillData?.civicIntegrationRequirement}</p>
                    </Field>
                    <Field label={i18n._(t`Reden`)} horizontal={true}>
                        <p>{prefillData?.reason}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Inburgeringsplichtig`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Inburgeringsplichtig`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'civic-integration-requirement'} value="no" />
                            <p>{i18n._(t`Nee, omdat`)}</p>
                        </Row>
                        <ConditionalCard>
                            <Field label={i18n._(t`Selecteer de reden?`)}>
                                <Select name="reason" placeholder={i18n._(t`Selecteer reden`)} options={['test']} />
                            </Field>
                        </ConditionalCard>
                        <Row>
                            <RadioButton name={'civic-integration-requirement'} value="yes" />
                            <p>{i18n._(t`Ja`)}</p>
                        </Row>
                        <ConditionalCard warning={true}>
                            <Paragraph>
                                De inburgering moet eerst worden afgerond voor aan activiteiten van het Taalhuis kan
                                worden deelgenomen.
                            </Paragraph>
                        </ConditionalCard>
                        <Row>
                            <RadioButton name={'civic-integration-requirement'} value="in-progress" />
                            <p>{i18n._(t`Volgt momenteel inburgering`)}</p>
                        </Row>
                        <ConditionalCard>
                            <Field label={i18n._(t`Datum van afronding?`)}>
                                <DateInput name="completion-date" placeholder={i18n._(t`DD / MM / JJJJ`)} />
                            </Field>
                        </ConditionalCard>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default CivicIntegrationFieldset
