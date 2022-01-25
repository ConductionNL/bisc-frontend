import { useLingui } from '@lingui/react'
import { usePostTeam } from 'api/team/team'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { getMappedTeamFormFields } from 'components/Domain/Taalhuis/Team/mappers/getMappedTeamFormFields'
import { TeamDetailFields, TeamDetailFormFields } from 'components/Domain/Taalhuis/Team/TeamDetailFields'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { Forms } from 'utils/forms'

export const TeamsCreateView = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { mutate, loading, error } = usePostTeam()

    return (
        <>
            <Headline
                title={i18n._(`Nieuwe team`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.teams.overview]} />}
            />
            <Form onSubmit={handleSubmit}>
                <Column spacing={10}>
                    <MutationErrorProvider mutationError={error?.data}>
                        <TeamDetailFields onAddMembers={handleAdd} onRemoveMember={handleRemove} />
                    </MutationErrorProvider>
                </Column>
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                disabled={loading}
                                onClick={() => history.push(taalhuisRoutes.teams.index)}
                            >
                                {i18n._(`Annuleren`)}
                            </Button>
                            <Button type={ButtonType.primary} submit={true} loading={loading}>
                                {i18n._('Toevoegen')}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        </>
    )

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<TeamDetailFormFields>(e)
        const input = getMappedTeamFormFields(formData)

        try {
            const response = await mutate(input)

            NotificationsManager.success(
                i18n._(`Team is aangemaakt`),
                i18n._(`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(taalhuisRoutes.teams.detail(response.id).index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }

    // TODO: BISC-314
    function handleAdd(memberIds: string[], closeModal: () => void) {
        return
    }

    // TODO: BISC-314
    function handleRemove(memberId: string, closeModal: () => void) {
        return
    }
}
