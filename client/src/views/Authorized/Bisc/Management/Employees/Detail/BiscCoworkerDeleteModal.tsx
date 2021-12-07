import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useDeleteOrganizationEmployee } from 'api/employee/employee'

interface Props {
    onClose: () => void
    coworkerId: string
    coworkerName: string
    onSuccess: () => void
}

const BiscCoworkerDeleteModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { onClose, onSuccess, coworkerId, coworkerName } = props
    const { mutate, loading } = useDeleteOrganizationEmployee(coworkerId)

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
        try {
            await mutate()
            NotificationsManager.success(
                i18n._(t`Medewerker is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )
            if (onSuccess) {
                onSuccess()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}

export default BiscCoworkerDeleteModalView
