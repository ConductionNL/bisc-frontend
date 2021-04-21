import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import CourseCard from 'components/Core/CourseCard/CourseCard'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { ParticipantsLearningNeedReferenceTestFields } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { FormModel } from 'views/Authorized/Management/bisc/Coworkers/CoworkerOverviewView'
import { ParticipantDetailLocationStateProps } from 'views/Authorized/Participants/taalhuis/Participants/Detail/ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const AanbiederParticipantsGoalsTestCreateView: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createLearningNeedReferenceTest, { loading }] = useMockMutation({}, false)

    const basePath = routes.authorized.supplier.participants.detail.goals.detail

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Toetsresultaat toevoegen`)}
                subtitle={'Een random naam'}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.aanbieder.participants.overview,
                            breadcrumbItems.aanbieder.participants.detail.goals.overview,
                            {
                                label: i18n._(t`Met computers leren werken`),
                                to: basePath.overview,
                            },
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
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Resultaat toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createLearningNeedReferenceTest(formData)

        if (response?.data) {
            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            return
        }
    }
}
