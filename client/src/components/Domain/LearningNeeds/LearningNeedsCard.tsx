import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import React from 'react'
import styles from './LearningNeedsCard.module.scss'

interface Props {
    leftComponent: JSX.Element
    rightComponent: (JSX.Element | null)[][]
}

export const LearningNeedsCard: React.FunctionComponent<Props> = ({ leftComponent, rightComponent }) => {
    return (
        <div className={styles.container}>
            <div className={styles.leftComponentContainer}>{leftComponent}</div>
            <div className={styles.statusContainer}>
                {rightComponent.map((row, index) => {
                    return (
                        <>
                            <div className={styles.row}>
                                {row.map((item, index) => {
                                    if (!item) {
                                        return null
                                    }
                                    return <div className={styles.itemContainer}>{item}</div>
                                })}
                            </div>
                            {index + 1 !== rightComponent.length ? <HorizontalRule className={styles.hr} /> : null}
                        </>
                    )
                })}
            </div>
        </div>
    )
}
