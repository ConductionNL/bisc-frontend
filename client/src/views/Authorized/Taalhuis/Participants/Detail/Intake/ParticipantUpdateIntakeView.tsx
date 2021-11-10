import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetStudent, usePutStudent } from 'api/student/student'
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
import { UserContext } from 'components/Providers/UserProvider/context'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

export const ParticipantsUpdateIntakeView: React.FunctionComponent = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const userContext = useContext(UserContext)
    const { mutate: putStudent, loading } = usePutStudent(taalhuisParticipantId)
    const { data: student, loading: loadingData, error } = useGetStudent(taalhuisParticipantId)

    if (loadingData) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !student) {
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
                title={i18n._(t`Deelnemer ${NameFormatters.formattedFullname(student.person)}`)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <ParticipantIntakeFields student={student} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()} disabled={loadingData}>
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

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        console.log('handling update')
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantIntakeFieldsFormModel>(e)
        const languageHouseId = userContext.user?.organization.id!

        const input = participantIntakeFieldsMapper(languageHouseId, formData)

        try {
            await putStudent(input)
            NotificationsManager.success(i18n._(t`Deelnemer is aangepast`))

            history.push(taalhuisRoutes.participants.detail(taalhuisParticipantId).index)
        } catch (error: any) {
            NotificationsManager.error(error.message)
        }
    }
}
