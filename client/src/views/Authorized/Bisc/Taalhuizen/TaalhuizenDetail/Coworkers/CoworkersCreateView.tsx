import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadcrumbs'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import { LanguageHouse, LanguageHouseEmployeesDocument, useCreateEmployeeMutation } from 'generated/graphql'
import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
    languageHouse: LanguageHouse
}

interface FormModel extends InformationFieldsetModel, AccountInformationFieldsetFormModel {}

const CoworkersCreateView: React.FunctionComponent<Props> = props => {
    const { languageHouse } = props
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const [createCoworker, { loading }] = useCreateEmployeeMutation()

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createCoworker({
            variables: {
                input: {
                    languageHouseId: languageHouseId,
                    // userGroupId: '',
                    givenName: formData.callSign || '',
                    additionalName: formData.additionalName,
                    familyName: formData.familyName || '',
                    email: formData.email || '',
                    telephone: formData.phonenumber || '',
                },
            },
            refetchQueries: [
                { query: LanguageHouseEmployeesDocument, variables: { languageHouseId: languageHouseId } },
            ],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de gegevens van de medewerker `)
        )

        const newEmployeeId = response.data.createEmployee?.employee?.id

        if (newEmployeeId) {
            history.push(
                routes.authorized.bisc.taalhuizen.detail(languageHouseId).coworkers.detail(newEmployeeId).data.index
            )
        }
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <TaalhuizenCoworkersDetailBreadcrumbs
                        languageHouseId={languageHouseId}
                        languageHouseName={languageHouse.name}
                    />
                }
            />
            <InformationFieldset />
            <HorizontalRule />
            <AccountInformationFieldset />
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
}

export default CoworkersCreateView
