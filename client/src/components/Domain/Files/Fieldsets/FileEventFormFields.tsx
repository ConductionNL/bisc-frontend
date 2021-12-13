import styles from './SharedEventDetailFieldset.module.scss'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import DateInput from 'components/Core/DataEntry/DateInput'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import { ContactMoment, ContactType } from 'api/types/types'
import { PostPutContactMomentParams } from 'api/contactMoment/contactMoment'
import { Select } from 'components/Core/DataEntry/Select'

interface Props {
    defaultValues?: ContactMoment
}

export type FileEventFormData = Pick<PostPutContactMomentParams, 'type' | 'date' | 'explanation'>

export const FileEventFormFields = (props: Props) => {
    const eventDetailTypesTranslations = {
        [ContactType.FinalTalk]: i18n._(t`Eindgesprek`),
        [ContactType.Remark]: i18n._(t`Opmerking`),
        [ContactType.FollowUp]: i18n._(t`Vervolggesprek`),
        [ContactType.StoryTelling]: i18n._(t`Informatie voor storytelling`),
        [ContactType.Intake]: i18n._(t`Intake`),
    }

    const { defaultValues } = props
    const typeOptions = Object.values(ContactType).map(value => ({
        value,
        label: eventDetailTypesTranslations[value],
    }))

    return (
        <div className={styles.contentContainer}>
            <Column spacing={8}>
                <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                    <Select
                        list="type"
                        name="type"
                        placeholder={i18n._(t`Selecteer type`)}
                        options={typeOptions}
                        defaultValue={
                            defaultValues?.type
                                ? {
                                      value: defaultValues.type,
                                      label: eventDetailTypesTranslations[defaultValues.type],
                                  }
                                : undefined
                        }
                    />
                </Field>
                <Field label={i18n._(t`Datum`)} required={true}>
                    <DateInput
                        name="date"
                        placeholder={i18n._(t`01/01/2020`)}
                        defaultValue={defaultValues?.date.toString()}
                    />
                </Field>
                <Field label={i18n._(t`Omschrijving`)} required={true}>
                    <TextArea
                        name="explanation"
                        growHeight={true}
                        placeholder={i18n._(t`Omschrijving van de gebeurtenis…`)}
                        defaultValue={defaultValues?.explanation}
                    />
                </Field>
            </Column>
        </div>
    )
}
