import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import DateInput from 'components/Core/DataEntry/DateInput'
import Select, { OptionsType } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { LanguageHousesQuery } from 'generated/graphql'
import React from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'
import styles from './PeriodFieldset.module.scss'

interface Props {
    prefillData?: TaalhuisPeriodFieldsetPrefillData
    queryData?: LanguageHousesQuery
    hideTaalhuisSelect?: boolean
}

export interface TaalhuisPeriodFieldsetFormModel {
    taalhuis: string
    periodFrom?: string
    periodTo?: string
}
export interface TaalhuisPeriodFieldsetPrefillData {
    taalhuis?: string
    periodFrom?: string
    periodTo?: string
}

export const TaalhuisPeriodFieldset: React.FunctionComponent<Props> = props => {
    const { queryData, hideTaalhuisSelect } = props
    const { i18n } = useLingui()

    const PeriodFieldClassNames = classNames({
        [styles.periodFieldWithoutSelect]: hideTaalhuisSelect,
        [styles.periodFieldWithSelect]: !hideTaalhuisSelect,
    })
    return (
        <Column spacing={4}>
            <Row spacing={5}>
                {/* inline styles were a quickfix */}
                {!hideTaalhuisSelect && (
                    <div className={styles.taalhuisSelectWrapper}>
                        <Field label={i18n._(t`Taalhuis`)} grow={true}>
                            <Select
                                list="taalhuis"
                                name={'taalhuis'}
                                placeholder={i18n._(t`Selecteer Taalhuis...`)}
                                options={getTaalhuisOptions()}
                                grow={true}
                                validators={[
                                    value => GenericValidators.selectedOptionFromOptions(value, getTaalhuisOptions()),
                                    GenericValidators.required,
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

    function getTaalhuisOptions() {
        if (!queryData?.languageHouses?.edges) {
            return []
        }
        
        const options: (string | OptionsType)[] = []
        for (const item of queryData.languageHouses.edges) {
            if (item?.node) {
                options.push({ label: item.node.name, value: item.node.id })
            }
        }

        return options
    }
}
