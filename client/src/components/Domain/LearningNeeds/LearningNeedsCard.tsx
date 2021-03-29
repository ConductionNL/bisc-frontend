import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './LearningNeedsCard.module.scss'

interface Props {
    leftComponent: JSX.Element
    rightComponent: (JSX.Element | null)[][]
    onClick?: () => void
    to: string | Location
}

export const LearningNeedsCard: React.FunctionComponent<Props> = ({ leftComponent, rightComponent, onClick, to }) => {
    return (
        <RouterLink to={to}>
            <div className={styles.container} onClick={onClick}>
                <div className={styles.leftComponentContainer}>{leftComponent}</div>
                <div className={styles.statusContainer}>
                    {rightComponent.map((row, index) => {
                        return (
                            <>
                                <div className={styles.row} key={index}>
                                    {row.map((item, index) => {
                                        if (!item) {
                                            return null
                                        }
                                        return (
                                            <div key={index} className={styles.itemContainer}>
                                                {item}
                                            </div>
                                        )
                                    })}
                                </div>
                                {index + 1 !== rightComponent.length ? <HorizontalRule className={styles.hr} /> : null}
                            </>
                        )
                    })}
                </div>
            </div>
        </RouterLink>
    )
}
