import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import { GroupFieldsFormModel, GroupsCreateFields } from 'components/Domain/Groups/Fields/GroupsCreateFields'
import { GroupMentorDetailModalGroup } from 'components/Domain/Groups/Modals/GroupMentorDetailModalSectionView'
import {
    DetailsCertificateWillBeAwarded,
    DetailsInformationFieldsetFormalityEnum,
} from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { GroupTypeCourseEnum, useGroupQuery, useUpdateGroupMutation } from 'generated/graphql'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { AanbiederGroupDetailLocationProps } from './AanbiederGroupsDetailView'

interface Props {
    routeState: AanbiederGroupDetailLocationProps
}

export const AanbiederGroupsDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const history = useHistory()
    const { i18n } = useLingui()
    const [updateGroup, { loading: updateGroupLoading }] = useUpdateGroupMutation()
    const { data: groupQuery, loading: groupLoading, error: groupError } = useGroupQuery({
        variables: { groupId: routeState.groupId },
    })
    const [group, setGroup] = useState<GroupMentorDetailModalGroup | undefined>(undefined)

    return (
        <Form onSubmit={handleUpdate} onChange={handleOnChange}>
            {/* // TODO: implement breadcrumbs */}
            <Headline title={routeState.groupName} />
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
                            {i18n._(t`Bijwerken`)}
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
        return <GroupsCreateFields prefillData={groupQuery?.group} group={group} />
    }

    function handleOnChange(e: React.FormEvent<HTMLFormElement>) {
        const formData = Forms.getFormDataFromFormEvent<GroupFieldsFormModel>(e)
        setGroup({
            name: formData.groupName,
            note: formData.note,
            availabillity: JSON.parse(formData.available),
        })
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<GroupFieldsFormModel>(e)
        const response = await updateGroup({
            variables: {
                input: {
                    groupId: routeState.groupId,
                    name: formData.groupName ?? '',
                    typeCourse: formData.groupCourseType ?? GroupTypeCourseEnum.Other,
                    outComesGoal: formData.outComesGoal,
                    outComesTopic: formData.outComesTopic,
                    outComesTopicOther: formData.outComesTopicOther,
                    outComesApplication: formData.outComesApplication,
                    outComesApplicationOther: formData.outComesApplicationOther,
                    outComesLevel: formData.outComesLevel,
                    outComesLevelOther: formData.outComesLevelOther,
                    detailsIsFormal:
                        formData.detailsIsFormal === DetailsInformationFieldsetFormalityEnum.formal ? true : false,
                    detailsTotalClassHours: parseInt(formData.detailsTotalClassHours),
                    detailsCertificateWillBeAwarded:
                        formData.detailsCertificateWillBeAwarded === DetailsCertificateWillBeAwarded.Yes ? true : false,
                    detailsStartDate: new Date(formData.detailsStartDate).toString(),
                    detailsEndDate: formData.detailsEndDate,
                    availability: JSON.parse(formData.available),
                    availabilityNotes: formData.note,
                    generalLocation: formData.location ?? '',
                    generalParticipantsMin: parseInt(formData.participantsMin ?? ''),
                    generalParticipantsMax: parseInt(formData.participantsMax ?? ''),
                    generalEvaluation: formData.evaluation,
                    providerEmployeeIds: formData.mentorIds.split(','),
                },
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
            pathname: routes.authorized.supplier.groups.detail.index,
            state: {
                groupId: response.data.updateGroup.id,
                groupName: response.data.updateGroup.name,
            },
        })
    }
}
