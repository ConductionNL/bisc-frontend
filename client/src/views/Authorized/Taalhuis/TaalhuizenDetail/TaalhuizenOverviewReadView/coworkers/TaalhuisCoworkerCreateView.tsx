import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import LabelTag, { LabelColor } from '../../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import Input from '../../../../../../components/Core/DataEntry/Input'
import RadioButton from '../../../../../../components/Core/DataEntry/RadioButton'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../../../components/Core/Field/Field'
import Section from '../../../../../../components/Core/Field/Section'
import Form from '../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import TaalhuisCoworkersInformationFieldset from '../../../../../../components/fieldsets/shared/TaalhuisCoworkersInformationFieldset'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../routes'
import { Forms } from '../../../../../../utils/forms'
import { EmailValidators } from '../../../../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../../../../utils/validators/PhoneNumberValidator'
import { coworkerCreateResponse } from './mocks/coworkers'
import { TaalhuisCoworkersFormModel } from './TaalhuisCoworkersOverviewView'

interface Props {}

interface Params {
    id: string
    name: string
}

const TaalhuisCoworkerCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createCoworker, { loading }] = useMockMutation<TaalhuisCoworkersFormModel, TaalhuisCoworkersFormModel>(
        coworkerCreateResponse,
        false
    )
    const { id, name } = useParams<Params>()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb text={i18n._(t`${name}`)} to={routes.authorized.taalhuis.read.data(id, name)} />
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

                history.push(routes.authorized.taalhuis.read.detail.data(id, name, coworker.id))
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default TaalhuisCoworkerCreateView
