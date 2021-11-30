import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useDeleteLearningNeed } from 'api/learningNeed/learningNeed'
import { LearningNeed } from 'api/types/types'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

interface Props<TVariables> {
    onClose: () => void
    onDelete?: () => void
    onDeleteSuccess: () => void
    learningNeed: LearningNeed
}

export const DeleteLearningNeedModal = <TVariables extends unknown>(props: Props<TVariables>) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { onClose, learningNeed, onDeleteSuccess } = props

    const { mutate: deleteLearningNeed, loading, error } = useDeleteLearningNeed(learningNeed.id)

    return (
        <MutationErrorProvider mutationError={error?.data}>
            <ModalView
                onClose={onClose}
                ContentComponent={
                    <Column spacing={6}>
                        <SectionTitle title={i18n._(t`Leervraag verwijderen`)} heading="H4" />
                        <Paragraph>
                            {i18n._(t`
                                    Weet je zeker dat je de leervraag ${learningNeed.description} wilt verwijderen?`)}
                        </Paragraph>
                    </Column>
                }
                BottomComponent={
                    <>
                        <Button type={ButtonType.secondary} onClick={onClose} disabled={loading}>
                            {i18n._(t`Annuleren`)}
                        </Button>
                        <Button
                            danger={true}
                            type={ButtonType.primary}
                            icon={IconType.delete}
                            onClick={handleDelete}
                            loading={loading}
                        >
                            {i18n._(t`Verwijderen`)}
                        </Button>
                    </>
                }
            />
        </MutationErrorProvider>
    )

    async function handleDelete() {
        try {
            await deleteLearningNeed({})

            NotificationsManager.success(
                i18n._(t`Leervraag is verwijderd`),
                i18n._(t`Je wordt doorgestuurd naar het overzicht`)
            )

            history.push(taalhuisRoutes.participants.detail(learningNeed.student.id).data.learningNeeds.index)

            onDeleteSuccess()
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                console.error(error)
            }
        }
    }
}
