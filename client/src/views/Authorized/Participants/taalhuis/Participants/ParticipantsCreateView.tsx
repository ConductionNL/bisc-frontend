import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import DutchNTFieldset from '../../../../../components/fieldsets/shared/ DutchNTInformationFieldset'
import AvailabillityFieldset from '../../../../../components/fieldsets/shared/AvailabillityFieldset'
import BackgroundInformationFieldset from '../../../../../components/fieldsets/shared/BackgroundInformationFieldset'
import CivicIntegrationFieldset from '../../../../../components/fieldsets/shared/CivicIntegrationInformationFieldset'
import ContactPersonInformationFieldset from '../../../../../components/fieldsets/shared/ContactPersonInformationFieldset'
import CourseInformationFieldset from '../../../../../components/fieldsets/shared/CourseInformationFieldset'
import GeneralInformationFieldset from '../../../../../components/fieldsets/shared/GeneralInformationFieldset'
import RefererInformationFieldset from '../../../../../components/fieldsets/shared/ReferrerInformationFieldset'
import TemporaryPersonInformationFieldset from '../../../../../components/fieldsets/shared/TemporaryPersonsInformationFieldset'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'

interface Props {}

export interface FormModel {
    id: number
}

export const ParticipantsCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createParticipant, { loading }] = useMockMutation<FormModel, FormModel>({ id: 123 }, false)

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe Deelnemer `)}
                spacingType={SpacingType.default}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb
                            text={i18n._(t`Deelnemers`)}
                            to={routes.authorized.participants.taalhuis.participants.overview}
                        />
                    </Breadcrumbs>
                }
            />
            <CivicIntegrationFieldset />
            <HorizontalRule />
            <TemporaryPersonInformationFieldset />
            <HorizontalRule />
            <ContactPersonInformationFieldset />
            <HorizontalRule />
            <GeneralInformationFieldset />
            <HorizontalRule />
            <RefererInformationFieldset />
            <HorizontalRule />
            <CourseInformationFieldset />
            <HorizontalRule />
            <AvailabillityFieldset />
            <HorizontalRule />
            <BackgroundInformationFieldset />
            <HorizontalRule />
            <DutchNTFieldset />
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
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

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {}
}
