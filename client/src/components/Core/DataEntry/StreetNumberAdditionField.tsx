import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'generated/graphql'
import { FunctionComponent } from 'react'
// import { AdressValidators } from '../../../utils/validators/AddressValidators'
import Input from './Input'
import styles from './StreetNumberAdditionField.module.scss'

export interface StreetNumberAdditionFieldModel {
    street?: Maybe<string>
    houseNumber?: Maybe<string>
    houseNumberSuffix?: Maybe<string>
}

export interface StreetNumberAdditionFieldPrefillData {
    street?: Maybe<string>
    houseNumber?: Maybe<string>
    houseNumberSuffix?: Maybe<string>
}

interface Props {
    prefillData?: StreetNumberAdditionFieldPrefillData
    prefixName?: string
}

const StreetNumberAdditionField: FunctionComponent<Props> = props => {
    const { prefillData, prefixName } = props
    const { i18n } = useLingui()

    return (
        <div className={styles.container}>
            <div className={styles.streetContainer}>
                <Input
                    name={getName('street')}
                    placeholder={i18n._(t`Straatnaam`)}
                    defaultValue={prefillData?.street ?? undefined}
                    grow={true}
                />
            </div>
            <div className={styles.streetNumberContainer}>
                <Input
                    name={getName('houseNumber')}
                    placeholder={i18n._(t`Nr.`)}
                    // validators={[AdressValidators.isValidHousenumber]}
                    defaultValue={prefillData?.houseNumber ?? undefined}
                    grow={true}
                />
            </div>
            <div className={styles.additionContainer}>
                <Input
                    name={getName('houseNumberSuffix')}
                    placeholder={i18n._(t`A`)}
                    defaultValue={prefillData?.houseNumberSuffix ?? undefined}
                    grow={true}
                />
            </div>
        </div>
    )

    function getName(inputName: string) {
        return `${prefixName || ''}${inputName}`
    }
}

export default StreetNumberAdditionField
