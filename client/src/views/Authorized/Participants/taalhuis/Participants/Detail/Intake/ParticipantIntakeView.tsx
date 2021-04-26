import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import {
    TaalhuisParticipantsDetailTabs,
    Tabs,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import CivicIntegrationFieldset from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'
import PersonInformationFieldset from 'components/fieldsets/shared/PersonInformationFieldset'
import { useStudentQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsIntakeView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useStudentQuery({
        variables: {
            studentId: routeState.participantId,
        },
    })

    if (!routeState.participantId) {
        return null
    }

    return (
        <>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Deelnemer ${routeState.participantName}`)}
                    spacingType={SpacingType.small}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
                />

                <TaalhuisParticipantsDetailTabs activeTabId={Tabs.Intake} routeState={routeState} />
                {renderSection()}
            </Column>
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.participants.taalhuis.participants.detail.intake.update,
                                state: routeState,
                            })
                        }
                    >
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )

    function renderSection() {
        if (loading) {
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
                        readOnly={true}
                        prefillData={{
                            civicIntegrationRequirement: data.student.civicIntegrationDetails?.civicIntegrationRequirement,
                            civicIntegrationRequirementReason: data.student.civicIntegrationDetails?.civicIntegrationRequirementReason,
                            civicIntegrationRequirementFinishDate: data.student.civicIntegrationDetails?.civicIntegrationRequirementFinishDate,
                        }}
                    />
                    <HorizontalRule />
                    <PersonInformationFieldset
                        readOnly={true}
                        prefillData={{
                            lastName: data.student.personDetails.familyName,
                            insertion: data.student.personDetails.additionalName,
                            nickName: data.student.personDetails.givenName,
                            gender: data.student.personDetails.gender,
                            dateOfBirth: data.student.personDetails.dateOfBirth,
                        }}
                        fieldControls={{
                            countryOfOrigin: {
                                hidden: true,
                            },
                            lastName: {
                                required: false,
                            },
                        }}
                    />
                    <HorizontalRule />
                    <ContactInformationFieldset
                        readOnly={true}
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
                        readOnly={true}
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
                        readOnly={true}
                        prefillData={{
                            notifyingParty: data.notifyingParty,
                            referrerEmailAddress: data.referrerEmailAddress,
                        }}
                    />
                    <HorizontalRule />
                    <BackgroundInformationFieldset
                        readOnly={true}
                        prefillData={{
                            foundVia: data.foundVia,
                            foundViaBefore: data.foundViaBefore,
                            networks: data.networks,
                            participationLadder: data.participationLadder,
                        }}
                    />
                    <HorizontalRule />
                    <DutchNTFieldset
                        readOnly={true}
                        prefillData={{
                            NTLevel: data.NTLevel,
                        }}
                    />
                    <HorizontalRule />
                    <LevelInformationFieldset
                        readOnly={true}
                        prefillData={{
                            languageLevel: data.languageLevel,
                        }}
                    />
                    <HorizontalRule />
                    <EducationInformationFieldset
                        readOnly={true}
                        prefillData={{
                            lastEducation: data.lastEducation,
                            graduated: data.graduated,
                            currentEducation: data.currentEducation,
                        }}
                    />
                    <HorizontalRule />
                    <CourseInformationFieldset
                        readOnly={true}
                        prefillData={{
                            course: data.course,
                        }}
                    />
                    <HorizontalRule />
                    <WorkInformationFieldset
                        readOnly={true}
                        prefillData={{
                            trained: data.trained,
                            lastWorkplace: data.lastWorkplace,
                            dayTimeActivities: data.dayTimeActivities,
                        }}
                    />
                    <HorizontalRule />
                    <MotivationInformationFieldset
                        readOnly={true}
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
                        readOnly={true}
                        prefillData={{
                            available: data.available,
                            note: data.note,
                        }}
                    />
                    <HorizontalRule />
                    <ReadingTestInformationFieldset
                        readOnly={true}
                        prefillData={{
                            readingResults: data.readingResults,
                        }}
                    />
                    <HorizontalRule />
                    <WritingInformationFieldset
                        readOnly={true}
                        prefillData={{
                            writingResults: data.writingResults,
                        }}
                    />
                    <HorizontalRule />
                    <PermissionsFieldset
                        readOnly={true}
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
}
