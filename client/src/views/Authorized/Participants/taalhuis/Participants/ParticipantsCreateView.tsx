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
import DutchNTFieldset, {
    DutchNTFieldsetModel,
} from '../../../../../components/fieldsets/shared/DutchNTInformationFieldset'
import AvailabillityFieldset, {
    AvailabillityFieldsetModel,
} from '../../../../../components/fieldsets/shared/AvailabillityFieldset'
import BackgroundInformationFieldset, {
    BackgroundInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/ContactInformationFieldset'
import CourseInformationFieldset, {
    CourseInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/CourseInformationFieldset'
import GeneralInformationFieldset, {
    GeneralInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/GeneralInformationFieldset'
import PersonInformationFieldset, {
    PersonInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/PersonInformationFieldset'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import { ParticipantsMock, taalhuisParticipantsCreateResponse } from '../../mocks/participants'
import { Forms } from '../../../../../utils/forms'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import EducationInformationFieldset, {
    EducationInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/fieldsets/EducationInformationFieldset'
import RefererInformationFieldset, {
    RefererInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/fieldsets/ReferrerInformationFieldset'
import LevelInformationFieldset, {
    LevelInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/fieldsets/LevelInformationFieldset'
import WorkInformationFieldset, {
    WorkInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/fieldsets/WorkInformationFieldset'
import MotivationInformationFieldset, {
    MotivationInformationFieldsetPrefillData,
} from '../../../../../components/fieldsets/participants/fieldsets/MotivationInformationFieldset'
import ReadingTestInformationFieldset, {
    ReadingTestInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/fieldsets/ReadingTestInformationFieldset'
import WritingInformationFieldset, {
    WritingInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/fieldsets/WritingInformationFieldset'
import { PermissionsFieldset } from '../../../../../components/fieldsets/participants/fieldsets/PermissionsFieldset'
import CivicIntegrationFieldset, {
    CivicIntegrationFieldsetModel,
} from '../../../../../components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'

interface Props {}

export interface FormModel
    extends CivicIntegrationFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetModel,
        GeneralInformationFieldsetModel,
        RefererInformationFieldsetModel,
        BackgroundInformationFieldsetModel,
        DutchNTFieldsetModel,
        LevelInformationFieldsetModel,
        EducationInformationFieldsetModel,
        CourseInformationFieldsetModel,
        WorkInformationFieldsetModel,
        MotivationInformationFieldsetPrefillData,
        AvailabillityFieldsetModel,
        ReadingTestInformationFieldsetModel,
        WritingInformationFieldsetModel {}

export const ParticipantsCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createParticipant, { loading }] = useMockMutation<FormModel, FormModel>(
        taalhuisParticipantsCreateResponse,
        false
    )

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
            <PersonInformationFieldset
                fieldControls={{
                    countryOfOrigin: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                fieldControls={{
                    phone: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <GeneralInformationFieldset />
            <HorizontalRule />
            <RefererInformationFieldset />
            <HorizontalRule />
            <BackgroundInformationFieldset />
            <HorizontalRule />
            <DutchNTFieldset />
            <HorizontalRule />
            <LevelInformationFieldset />
            <HorizontalRule />
            <EducationInformationFieldset />
            <HorizontalRule />
            <CourseInformationFieldset />
            <HorizontalRule />
            <WorkInformationFieldset />
            <HorizontalRule />
            <MotivationInformationFieldset />
            <HorizontalRule />
            <AvailabillityFieldset />
            <HorizontalRule />
            <ReadingTestInformationFieldset />
            <HorizontalRule />
            <WritingInformationFieldset />
            <HorizontalRule />
            <PermissionsFieldset />
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

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await createParticipant(formData)

            const participant = response as ParticipantsMock
            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )

            history.push(
                routes.authorized.participants.taalhuis.participants.detail.read({
                    participantid: participant.id,
                    participantname: participant.nickName,
                })
            )
        } catch (error) {}
    }
}
