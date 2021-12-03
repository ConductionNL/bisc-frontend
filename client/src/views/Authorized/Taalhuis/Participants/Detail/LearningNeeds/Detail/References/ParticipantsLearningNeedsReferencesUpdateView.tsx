import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetParticipation, usePutParticipation } from 'api/participation/participation'
import { useGetStudent } from 'api/student/student'
import { Participation } from 'api/types/types'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { InfoBlock } from 'components/Core/Containers/InfoBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DeleteLearningNeedReferenceButtonContainer } from 'components/Domain/LearningNeeds/Containers/DeleteLearningNeedReferenceButtonContainer'
import { getMappedParticipationFormFields } from 'components/Domain/Participation/mappers/participationFieldsMapper'
import {
    LearningNeedsReferenceFormModel,
    TaalhuisLearningNeedsReferenceFields,
} from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceFields'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    TaalhuisParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams,
    taalhuisRoutes,
} from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantsLearningNeedsReferencesUpdateView: React.FC = () => {
    const history = useHistory()
    const { i18n } = useLingui()
    const params = useParams<TaalhuisParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams>()
    const { data } = useGetStudent(params.taalhuisParticipantId)
    const { mutate, loading, error } = usePutParticipation(params.referralId)

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetParticipation(params.referralId)}>
            {data => renderPageContent(data)}
        </PageQuery>
    )

    function renderPageContent(participation: Participation) {
        const participantName = data ? NameFormatters.formattedFullname(data.person) : ''

        return (
            <Form onSubmit={handleUpdate(participation)}>
                <Headline
                    title={i18n._(t`Verwijzing aanpassen`)}
                    subtitle={participantName}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.taalhuis.participants.overview,
                                // breadcrumbItems.taalhuis.participants.detail.goals.overview,
                                // breadcrumbItems.taalhuis.participants.detail.goals.detail.read(routeState),
                            ]}
                        />
                    }
                />
                {renderSection(participation)}
                <Actionbar
                    LeftComponent={
                        <DeleteLearningNeedReferenceButtonContainer
                            participationId={params.referralId}
                            learningNeedName={participantName}
                            onSuccessfullDelete={() =>
                                history.push(
                                    taalhuisRoutes.participants
                                        .detail(params.taalhuisParticipantId)
                                        .data.learningNeeds.detail(params.learningNeedId).index
                                )
                            }
                        />
                    }
                    RightComponent={
                        <Row>
                            <Button disabled={loading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                                {i18n._(t`Verwijzen`)}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        )
    }

    function renderSection(participation: Participation) {
        return (
            <Column spacing={4}>
                <InfoBlock type="info">
                    <Row>
                        <Paragraph bold={true}>{i18n._(t`Geadviseerd aanbod`)}</Paragraph>
                        <Paragraph> {i18n._(t`Digivaardigheidscursus`)}</Paragraph>
                    </Row>
                </InfoBlock>
                <MutationErrorProvider mutationError={error?.data}>
                    <TaalhuisLearningNeedsReferenceFields showPresenceFields={true} defaultValues={participation} />
                </MutationErrorProvider>
            </Column>
        )
    }

    function handleUpdate(participation: Participation) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<LearningNeedsReferenceFormModel>(e)
            const input = getMappedParticipationFormFields(formData, params.learningNeedId, participation)

            try {
                await mutate(input)

                NotificationsManager.success(
                    i18n._(t`Deelnemer is bijgewerkt`),
                    i18n._(t`Je wordt teruggestuurd naar het overzicht`)
                )

                history.push(
                    taalhuisRoutes.participants
                        .detail(params.taalhuisParticipantId)
                        .data.learningNeeds.detail(params.learningNeedId).index
                )

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }
}
