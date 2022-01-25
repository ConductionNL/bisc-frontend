import { useLingui } from '@lingui/react'
import { PostalCode } from 'api/types/types'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import { PageQuery, PageQueryHook } from 'components/Core/PageQuery/PageQuery'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    defaultValues?: PostalCode[] | null
    readonly?: boolean
    errorPath?: string
    disabled?: boolean
    noCreate?: boolean
    optionsQueryHook?: PageQueryHook<PostalCode[], unknown, unknown, unknown>
}

export interface TaalhuisPostcodeFieldModel {
    codes: number[] | null
}

export const TaalhuisPostcodeField = (props: Props) => {
    const { defaultValues, readonly, errorPath, disabled, noCreate, optionsQueryHook } = props
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
                {optionsQueryHook ? (
                    <PageQuery queryHook={optionsQueryHook}>{renderSelectField}</PageQuery>
                ) : (
                    renderSelectField()
                )}
            </Field>
        </Section>
    )

    function renderSelectField(options?: PostalCode[]) {
        if (readonly) {
            return <Paragraph>{defaultValues?.map(d => d.code).join(', ')}</Paragraph>
        }

        const queryOptions = options?.map(opt => ({ label: opt.code, value: opt.id })) || []

        return (
            <Select<DefaultSelectOption, true>
                errorPath={errorPath || 'codes'}
                name="codes"
                isMulti={true}
                isClearable={true}
                defaultValue={defaultOptions}
                options={queryOptions}
                disabled={disabled}
                creatable={!noCreate}
                placeholder={noCreate ? i18n._('Selecteer postcodegebied(en)') : i18n._('Toevoegen postcodegebied(en)')}
            />
        )
    }
}
