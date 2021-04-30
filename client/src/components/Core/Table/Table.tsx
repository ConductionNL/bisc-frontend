import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Center from '../Layout/Center/Center'
import SectionTitle from '../Text/SectionTitle'
import styles from './Table.module.scss'

interface Props {
    headers: string[]
    rows: JSX.Element[][] | null
    flex: (number | string) | (number | string)[]
    lastItemIsIcon?: boolean
    errorMessage?: string
}

export const Table: React.FunctionComponent<Props> = ({ headers, errorMessage, rows, flex, lastItemIsIcon }) => {
    const { i18n } = useLingui()

    return (
        <div>
            <table className={styles.tableContainer}>
                <thead className={styles.tableHeaderContainer}>
                    <tr className={styles.tableRow}>
                        {headers.map((title, i) => (
                            <th key={i} className={styles.title} style={getFlexHeaderStyles(i)}>
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className={styles.containerBody}> {renderRows()}</tbody>
            </table>
        </div>
    )

    function renderRows() {
        if (!rows?.length) {
            return (
                <Center grow={true}>
                    <SectionTitle
                        title={errorMessage ?? i18n._(t`Er is geen data beschikbaar`)}
                        heading={'H4'}
                        className={styles.errorTitle}
                    />
                </Center>
            )
        }

        return rows?.map((row, index) => (
            <tr className={styles.row} key={index}>
                {row.map((item, i) => (
                    <td key={i} style={getFlexRowStyles(i)} className={styles.rowItem}>
                        {item}
                    </td>
                ))}
            </tr>
        ))
    }

    function getFlexRowStyles(index: number) {
        const flexValues = { flex: Array.isArray(flex) ? flex[index] : flex, display: 'flex' }
        const isLastItem = index === headers.length - 1

        if (lastItemIsIcon && isLastItem) {
            return { flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }
        }

        return flexValues
    }

    function getFlexHeaderStyles(index: number) {
        const flexValues = { flex: Array.isArray(flex) ? flex[index] : flex }
        const isLastItem = index === headers.length - 1

        if (lastItemIsIcon && isLastItem) {
            return { flex: 1, display: 'flex', alignItems: 'flex-end', justifyCOntent: 'flex-end' }
        }

        return flexValues
    }
}
