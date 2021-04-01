import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { AanbiederEmployeesDocument, useDeleteAanbiederEmployeeMutation } from 'generated/graphql'
import React from 'react'

interface Props {
    onClose: () => void
    onSuccess: () => void
    coworkerId: string
    coworkerName: string
    aanbiederId: string
}

const AanbiederCoworkerDeleteModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [deleteAanbieder, { loading }] = useDeleteAanbiederEmployeeMutation()
    const { onClose, onSuccess, coworkerId, coworkerName, aanbiederId } = props

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Medewerker ${coworkerName} verwijderen`)} heading="H4" />
                    <Paragraph>{i18n._(t`Weet je zeker dat je de medewerker wil verwijderen?`)}</Paragraph>
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
                        loading={loading}
                    >
                        {i18n._(t`Verwijderen`)}
                    </Button>
                </>
            }
        />
    )

    async function handleDelete() {
        const response = await deleteAanbieder({
            variables: {
                userId: coworkerId,
            },
            refetchQueries: [{ query: AanbiederEmployeesDocument, variables: { aanbiederId } }],
        })

        if (response.errors?.length) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is verwijderd`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )
        onSuccess()
    }
}

export default AanbiederCoworkerDeleteModalView
