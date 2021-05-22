import { LearningNeed } from 'generated/graphql'
import React from 'react'
import styles from './LearningNeedsTable.module.scss'

interface Props {
    leftHeader: string
    rightHeaders: string[]
    data: LearningNeed[]
    renderItem: (item: LearningNeed) => JSX.Element
    keyExtractor: (item: LearningNeed, index: number, array: LearningNeed[]) => string
}

export const LearningNeedsTable: React.FC<Props> = ({ leftHeader, rightHeaders, data, renderItem, keyExtractor }) => {
    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.leftComponentContainer}>
                    <div className={styles.titleContainer}>{leftHeader}</div>
                </div>
                <div className={styles.rightComponentContainer}>
                    {rightHeaders.map((title, index) => (
                        <div key={index} className={styles.titleContainer}>
                            {title}
                        </div>
                    ))}
                </div>
            </div>
            {data.map((learningNeed, index, learningNeeds) => (
                <React.Fragment key={keyExtractor(learningNeed, index, learningNeeds)}>
                    {renderItem(learningNeed)}
                </React.Fragment>
            ))}
        </>
    )
}
