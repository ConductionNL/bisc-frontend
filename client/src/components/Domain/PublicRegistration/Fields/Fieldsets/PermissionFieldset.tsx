import React, { ChangeEvent } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    hasAcceptedTermsAndConditions: boolean
    setHasAcceptedTermsAndConditions: (newValue: boolean) => void
}

export interface PermissionFieldsetModel {
    permission: boolean
}

const PermissionFieldset: React.FunctionComponent<Props> = props => {
    const { hasAcceptedTermsAndConditions, setHasAcceptedTermsAndConditions } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Toestemmingen`)}>
            <Column spacing={4}>
                <Field label={' '} horizontal={true}>
                    <Row>
                        <Checkbox
                            name={'permission'}
                            defaultChecked={false}
                            onChange={onChangeTermsAndConditionsCheckbox}
                            label={i18n._(t`Ik ga akkoord met de voorwaarden *`)}
                        />
                    </Row>
                </Field>
            </Column>
        </Section>
    )

    function onChangeTermsAndConditionsCheckbox(e: ChangeEvent<HTMLInputElement>) {
        setHasAcceptedTermsAndConditions(e.currentTarget.checked)
    }
}

export default PermissionFieldset
