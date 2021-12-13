import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetTaalhuisOrganizations } from 'api/organization/organization'
import classNames from 'classnames'
import DateInput from 'components/Core/DataEntry/DateInput'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import React from 'react'
import styles from './PeriodFieldset.module.scss'

interface Props {
    prefillData?: TaalhuisPeriodFieldsetPrefillData
    showTaalhuisSelect?: boolean
}

export interface TaalhuisPeriodFieldsetFormModel {
    organization: string
    periodFrom?: string
    periodTo?: string
}
export interface TaalhuisPeriodFieldsetPrefillData {
    organization?: string
    periodFrom?: string
    periodTo?: string
}

export const TaalhuisPeriodFieldset: React.FunctionComponent<Props> = props => {
    const { showTaalhuisSelect } = props
    const { i18n } = useLingui()

    // to do: use loadMore to show more than only the first page
    const { data, loading, error, loadMore } = useGetTaalhuisOrganizations({ lazy: !showTaalhuisSelect, limit: 1000 })

    if (showTaalhuisSelect) {
        if (loading) {
            return (
                <Column spacing={4}>
                    <Spinner />
                </Column>
            )
        }

        if (error || !data || !data.results || data.results.length === 0) {
            return (
                <Column spacing={4}>
                    <ErrorBlock
                        title={i18n._(t`Er ging iets fout`)}
                        message={i18n._(t`Er konden geen Taalhuis gegevens worden opgehaald`)}
                    />
                </Column>
            )
        }
    }

    const periodFieldClassNames = classNames({
        [styles.periodFieldWithoutSelect]: !showTaalhuisSelect,
        [styles.periodFieldWithSelect]: showTaalhuisSelect,
    })

    const taalhuisOptions = getTaalhuisOptions()

    return (
        <Column spacing={4}>
            <Row spacing={5}>
                {/* inline styles were a quickfix */}
                {showTaalhuisSelect && (
                    <div className={styles.taalhuisSelectWrapper}>
                        <Field label={i18n._(t`Taalhuis`)} grow={true}>
                            <Select
                                name={'organization'}
                                placeholder={i18n._(t`Selecteer Taalhuis...`)}
                                options={taalhuisOptions}
                                grow={true}
                            />
                        </Field>
                    </div>
                )}
                <Row spacing={5} className={styles.periodWrapper}>
                    <div className={periodFieldClassNames}>
                        <Field label={i18n._(t`Periode van`)} grow={true}>
                            <DateInput name={'periodFrom'} placeholder={i18n._(t`DD/MM/YYYY`)} grow={true} />
                        </Field>
                    </div>
                    <div className={periodFieldClassNames}>
                        <Field label={i18n._(t`periode tot`)} grow={true}>
                            <DateInput name={'periodTo'} placeholder={i18n._(t`DD/MM/YYYY`)} grow={true} />
                        </Field>
                    </div>
                </Row>
            </Row>
        </Column>
    )

    function getTaalhuisOptions(): DefaultSelectOption[] {
        if (!data || !data.results) {
            return []
        }

        return data.results.map(organization => {
            return {
                label: organization.name,
                value: organization.id,
            }
        })
    }
}
