import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { TaalhuisParticipantLearningNeedReferenceTestFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceTestFields'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/LearningOutcomeOfferFieldset'
import { useMockMutation } from 'hooks/UseMockMutation'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from '../../../ParticipantsDetailView'
import Column from 'components/Core/Layout/Column/Column'
import CourseCard from 'components/Domain/Taalhuis/CourseCard/CourseCard'
import Paragraph from 'components/Core/Typography/Paragraph'

interface FormModel extends LearningOutcomeOfferFieldsetModel {}

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsLearningNeedsReferencesTestCreateView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createLearningNeedReferenceTest, { loading }] = useMockMutation({}, false)

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Toetsresultaat toevoegen`)}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb
                            text={i18n._(t`Deelnemers`)}
                            to={routes.authorized.participants.taalhuis.participants.overview}
                        />
                        <Breadcrumb
                            text={i18n._(t`Leervragen`)}
                            to={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
                        />
                        <Breadcrumb
                            text={i18n._(t`Met computers leren werken`)}
                            to={routes.authorized.participants.taalhuis.participants.detail.goals.detail.read}
                        />
                    </Breadcrumbs>
                }
            />
            <Column spacing={4}>
                <CourseCard>
                    <Row>
                        <Paragraph bold={true}>{i18n._(t`Digivaardigheids cursus`)}</Paragraph>
                        <Paragraph bold={true} small={true}>
                            {i18n._(t`NL educatie`)}
                        </Paragraph>
                    </Row>
                </CourseCard>
                <TaalhuisParticipantLearningNeedReferenceTestFields />
            </Column>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
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
