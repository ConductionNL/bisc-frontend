import { LearningNeed, Participation } from 'api/types/types'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import React from 'react'
import styles from './LearningNeedTableItem.module.scss'
interface Props {
    LeftComponent: React.ReactNode
    learningNeed: LearningNeed
    renderParticipationItem: (participation: Participation) => React.ReactNode
    participationKeyExtractor: (participation: Participation, index: number, array: Participation[]) => string
    learningNeedOnClick?: (learningNeed: LearningNeed) => void
}

export const LearningNeedTableItem: React.FunctionComponent<Props> = props => {
    const {
        LeftComponent,
        learningNeedOnClick,
        learningNeed,
        renderParticipationItem,
        participationKeyExtractor,
    } = props
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer} onClick={handleOnItemClick}>
                <div className={styles.leftComponentContainer}>{LeftComponent}</div>
                <div className={styles.statusContainer}>{renderLearningNeedsItemRow()}</div>
            </div>
        </div>
    )

    function renderLearningNeedsItemRow() {
        if (!learningNeed.participations?.length) {
            return []
        }

        return learningNeed.participations.map((participation, index) => {
            const isLast = index + 1 !== learningNeed.participations?.length

            return (
                <React.Fragment
                    key={participationKeyExtractor(participation, index, learningNeed.participations || [])}
                >
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
        learningNeedOnClick(learningNeed)
    }
}
