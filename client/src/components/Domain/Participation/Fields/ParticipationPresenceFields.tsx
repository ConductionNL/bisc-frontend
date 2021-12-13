import { useLingui } from '@lingui/react'
import { Maybe, ParticipationEndReason } from 'api/types/types'
import DateInput from 'components/Core/DataEntry/DateInput'
import { Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { participationEndOptionsTranslations } from 'components/Domain/Groups/Translations/groupTranslations'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props {
    readOnly?: boolean
    defaultValues?: {
        startParticipation: Maybe<Date | string>
        endParticipation: Maybe<Date | string>
        reasonEndParticipation: Maybe<ParticipationEndReason>
    }
}

export function ParticipationPresenceFields(props: Props) {
    const { readOnly, defaultValues } = props
    const { i18n } = useLingui()

    const endParticipationOptions = Object.values(ParticipationEndReason).map(v => ({
        value: v,
        label: participationEndOptionsTranslations[v],
    }))

    return (
        <Section title={i18n._('Aanwezigheid')}>
            <Column spacing={4}>
                <Field readOnly={readOnly} label={i18n._('Start deelname')} horizontal={true}>
                    <DateInput
                        readOnly={readOnly}
                        name="startParticipation"
                        placeholder="DD / MM / YYYY"
                        defaultValue={DateFormatters.toString(defaultValues?.startParticipation)}
                    />
                </Field>
                <Field readOnly={readOnly} label={i18n._('Einde deelname')} horizontal={true}>
                    <DateInput
                        readOnly={readOnly}
                        name="endParticipation"
                        placeholder="DD / MM / YYYY"
                        defaultValue={DateFormatters.toString(defaultValues?.endParticipation)}
                    />
                </Field>
                <Field readOnly={readOnly} label={i18n._('Reden einde deelname')} horizontal={true}>
                    {readOnly ? (
                        defaultValues?.reasonEndParticipation
                    ) : (
                        <Select
                            name="reasonEndParticipation"
                            placeholder={i18n._('Selecteer reden')}
                            options={endParticipationOptions}
                            defaultValue={
                                defaultValues?.reasonEndParticipation
                                    ? {
                                          value: defaultValues?.reasonEndParticipation,
                                          label: defaultValues?.reasonEndParticipation,
                                      }
                                    : undefined
                            }
                        />
                    )}
                </Field>
            </Column>
        </Section>
    )
}
