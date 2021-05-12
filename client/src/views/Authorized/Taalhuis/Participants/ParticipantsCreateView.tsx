import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
// import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import {
    ParticipantIntakeFields,
    // ParticipantIntakeFieldsFormModel,
} from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
// import { participantIntakeFieldsMapper } from 'components/Domain/Participation/mappers/ParticipantIntakeFieldsMapper'
// import { UserContext } from 'components/Providers/UserProvider/context'
// import { StudentsDocument, useCreateStudentMutation } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
// import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
// import { NameFormatters } from 'utils/formatters/name/Name'
// import { Forms } from 'utils/forms'

interface Props {}

// TODO
export const ParticipantsCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    // const userContext = useContext(UserContext)
    // const [createParticipant, { loading }] = useCreateStudentMutation()

    return (
        <Form
        // onSubmit={handleCreate}
        >
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

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} 
                        // loading={loading}
                        >
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function renderFormFields() {
        return <ParticipantIntakeFields />
    }

    // async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault()

    //     const formData = Forms.getFormDataFromFormEvent<ParticipantIntakeFieldsFormModel>(e)
    //     const response = await createParticipant({
    //         variables: {
    //             input: {
    //                 languageHouseId: userContext.user?.organizationId ?? '',
    //                 ...participantIntakeFieldsMapper(formData),
    //             },
    //         },
    //         refetchQueries: [
    //             {
    //                 query: StudentsDocument,
    //                 variables: {
    //                     languageHouseId: userContext.user?.organizationId,
    //                 },
    //             },
    //         ],
    //     })

    //     if (response.errors?.length || !response.data) {
    //         return
    //     }

    //     NotificationsManager.success(
    //         i18n._(t`Deelnemer is aangemaakt`),
    //         i18n._(t`Je wordt teruggestuurd naar het overzicht`)
    //     )

    //     history.push({
    //         pathname: taalhuisRoutes.participants.detail(response.data.createStudent.id).index,
    //         state: {
    //             participantId: response.data.createStudent.id,
    //             participantName: NameFormatters.formattedFullname({
    //                 givenName: response.data.createStudent.personDetails.givenName,
    //                 additionalName: response.data.createStudent.personDetails.additionalName,
    //                 familyName: response.data.createStudent.personDetails.familyName,
    //             }),
    //         },
    //     })
    // }
}
