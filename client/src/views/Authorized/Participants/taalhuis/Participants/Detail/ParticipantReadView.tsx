import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import Tab from '../../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../../components/Core/TabSwitch/TabSwitch'
import DutchNTFieldset from '../../../../../../components/fieldsets/shared/DutchNTInformationFieldset'
import AvailabillityFieldset from '../../../../../../components/fieldsets/shared/AvailabillityFieldset'
import ContactInformationFieldset from '../../../../../../components/fieldsets/shared/ContactInformationFieldset'
import CourseInformationFieldset from '../../../../../../components/fieldsets/shared/CourseInformationFieldset'
import GeneralInformationFieldset from '../../../../../../components/fieldsets/shared/GeneralInformationFieldset'
import BackgroundInformationFieldset from '../../../../../../components/fieldsets/shared/participants/BackgroundInformationFieldset'
import CivicIntegrationFieldset from '../../../../../../components/fieldsets/shared/participants/CivicIntegrationInformationFieldset'
import LevelInformationFieldset from '../../../../../../components/fieldsets/shared/participants/LevelInformationFieldset'
import MotivationInformationFieldset from '../../../../../../components/fieldsets/shared/participants/MotivationInformationFieldset'
import ReadingTestInformationFieldset from '../../../../../../components/fieldsets/shared/participants/ReadingTestInformationFieldset'
import RefererInformationFieldset from '../../../../../../components/fieldsets/shared/participants/ReferrerInformationFieldset'
import WorkInformationFieldset from '../../../../../../components/fieldsets/shared/participants/WorkInformationFieldset'
import WritingInformationFieldset from '../../../../../../components/fieldsets/shared/participants/WritingInformationFieldset'
import PersonInformationFieldset from '../../../../../../components/fieldsets/shared/PersonInformationFieldset'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { ParticipantDetailParams } from '../../../../../../routes/participants/types'
import { routes } from '../../../../../../routes/routes'
import { taalhuisParticipantsCreateResponse } from '../../../mocks/participants'
import { ReadDetailTabs, tabPaths, Tabs, readDetailTabsTranslations } from '../../constants'
import { PermissionsFieldset } from '../../../../../../components/fieldsets/shared/participants/PermissionsFieldset'
import EducationInformationFieldset from '../../../../../../components/fieldsets/shared/participants/EducationInformationFieldset'

interface Props {}

interface Props {}

export const ParticipantsReadView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<ParticipantDetailParams>()
    const { data, loading, error } = useMockQuery(taalhuisParticipantsCreateResponse)

    if (!params.participantid) {
        return null
    }

    return (
        <>
            <Column spacing={10}>
                <Headline
                    title={i18n._(t`Deelnemer ${params.participantname}`)}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs>
                            <Breadcrumb
                                text={i18n._(t`Deelnemers`)}
                                to={routes.authorized.participants.taalhuis.participants.overview}
                            />
                        </Breadcrumbs>
                    }
                />

                <TabSwitch
                    defaultActiveTabId={ReadDetailTabs.intake}
                    onChange={props => history.push(tabPaths[props.tabid as Tabs])}
                >
                    <Tab label={readDetailTabsTranslations[ReadDetailTabs.intake]} tabid={ReadDetailTabs.intake} />
                    <Tab
                        label={readDetailTabsTranslations[ReadDetailTabs.registration]}
                        tabid={ReadDetailTabs.registration}
                    />
                    <Tab label={readDetailTabsTranslations[ReadDetailTabs.dossier]} tabid={ReadDetailTabs.dossier} />
                    <Tab
                        label={readDetailTabsTranslations[ReadDetailTabs.learningNeeds]}
                        tabid={ReadDetailTabs.learningNeeds}
                    />
                    <Tab
                        label={readDetailTabsTranslations[ReadDetailTabs.documents]}
                        tabid={ReadDetailTabs.documents}
                    />
                </TabSwitch>

                {renderSection()}
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.send}
                        onClick={() =>
                            history.push(
                                routes.authorized.participants.taalhuis.participants.detail.update({
                                    participantid: params.participantid,
                                    participantname: params.participantname,
                                })
                            )
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
                    <CivicIntegrationFieldset
                        readOnly={true}
                        prefillData={{
                            civicIntegrationRequirement: data.civicIntegrationRequirement,
                            civicIntegrationRequirementReason: data.civicIntegrationRequirementReason,
                        }}
                    />
                    <HorizontalRule />
                    <PersonInformationFieldset
                        readOnly={true}
                        prefillData={{
                            lastName: data.lastName,
                            insertion: data.insertion,
                            nickName: data.nickName,
                            gender: data.gender,
                            dateOfBirth: data.dateOfBirth,
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
                            email: data.email,
                            postalCode: data.postalCode,
                            city: data.city,
                            phoneNumberContactPerson: data.phoneNumberContactPerson,
                            contactPreference: data.contactPreference,
                        }}
                        fieldControls={{
                            phone: {
                                hidden: true,
                            },
                        }}
                    />
                    <HorizontalRule />
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
                    <PermissionsFieldset
                        readOnly={true}
                        prefillData={{
                            signed: data.signed,
                            sharingLearningPathway: data.sharingLearningPathway,
                            sharingBasicData: data.sharingLearningPathway,
                            permissionInformationFromLibrary: data.permissionInformationFromLibrary,
                        }}
                    />
                </>
            )
        }
    }
}
