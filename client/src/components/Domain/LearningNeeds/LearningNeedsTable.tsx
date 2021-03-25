import React from 'react'
import styles from './LearningNeedsTable.module.scss'

interface Props {
    leftHeader: string
    rightHeaders: string[]
}

export const LearningNeedsTable: React.FC<Props> = ({ leftHeader, rightHeaders }) => {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.leftComponentContainer}>
                <div className={styles.titleContainer}>{leftHeader}</div>
            </div>
            <div className={styles.rightComponentContainer}>
                <div className={styles.row}>
                    {rightHeaders.map((title, i) => (
                        <div className={styles.titleContainer}>{title}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}
