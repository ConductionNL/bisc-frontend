import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

interface Props {
    onClose: () => void
    taalhuisParticipantId: string
    learningNeedId: string
    testResultId: string
}

export const ParticipantsLearningNeedsTestDeleteModal: React.FC<Props> = (props: Props) => {
    const { onClose } = props
    const history = useHistory()
    const { i18n } = useLingui()
    const [deleteLearningNeedReference, { loading: deleteLoading }] = useMockMutation({}, false)

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Toetsresultaat verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`
                                Weet je zeker dat je het toetsresultaat wilt verwijderen?`)}
                    </Paragraph>
                </Column>
            }
            BottomComponent={
                <>
                    <Button type={ButtonType.secondary} onClick={onClose}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    <Button
                        danger={true}
                        type={ButtonType.primary}
                        icon={IconType.delete}
                        onClick={handleDelete}
                        loading={deleteLoading}
                    >
                        {i18n._(t`Verwijderen`)}
                    </Button>
                </>
            }
        />
    )

    async function handleDelete() {
        const { taalhuisParticipantId, learningNeedId } = props
        const response = await deleteLearningNeedReference(true)

        if (response?.errors?.length || !response?.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is verwijderd`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )

        history.push(
            taalhuisRoutes.participants.detail(taalhuisParticipantId).data.learningNeeds.detail(learningNeedId).index
        )
    }
}
