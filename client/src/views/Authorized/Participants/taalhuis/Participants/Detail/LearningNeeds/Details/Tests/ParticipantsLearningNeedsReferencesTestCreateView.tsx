import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { ParticipantsLearningNeedReferenceTestFields } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { useMockMutation } from 'hooks/UseMockMutation'
import { useHistory } from 'react-router-dom'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from '../../../ParticipantsDetailView'
import Column from 'components/Core/Layout/Column/Column'
import CourseCard from 'components/Core/CourseCard/CourseCard'
import { TaalhuizenParticipantsLearningNeedsBreadCrumbs } from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenParticipantsLearningNeedsBreadCrumbs'

interface FormModel extends LearningOutcomeOfferFieldsetModel {}

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsLearningNeedsReferencesTestCreateView: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createLearningNeedReferenceTest, { loading }] = useMockMutation({}, false)

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Toetsresultaat toevoegen`)}
                spacingType={SpacingType.small}
                TopComponent={<TaalhuizenParticipantsLearningNeedsBreadCrumbs routeState={routeState} />}
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

        if (response?.errors?.length || !response?.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Leervraag is aangemaakt`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )
    }
}
