import { LearningNeedsQuery } from 'generated/graphql'
import React from 'react'
import styles from './LearningNeedsTable.module.scss'

interface Props {
    leftHeader: string
    rightHeaders: string[]
    data: LearningNeedsQuery['learningNeeds']
    renderItem: (item: LearningNeedsQuery['learningNeeds'][0]) => JSX.Element
    keyExtractor: (
        item: LearningNeedsQuery['learningNeeds'][0],
        index: number,
        array: LearningNeedsQuery['learningNeeds']
    ) => string
}

export const LearningNeedsTable: React.FC<Props> = ({ leftHeader, rightHeaders, data, renderItem, keyExtractor }) => {
    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.leftComponentContainer}>
                    <div className={styles.titleContainer}>{leftHeader}</div>
                </div>
                <div className={styles.rightComponentContainer}>
                    <div className={styles.row}>
                        {rightHeaders.map((title, index) => (
                            <div key={index} className={styles.titleContainer}>
                                {title}
                            </div>
                        ))}
                    </div>
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
