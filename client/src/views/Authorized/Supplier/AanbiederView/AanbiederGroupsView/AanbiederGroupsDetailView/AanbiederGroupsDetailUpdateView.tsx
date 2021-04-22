import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import { GroupFieldsFormModel, GroupsCreateFields } from 'components/Domain/Groups/Fields/GroupsCreateFields'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { GroupType, GroupTypeCourseEnum, UpdateGroupInputType } from 'temp/TEMPORARYgraphql'
import { Forms } from 'utils/forms'
import { groupsMockData } from '../mocks'
import { AanbiederGroupDetailLocationProps } from './AanbiederGroupsDetailView'

interface Props {
    routeState: AanbiederGroupDetailLocationProps
}

export const AanbiederGroupsDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const history = useHistory()
    const { i18n } = useLingui()
    const [updateGroup, { loading: updateGroupLoading }] = useMockMutation<any, { variables: UpdateGroupInputType }>({})
    const { data: group, loading: groupLoading, error: groupError } = useMockQuery<GroupType | undefined>(
        groupsMockData.find(group => group.id === routeState.groupId)
    )

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={routeState.groupName}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />}
            />
            {renderForm()}
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push({
                                    pathname: routes.authorized.supplier.groups.detail.read,
                                    state: routeState,
                                })
                            }
                            disabled={updateGroupLoading}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button
                            type={ButtonType.primary}
                            submit={true}
                            loading={updateGroupLoading}
                            disabled={groupLoading}
                        >
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function renderForm() {
        if (groupLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (groupError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Het is niet gelukt om de gegevens op te halen, probeer het opnieuw`)}
                />
            )
        }
        return <GroupsCreateFields prefillData={group} />
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<GroupFieldsFormModel>(e)
        const response = await updateGroup({
            variables: {
                groupId: '',
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
                detailsTotalClassHours: parseInt(formData.teachingHours),
                detailsCertificateWillBeAwarded: true,
                detailsStartDate: formData.startDate,
                detailsEndDate: formData.endDate,
                availability: JSON.parse(formData.available),
                availabilityNotes: formData.note,
                generalLocation: formData.location ?? '',
                generalParticipantsMin: parseInt(formData.participantsMin ?? ''),
                generalParticipantsMax: parseInt(formData.participantsMax ?? ''),
                generalEvaluation: formData.evaluation,
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
                taalhuisId: response.data.updateGroup.id,
                taalhuisName: response.data.updateGroup.name,
            },
        })
    }
}
