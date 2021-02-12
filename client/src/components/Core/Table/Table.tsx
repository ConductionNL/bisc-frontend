import React from 'react'
import styles from './Table.module.scss'

interface Props {
    headers: (string | undefined)[]
    rows: (string | number | undefined)[][]
    flex: number | number[]
}

export const Table: React.FunctionComponent<Props> = ({ headers, rows, flex }) => {
    return (
        <table className={styles.tableContainer}>
            <thead className={styles.tableHeaderContainer}>
                {headers.map((title, i) => (
                    <tr className={styles.tableRow} style={getFlexHeaderStyles(i)}>
                        <th className={styles.title}>{title}</th>
                    </tr>
                ))}
            </thead>

            <tbody className={styles.containerBody}>
                {rows?.map((row, index) => (
                    <tr className={styles.containerRow} key={index}>
                        {row.map((item: number | string | undefined, i) => (
                            <td className={styles.containerRow} style={getFlexRowStyles(i)}>
                                {item}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )

    function getFlexRowStyles(index: number) {
        const flexValues = { flex: Array.isArray(flex) ? flex[index] : flex }
        return flexValues
    }

    function getFlexHeaderStyles(index: number) {
        const flexValues = { flex: Array.isArray(flex) ? flex[index] : flex }
        return flexValues
    }
}
