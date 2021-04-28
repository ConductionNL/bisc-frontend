import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import DateInput from 'components/Core/DataEntry/DateInput'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { ProvidersQuery } from 'generated/graphql'
import React from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'
import styles from './PeriodFieldset.module.scss'

interface Props {
    prefillData?: ProviderPeriodFieldsetPrefillData
    queryData?: ProvidersQuery
    hideProviderSelect?: boolean
}

export interface ProviderPeriodFieldsetFormModel {
    taalhuis: string
    periodFrom?: string
    periodTo?: string
}
export interface ProviderPeriodFieldsetPrefillData {
    taalhuis?: string
    periodFrom?: string
    periodTo?: string
}

export const ProviderPeriodFieldset: React.FunctionComponent<Props> = props => {
    const { queryData, hideProviderSelect } = props
    const { i18n } = useLingui()

    const PeriodFieldClassNames = classNames({
        [styles.periodFieldWithoutSelect]: hideProviderSelect,
        [styles.periodFieldWithSelect]: !hideProviderSelect,
    })
    return (
        <Column spacing={4}>
            <Row spacing={5}>
                {/* inline styles were a quickfix */}
                {!hideProviderSelect && (
                    <div className={styles.providerSelectWrapper}>
                        <Field label={i18n._(t`Provider`)} grow={true}>
                            <Select
                                list="provider"
                                name={'provider'}
                                placeholder={i18n._(t`Selecteer Provider...`)}
                                options={getProviderOptions()}
                                grow={true}
                                validators={[
                                    value => GenericValidators.selectedOptionFromOptions(value, getProviderOptions()),
                                ]}
                            />
                        </Field>
                    </div>
                )}
                <Row spacing={5} className={styles.periodWrapper}>
                    <div className={PeriodFieldClassNames}>
                        <Field label={i18n._(t`Periode van`)} grow={true}>
                            <DateInput
                                name={'periodFrom'}
                                placeholder={i18n._(t`DD/MM/YYYY`)}
                                grow={true}
                                validators={[GenericValidators.required]}
                            />
                        </Field>
                    </div>
                    <div className={PeriodFieldClassNames}>
                        <Field label={i18n._(t`periode tot`)} grow={true}>
                            <DateInput
                                name={'periodTo'}
                                placeholder={i18n._(t`DD/MM/YYYY`)}
                                grow={true}
                                validators={[GenericValidators.required]}
                            />
                        </Field>
                    </div>
                </Row>
            </Row>
        </Column>
    )

    function getProviderOptions() {
        return queryData ? queryData.providers.map(item => ({ label: item.name, value: item.id })) : []
    }
}
