import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import { GroupFieldsFormModel, GroupsCreateFields } from 'components/Domain/Groups/Fields/GroupsCreateFields'
import { UserContext } from 'components/Providers/UserProvider/context'
import { LearningNeedApplicationEnum, LearningNeedLevelEnum, LearningNeedTopicEnum } from 'generated/graphql'
import { useMockMutation } from 'hooks/UseMockMutation'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import { routes } from 'routes/routes'
import { CreateGroupInputType, GroupTypeCourseEnum } from 'temp/TEMPORARYgraphql'
import { Forms } from 'utils/forms'

interface Props {}

export const AanbiederGroupsCreate: React.FunctionComponent<Props> = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [createGroup, { loading }] = useMockMutation<any, { variables: CreateGroupInputType }>({})
    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe taalhuis`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />}
            />
            <GroupsCreateFields />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.bisc.taalhuizen.overview)}
                            disabled={loading}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<GroupFieldsFormModel>(e)
        const response = await createGroup({
            variables: {
                aanbiederId: userContext.user?.organizationId ?? '',
                name: formData.groupName ?? '',
                typeCourse: formData.groupCourseType ?? GroupTypeCourseEnum.Other,
                outComesGoal: formData.goal,
                outComesTopic: formData.topic,
                outComesTopicOther: formData.topicOther,
                outComesApplication: formData.application,
                outComesApplicationOther: formData.applicationOther,
                outComesLevel: formData.level,
                outComesLevelOther: formData.levelOther,
                detailsIsFormal: formData.formality,
                detailsTotalClassHours: 0,
                detailsCertificateWillBeAwarded: true,
                detailsStartDate: '',
                detailsEndDate: '',
                availability: {
                    monday: {
                        morning: true,
                        evening: true,
                        afternoon: true,
                    },
                    tuesday: {
                        morning: true,
                        evening: true,
                        afternoon: true,
                    },
                    wednesday: {
                        morning: true,
                        evening: true,
                        afternoon: true,
                    },
                    thursday: {
                        morning: true,
                        evening: true,
                        afternoon: true,
                    },
                    friday: {
                        morning: true,
                        evening: true,
                        afternoon: true,
                    },
                    saturday: { morning: true, evening: true, afternoon: true },
                    sunday: { morning: true, evening: true, afternoon: true },
                },
                availabilityNotes: '',
                generalLocation: '',
                generalParticipantsMin: 0,
                generalParticipantsMax: 0,
                generalEvaluation: '',
                aanbiederEmployeeIds: [],
            },
        })

        if (!response || response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Groep is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de gegevens van de groep`)
        )

        history.push({
            pathname: routes.authorized.bisc.taalhuizen.detail.index,
            state: {
                taalhuisId: response.data.createTaalhuis.id,
                taalhuisName: response.data.createTaalhuis.name,
            },
        })
    }
}
