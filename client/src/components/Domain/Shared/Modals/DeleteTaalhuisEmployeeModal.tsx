import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { UserContext } from 'components/Providers/UserProvider/context'
import { LanguageHouseEmployeesDocument, useDeleteLanguageHouseEmployeeMutation } from 'generated/graphql'
import React, { useContext } from 'react'

interface Props {
    onClose: () => void
    onSuccess?: () => void
    coworkerId: string
    coworkerName: string
}

export const DeleteTaalhuisEmployeeModal: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [deleteTaalhuis, { loading }] = useDeleteLanguageHouseEmployeeMutation()
    const { onClose, onSuccess, coworkerId, coworkerName } = props
    const userContext = useContext(UserContext)

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Medewerker ${coworkerName} verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`
                                Weet je zeker dat je het medewerker wilt verwijderen? Deze medewerker zal geen toegang meer hebben tot de applicatie.`)}
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
        const response = await deleteTaalhuis({
            variables: {
                userId: coworkerId,
            },
            refetchQueries: [
                { query: LanguageHouseEmployeesDocument, variables: { taalhuisId: userContext.user?.organizationId } },
            ],
        })

        if (response.errors?.length) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is verwijderd`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )
        if (onSuccess) {
            onSuccess()
        }
    }
}
