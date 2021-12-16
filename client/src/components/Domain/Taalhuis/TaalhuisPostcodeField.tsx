import { useLingui } from '@lingui/react'
import { PostalCode } from 'api/types/types'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'

interface Props {
    defaultValues?: PostalCode[] | null
    readonly?: boolean
    errorPath?: string
    disabled?: boolean
}

export interface TaalhuisPostcodeFieldModel {
    codes: number[] | null
}

export const TaalhuisPostcodeField = (props: Props) => {
    const { defaultValues, readonly, errorPath, disabled } = props
    const { i18n } = useLingui()

    const options = [1234, 1235, 1236].map(v => ({ label: v, value: v })) // TODO: replace with actual values or query
    const defaultOptions = defaultValues?.map(c => ({ label: c.code, value: c.code }))

    return (
        <Section title={i18n._('Postcodegebied(en)')}>
            <Field
                readOnly={disabled || readonly}
                required={true}
                label={i18n._('Postcodegebied(en)')}
                horizontal={true}
            >
                <Select<DefaultSelectOption, true>
                    errorPath={errorPath || 'codes'}
                    name="codes"
                    isMulti={true}
                    isClearable={true}
                    defaultValue={defaultOptions}
                    options={options}
                    disabled={disabled}
                />
            </Field>
        </Section>
    )
}
