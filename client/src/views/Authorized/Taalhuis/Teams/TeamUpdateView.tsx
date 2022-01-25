import React, { useContext, useState } from 'react'
import { useLingui } from '@lingui/react'
import { Team } from 'api/types/types'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import { TeamDetailFields, TeamDetailFormFields } from 'components/Domain/Taalhuis/Team/TeamDetailFields'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { useParams } from 'react-router-dom'
import { TeamDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { TeamPageQuery } from 'components/Domain/Taalhuis/Team/TeamPageQuery'
import Row from 'components/Core/Layout/Row/Row'
import { usePutTeam } from 'api/team/team'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import Form from 'components/Core/Form/Form'
import { Forms } from 'utils/forms'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { getMappedTeamFormFields } from 'components/Domain/Taalhuis/Team/mappers/getMappedTeamFormFields'
import { IconType } from 'components/Core/Icon/IconType'
import { TeamDeleteModalContainer } from 'components/Domain/Taalhuis/Team/TeamDeleteModalContainer'
import { UserContext } from 'components/Providers/UserProvider/context'

export const TeamUpdateView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const context = useContext(UserContext)

    const { teamId } = useParams<TeamDetailRouteParams>()
    const { mutate, loading, error } = usePutTeam(teamId)
    const [modalOpen, setModalOpen] = useState(false)

    return <TeamPageQuery teamId={teamId}>{renderContent}</TeamPageQuery>

    function renderContent(team: Team) {
        return (
            <Form onSubmit={handleEdit(team)}>
                <Headline
                    title={team.name}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.teams.overview]} />}
                    spacingType={SpacingType.default}
                />
                <Column spacing={10}>
                    <MutationErrorProvider mutationError={error?.data}>
                        <TeamDetailFields defaultValues={team} />
                    </MutationErrorProvider>
                </Column>
                <TeamDeleteModalContainer
                    team={team}
                    modalOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onDelete={() => history.push(taalhuisRoutes.teams.index)}
                />
                <Actionbar
                    LeftComponent={
                        <Button
                            type={ButtonType.secondary}
                            danger={true}
                            icon={IconType.delete}
                            onClick={() => setModalOpen(true)}
                            disabled={loading}
                        >
                            {i18n._('Team opheffen')}
                        </Button>
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                disabled={loading}
                                onClick={() => history.push(taalhuisRoutes.teams.detail(teamId).index)}
                            >
                                {i18n._(`Annuleren`)}
                            </Button>
                            <Button type={ButtonType.primary} submit={true} loading={loading}>
                                {i18n._('Opslaan')}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        )
    }

    function handleEdit(team: Team) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<TeamDetailFormFields>(e)
            const input = getMappedTeamFormFields(formData, context.user?.organization.id, team)

            try {
                await mutate(input)

                NotificationsManager.success(
                    i18n._(`Team is bijgewerkt`),
                    i18n._(`Je wordt teruggestuurd naar het overzicht`)
                )

                history.push(taalhuisRoutes.teams.detail(team.id).index)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
                }
            }
        }
    }
}
