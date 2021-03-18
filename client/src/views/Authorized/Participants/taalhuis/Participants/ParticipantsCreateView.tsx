import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { CheckboxColor } from '../../../../../components/Core/DataEntry/Checkbox'
import { SectionTitleWithBorder } from '../../../../../components/Core/Field/SectionTitleWithBorder'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Label from '../../../../../components/Core/Label/Label'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import {
    FontWeight,
    PermissionCheckboxContainer,
    PermissionCheckboxBackgroundColor,
} from '../../../../../components/Core/PermissionCheckboxContainer/PermissionCheckboxContainer'
import DutchNTFieldset, {
    DutchNTFieldsetModel,
} from '../../../../../components/fieldsets/shared/ DutchNTInformationFieldset'
import AvailabillityFieldset, {
    AvailabillityFieldsetModel,
} from '../../../../../components/fieldsets/shared/AvailabillityFieldset'
import BackgroundInformationFieldset, {
    BackgroundInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/BackgroundInformationFieldset'
import CivicIntegrationFieldset, {
    CivicIntegrationFieldsetModel,
} from '../../../../../components/fieldsets/participants/CivicIntegrationInformationFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/ContactInformationFieldset'
import CourseInformationFieldset, {
    CourseInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/CourseInformationFieldset'
import GeneralInformationFieldset, {
    GeneralInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/GeneralInformationFieldset'
import LevelInformationFieldset, {
    LevelInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/LevelInformationFieldset'
import MotivationInformationFieldset, {
    MotivationInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/MotivationInformationFieldset'
import PersonInformationFieldset, {
    PersonInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/PersonInformationFieldset'
import ReadingTestInformationFieldset, {
    ReadingTestInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/ReadingTestInformationFieldset'
import RefererInformationFieldset, {
    RefererInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/ReferrerInformationFieldset'
import WorkInformationFieldset, {
    WorkInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/WorkInformationFieldset'
import WritingInformationFieldset, {
    WritingInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/WritingInformationFieldset'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import EducationInformationFieldset, {
    EducationInformationFieldsetModel,
} from '../../../../../components/fieldsets/participants/EducationInformationFieldset'
import { taalhuisParticipantsCreateResponse } from '../../mocks/participants'
import { Forms } from '../../../../../utils/forms'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'

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
        MotivationInformationFieldsetModel,
        AvailabillityFieldsetModel,
        ReadingTestInformationFieldsetModel,
        WritingInformationFieldsetModel {
    id: string
}

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
            <SectionTitleWithBorder title={'Toestemmingen'} />
            <Column spacing={4}>
                <Row>
                    <PermissionCheckboxContainer
                        backgroundColor={PermissionCheckboxBackgroundColor.green}
                        checkboxColor={CheckboxColor.green}
                        text="Het toestemmingsformulier is getekend."
                        fontWeight={FontWeight.bold}
                    />
                </Row>
                <Label text={'Het formulier bevat de volgende toestemmingen'} />
                <Column spacing={2}>
                    <Row>
                        <PermissionCheckboxContainer
                            backgroundColor={PermissionCheckboxBackgroundColor.grey}
                            checkboxColor={CheckboxColor.green}
                            text="Deelnemer geeft toestemming voor het delen van zijn/haar gegevens met aanbieders van leertrajecten waarvoor deelnemer is aangemeld."
                            fontWeight={FontWeight.normal}
                        />
                    </Row>
                    <Row>
                        <PermissionCheckboxContainer
                            backgroundColor={PermissionCheckboxBackgroundColor.green}
                            checkboxColor={CheckboxColor.green}
                            text="Deelnemer geeft toestemming voor het delen van mijn basisgegevens (NAW gegevens, deelname aan Taalhuis, deelname aan leertrajecten) met bibliotheken."
                            fontWeight={FontWeight.normal}
                        />
                    </Row>
                    <Row>
                        <PermissionCheckboxContainer
                            backgroundColor={PermissionCheckboxBackgroundColor.green}
                            checkboxColor={CheckboxColor.green}
                            text="Deelnemer geeft toestemming voor het toesturen van informatie van Bibliotheek."
                            fontWeight={FontWeight.normal}
                        />
                    </Row>
                </Column>
            </Column>
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

            if (!response) {
                NotificationsManager.error(
                    i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                    i18n._(t`Probeer het later opnieuw`)
                )
            }

            const participant = response as FormModel
            NotificationsManager.success(
                i18n._(t`Medewerker is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )

            history.push(
                routes.authorized.participants.taalhuis.participants.detail.read({
                    participantid: participant.id,
                    participantname: participant.nickName,
                })
            )
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}
