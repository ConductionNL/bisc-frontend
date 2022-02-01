import { useLingui } from '@lingui/react'
import { useGetStudent } from 'api/student/student'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button from 'components/Core/Button/Button'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { TaalhuisParticipantMentorFields } from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantMentorFields'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export const ParticipantMentorDetailView = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetStudent(taalhuisParticipantId)}>
            {student => (
                <>
                    <TaalhuisParticipantMentorFields student={student} readOnly={true} />
                    <Actionbar
                        RightComponent={
                            <Button
                                onClick={() =>
                                    history.push(
                                        taalhuisRoutes.participants.detail(taalhuisParticipantId).data.mentor.update
                                    )
                                }
                            >
                                {i18n._('Bewerken')}
                            </Button>
                        }
                    />
                </>
            )}
        </PageQuery>
    )
}
