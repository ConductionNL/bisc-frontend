import { PureQueryOptions, RefetchQueriesFunction } from '@apollo/client'
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

interface Props<TVariables> {
    onClose: () => void
    onDelete?: () => void
    onDeleteSuccess: () => void
    learningNeedName: string
    refetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesFunction
    variables: TVariables
}

export const DeleteLearningNeedModal = <TVariables extends unknown>(props: Props<TVariables>) => {
    const { i18n } = useLingui()
    const { onClose, learningNeedName, variables, onDeleteSuccess, refetchQueries } = props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [mutation, { loading }] = useMockMutation<any, any>({
        errors: [],
        data: {},
    })

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Leervraag verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`
                                Weet je zeker dat je de leervraag ${learningNeedName} wilt verwijderen?`)}
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
    )

    async function handleDelete() {
        const response = await mutation({
            variables,
            refetchQueries,
        })

        if (!response || response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Leervraag is verwijderd`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )

        onDeleteSuccess()
    }
}
