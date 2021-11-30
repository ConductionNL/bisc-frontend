import { LearningNeed } from 'api/types/types'
import React from 'react'
import styles from './LearningNeedsTable.module.scss'

interface Props {
    leftHeader: string
    rightHeaders: string[]
    learningNeeds: LearningNeed[]
    renderItem: (learningNeed: LearningNeed) => JSX.Element
    keyExtractor: (learningNeed: LearningNeed, index: number, array: LearningNeed[]) => string
}

export const LearningNeedsTable: React.FC<Props> = ({
    leftHeader,
    rightHeaders,
    learningNeeds,
    renderItem,
    keyExtractor,
}) => {
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
            {learningNeeds.map((learningNeed, index, learningNeeds) => (
                <React.Fragment key={keyExtractor(learningNeed, index, learningNeeds)}>
                    {renderItem(learningNeed)}
                </React.Fragment>
            ))}
        </>
    )
}
