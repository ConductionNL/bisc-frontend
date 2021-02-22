import React from 'react'
import styles from './Table.module.scss'
interface Props {
    headers: string[]
    rows: JSX.Element[][]
    flex: number | number[]
}

export const Table: React.FunctionComponent<Props> = ({ headers, rows, flex }) => {
    return (
        <table className={styles.tableContainer}>
            <thead className={styles.tableHeaderContainer}>
                {headers.map((title, i) => (
                    <tr key={i} className={styles.tableRow} style={getFlexHeaderStyles(i)}>
                        <th className={styles.title}>{title}</th>
                    </tr>
                ))}
            </thead>

            <tbody className={styles.containerBody}>{handleRows()}</tbody>
        </table>
    )

    function handleRows() {
        return rows?.map((row, index) => (
            <div key={index} className={styles.wrapper}>
                <tr className={styles.containerRow} key={index}>
                    {row.map((item: JSX.Element, i) => {
                        return (
                            <td key={i} className={styles.containerRow} style={getFlexRowStyles(i)}>
                                {item}
                            </td>
                        )
                    })}
                </tr>
            </div>
        ))
    }

    function getFlexRowStyles(index: number) {
        const flexValues = { flex: Array.isArray(flex) ? flex[index] : flex }
        return flexValues
    }

    function getFlexHeaderStyles(index: number) {
        const flexValues = { flex: Array.isArray(flex) ? flex[index] : flex }
        return flexValues
    }
}
