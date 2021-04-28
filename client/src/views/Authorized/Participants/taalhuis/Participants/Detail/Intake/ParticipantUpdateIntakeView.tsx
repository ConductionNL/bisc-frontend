import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import { BackgroundInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import CivicIntegrationFieldset, { CivicIntegrationFieldsetModel } from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
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
import GeneralInformationFieldset, { GeneralInformationFieldsetModel } from 'components/fieldsets/shared/GeneralInformationFieldset'
import PersonInformationFieldset, {
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import { useStudentQuery, useUpdateStudentMutation } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

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

export const ParticipantsUpdateIntakeView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading: loadingData, error } = useStudentQuery({
        variables: {
            studentId: routeState.participantId,
        },
    })
    const [updateParticipant, { loading }] = useUpdateStudentMutation()

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Deelnemer ${routeState.participantName}`)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            {renderSection()}
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function renderSection() {
        if (loadingData) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
            return (
                <>
                    {/* <IntakeInformationFieldset
                        prefillData={{
                            nameOfCustomer: data.nameOfCustomer,
                            dateOfIntake: data.dateOfIntake,
                        }}
                    />
                    <HorizontalRule /> */}
                    <CivicIntegrationFieldset
                        prefillData={{
                            civicIntegrationRequirement: data.student.civicIntegrationDetails?.civicIntegrationRequirement,
                            civicIntegrationRequirementReason: data.student.civicIntegrationDetails?.civicIntegrationRequirementReason,
                            civicIntegrationRequirementFinishDate: data.student.civicIntegrationDetails?.civicIntegrationRequirementFinishDate,
                        }}
                    />
                    <HorizontalRule />
                    <PersonInformationFieldset
                        prefillData={{
                            familyName: data.student.personDetails.familyName,
                            additionalName: data.student.personDetails.additionalName,
                            givenName: data.student.personDetails.givenName,
                            gender: data.student.personDetails.gender,
                            dateOfBirth: data.student.personDetails.dateOfBirth,
                        }}
                        fieldControls={{
                            countryOfOrigin: {
                                hidden: true,
                            },
                            familyName: {
                                required: false,
                            },
                        }}
                    />
                    <HorizontalRule />
                    <ContactInformationFieldset
                        prefillData={{
                            street: data.student.contactDetails?.street,
                            houseNumber: data.student.contactDetails?.houseNumber,
                            houseNumberSuffix: data.student.contactDetails?.houseNumberSuffix,
                            postalCode: data.student.contactDetails?.postalCode,
                            locality: data.student.contactDetails?.locality,
                            telephone: data.student.contactDetails?.telephone,
                            email: data.student.contactDetails?.email,
                            contactPersonTelephone: data.student.contactDetails?.contactPersonTelephone,
                            contactPreference: data.student.contactDetails?.contactPreference,
                            contactPreferenceOther: data.student.contactDetails?.contactPreferenceOther,
                        }}
                    />
                    <HorizontalRule />
                    <GeneralInformationFieldset
                        prefillData={{
                            countryOfOrigin: data.student.generalDetails?.countryOfOrigin,
                            nativeLanguage: data.student.generalDetails?.nativeLanguage,
                            otherLanguages: data.student.generalDetails?.otherLanguages,
                            familyComposition: data.student.generalDetails?.familyComposition,
                            childrenCount: data.student.generalDetails?.childrenCount,
                            childrenDatesOfBirth: data.student.generalDetails?.childrenDatesOfBirth,
                        }}
                    />
                    {/* <HorizontalRule />
                    <RefererInformationFieldset
                        prefillData={{
                            notifyingParty: data.notifyingParty,
                            referrerEmailAddress: data.referrerEmailAddress,
                        }}
                    />
                    <HorizontalRule />
                    <BackgroundInformationFieldset
                        prefillData={{
                            foundVia: data.foundVia,
                            foundViaBefore: data.foundViaBefore,
                            networks: data.networks,
                            participationLadder: data.participationLadder,
                        }}
                    />
                    <HorizontalRule />
                    <DutchNTFieldset
                        prefillData={{
                            NTLevel: data.NTLevel,
                        }}
                    />
                    <LevelInformationFieldset
                        prefillData={{
                            languageLevel: data.languageLevel,
                        }}
                    />
                    <HorizontalRule />
                    <EducationInformationFieldset
                        prefillData={{
                            lastEducation: data.lastEducation,
                            graduated: data.graduated,
                            currentEducation: data.currentEducation,
                        }}
                    />
                    <HorizontalRule />
                    <CourseInformationFieldset
                        prefillData={{
                            course: data.course,
                        }}
                    />
                    <HorizontalRule />
                    <WorkInformationFieldset
                        prefillData={{
                            trained: data.trained,
                            lastWorkplace: data.lastWorkplace,
                            dayTimeActivities: data.dayTimeActivities,
                        }}
                    />
                    <HorizontalRule />
                    <MotivationInformationFieldset
                        prefillData={{
                            skills: data.skills,
                            triedThisSkillBefore: data.triedThisSkillBefore,
                            reasonWhy: data.reasonWhy,
                            learningReason: data.learningReason,
                            whyNowLearningReason: data.whyNowLearningReason,
                            learningPreference: data.learningPreference,
                            remark: data.remark,
                        }}
                    />
                    <HorizontalRule />
                    <AvailabillityFieldset
                        prefillData={{
                            available: data.available,
                            note: data.note,
                        }}
                    />
                    <HorizontalRule />
                    <ReadingTestInformationFieldset
                        prefillData={{
                            readingResults: data.readingResults,
                        }}
                    />
                    <HorizontalRule />
                    <WritingInformationFieldset
                        prefillData={{
                            writingResults: data.writingResults,
                        }}
                    />
                    <PermissionsFieldset
                        prefillData={{
                            signed: data.signed,
                            sharingLearningPathway: data.sharingLearningPathway,
                            sharingBasicData: data.sharingLearningPathway,
                            permissionInformationFromLibrary: data.permissionInformationFromLibrary,
                        }}
                    /> */}
                </>
            )
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)

        const response = await updateParticipant({
            variables: {
                input: {
                    studentId: routeState.participantId,
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

                    // TODO: add more data

                    permissionDetails: { // TODO: check
                        didSignPermissionForm: true,
                        hasPermissionToShareDataWithProviders: true,
                        hasPermissionToShareDataWithLibraries: true,
                        hasPermissionToSendInformationAboutLibraries: true,
                    },
                },
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is bewerkt`),
            i18n._(t`Je wordt teruggestuurd naar de gegevens van de student`)
        )

        history.push({
            pathname: routes.authorized.participants.taalhuis.participants.detail.intake.read,
            state: {
                participantId: response.data.updateStudent.id,
                participantName: NameFormatters.formattedFullname({
                    givenName: response.data.updateStudent.personDetails.givenName,
                    additionalName: response.data.updateStudent.personDetails.additionalName,
                    familyName: response.data.updateStudent.personDetails.familyName,
                }),
            },
        })
    }
}
