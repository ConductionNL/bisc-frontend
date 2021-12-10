import { UserContext } from 'components/Providers/UserProvider/context'
import React, { useContext } from 'react'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import { RefererContainer } from '../LearningNeedsRefererContainer'
import { ParticipationStatusLabelTag } from '../ParticipationStatusLabelTag'
import styles from './LearningNeedParticipationItem.module.scss'
import { Participation, ParticipationProviderOption } from 'api/types/types'

interface Props {
    participation: Participation
}

export const LearningNeedParticipationItem: React.FC<Props> = props => {
    const userContext = useContext(UserContext)
    const { participation } = props

    return (
        <div className={styles.container}>
            {renderStatus()}
            {renderReference()}
            {renderNote()}
        </div>
    )

    function renderStatus() {
        return <ParticipationStatusLabelTag status={participation.status} />
    }

    function renderReference() {
        if (participation.providerOption === ParticipationProviderOption.Provider) {
            const labels = [
                userContext.user?.organization.name || undefined,
                participation.provider?.name || undefined,
            ].filter(v => !!v)

            return <RefererContainer labels={labels as string[]} />
        }

        return <LabelTag label={participation.offerName || ''} color={LabelColor.white} icon={IconType.offer} />
    }

    function renderNote() {
        if (participation.providerOption === ParticipationProviderOption.Provider) {
            return <LabelTag label={participation.explanation || ''} color={LabelColor.white} icon={IconType.note} />
        }

        return <LabelTag label={participation.providerOther || ''} color={LabelColor.white} icon={IconType.providers} />
    }
}
