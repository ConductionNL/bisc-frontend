import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { AanbiederParticipantGoalDetailFields } from 'components/Domain/Aanbieder/AanbiederParticipants/Fields/AanbiederParticipantGoalDetailFields'
import { AanbiederParticipationGoalsLocationStateProps } from '../AanbiederParticipantGoalsView'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { useHistory } from 'react-router-dom'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import { IconType } from 'components/Core/Icon/IconType'
import SectionTitle from 'components/Core/Text/SectionTitle'
import ReferenceCardLinkedHeader from 'components/Participants/cards/ReferenceCard/Headers/ReferenceCardLinkedHeader'
import OngoingStatus from 'components/Participants/cards/ReferenceCard/Headers/Status/OngoingStatus'
import ReferenceCard from 'components/Participants/cards/ReferenceCard/ReferenceCard'
import { routes } from 'routes/routes'
import { ParticipationsQuery, useLearningNeedQuery, useParticipationsQuery } from 'generated/graphql'

interface Props {
    routeState: AanbiederParticipationGoalsLocationStateProps
}

export const AanbiederParticipantGoalDetailReadView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { routeState } = props

    const basePath = routes.authorized.supplier.participants.detail.goals.detail

    const { data, loading, error } = useLearningNeedQuery({
        variables: {
            learningNeedId: routeState.participantGoalId,
        },
    })

    const { data: statusData, loading: loadStatusData, error: statusDataError } = useParticipationsQuery({
        variables: {
            learningNeedId: routeState.participantGoalId,
        },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <Column spacing={4}>
            <Headline
                title={data?.learningNeed.learningNeedDescription || ''}
                subtitle={routeState.participantName}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.aanbieder.participants.overview,
                            breadcrumbItems.aanbieder.participants.detail.goals.overview,
                        ]}
                    />
                }
            />
            {renderList()}
        </Column>
    )

    function renderList() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <>
                <AanbiederParticipantGoalDetailFields participantGoal={data.learningNeed} />
                {getReferenceCards()}
            </>
        )
    }

    function getReferenceCards() {
        if (loadStatusData) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (statusDataError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (statusData) {
            return (
                <Column spacing={10}>
                    <SectionTitle title={i18n._(t`Verwijzingen`)} heading={'H3'} />
                    {renderReferenceCards(statusData)}
                </Column>
            )
        }
    }

    function renderReferenceCards(data: ParticipationsQuery) {
        return data.participations.map((participation, index) => {
            return (
                <ReferenceCard
                    key={index}
                    onClickEditBottomComponent={() =>
                        history.push({
                            pathname: basePath.tests.update,
                            state: routeState,
                        })
                    }
                    TopComponent={
                        <ReferenceCardLinkedHeader
                            StatusComponent={
                                <OngoingStatus
                                    title={participation.offerName ?? ''}
                                    supplierName={participation.providerName ?? ''}
                                    status={participation.status}
                                />
                            }
                            InformationComponent={
                                <>
                                    <Column spacing={6}>
                                        <Column>
                                            <Field label={i18n._(t`Startdatum`)} horizontal={true}>
                                                <Paragraph>{participation.detailsStartDate}</Paragraph>
                                            </Field>
                                            <Field label={i18n._(t`Einddatum`)} horizontal={true}>
                                                <Paragraph>{participation.detailsEndDate}</Paragraph>
                                            </Field>
                                        </Column>
                                        <Column>
                                            <Field label={i18n._(t`Deelnemer begonnen op`)} horizontal={true}>
                                                <Paragraph>{''}</Paragraph>
                                            </Field>
                                            <Field label={i18n._(t`Deelnemer gestopt op`)} horizontal={true}>
                                                <Paragraph>{''}</Paragraph>
                                            </Field>
                                            <Field label={i18n._(t`Reden gestopt`)} horizontal={true}>
                                                <Paragraph>{''}</Paragraph>
                                            </Field>
                                        </Column>
                                    </Column>
                                </>
                            }
                        />
                    }
                    BottomComponent={
                        <Section title={i18n._(t`Toetsresultaat`)}>
                            <Column>
                                <Button
                                    type={ButtonType.tertiary}
                                    icon={IconType.add}
                                    onClick={() =>
                                        history.push({
                                            pathname: basePath.tests.create,
                                            state: routeState,
                                        })
                                    }
                                >
                                    {i18n._(t`Toetsresultaat toevoegen`)}
                                </Button>
                            </Column>
                        </Section>
                    }
                />
            )
        })
    }
}
