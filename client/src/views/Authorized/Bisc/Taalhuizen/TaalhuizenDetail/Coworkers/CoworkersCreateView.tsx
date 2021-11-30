import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { usePostOrganizationEmployee } from 'api/employee/employee'
import { Organization } from 'api/types/types'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadcrumbs'
import { getMappedTaalhuisCoworkerFormFields } from 'components/Domain/Taalhuis/mappers/taalhuisFieldsMappers'
import TaalhuisCoworkersInformationFieldset, {
    TaalhuisCoworkersInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'

import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { biscRoutes, BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
    languageHouse: Organization
}

const CoworkersCreateView: React.FunctionComponent<Props> = props => {
    const { languageHouse } = props
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const { mutate: createCoworker, loading, error } = usePostOrganizationEmployee()

    return (
        <Form onSubmit={handleCreate()}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <TaalhuizenCoworkersDetailBreadcrumbs
                        languageHouseId={languageHouseId}
                        languageHouseName={languageHouse.name}
                    />
                }
            />
            <MutationErrorProvider mutationError={error?.data}>
                <TaalhuisCoworkersInformationFieldset />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.index)
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function handleCreate() {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<TaalhuisCoworkersInformationFieldsetModel>(e)
            const input = getMappedTaalhuisCoworkerFormFields(formData, languageHouseId)

            try {
                const response = await createCoworker(input)

                NotificationsManager.success(
                    i18n._(t`Medewerker is aangemaakt`),
                    i18n._(t`Je wordt doorgestuurd naar de gegevens van de medewerker `)
                )

                history.push(biscRoutes.management.coworkers.detail(response.id).index)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }
}

export default CoworkersCreateView
