import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import AvailabillityFieldset, { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import CourseInformationFieldset, {
    CourseInformationFieldsetModel,
} from 'components/fieldsets/shared/CourseInformationFieldset'
import DutchNTFieldset, { DutchNTFieldsetModel } from 'components/fieldsets/shared/DutchNTInformationFieldset'
import GeneralInformationFieldset, {
    GeneralInformationFieldsetModel,
} from 'components/fieldsets/shared/GeneralInformationFieldset'
import BackgroundInformationFieldset, {
    BackgroundInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import PersonInformationFieldset, {
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import { useMockMutation } from 'hooks/UseMockMutation'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { taalhuisParticipantsCreateResponse, ParticipantsMock } from '../../../../mocks/participants'
import { useMockQuery } from 'components/hooks/useMockQuery'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import CivicIntegrationFieldset, {
    CivicIntegrationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
import RefererInformationFieldset, {
    RefererInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/RefererInformationFieldset'
import LevelInformationFieldset, {
    LevelInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LevelInformationFieldset'
import EducationInformationFieldset, {
    EducationInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/EducationInformationFieldset'
import WorkInformationFieldset, {
    WorkInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/WorkInformationFieldset'
import MotivationInformationFieldset, {
    MotivationInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/MotivationInformationFieldset'
import WritingInformationFieldset, {
    WritingInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/WritingInformationFieldset'
import ReadingTestInformationFieldset, {
    ReadingTestInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/ReadingTestInformationFieldset'
import { PermissionsFieldset } from 'components/fieldsets/participants/fieldsets/PermissionsFieldset'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'
import { useStudentQuery, useUpdateStudentMutation } from 'generated/graphql'
import { UserContext } from 'components/Providers/UserProvider/context'
import { NameFormatters } from 'utils/formatters/name/Name'

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
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb
                            text={i18n._(t`Deelnemers`)}
                            to={routes.authorized.participants.taalhuis.participants.overview}
                        />
                    </Breadcrumbs>
                }
            />
            {renderSection()}
            <Space pushTop={true} />
            <Actionbar
                LeftComponent={
                    <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                }
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
                    <HorizontalRule />
                    <CivicIntegrationFieldset
                        prefillData={{
                            civicIntegrationRequirement: data.civicIntegrationRequirement,
                            civicIntegrationRequirementReason: data.civicIntegrationRequirementReason,
                        }}
                    />
                    <HorizontalRule /> */}
                    <PersonInformationFieldset
                        prefillData={{
                            lastName: data.student.familyName,
                            insertion: data.student.additionalName,
                            nickName: data.student.givenName,
                            // gender: data.student.,
                            // dateOfBirth: data.student,
                        }}
                        fieldControls={{
                            countryOfOrigin: {
                                hidden: true,
                            },
                            lastName: {
                                required: false,
                            },
                            // TODO: add back field when the data can be send back to the backend
                            dateOfBirth: {
                                hidden: true,
                            },
                            gender: {
                                hidden: true,
                            },
                        }}
                    />
                    <HorizontalRule />
                    <ContactInformationFieldset
                        prefillData={{
                            // street: data.street,
                            // streetNr: data.streetNr,
                            // addition: data.addition,
                            email: data.student.registrar?.email,
                            phone: data.student.registrar?.telephone,
                            // phone: data.student.
                            // postalCode: data.postalCode,
                            // city: data.city,
                            // phoneNumberContactPerson: data.phoneNumberContactPerson,
                            // contactPreference: data.contactPreference,
                        }}
                        fieldControls={{
                            // TODO: add back field when the data can be send back to the backend
                            address: {
                                hidden: true,
                            },
                            postalCode: {
                                hidden: true,
                            },
                            city: {
                                hidden: true,
                            },
                            phoneNumberContactPerson: {
                                hidden: true,
                            },
                            contactPreference: {
                                hidden: true,
                            },
                        }}
                    />
                    {/* <HorizontalRule />
                    <GeneralInformationFieldset
                        prefillData={{
                            countryOfOrigin: data.countryOfOrigin,
                            nativeLanguage: data.nativeLanguage,
                            otherLanguages: data.otherLanguages,
                            familyComposition: data.familyComposition,
                            numberOfChildren: data.numberOfChildren,
                            dateOfBirthChildren: data.dateOfBirthChildren,
                        }}
                    />
                    <HorizontalRule />
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
                    givenName: formData.nickName,
                    additionalName: formData.insertion,
                    familyName: formData.lastName,
                    email: formData.email ?? '',
                    telephone: formData.phone ?? '',
                },
            },
        })

        if (!response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is bewerkt`),
            i18n._(t`U word teruggestuurd naar de gegevens van de student`)
        )

        history.push({
            pathname: routes.authorized.participants.taalhuis.participants.detail.intake.read,
            state: {
                participantId: response.data.updateStudent.id,
                participantName: NameFormatters.formattedFullname({
                    givenName: response.data.updateStudent.givenName,
                    additionalName: response.data.updateStudent.additionalName,
                    familyName: response.data.updateStudent.familyName,
                }),
            },
        })
    }
}
