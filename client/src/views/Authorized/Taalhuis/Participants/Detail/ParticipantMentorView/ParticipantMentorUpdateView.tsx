import { useLingui } from '@lingui/react'
import { useGetStudent, usePutStudent } from 'api/student/student'
import { Student } from 'api/types/types'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import {
    TaalhuisParticipantMentorFields,
    TaalhuisParticipantMentorFormFields,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantMentorFields'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { Forms } from 'utils/forms'

export const ParticipantMentorUpdateView = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { mutate, loading, error } = usePutStudent(taalhuisParticipantId)
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetStudent(taalhuisParticipantId)}>
            {student => (
                <MutationErrorProvider mutationError={error?.data}>
                    <Form onSubmit={handleEdit(student)}>
                        <TaalhuisParticipantMentorFields student={student} />
                        <Actionbar
                            RightComponent={
                                <Row>
                                    <Button
                                        type={ButtonType.secondary}
                                        disabled={loading}
                                        onClick={() => history.goBack()}
                                    >
                                        {i18n._(`Annuleren`)}
                                    </Button>

                                    <Button type={ButtonType.primary} submit={true} loading={loading}>
                                        {i18n._(`Opslaan`)}
                                    </Button>
                                </Row>
                            }
                        />
                    </Form>
                </MutationErrorProvider>
            )}
        </PageQuery>
    )

    function handleEdit(student: Student) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<TaalhuisParticipantMentorFormFields>(e)
            const input = {
                team: formData.team,
                mentor: formData.mentor,
                person: student.person.id,
            }

            try {
                await mutate(input)

                NotificationsManager.success(
                    i18n._(`Begeleider is bijgewerkt`),
                    i18n._(`Je wordt teruggestuurd naar het overzicht`)
                )

                history.push(taalhuisRoutes.participants.detail(taalhuisParticipantId).data.mentor.detail)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (!error.data) {
                    NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
                }
            }
        }
    }
}
