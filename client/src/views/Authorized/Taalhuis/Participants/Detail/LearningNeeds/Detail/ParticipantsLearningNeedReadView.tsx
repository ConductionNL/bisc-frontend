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
import { useHistory, useParams } from 'react-router-dom'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import {
    TaalhuisParticipantsDetailLearningNeedsDetailRouteParams,
    taalhuisRoutes,
} from 'routes/taalhuis/taalhuisRoutes'
import { useGetLearningNeed } from 'api/learningNeed/learningNeed'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Participation } from 'api/types/types'

export const ParticipantsLearningNeedReadView: React.FC = props => {
    const {
        taalhuisParticipantId,
        learningNeedId,
    } = useParams<TaalhuisParticipantsDetailLearningNeedsDetailRouteParams>()

    const { i18n } = useLingui()
    const history = useHistory()
    const { data: learningNeed, loading, error } = useGetLearningNeed(learningNeedId)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !learningNeed) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

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
                            breadcrumbItems.taalhuis.participants.detail.learningNeeds.overview(taalhuisParticipantId),
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
            {renderSection()}
        </Column>
    )

    function renderSection() {
        if (!learningNeed) {
            return null
        }

        return (
            <>
                <TaalhuisParticipantLearningNeedFields readOnly={true} learningNeed={learningNeed} />
                {!!learningNeed.participations.length && (
                    <>
                        <SectionTitle title={i18n._(t`Verwijzingen`)} heading={'H3'} />
                        {learningNeed.participations.map(renderReferenceCard)}
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

        function renderReferenceCard(participation: Participation) {
            const baseLearningNeedsPath = taalhuisRoutes.participants
                .detail(taalhuisParticipantId)
                .data.learningNeeds.detail(learningNeedId)

            return (
                <>
                    <ReferenceCard
                        onClickEditTopComponent={() =>
                            history.push(baseLearningNeedsPath.referrals.detail(participation.id).update)
                        }
                        TopComponent={
                            <ReferenceCardLinkedHeader
                                StatusComponent={
                                    <OngoingStatus
                                        title={''} // TODO: ??
                                        supplierName={participation.provider?.name || participation.providerOther || ''}
                                        status={participation.status}
                                    />
                                }
                                InformationComponent={
                                    <>
                                        <Column spacing={6}>
                                            <Column>
                                                <Field label={i18n._(t`Startdatum`)} horizontal={true}>
                                                    <Paragraph>{participation.start}</Paragraph>
                                                </Field>
                                                <Field label={i18n._(t`Einddatum`)} horizontal={true}>
                                                    <Paragraph>{participation.end}</Paragraph>
                                                </Field>
                                            </Column>
                                            <Column>
                                                <Field label={i18n._(t`Deelnemer begonnen op`)} horizontal={true}>
                                                    <Paragraph>{participation.startParticipation}</Paragraph>
                                                </Field>
                                                <Field label={i18n._(t`Deelnemer gestopt op`)} horizontal={true}>
                                                    <Paragraph>{participation.endParticipation}</Paragraph>
                                                </Field>
                                                <Field label={i18n._(t`Reden gestopt`)} horizontal={true}>
                                                    <Paragraph>{participation.reasonEndParticipation}</Paragraph>
                                                </Field>
                                            </Column>
                                        </Column>
                                    </>
                                }
                            />
                        }
                        // onClickEditBottomComponent={() => history.push(baseLearningNeedsPath.referrals.detail(participation.id).testResult.update)}
                        // BottomComponent={
                        //     <Section title={i18n._(t`Toetsresultaat`)}>
                        //         <Column>
                        //             <Button
                        //                 type={ButtonType.tertiary}
                        //                 icon={IconType.add}
                        //                 onClick={() => history.push(baseLearningNeedsPath.referrals.detail(participation.id).testResult.create)}
                        //             >
                        //                 {i18n._(t`Toetsresultaat toevoegen`)}
                        //             </Button>
                        //         </Column>
                        //     </Section>
                        // }
                    />
                </>
            )
        }
    }
}
