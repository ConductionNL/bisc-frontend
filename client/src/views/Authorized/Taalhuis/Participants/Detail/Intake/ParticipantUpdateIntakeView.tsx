import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import {
    ParticipantIntakeFields,
    ParticipantIntakeFieldsFormModel,
} from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
import { participantIntakeFieldsMapper } from 'components/Domain/Participation/mappers/ParticipantIntakeFieldsMapper'
import { useStudentQuery, useUpdateStudentMutation } from 'generated/graphql'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantsUpdateIntakeView: React.FunctionComponent = () => {
    const { taalhuisParticipantId } = useParams<{ taalhuisParticipantId: string }>()
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading: loadingData, error } = useStudentQuery({ variables: { id: taalhuisParticipantId } })
    const [updateParticipant, { loading }] = useUpdateStudentMutation()

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !data?.student) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                // TODO: check formatted fullname
                title={i18n._(t`Deelnemer ${NameFormatters.formattedFullname(data.student.personDetails)}`)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <ParticipantIntakeFields data={data} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()} disabled={loadingData}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loadingData}>
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantIntakeFieldsFormModel>(e)

        const response = await updateParticipant({
            variables: {
                input: {
                    id: taalhuisParticipantId,
                    ...participantIntakeFieldsMapper(formData, data),
                },
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is bewerkt`),
            i18n._(t`Je wordt teruggestuurd naar de gegevens van de student`)
        )

        history.push(taalhuisRoutes.participants.detail(taalhuisParticipantId).data.index)
    }
}
