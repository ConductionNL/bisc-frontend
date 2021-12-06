import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetLearningNeeds } from 'api/learningNeed/learningNeed'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import { InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import {
    TaalhuisParticipantDetailTabs,
    TaalhuisParticipantDetailTabsEnum,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { TaalhuisParticipantLearningNeedsList } from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantsLearningNeedsList'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export const ParticipantsLearningNeedsOverviewView: React.FC = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error, loadMore } = useGetLearningNeeds(taalhuisParticipantId)

    return (
        <>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Deelnemer leervragen`)}
                    spacingType={SpacingType.small}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
                />
                <TaalhuisParticipantDetailTabs activeTabId={TaalhuisParticipantDetailTabsEnum.LearningNeeds} />
                <Row justifyContent="flex-end">
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push(
                                taalhuisRoutes.participants.detail(taalhuisParticipantId).data.learningNeeds.create
                            )
                        }
                    >
                        {i18n._(t`Voeg leervraag toe`)}
                    </Button>
                </Row>
            </Column>
            <InfiniteScroll
                loadMore={loadMore}
                isLoading={loading || !data}
                isLoadingMore={loading && !!data}
                totalPages={data?.pages}
            >
                {renderSections()}
            </InfiniteScroll>
        </>
    )

    function renderSections() {
        if (!data && loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (!data || error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        console.log(data.results)

        return (
            <TaalhuisParticipantLearningNeedsList
                learningNeeds={data.results}
                onItemClick={learningNeed =>
                    history.push(
                        taalhuisRoutes.participants
                            .detail(taalhuisParticipantId)
                            .data.learningNeeds.detail(learningNeed.id).index
                    )
                }
            />
        )
    }
}
