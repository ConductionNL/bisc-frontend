import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuisParticipantLearningNeedFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import ReferenceCardLinkedHeader from 'components/Participants/cards/ReferenceCard/Headers/ReferenceCardLinkedHeader'
import OngoingStatus from 'components/Participants/cards/ReferenceCard/Headers/Status/OngoingStatus'
import ReferenceCard from 'components/Participants/cards/ReferenceCard/ReferenceCard'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { LearningNeedsStatusDetailResponse } from '../mocks/learningNeeds'
import { ParticipantsLearningNeedsDetailLocationStateProps } from './ParticipantsLearningNeedsDetailView'
import Section from 'components/Core/Field/Section'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { useLearningNeedQuery } from 'generated/graphql'

interface Props {
    routeState: ParticipantsLearningNeedsDetailLocationStateProps
}

export const ParticipantsLearningNeedReadView: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { routeState } = props
    const history = useHistory()
    const { data, loading, error } = useLearningNeedQuery({
        variables: {
            learningNeedId: routeState.learningNeedId,
        },
    })
    const { data: statusData, loading: loadStatusData, error: statusDataError } = useMockQuery(
        LearningNeedsStatusDetailResponse
    )

    return (
        <Column spacing={4}>
            <Headline
                title={routeState.learningNeedName}
                subtitle={routeState.participantName}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.taalhuis.participants.overview,
                            breadcrumbItems.taalhuis.participants.detail.goals.overview,
                        ]}
                    />
                }
            />
            <Row justifyContent="flex-end">
                <Button
                    icon={IconType.send}
                    onClick={() =>
                        history.push({
                            pathname:
                                routes.authorized.participants.taalhuis.participants.detail.goals.detail.references
                                    .index,
                            state: routeState,
                        })
                    }
                >
                    {i18n._(t`Verwijzen naar`)}
                </Button>
            </Row>
            {renderSection()}
        </Column>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
            return (
                <>
                    <TaalhuisParticipantLearningNeedFields readOnly={true} learningNeed={data} />
                    {renderReferenceCards()}
                    <Space pushTop={true} />
                    <Actionbar
                        RightComponent={
                            <Button
                                type={ButtonType.primary}
                                icon={IconType.send}
                                onClick={() =>
                                    history.push({
                                        pathname:
                                            routes.authorized.participants.taalhuis.participants.detail.goals.detail
                                                .update,
                                        state: routeState,
                                    })
                                }
                            >
                                {i18n._(t`Leervraag aanpassen`)}
                            </Button>
                        }
                    />
                </>
            )
        }

        function renderReferenceCards() {
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
                    <>
                        <SectionTitle title={i18n._(t`Verwijzingen`)} heading={'H3'} />
                        <ReferenceCard
                            onClickEditTopComponent={() =>
                                history.push({
                                    pathname:
                                        routes.authorized.participants.taalhuis.participants.detail.goals.detail
                                            .references.update,
                                    state: routeState,
                                })
                            }
                            onClickEditBottomComponent={() =>
                                history.push({
                                    pathname:
                                        routes.authorized.participants.taalhuis.participants.detail.goals.detail.tests
                                            .update,
                                    state: routeState,
                                })
                            }
                            TopComponent={
                                <ReferenceCardLinkedHeader
                                    StatusComponent={
                                        <OngoingStatus
                                            title={statusData.title}
                                            supplierName={statusData.supplierName}
                                            status={statusData.status}
                                        />
                                    }
                                    InformationComponent={
                                        <>
                                            <Column spacing={6}>
                                                <Column>
                                                    <Field label={i18n._(t`Startdatum`)} horizontal={true}>
                                                        <Paragraph>{statusData.startDate}</Paragraph>
                                                    </Field>
                                                    <Field label={i18n._(t`Einddatum`)} horizontal={true}>
                                                        <Paragraph>{statusData.endDate}</Paragraph>
                                                    </Field>
                                                </Column>
                                                <Column>
                                                    <Field label={i18n._(t`Deelnemer begonnen op`)} horizontal={true}>
                                                        <Paragraph>{statusData.startedAt}</Paragraph>
                                                    </Field>
                                                    <Field label={i18n._(t`Deelnemer gestopt op`)} horizontal={true}>
                                                        <Paragraph>{statusData.stoppedAt}</Paragraph>
                                                    </Field>
                                                    <Field label={i18n._(t`Reden gestopt`)} horizontal={true}>
                                                        <Paragraph>{statusData.reason}</Paragraph>
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
                                                    pathname:
                                                        routes.authorized.participants.taalhuis.participants.detail
                                                            .goals.detail.tests.create,
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
                    </>
                )
            }
        }
    }
}
