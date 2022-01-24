import { useLingui } from '@lingui/react'
import { PostalCode } from 'api/types/types'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    defaultValues?: PostalCode[] | null
    readonly?: boolean
    errorPath?: string
    disabled?: boolean
    options?: DefaultSelectOption[]
    noCreate?: boolean
}

export interface TaalhuisPostcodeFieldModel {
    codes: number[] | null
}

export const TaalhuisPostcodeField = (props: Props) => {
    const { defaultValues, readonly, errorPath, disabled, options } = props
    const { i18n } = useLingui()

    const defaultOptions = defaultValues?.map(c => ({ label: c.code, value: c.code }))

    return (
        <Section title={i18n._('Postcodegebied(en)')}>
            <Field
                readOnly={disabled || readonly}
                required={true}
                label={i18n._('Postcodegebied(en)')}
                horizontal={true}
            >
                {renderSelectField()}
            </Field>
        </Section>
    )

    function renderSelectField() {
        if (readonly) {
            return <Paragraph>{defaultValues?.map(d => d.code).join(', ')}</Paragraph>
        }

        return (
            <Select<DefaultSelectOption, true>
                errorPath={errorPath || 'codes'}
                name="codes"
                isMulti={true}
                isClearable={true}
                defaultValue={defaultOptions}
                options={options || []}
                disabled={disabled}
                creatable={!props.noCreate}
                placeholder={i18n._('Toevoegen postcodegebied(en)')}
            />
        )
    }
}
