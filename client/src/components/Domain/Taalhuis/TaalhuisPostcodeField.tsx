import { useLingui } from '@lingui/react'
import { PostalCode } from 'api/types/types'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    defaultValues?: PostalCode[] | null
    readOnly?: boolean
    errorPath?: string
    disabled?: boolean
    options?: DefaultSelectOption[]
    loading?: boolean
}

export interface TaalhuisPostcodeFieldModel {
    codes: string[]
}

export const TaalhuisPostcodeField = (props: Props) => {
    const { defaultValues, readOnly, errorPath, disabled } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._('Postcodegebied(en)')}>
            <Field readOnly={disabled || readOnly} label={i18n._('Postcodegebied(en)')} horizontal={true}>
                {readOnly ? <Paragraph>{defaultValues?.map(d => d.code).join(', ')}</Paragraph> : renderSelectField()}
            </Field>
        </Section>
    )

    function renderSelectField() {
        if (props.loading) {
            return <Spinner type={Animation.simpleSpinner} />
        }

        const defaultOptions = defaultValues?.map(c => ({ label: c.code, value: c.id }))

        return (
            <Select<DefaultSelectOption, true>
                errorPath={errorPath || 'codes'}
                name="codes"
                isMulti={true}
                isClearable={true}
                defaultValue={defaultOptions}
                options={props.options || []}
                disabled={disabled}
                placeholder={i18n._('Selecteer postcodegebied(en)')}
            />
        )
    }
}

export function getSelectedTaalhuisPostcodes(codes: string[], defaultPostalCodes?: PostalCode[] | null) {
    if (!defaultPostalCodes?.length) {
        // must all be new codes -- no id to populate with
        return codes.filter(c => !!c).map(c => ({ id: undefined, code: parseInt(c) }))
    }

    return codes
        .filter(c => !!c)
        .map(code => {
            const parsedCode = parseInt(code)
            const defaultPostalCode = defaultPostalCodes.find(p => p.code === parsedCode || p.id === code)

            return {
                id: defaultPostalCode?.id,
                code: defaultPostalCode?.code ?? parsedCode,
            }
        })
}
