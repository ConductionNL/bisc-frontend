import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './LearningNeedTableItem.module.scss'
import { Location } from 'history'
import { LearningNeedsQuery } from 'generated/graphql'

export type LearningNeedsItemsType = LearningNeedsQuery['learningNeeds'][0]['participations']
export type LearningNeedsItemType = LearningNeedsQuery['learningNeeds'][0]['participations'][0]
interface Props {
    LeftComponent: JSX.Element
    participations: LearningNeedsItemsType
    renderParticipationItem: (item: LearningNeedsItemType) => JSX.Element
    participationKeyExtractor: (item: LearningNeedsItemType, index: number, array: LearningNeedsItemsType) => string
    learningNeedTo: string | Location
    learningNeedOnClick?: () => void
}

export const LearningNeedTableItem: React.FunctionComponent<Props> = props => {
    const {
        LeftComponent,
        participations,
        learningNeedOnClick,
        renderParticipationItem,
        participationKeyExtractor,
        learningNeedTo,
    } = props
    return (
        <RouterLink to={learningNeedTo} className={styles.container}>
            <div className={styles.contentContainer} onClick={learningNeedOnClick}>
                <div className={styles.leftComponentContainer}>{LeftComponent}</div>
                <div className={styles.statusContainer}>{renderLearningNeedsItemRow()}</div>
            </div>
        </RouterLink>
    )

    function renderLearningNeedsItemRow() {
        return participations.map((participation, index, participations) => {
            const isLast = index + 1 !== participations.length

            return (
                <React.Fragment key={participationKeyExtractor(participation, index, participations)}>
                    <div className={styles.row}>{renderParticipationItem(participation)}</div>
                    {isLast ? <HorizontalRule className={styles.hr} /> : null}
                </React.Fragment>
            )
        })
    }
}
