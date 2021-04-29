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
import { GroupMentorDetailModalGroup } from 'components/Domain/Groups/Modals/GroupMentorDetailModalSectionView'
import {
    DetailsCertificateWillBeAwarded,
    DetailsInformationFieldsetFormalityEnum,
} from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { UserContext } from 'components/Providers/UserProvider/context'
import { GroupTypeCourseEnum, useCreateGroupMutation } from 'generated/graphql'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

interface Props {}

export const AanbiederGroupsCreate: React.FunctionComponent<Props> = () => {
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [createGroup, { loading }] = useCreateGroupMutation()
    const [group, setGroup] = useState<GroupMentorDetailModalGroup | undefined>(undefined)

    return (
        <Form onSubmit={handleCreate} onChange={handleOnChange}>
            <Headline
                title={i18n._(t`Nieuwe groep`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />}
            />
            <GroupsCreateFields group={group} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.supplier.groups.index)}
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

    function handleOnChange(e: React.FormEvent<HTMLFormElement>) {
        const formData = Forms.getFormDataFromFormEvent<GroupFieldsFormModel>(e)
        setGroup({
            name: formData.groupName,
            note: formData.note,
            availabillity: JSON.parse(formData.available),
        })
    }

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = await Forms.getFormDataFromFormEvent<GroupFieldsFormModel>(e)
        const response = await createGroup({
            variables: {
                input: {
                    providerId: userContext.user?.organizationId ?? '',
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
                        DetailsInformationFieldsetFormalityEnum.formal === formData.detailsIsFormal ? true : false,
                    detailsTotalClassHours: parseInt(formData.detailsTotalClassHours),
                    detailsCertificateWillBeAwarded:
                        formData.detailsCertificateWillBeAwarded === DetailsCertificateWillBeAwarded.Yes ? true : false,
                    detailsStartDate: formData.detailsStartDate,
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

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Groep is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de gegevens van de groep`)
        )

        history.push({
            pathname: routes.authorized.bisc.taalhuizen.detail.index,
            state: {
                groupsId: response.data.createGroup.id,
                groupName: response.data.createGroup.name,
            },
        })
    }
}
