import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganization, usePutOrganization } from 'api/organization/organization'
import { Address, Organization } from 'api/types/types'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import TaalhuizenDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenDetailBreadcrumbs'
import { getMappedTaalhuisFormFields } from 'components/Domain/Taalhuis/mappers/taalhuisFieldsMappers'
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import TaalhuisDeleteModalView from '../../Modals/TaalhuisDeleteModalView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {}

export interface FormModel extends TaalhuisInformationFieldsetModel {}

export const TaalhuisDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const { mutate, loading, error } = usePutOrganization(languageHouseId)
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetOrganization(languageHouseId)}>{data => renderPageContent(data)}</PageQuery>
    )

    function renderPageContent(languageHouse: Organization) {
        return (
            <Form onSubmit={handleEdit(languageHouse)}>
                <Headline title={languageHouse.name} TopComponent={<TaalhuizenDetailBreadcrumbs />} />
                {renderViews(languageHouse)}
                <Actionbar
                    LeftComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                danger={true}
                                icon={IconType.delete}
                                onClick={() => setModalIsVisible(true)}
                            >
                                {i18n._(t`Taalhuis verwijderen`)}
                            </Button>
                        </Row>
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() =>
                                    history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).data.index)
                                }
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button loading={loading} type={ButtonType.primary} submit={true}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        )
    }

    function handleEdit(languageHouse: Organization) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const input = getMappedTaalhuisFormFields(formData, languageHouse)

            try {
                await mutate(input)
                NotificationsManager.success(i18n._(t`Taalhuis is bijgewerkt`))

                history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).index)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (!error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }

    function renderViews(languageHouse: Organization) {
        const address: Address = languageHouse.addresses && languageHouse.addresses[0]

        return (
            <>
                <MutationErrorProvider mutationError={error?.data}>
                    <TaalhuisInformationFieldset
                        prefillData={{
                            name: languageHouse.name,
                            'addresses[0].street': address?.street,
                            'addresses[0].houseNumber': address?.houseNumber,
                            'addresses[0].houseNumberSuffix': address?.houseNumberSuffix,
                            'addresses[0].postalCode': address?.postalCode,
                            'addresses[0].locality': address?.locality,
                            'telephones[0].telephone': languageHouse.telephones?.[0].telephone,
                            'emails[0].email': languageHouse.emails?.[0].email,
                        }}
                    />
                </MutationErrorProvider>
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <TaalhuisDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        taalhuis={languageHouse}
                        onSuccess={() => {
                            history.push(routes.authorized.bisc.taalhuizen.index)
                        }}
                    />
                </Modal>
            </>
        )
    }
}
