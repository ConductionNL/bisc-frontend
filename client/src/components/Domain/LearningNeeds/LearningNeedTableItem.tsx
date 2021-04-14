import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { LearningNeedsQuery } from 'generated/graphql'
import React from 'react'
import styles from './LearningNeedTableItem.module.scss'

export type LearningNeedsItemType = LearningNeedsQuery['learningNeeds'][0]
export type LearningNeedsItemParticipationsType = LearningNeedsQuery['learningNeeds'][0]['participations']
export type LearningNeedsItemParticipationType = LearningNeedsQuery['learningNeeds'][0]['participations'][0]
interface Props {
    LeftComponent: JSX.Element
    item: LearningNeedsItemType
    renderParticipationItem: (item: LearningNeedsItemParticipationType) => JSX.Element
    participationKeyExtractor: (
        item: LearningNeedsItemParticipationType,
        index: number,
        array: LearningNeedsItemParticipationsType
    ) => string
    learningNeedOnClick?: (item: LearningNeedsItemType) => void
}

export const LearningNeedTableItem: React.FunctionComponent<Props> = props => {
    const { LeftComponent, learningNeedOnClick, item, renderParticipationItem, participationKeyExtractor } = props
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer} onClick={handleOnItemClick}>
                <div className={styles.leftComponentContainer}>{LeftComponent}</div>
                <div className={styles.statusContainer}>{renderLearningNeedsItemRow()}</div>
            </div>
        </div>
    )

    function renderLearningNeedsItemRow() {
        return item?.participations.map((participation, index, participations) => {
            const isLast = index + 1 !== participations.length

            return (
                <React.Fragment key={participationKeyExtractor(participation, index, participations)}>
                    <div className={styles.row}>{renderParticipationItem(participation)}</div>
                    {isLast ? <HorizontalRule className={styles.hr} /> : null}
                </React.Fragment>
            )
        })
    }

    function handleOnItemClick() {
        if (!learningNeedOnClick) {
            return
        }
        learningNeedOnClick(item)
    }
}
