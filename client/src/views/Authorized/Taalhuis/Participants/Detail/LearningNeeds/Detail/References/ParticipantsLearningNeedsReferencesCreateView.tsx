import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetLearningNeed } from 'api/learningNeed/learningNeed'
import { usePostParticipation } from 'api/participation/participation'
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
import Paragraph from 'components/Core/Typography/Paragraph'
import { getMappedParticipationFormFields } from 'components/Domain/Participation/mappers/participationFieldsMapper'
import {
    LearningNeedsReferenceFormModel,
    TaalhuisLearningNeedsReferenceFields,
} from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceFields'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    TaalhuisParticipantsDetailLearningNeedsDetailRouteParams,
    taalhuisRoutes,
} from 'routes/taalhuis/taalhuisRoutes'
import { Forms } from 'utils/forms'

export const ParticipantsLearningNeedsReferencesCreateView: React.FC = () => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { mutate, loading, error } = usePostParticipation()
    const params = useParams<TaalhuisParticipantsDetailLearningNeedsDetailRouteParams>()
    const { data } = useGetLearningNeed(params.learningNeedId)

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe verwijzing`)}
                subtitle={'André Willemse'}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.taalhuis.participants.overview,
                            breadcrumbItems.taalhuis.participants.detail.learningNeeds.overview(
                                params.taalhuisParticipantId
                            ),
                            breadcrumbItems.taalhuis.participants.detail.learningNeeds.detail.index(
                                params.taalhuisParticipantId,
                                data?.description || '',
                                params.learningNeedId
                            ),
                        ]}
                    />
                }
            />
            <Column spacing={4}>
                <InfoBlock type="info">
                    <Row>
                        <Paragraph bold={true}>{i18n._(t`Geadviseerd aanbod`)}</Paragraph>
                        <Paragraph>{data?.advisedOffer}</Paragraph>
                    </Row>
                </InfoBlock>
                <MutationErrorProvider mutationError={error?.data}>
                    <TaalhuisLearningNeedsReferenceFields />
                </MutationErrorProvider>
            </Column>
            <Actionbar
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

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const { learningNeedId, taalhuisParticipantId } = params
        const formData = Forms.getFormDataFromFormEvent<LearningNeedsReferenceFormModel>(e)
        const input = getMappedParticipationFormFields(formData, learningNeedId)

        try {
            await mutate(input)

            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                taalhuisRoutes.participants.detail(taalhuisParticipantId).data.learningNeeds.detail(learningNeedId)
                    .index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
