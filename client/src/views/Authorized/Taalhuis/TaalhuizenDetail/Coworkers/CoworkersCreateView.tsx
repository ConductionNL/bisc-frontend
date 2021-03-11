import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Form from '../../../../../components/Core/Form/Form'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Row from '../../../../../components/Core/Layout/Row/Row'
import TaalhuisCoworkersInformationFieldset from '../../../../../components/fieldsets/shared/TaalhuisCoworkersInformationFieldset'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import { TaalhuisDetailParams } from '../../../../../routes/taalhuis/types'
import { Forms } from '../../../../../utils/forms'
import { TaalhuisCoworkersFormModel } from '../TaalhuizenOverviewReadView/coworkers/detail/TaalhuisCoworkerUpdateView'
import { coworkerCreateResponse } from './mocks/coworkers'

interface Props {}

const CoworkersCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createCoworker, { loading }] = useMockMutation<TaalhuisCoworkersFormModel, TaalhuisCoworkersFormModel>(
        coworkerCreateResponse,
        false
    )
    const { taalhuisid, taalhuisname } = useParams<TaalhuisDetailParams>()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb
                            text={i18n._(t`${taalhuisname}`)}
                            to={routes.authorized.taalhuis.read.data({ taalhuisid, taalhuisname })}
                        />
                    </Breadcrumbs>
                }
            />
            <TaalhuisCoworkersInformationFieldset />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.taalhuis.overview)}
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

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<TaalhuisCoworkersFormModel>(e)
            const response = await createCoworker(formData)

            if (response) {
                const coworker = response as TaalhuisCoworkersFormModel
                NotificationsManager.success(i18n._(t`Medewerker is aangemaakt`), i18n._(t``))

                history.push(
                    routes.authorized.taalhuis.read.coworkers.detail.data({
                        taalhuisid,
                        taalhuisname,
                        coworkerid: coworker.id.toString(),
                    })
                )
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default CoworkersCreateView
