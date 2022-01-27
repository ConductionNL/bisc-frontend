import { useLingui } from '@lingui/react'
import { useGetStudent } from 'api/student/student'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { TaalhuisParticipantMentorFields } from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantMentorFields'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'

export const ParticipantMentorUpdateView = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetStudent(taalhuisParticipantId)}>
            {student => (
                <Form onSubmit={handleEdit}>
                    <TaalhuisParticipantMentorFields student={student} />
                    <Actionbar
                        RightComponent={
                            <Row>
                                <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                    {i18n._(`Annuleren`)}
                                </Button>

                                <Button type={ButtonType.primary} submit={true}>
                                    {i18n._(`Opslaan`)}
                                </Button>
                            </Row>
                        }
                    />
                </Form>
            )}
        </PageQuery>
    )

    // TODO: BISC-317
    function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }
}
