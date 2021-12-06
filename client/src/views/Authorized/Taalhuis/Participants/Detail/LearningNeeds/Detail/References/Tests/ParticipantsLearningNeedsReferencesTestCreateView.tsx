import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
// import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { ParticipantsLearningNeedReferenceTestFields } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { useHistory, useParams } from 'react-router-dom'
// import { Forms } from 'utils/forms'
import Column from 'components/Core/Layout/Column/Column'
import CourseCard from 'components/Core/CourseCard/CourseCard'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { TaalhuisParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { useGetLearningNeed } from 'api/learningNeed/learningNeed'

export const ParticipantsLearningNeedsReferencesTestCreateView: React.FC = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<TaalhuisParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams>()
    const { data } = useGetLearningNeed(params.learningNeedId)
    // const [createLearningNeedReferenceTest, { loading }] = useMockMutation({}, false)

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Toetsresultaat toevoegen`)}
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
            <Column spacing={6}>
                <CourseCard course={i18n._(t`Digivaardigheids cursus`)} chapter={i18n._(t`NL educatie`)} />
                <ParticipantsLearningNeedReferenceTestFields />
            </Column>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            // disabled={loading}
                            type={ButtonType.secondary}
                            onClick={() => history.goBack()}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button
                            type={ButtonType.primary}
                            icon={IconType.send}
                            submit={true}
                            // loading={loading}
                        >
                            {i18n._(t`Resultaat toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        //     e.preventDefault()
        //     const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        //     const response = await createLearningNeedReferenceTest(formData)
        //     if (response?.errors?.length || !response?.data) {
        //         return
        //     }
        //     NotificationsManager.success(
        //         i18n._(t`Leervraag is aangemaakt`),
        //         i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        //     )
    }
}
