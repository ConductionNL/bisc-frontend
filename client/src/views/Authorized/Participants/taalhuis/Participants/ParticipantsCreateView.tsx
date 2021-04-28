import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { BackgroundInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import CivicIntegrationFieldset, {
    CivicIntegrationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
import { EducationInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/EducationInformationFieldset'
import { LevelInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/LevelInformationFieldset'
import { MotivationInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/MotivationInformationFieldset'
import { ReadingTestInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/ReadingTestInformationFieldset'
import { RefererInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/RefererInformationFieldset'
import { WorkInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/WorkInformationFieldset'
import { WritingInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/WritingInformationFieldset'
import { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { CourseInformationFieldsetModel } from 'components/fieldsets/shared/CourseInformationFieldset'
import { DutchNTFieldsetModel } from 'components/fieldsets/shared/DutchNTInformationFieldset'
import GeneralInformationFieldset, {
    GeneralInformationFieldsetModel,
} from 'components/fieldsets/shared/GeneralInformationFieldset'
import PersonInformationFieldset, {
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import { UserContext } from 'components/Providers/UserProvider/context'
import { StudentsDocument, useCreateStudentMutation } from 'generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

interface Props {}

export interface FormModel
    extends CivicIntegrationFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetFormModel,
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
        WritingInformationFieldsetModel {}

export const ParticipantsCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [createParticipant, { loading }] = useCreateStudentMutation()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe Deelnemer `)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            {renderFormFields()}
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

    function renderFormFields() {
        return (
            <>
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
                <ContactInformationFieldset />
                <HorizontalRule />
                <GeneralInformationFieldset />

                {/* // TODO: add back fieldsets when the data can be send back to the backend */}
                {/*
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
                <PermissionsFieldset /> */}
                <Space pushTop={true} />
            </>
        )
    }

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createParticipant({
            variables: {
                input: {
                    languageHouseId: userContext.user?.organizationId ?? '',

                    civicIntegrationDetails: {
                        civicIntegrationRequirement: formData.civicIntegrationRequirement,
                        civicIntegrationRequirementReason: formData.civicIntegrationRequirementReason,
                        civicIntegrationRequirementFinishDate: formData.civicIntegrationRequirementFinishDate,
                    },
                    personDetails: {
                        familyName: formData.familyName,
                        givenName: formData.givenName,
                        additionalName: formData.additionalName,
                        gender: formData.gender,
                        dateOfBirth: formData.dateOfBirth,
                    },
                    contactDetails: {
                        street: formData.street,
                        houseNumber: formData.houseNumber,
                        houseNumberSuffix: formData.houseNumberSuffix,
                        postalCode: formData.postalCode,
                        locality: formData.locality,
                        telephone: formData.telephone,
                        email: formData.email,
                        contactPersonTelephone: formData.contactPersonTelephone,
                        contactPreference: formData.contactPreference,
                        contactPreferenceOther: formData.contactPreferenceOther,
                    },
                    generalDetails: {
                        countryOfOrigin: formData.countryOfOrigin,
                        nativeLanguage: formData.nativeLanguage,
                        otherLanguages: formData.otherLanguages,
                        familyComposition: formData.familyComposition,
                        childrenCount: formData.childrenCount,
                        childrenDatesOfBirth: formData.childrenDatesOfBirth,
                    },

                    // TODO: add real data
                    permissionDetails: {
                        didSignPermissionForm: true,
                        hasPermissionToShareDataWithProviders: true,
                        hasPermissionToShareDataWithLibraries: true,
                        hasPermissionToSendInformationAboutLibraries: true,
                    },
                },
            },
            refetchQueries: [
                {
                    query: StudentsDocument,
                    variables: {
                        languageHouseId: userContext.user?.organizationId,
                    },
                },
            ],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is aangemaakt`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )

        history.push({
            pathname: routes.authorized.participants.taalhuis.participants.detail.intake.read,
            state: {
                participantId: response.data.createStudent.id,
                participantName: NameFormatters.formattedFullname({
                    givenName: response.data.createStudent.personDetails.givenName,
                    additionalName: response.data.createStudent.personDetails.additionalName,
                    familyName: response.data.createStudent.personDetails.familyName,
                }),
            },
        })
    }
}
