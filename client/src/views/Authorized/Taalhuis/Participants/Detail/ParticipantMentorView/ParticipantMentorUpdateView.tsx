import { useLingui } from '@lingui/react'
import { useGetStudent, usePutStudent } from 'api/student/student'
import { Student } from 'api/types/types'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import { ConfirmModal } from 'components/Core/Modal/ConfirmModal'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    TaalhuisParticipantMentorFields,
    TaalhuisParticipantMentorFormFields,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantMentorFields'
import { useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantMentorUpdateView = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { mutate, loading, error } = usePutStudent(taalhuisParticipantId)
    const { i18n } = useLingui()
    const history = useHistory()
    const formRef = useRef<HTMLFormElement>()

    const [modalOpen, setModalOpen] = useState(false)

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetStudent(taalhuisParticipantId)}>
            {student => (
                <MutationErrorProvider mutationError={error?.data}>
                    <Form onRef={formRef} onSubmit={handleEdit(student)}>
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

                                    <Button
                                        type={ButtonType.primary}
                                        onClick={() => setModalOpen(true)}
                                        loading={loading}
                                    >
                                        {i18n._(`Opslaan`)}
                                    </Button>
                                </Row>
                            }
                        />
                        {renderConfirmModal(student)}
                    </Form>
                </MutationErrorProvider>
            )}
        </PageQuery>
    )

    function handleEdit(student: Student) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setModalOpen(false)

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

    function renderConfirmModal(student: Student) {
        return (
            <ConfirmModal
                modalOpen={modalOpen}
                title={i18n._('Begeleider wijzigen')}
                message={
                    <Paragraph>
                        {i18n._('Weet je zeker dat je de')} <strong>{i18n._('begeleider')}</strong> {i18n._('van')}{' '}
                        <strong>{NameFormatters.formattedFullname(student.person)}</strong> {i18n._('wilt wijzigen?')}
                    </Paragraph>
                }
                confirmButtonLabel={i18n._('Begeleider wijzigen')}
                onClose={() => setModalOpen(false)}
                onConfirm={() => {
                    setModalOpen(false)
                    formRef.current?.requestSubmit()
                }}
            />
        )
    }
}
