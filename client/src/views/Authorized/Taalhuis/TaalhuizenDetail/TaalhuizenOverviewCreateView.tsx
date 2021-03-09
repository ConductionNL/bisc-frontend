import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline from '../../../../components/Chrome/Headline'
import Actionbar from '../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Form from '../../../../components/Core/Form/Form'
import Row from '../../../../components/Core/Layout/Row/Row'
import TaalhuisInformationFieldset from '../../../../components/fieldsets/shared/TaalhuisInformationFieldset'
import { useMockMutation } from '../../../../hooks/UseMockMutation'
import { routes } from '../../../../routes'
import { Forms } from '../../../../utils/forms'
import { taalhuisCreateResponse, TaalhuisFormModel } from './mocks/taalhuizen'
interface Props {}

const TaalhuizenOverviewCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [createCoworker, { loading }] = useMockMutation<TaalhuisFormModel, TaalhuisFormModel>(
        taalhuisCreateResponse,
        false
    )
    const history = useHistory()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe taalhuis`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />
            <TaalhuisInformationFieldset />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => NotificationsManager.success('title', 'test')}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<TaalhuisFormModel>(e)
            const response = await createCoworker(formData)

            if (response) {
                const taalhuis = response as TaalhuisFormModel
                NotificationsManager.success(i18n._(t`Taalhuis is aangemaakt`), i18n._(t``))

                history.push(routes.authorized.taalhuis.read.data(taalhuis.id, taalhuis.name))
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default TaalhuizenOverviewCreateView
