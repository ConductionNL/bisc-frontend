import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { FunctionComponent } from 'react'
import { AdressValidators } from '../../../utils/validators/AddressValidators'
import Input from './Input'
import styles from './StreetNumberAdditionField.module.scss'

export interface StreetNumberAdditionFieldModel {
    street?: string
    streetNr?: string
    addition?: string
}

export interface StreetNumberAdditionFieldPrefillData {
    street?: string | null
    streetNr?: string | null
    addition?: string | null
}

interface Props {
    prefillData?: StreetNumberAdditionFieldPrefillData
}

const StreetNumberAdditionField: FunctionComponent<Props> = props => {
    const { prefillData } = props
    const { i18n } = useLingui()

    return (
        <div className={styles.container}>
            <div className={styles.streetContainer}>
                <Input
                    name="street"
                    placeholder={i18n._(t`Straatnaam`)}
                    defaultValue={prefillData?.street ?? undefined}
                    grow={true}
                />
            </div>
            <div className={styles.streetNumberContainer}>
                <Input
                    name="streetNr"
                    placeholder={i18n._(t`Nr.`)}
                    validators={[AdressValidators.isValidHousenumber]}
                    defaultValue={prefillData?.streetNr ?? undefined}
                    grow={true}
                />
            </div>
            <div className={styles.additionContainer}>
                <Input
                    name="addition"
                    placeholder={i18n._(t`A`)}
                    defaultValue={prefillData?.addition ?? undefined}
                    grow={true}
                />
            </div>
        </div>
    )
}

export default StreetNumberAdditionField
