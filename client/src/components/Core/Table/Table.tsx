import React from 'react'
import styles from './Table.module.scss'

interface Props {
    headers: string[]
    rows: JSX.Element[][] | null
    flex: (number | string) | (number | string)[]
    lastItemIsIcon?: boolean
}

export const Table: React.FunctionComponent<Props> = ({ headers, rows, flex, lastItemIsIcon }) => {
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
