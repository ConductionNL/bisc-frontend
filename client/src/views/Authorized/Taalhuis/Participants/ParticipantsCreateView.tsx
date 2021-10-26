import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { usePostStudent } from 'api/student/student'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
// import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import {
    ParticipantIntakeFields,
    ParticipantIntakeFieldsFormModel,
} from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
import { participantIntakeFieldsMapper } from 'components/Domain/Participation/mappers/ParticipantIntakeFieldsMapper'
import { UserContext } from 'components/Providers/UserProvider/context'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { Forms } from 'utils/forms'

interface Props {}

export const ParticipantsCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const userContext = useContext(UserContext)
    const { mutate: postStudent, loading } = usePostStudent()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe Deelnemer `)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            {renderFormFields()}
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
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

    function renderFormFields() {
        return <ParticipantIntakeFields />
    }

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantIntakeFieldsFormModel>(e)
        const languageHouseId = userContext.user?.organization.id!
        const input = participantIntakeFieldsMapper(languageHouseId, formData)

        try {
            const response = await postStudent(input)

            // const response = await postStudent({
            //     variables: { input },
            //     refetchQueries: [{ query: StudentsDocument, variables: { languageHouseId } }],
            // })

            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de deelnemer`)
            )

            setTimeout(() => {
                history.push(taalhuisRoutes.participants.detail(response.id).index)
            }, 500)
        } catch (error: any) {
            NotificationsManager.error(error.message)
        }
    }
}
