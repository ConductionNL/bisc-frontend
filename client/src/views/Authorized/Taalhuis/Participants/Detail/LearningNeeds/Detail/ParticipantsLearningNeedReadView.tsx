import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { TaalhuisParticipantLearningNeedFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import { useHistory, useParams } from 'react-router-dom'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import {
    TaalhuisParticipantsDetailLearningNeedsDetailRouteParams,
    taalhuisRoutes,
} from 'routes/taalhuis/taalhuisRoutes'
import { useGetLearningNeed } from 'api/learningNeed/learningNeed'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ParticipationReferenceCard } from 'components/Domain/Participation/ParticipationReferenceCard'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { LearningNeed } from 'api/types/types'
import { UserContext } from 'components/Providers/UserProvider/context'

export const ParticipantsLearningNeedReadView: React.FC = props => {
    const {
        taalhuisParticipantId,
        learningNeedId,
    } = useParams<TaalhuisParticipantsDetailLearningNeedsDetailRouteParams>()
    const userContext = useContext(UserContext)
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetLearningNeed(learningNeedId)}>{data => renderPageContent(data)}</PageQuery>
    )

    function renderPageContent(learningNeed: LearningNeed) {
        return (
            <Column spacing={4}>
                <Headline
                    title={learningNeed?.description}
                    subtitle={NameFormatters.formattedFullname(learningNeed.student.person)}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.taalhuis.participants.overview,
                                breadcrumbItems.taalhuis.participants.detail.learningNeeds.overview(
                                    taalhuisParticipantId
                                ),
                            ]}
                        />
                    }
                />
                <Row justifyContent="flex-end">
                    <Button
                        icon={IconType.send}
                        onClick={() =>
                            history.push(
                                taalhuisRoutes.participants
                                    .detail(taalhuisParticipantId)
                                    .data.learningNeeds.detail(learningNeedId).referrals.create
                            )
                        }
                    >
                        {i18n._(t`Verwijzen naar`)}
                    </Button>
                </Row>
                {renderSection(learningNeed)}
            </Column>
        )
    }

    function renderSection(learningNeed: LearningNeed) {
        return (
            <>
                <TaalhuisParticipantLearningNeedFields readOnly={true} learningNeed={learningNeed} />
                {!!learningNeed.participations.length && (
                    <>
                        <SectionTitle title={i18n._(t`Verwijzingen`)} heading={'H3'} />
                        {learningNeed.participations.map(participation => (
                            <ParticipationReferenceCard
                                participation={participation}
                                taalhuisParticipantId={taalhuisParticipantId}
                                learningNeedId={learningNeedId}
                                organizationName={userContext.user?.organization.name ?? ''} // TODO: check if correct
                            />
                        ))}
                    </>
                )}
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Button
                            type={ButtonType.primary}
                            onClick={() => {
                                history.push(
                                    taalhuisRoutes.participants
                                        .detail(taalhuisParticipantId)
                                        .data.learningNeeds.detail(learningNeed.id).update
                                )
                            }}
                        >
                            {i18n._(t`Leervraag aanpassen`)}
                        </Button>
                    }
                />
            </>
        )
    }
}
