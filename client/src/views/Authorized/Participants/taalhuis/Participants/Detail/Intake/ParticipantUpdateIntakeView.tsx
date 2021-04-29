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
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsUpdateIntakeView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading: loadingData, error } = useStudentQuery({
        variables: {
            studentId: routeState.participantId,
        },
    })
    const [updateParticipant, { loading }] = useUpdateStudentMutation()

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Deelnemer ${routeState.participantName}`)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            {renderSection()}
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function renderSection() {
        if (loadingData) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
            return <ParticipantIntakeFields data={data} />
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantIntakeFieldsFormModel>(e)

        const response = await updateParticipant({
            variables: {
                input: {
                    studentId: routeState.participantId,
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

        history.push({
            pathname: routes.authorized.participants.taalhuis.participants.detail.intake.read,
            state: {
                participantId: response.data.updateStudent.id,
                participantName: NameFormatters.formattedFullname({
                    givenName: response.data.updateStudent.personDetails.givenName,
                    additionalName: response.data.updateStudent.personDetails.additionalName,
                    familyName: response.data.updateStudent.personDetails.familyName,
                }),
            },
        })
    }
}
