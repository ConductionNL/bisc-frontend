export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    DateTime: any
}

export type AanbiederAddressType = {
    __typename?: 'AanbiederAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type AanbiederEmployeeAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type AanbiederEmployeeAddressType = {
    __typename?: 'AanbiederEmployeeAddressType'
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type AanbiederEmployeeAvailabilityDaysType = {
    __typename?: 'AanbiederEmployeeAvailabilityDaysType'
    monday: AanbiederEmployeeAvailabilityDayType
    tuesday: AanbiederEmployeeAvailabilityDayType
    wednesday: AanbiederEmployeeAvailabilityDayType
    thursday: AanbiederEmployeeAvailabilityDayType
    friday: AanbiederEmployeeAvailabilityDayType
    saturday: AanbiederEmployeeAvailabilityDayType
    sunday: AanbiederEmployeeAvailabilityDayType
}

export type AanbiederEmployeeAvailabilityDayType = {
    __typename?: 'AanbiederEmployeeAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export enum AanbiederEmployeeContactPreferenceEnum {
    Phonecall = 'PHONECALL',
    Whatsapp = 'WHATSAPP',
    Email = 'EMAIL',
    Other = 'OTHER',
}

export enum AanbiederEmployeeCurrentEducationEnum {
    Yes = 'YES',
    No = 'NO',
    NoButDidFollow = 'NO_BUT_DID_FOLLOW',
}

export type AanbiederEmployeeCurrentEducationNoButDidFollowType = {
    __typename?: 'AanbiederEmployeeCurrentEducationNoButDidFollowType'
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
}

export type AanbiederEmployeeCurrentEducationYesType = {
    __typename?: 'AanbiederEmployeeCurrentEducationYesType'
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type AanbiederEmployeeDocumentDownloadType = {
    __typename?: 'AanbiederEmployeeDocumentDownloadType'
    base64data: Scalars['String']
}

export type AanbiederEmployeeDocumentType = {
    __typename?: 'AanbiederEmployeeDocumentType'
    id: Scalars['String']
    filename: Scalars['String']
    dateCreated: Scalars['String']
}

export enum AanbiederEmployeeGenderEnum {
    Male = 'MALE',
    Female = 'FEMALE',
    X = 'X',
}

export enum AanbiederEmployeeProfessionalismEnum {
    Professional = 'PROFESSIONAL',
    Volunteer = 'VOLUNTEER',
    Both = 'BOTH',
}

export enum AanbiederEmployeeTargetGroupPreferenceEnum {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
}

export type AanbiederEmployeeType = {
    __typename?: 'AanbiederEmployeeType'
    userId: Scalars['String']
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<AanbiederUserRoleType>
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<AanbiederEmployeeAvailabilityDaysType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    gender?: Maybe<AanbiederEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<AanbiederEmployeeAddressType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<AanbiederEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<AanbiederEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<AanbiederEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<AanbiederEmployeeCurrentEducationYesType>
    currentEdicationNoButDidFollow?: Maybe<AanbiederEmployeeCurrentEducationNoButDidFollowType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
}

export type AanbiederType = {
    __typename?: 'AanbiederType'
    id: Scalars['String']
    name: Scalars['String']
    address?: Maybe<AanbiederAddressType>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
}

export type AanbiederUserRoleType = {
    __typename?: 'AanbiederUserRoleType'
    id: Scalars['String']
    name: UserRoleEnum
}

export type AddOrRemoveMentorToParticipationInputType = {
    participationId: Scalars['String']
    aanbiederEmployeeId: Scalars['String']
}

export type AddOrRemoveParticipationToGroupInputType = {
    participationId: Scalars['String']
    groupId: Scalars['String']
}

export type BiscEmployeeType = {
    __typename?: 'BiscEmployeeType'
    id: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
}

export type ContextUserType = {
    __typename?: 'ContextUserType'
    id: Scalars['String']
    username: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    userEnvironment: UserEnvironmentEnum
    organizationId?: Maybe<Scalars['String']>
    organizationName?: Maybe<Scalars['String']>
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<TaalhuisUserRoleType>
}

export type CreateAanbiederAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type CreateAanbiederEmployeeAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type CreateAanbiederEmployeeAvailabilityInputType = {
    monday: CreateAanbiederEmployeeAvailabilityDayInputType
    tuesday: CreateAanbiederEmployeeAvailabilityDayInputType
    wednesday: CreateAanbiederEmployeeAvailabilityDayInputType
    thursday: CreateAanbiederEmployeeAvailabilityDayInputType
    friday: CreateAanbiederEmployeeAvailabilityDayInputType
    saturday: CreateAanbiederEmployeeAvailabilityDayInputType
    sunday: CreateAanbiederEmployeeAvailabilityDayInputType
}

export type CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType = {
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateAanbiederEmployeeCurrentEducationYesInputType = {
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateAanbiederEmployeeDocumentInputType = {
    aanbiederEmployeeId: Scalars['String']
    filename: Scalars['String']
    base64data: Scalars['String']
}

export type CreateAanbiederEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<CreateAanbiederEmployeeAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    userGroupIds: Array<Scalars['String']>
    gender?: Maybe<AanbiederEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<AanbiederEmployeeAddressInputType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<AanbiederEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<AanbiederEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<AanbiederEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<CreateAanbiederEmployeeCurrentEducationYesInputType>
    currentEdicationNoButDidFollow?: Maybe<CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
    aanbiederId: Scalars['String']
}

export type CreateBiscEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type CreateGroupAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type CreateGroupAvailabilityInputType = {
    monday: CreateGroupAvailabilityDayInputType
    tuesday: CreateGroupAvailabilityDayInputType
    wednesday: CreateGroupAvailabilityDayInputType
    thursday: CreateGroupAvailabilityDayInputType
    friday: CreateGroupAvailabilityDayInputType
    saturday: CreateGroupAvailabilityDayInputType
    sunday: CreateGroupAvailabilityDayInputType
}

export type CreateGroupInputType = {
    aanbiederId: Scalars['String']
    name: Scalars['String']
    typeCourse: GroupTypeCourseEnum
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal: Scalars['Boolean']
    detailsTotalClassHours: Scalars['Int']
    detailsCertificateWillBeAwarded: Scalars['Boolean']
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availability?: Maybe<CreateGroupAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation: Scalars['String']
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    aanbiederEmployeeIds?: Maybe<Array<Scalars['String']>>
}

export type CreateLearningNeedInputType = {
    studentId: Scalars['String']
    learningNeedDescription: Scalars['String']
    learningNeedMotivation: Scalars['String']
    desiredOutComesGoal: Scalars['String']
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer: Scalars['String']
    offerAdvisedOffer: Scalars['String']
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
}

export type CreateParticipationInputType = {
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<ParticipationOfferCourseEnum>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<LearningNeedTopicEnum>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<LearningNeedApplicationEnum>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<LearningNeedLevelEnum>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<ParticipationGroupFormationEnum>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['DateTime']>
    detailsEndDate?: Maybe<Scalars['DateTime']>
    detailsEngagements?: Maybe<Scalars['String']>
    learningNeedId: Scalars['String']
}

export type CreateStudentAvailabilityDayInputType = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type CreateStudentAvailabilityDaysInputType = {
    monday: CreateStudentAvailabilityDayInputType
    tuesday: CreateStudentAvailabilityDayInputType
    wednesday: CreateStudentAvailabilityDayInputType
    thursday: CreateStudentAvailabilityDayInputType
    friday: CreateStudentAvailabilityDayInputType
    saturday: CreateStudentAvailabilityDayInputType
    sunday: CreateStudentAvailabilityDayInputType
}

export type CreateStudentAvailabilityInputType = {
    availability?: Maybe<CreateStudentAvailabilityDaysInputType>
    availabilityNotes?: Maybe<Scalars['String']>
}

export type CreateStudentBackgroundInputType = {
    foundVia?: Maybe<StudentFoundViaEnum>
    foundViaOther?: Maybe<Scalars['String']>
    wentToTaalhuisBefore?: Maybe<Scalars['Boolean']>
    wentToTaalhuisBeforeReason?: Maybe<Scalars['String']>
    wentToTaalhuisBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Array<StudentNetworkEnum>>
    participationLadder?: Maybe<Scalars['Int']>
}

export type CreateStudentCivicIntegrationInputType = {
    civicIntegrationRequirement?: Maybe<StudentCivicIntegrationRequirementEnum>
    civicIntegrationRequirementReason?: Maybe<StudentCivicIntegrationRequirementReasonEnum>
    civicIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
}

export type CreateStudentContactInputType = {
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    contactPersonTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<StudentContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
}

export type CreateStudentCourseInputType = {
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<StudentFollowingCourseTeacherEnum>
    courseGroup?: Maybe<StudentFollowingCourseGroupEnum>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateStudentDocumentInputType = {
    studentId: Scalars['String']
    filename: Scalars['String']
    base64data: Scalars['String']
}

export type CreateStudentDossierEventInputType = {
    studentId: Scalars['String']
    event: StudentDossierEventEnum
    eventDate: Scalars['String']
    eventDescription: Scalars['String']
}

export type CreateStudentDutchNtInputType = {
    dutchNTLevel?: Maybe<StudentDutchNtLevelEnum>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<StudentDutchLastKnownLevelEnum>
}

export type CreateStudentEducationInputType = {
    lastFollowedEducation?: Maybe<StudentLastFollowedEducationEnum>
    didGraduate?: Maybe<Scalars['Boolean']>
    followingEducationRightNow?: Maybe<StudentFollowingEducationRightNowEnum>
    followingEducationRightNowYesStartDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesLevel?: Maybe<StudentFollowingEducationRightNowLevelEnum>
    followingEducationRightNowYesInstitute?: Maybe<Scalars['String']>
    followingEducationRightNowYesProvidesCertificate?: Maybe<Scalars['Boolean']>
    followingEducationRightNowNoEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowNoLevel?: Maybe<Scalars['String']>
    followingEducationRightNowNoGotCertificate?: Maybe<Scalars['Boolean']>
}

export type CreateStudentGeneralInputType = {
    countryOfOrigin?: Maybe<Scalars['String']>
    nativeLanguage?: Maybe<Scalars['String']>
    otherLanguages?: Maybe<Scalars['String']>
    familyComposition?: Maybe<Array<StudentFamilyCompositionEnum>>
    childrenCount?: Maybe<Scalars['Int']>
    childrenDatesOfBirth?: Maybe<Scalars['String']>
}

export type CreateStudentInputType = {
    civicIntegrationDetails?: Maybe<CreateStudentCivicIntegrationInputType>
    personDetails: CreateStudentPersonInputType
    contactDetails?: Maybe<CreateStudentContactInputType>
    generalDetails?: Maybe<CreateStudentGeneralInputType>
    referrerDetails?: Maybe<CreateStudentReferrerInputType>
    backgroundDetails?: Maybe<CreateStudentBackgroundInputType>
    dutchNTDetails?: Maybe<CreateStudentDutchNtInputType>
    speakingLevel?: Maybe<StudentSpeakingLevelEnum>
    educationDetails?: Maybe<CreateStudentEducationInputType>
    courseDetails?: Maybe<CreateStudentCourseInputType>
    jobDetails?: Maybe<CreateStudentJobInputType>
    motivationDetails?: Maybe<CreateStudentMotivationInputType>
    availabilityDetails?: Maybe<CreateStudentAvailabilityInputType>
    readingTestResult?: Maybe<StudentReadingTestResultEnum>
    writingTestResult?: Maybe<StudentWritingTestResultEnum>
    permissionDetails: CreateStudentPermissionInputType
    taalhuisId: Scalars['String']
}

export type CreateStudentJobInputType = {
    trainedForJob?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    dayTimeActivities?: Maybe<Array<StudentJobDaytimeActivitiesEnum>>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
}

export type CreateStudentMotivationInputType = {
    desiredSkills?: Maybe<Array<StudentMotivationDesiredSkillsEnum>>
    desiredSkillsOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    whyWantTheseSkills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    desiredLearningMethod?: Maybe<Array<StudentMotivationDesiredLearningMethodsEnum>>
    remarks?: Maybe<Scalars['String']>
}

export type CreateStudentPermissionInputType = {
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithAanbieders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
}

export type CreateStudentPersonInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    gender?: Maybe<StudentGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
}

export type CreateStudentReferrerInputType = {
    referringOrganization?: Maybe<StudentReferringOrganizationEnum>
    referringOrganizationOther?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
}

export type CreateTaalhuisAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type CreateTaalhuisEmployeeInputType = {
    taalhuisId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type CreateTestResultInputType = {
    participationId: Scalars['String']
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam: Scalars['String']
    examDate: Scalars['String']
    examMemo?: Maybe<Scalars['String']>
}

export type DownloadDesiredLearningOutcomesReportInputType = {
    taalhuisId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type DownloadParticipantsReportInputType = {
    taalhuisId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type DownloadReportType = {
    __typename?: 'DownloadReportType'
    filename: Scalars['String']
    base64data: Scalars['String']
}

export type DownloadVolunteersReportInputType = {
    aanbiederId: Scalars['String']
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
}

export type GroupAvailabilityDaysType = {
    __typename?: 'GroupAvailabilityDaysType'
    monday: GroupAvailabilityDayType
    tuesday: GroupAvailabilityDayType
    wednesday: GroupAvailabilityDayType
    thursday: GroupAvailabilityDayType
    friday: GroupAvailabilityDayType
    saturday: GroupAvailabilityDayType
    sunday: GroupAvailabilityDayType
}

export type GroupAvailabilityDayType = {
    __typename?: 'GroupAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type GroupType = {
    __typename?: 'GroupType'
    id: Scalars['String']
    name: Scalars['String']
    aanbiederName: Scalars['String']
    typeCourse: GroupTypeCourseEnum
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal: Scalars['Boolean']
    detailsTotalClassHours: Scalars['Int']
    detailsCertificateWillBeAwarded: Scalars['Boolean']
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availability?: Maybe<GroupAvailabilityDaysType>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation: Scalars['String']
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    aanbiederEmployees?: Maybe<Array<AanbiederEmployeeType>>
}

export enum GroupTypeCourseEnum {
    Language = 'LANGUAGE',
    Math = 'MATH',
    Digital = 'DIGITAL',
    Other = 'OTHER',
}

export enum LearningNeedApplicationEnum {
    FamilyAndParenting = 'FAMILY_AND_PARENTING',
    LaborMarketAndWork = 'LABOR_MARKET_AND_WORK',
    HealthAndWellbeing = 'HEALTH_AND_WELLBEING',
    AdministrationAndFinance = 'ADMINISTRATION_AND_FINANCE',
    HousingAndNeighborhood = 'HOUSING_AND_NEIGHBORHOOD',
    Selfreliance = 'SELFRELIANCE',
    Other = 'OTHER',
}

export enum LearningNeedLevelEnum {
    Inflow = 'INFLOW',
    Nlqf1 = 'NLQF1',
    Nlqf2 = 'NLQF2',
    Nlqf3 = 'NLQF3',
    Nlqf4 = 'NLQF4',
    Other = 'OTHER',
}

export enum LearningNeedOfferDifferenceEnum {
    No = 'NO',
    YesDistance = 'YES_DISTANCE',
    YesWaitinglist = 'YES_WAITINGLIST',
    YesOther = 'YES_OTHER',
}

export enum LearningNeedTopicEnum {
    DutchReading = 'DUTCH_READING',
    DutchWriting = 'DUTCH_WRITING',
    MathNumbers = 'MATH_NUMBERS',
    MathProportion = 'MATH_PROPORTION',
    MathGeometry = 'MATH_GEOMETRY',
    MathLinks = 'MATH_LINKS',
    DigitalUsingIctSystems = 'DIGITAL_USING_ICT_SYSTEMS',
    DigitalSearchingInformation = 'DIGITAL_SEARCHING_INFORMATION',
    DigitalProcessingInformation = 'DIGITAL_PROCESSING_INFORMATION',
    DigitalCommunication = 'DIGITAL_COMMUNICATION',
    Knowledge = 'KNOWLEDGE',
    Skills = 'SKILLS',
    Attitude = 'ATTITUDE',
    Behaviour = 'BEHAVIOUR',
    Other = 'OTHER',
}

export type LearningNeedType = {
    __typename?: 'LearningNeedType'
    id: Scalars['String']
    learningNeedDescription: Scalars['String']
    learningNeedMotivation: Scalars['String']
    desiredOutComesGoal: Scalars['String']
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer: Scalars['String']
    offerAdvisedOffer: Scalars['String']
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
    participations: Array<ParticipationType>
}

export type Mutation = {
    __typename?: 'Mutation'
    login: RawReturnType
    requestPasswordReset: Scalars['Boolean']
    resetPassword: Scalars['Boolean']
    changePassword: Scalars['Boolean']
    createTaalhuis: TaalhuisType
    updateTaalhuis: TaalhuisType
    deleteTaalhuis: Scalars['Boolean']
    createTaalhuisEmployee: TaalhuisEmployeeType
    deleteTaalhuisEmployee: Scalars['Boolean']
    updateTaalhuisEmployee: TaalhuisEmployeeType
    createAanbieder: AanbiederType
    updateAanbieder: AanbiederType
    deleteAanbieder: Scalars['Boolean']
    createAanbiederEmployee: AanbiederEmployeeType
    updateAanbiederEmployee: AanbiederEmployeeType
    deleteAanbiederEmployee: Scalars['Boolean']
    registerStudent: Scalars['Boolean']
    deleteRegistration: Scalars['Boolean']
    acceptRegistration: StudentType
    createStudent: StudentType
    updateStudent: StudentType
    createLearningNeed: LearningNeedType
    updateLearningNeed: LearningNeedType
    deleteLearningNeed: Scalars['Boolean']
    createParticipation: ParticipationType
    createBiscEmployee: BiscEmployeeType
    updateBiscEmployee: BiscEmployeeType
    deleteBiscEmployee: Scalars['Boolean']
    downloadParticipantsReport: DownloadReportType
    downloadDesiredLearningOutcomesReport: DownloadReportType
    downloadVolunteersReport: DownloadReportType
    createAanbiederEmployeeDocument: AanbiederEmployeeDocumentType
    downloadAanbiederEmployeeDocument: AanbiederEmployeeDocumentDownloadType
    deleteAanbiederEmployeeDocument: Scalars['Boolean']
    createStudentDocument: StudentDocumentType
    downloadStudentDocument: StudentDocumentDownloadType
    deleteStudentDocument: Scalars['Boolean']
    createStudentDossierEvent: StudentDossierEventType
    updateStudentDossierEvent: StudentDossierEventType
    deleteStudentDossierEvent: Scalars['Boolean']
    deleteParticipation: Scalars['Boolean']
    updateParticipation: ParticipationType
    createTestResult: TestResultType
    updateTestResult: TestResultType
    deleteTestResult: Scalars['Boolean']
    createGroup: GroupType
    updateGroup: GroupType
    addMentorToParticipation: AanbiederEmployeeType
    removeMentorFromParticipation: Scalars['Boolean']
    addParticipationToGroup: ParticipationType
    updateGroupParticipation: ParticipationType
    removeParticipationFromGroup: Scalars['Boolean']
}

export type MutationLoginArgs = {
    username: Scalars['String']
    password: Scalars['String']
}

export type MutationRequestPasswordResetArgs = {
    email: Scalars['String']
}

export type MutationResetPasswordArgs = {
    email: Scalars['String']
    token: Scalars['String']
    password: Scalars['String']
}

export type MutationChangePasswordArgs = {
    currentPassword: Scalars['String']
    newPassword: Scalars['String']
}

export type MutationCreateTaalhuisArgs = {
    address?: Maybe<CreateTaalhuisAddressInputType>
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationUpdateTaalhuisArgs = {
    id: Scalars['String']
    address?: Maybe<UpdateTaalhuisAddressInputType>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationDeleteTaalhuisArgs = {
    id: Scalars['String']
}

export type MutationCreateTaalhuisEmployeeArgs = {
    input: CreateTaalhuisEmployeeInputType
}

export type MutationDeleteTaalhuisEmployeeArgs = {
    userId: Scalars['String']
}

export type MutationUpdateTaalhuisEmployeeArgs = {
    input: UpdateTaalhuisEmployeeInputType
}

export type MutationCreateAanbiederArgs = {
    address?: Maybe<CreateAanbiederAddressInputType>
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationUpdateAanbiederArgs = {
    id: Scalars['String']
    address?: Maybe<UpdateAanbiederAddressInputType>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}

export type MutationDeleteAanbiederArgs = {
    id: Scalars['String']
}

export type MutationCreateAanbiederEmployeeArgs = {
    input: CreateAanbiederEmployeeInputType
}

export type MutationUpdateAanbiederEmployeeArgs = {
    input: UpdateAanbiederEmployeeInputType
}

export type MutationDeleteAanbiederEmployeeArgs = {
    userId: Scalars['String']
}

export type MutationRegisterStudentArgs = {
    input: RegisterStudentInputType
}

export type MutationDeleteRegistrationArgs = {
    studentId: Scalars['String']
}

export type MutationAcceptRegistrationArgs = {
    studentId: Scalars['String']
}

export type MutationCreateStudentArgs = {
    input: CreateStudentInputType
}

export type MutationUpdateStudentArgs = {
    input: UpdateStudentInputType
}

export type MutationCreateLearningNeedArgs = {
    input: CreateLearningNeedInputType
}

export type MutationUpdateLearningNeedArgs = {
    input: UpdateLearningNeedInputType
}

export type MutationDeleteLearningNeedArgs = {
    learningNeedId: Scalars['String']
}

export type MutationCreateParticipationArgs = {
    input: CreateParticipationInputType
}

export type MutationCreateBiscEmployeeArgs = {
    input: CreateBiscEmployeeInputType
}

export type MutationUpdateBiscEmployeeArgs = {
    input: UpdateBiscEmployeeInputType
}

export type MutationDeleteBiscEmployeeArgs = {
    biscEmployeeId: Scalars['String']
}

export type MutationDownloadParticipantsReportArgs = {
    input: DownloadParticipantsReportInputType
}

export type MutationDownloadDesiredLearningOutcomesReportArgs = {
    input: DownloadDesiredLearningOutcomesReportInputType
}

export type MutationDownloadVolunteersReportArgs = {
    input: DownloadVolunteersReportInputType
}

export type MutationCreateAanbiederEmployeeDocumentArgs = {
    input: CreateAanbiederEmployeeDocumentInputType
}

export type MutationDownloadAanbiederEmployeeDocumentArgs = {
    aanbiederEmployeeDocumentId: Scalars['String']
}

export type MutationDeleteAanbiederEmployeeDocumentArgs = {
    aanbiederEmployeeDocumentId: Scalars['String']
}

export type MutationCreateStudentDocumentArgs = {
    input: CreateStudentDocumentInputType
}

export type MutationDownloadStudentDocumentArgs = {
    studentDocumentId: Scalars['String']
}

export type MutationDeleteStudentDocumentArgs = {
    studentDocumentId: Scalars['String']
}

export type MutationCreateStudentDossierEventArgs = {
    input: CreateStudentDossierEventInputType
}

export type MutationUpdateStudentDossierEventArgs = {
    input: UpdateStudentDossierEventInputType
}

export type MutationDeleteStudentDossierEventArgs = {
    studentDossierEventId: Scalars['String']
}

export type MutationDeleteParticipationArgs = {
    participationId: Scalars['String']
}

export type MutationUpdateParticipationArgs = {
    input: UpdateParticipationInputType
}

export type MutationCreateTestResultArgs = {
    input: CreateTestResultInputType
}

export type MutationUpdateTestResultArgs = {
    input: UpdateTestResultInputType
}

export type MutationDeleteTestResultArgs = {
    testResultId: Scalars['String']
}

export type MutationCreateGroupArgs = {
    input: CreateGroupInputType
}

export type MutationUpdateGroupArgs = {
    input: UpdateGroupInputType
}

export type MutationAddMentorToParticipationArgs = {
    input: AddOrRemoveMentorToParticipationInputType
}

export type MutationRemoveMentorFromParticipationArgs = {
    input: AddOrRemoveMentorToParticipationInputType
}

export type MutationAddParticipationToGroupArgs = {
    input: AddOrRemoveParticipationToGroupInputType
}

export type MutationUpdateGroupParticipationArgs = {
    input: UpdateGroupParticipationInputType
}

export type MutationRemoveParticipationFromGroupArgs = {
    input: AddOrRemoveParticipationToGroupInputType
}

export enum ParticipantStatusEnum {
    Pending = 'pending',
    Accepted = 'accepted',
}

export enum ParticipationGroupFormationEnum {
    Individually = 'INDIVIDUALLY',
    InAGroup = 'IN_A_GROUP',
}

export enum ParticipationOfferCourseEnum {
    Language = 'LANGUAGE',
    Math = 'MATH',
    Digital = 'DIGITAL',
    Other = 'OTHER',
}

export enum ParticipationPresenceEndParticipationReasonEnum {
    Moved = 'MOVED',
    Job = 'JOB',
    Illness = 'ILLNESS',
    Death = 'DEATH',
    CompletedSuccessfully = 'COMPLETED_SUCCESSFULLY',
    FamilyCircumstances = 'FAMILY_CIRCUMSTANCES',
    DoesNotMeetExpectations = 'DOES_NOT_MEET_EXPECTATIONS',
    Other = 'OTHER',
}

export enum ParticipationStatusEnum {
    Active = 'ACTIVE',
    Completed = 'COMPLETED',
    Referred = 'REFERRED',
}

export type ParticipationType = {
    __typename?: 'ParticipationType'
    id: Scalars['String']
    status: ParticipationStatusEnum
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<ParticipationOfferCourseEnum>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<LearningNeedTopicEnum>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<LearningNeedApplicationEnum>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<LearningNeedLevelEnum>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<ParticipationGroupFormationEnum>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['DateTime']>
    detailsEndDate?: Maybe<Scalars['DateTime']>
    detailsEngagements?: Maybe<Scalars['String']>
}

export type Query = {
    __typename?: 'Query'
    currentUser: ContextUserType
    taalhuizen: Array<TaalhuisType>
    taalhuis: TaalhuisType
    userRolesByTaalhuisId: Array<TaalhuisUserRoleType>
    taalhuisEmployees: Array<TaalhuisEmployeeType>
    taalhuisEmployee: TaalhuisEmployeeType
    aanbieders: Array<AanbiederType>
    aanbieder: AanbiederType
    aanbiederEmployees: Array<AanbiederEmployeeType>
    aanbiederEmployee: AanbiederEmployeeType
    userRolesByAanbiederId: Array<AanbiederUserRoleType>
    registrations: Array<StudentType>
    registration: StudentType
    students: Array<StudentType>
    student: StudentType
    learningNeeds: Array<LearningNeedType>
    learningNeed: LearningNeedType
    biscEmployee: BiscEmployeeType
    biscEmployees: Array<BiscEmployeeType>
    aanbiederEmployeeDocument: AanbiederEmployeeDocumentType
    aanbiederEmployeeDocuments: Array<AanbiederEmployeeDocumentType>
    studentDocument: StudentDocumentType
    studentDocuments: Array<StudentDocumentType>
    studentDossierEvent: StudentDossierEventType
    studentDossierEvents: Array<StudentDossierEventType>
    participations: Array<ParticipationType>
    participation: ParticipationType
    testResults: Array<TestResultType>
    testResult: TestResultType
    aanbiederEmployeeMentees: Array<StudentType>
    group: GroupType
    activeGroups: Array<GroupType>
    completedGroups: Array<GroupType>
    futureGroups: Array<GroupType>
    groupStudents: Array<StudentType>
    newReferredStudents: Array<StudentType>
    activeStudents: Array<StudentType>
    completedStudents: Array<StudentType>
}

export type QueryTaalhuisArgs = {
    taalhuisId: Scalars['String']
}

export type QueryUserRolesByTaalhuisIdArgs = {
    taalhuisId: Scalars['String']
}

export type QueryTaalhuisEmployeesArgs = {
    taalhuisId: Scalars['String']
}

export type QueryTaalhuisEmployeeArgs = {
    userId: Scalars['String']
}

export type QueryAanbiederArgs = {
    id: Scalars['String']
}

export type QueryAanbiederEmployeesArgs = {
    aanbiederId: Scalars['String']
}

export type QueryAanbiederEmployeeArgs = {
    userId: Scalars['String']
}

export type QueryUserRolesByAanbiederIdArgs = {
    aanbiederId: Scalars['String']
}

export type QueryRegistrationsArgs = {
    taalhuisId: Scalars['String']
}

export type QueryRegistrationArgs = {
    studentId: Scalars['String']
}

export type QueryStudentsArgs = {
    taalhuisId: Scalars['String']
}

export type QueryStudentArgs = {
    studentId: Scalars['String']
}

export type QueryLearningNeedsArgs = {
    studentId: Scalars['String']
}

export type QueryLearningNeedArgs = {
    learningNeedId: Scalars['String']
}

export type QueryBiscEmployeeArgs = {
    biscEmployeeId: Scalars['String']
}

export type QueryAanbiederEmployeeDocumentArgs = {
    aanbiederEmployeeDocumentId: Scalars['String']
}

export type QueryAanbiederEmployeeDocumentsArgs = {
    aanbiederEmployeeId: Scalars['String']
}

export type QueryStudentDocumentArgs = {
    studentDocumentId: Scalars['String']
}

export type QueryStudentDocumentsArgs = {
    studentId: Scalars['String']
}

export type QueryStudentDossierEventArgs = {
    studentDossierEventId: Scalars['String']
}

export type QueryStudentDossierEventsArgs = {
    studentId: Scalars['String']
}

export type QueryParticipationsArgs = {
    learningNeedId: Scalars['String']
}

export type QueryParticipationArgs = {
    participationId: Scalars['String']
}

export type QueryTestResultsArgs = {
    participationId: Scalars['String']
}

export type QueryTestResultArgs = {
    testResultId: Scalars['String']
}

export type QueryAanbiederEmployeeMenteesArgs = {
    anbiederEmployeeId: Scalars['String']
}

export type QueryGroupArgs = {
    groupId: Scalars['String']
}

export type QueryActiveGroupsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryCompletedGroupsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryFutureGroupsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryGroupStudentsArgs = {
    groupId: Scalars['String']
}

export type QueryNewReferredStudentsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryActiveStudentsArgs = {
    aanbiederId: Scalars['String']
}

export type QueryCompletedStudentsArgs = {
    aanbiederId: Scalars['String']
}

export type RawReturnType = {
    __typename?: 'RawReturnType'
    accessToken: Scalars['String']
}

export type RegisterStudentAddresInputType = {
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
}

export type RegisterStudentInputType = {
    taalhuisId: Scalars['String']
    student: RegisterStudentStudentInputType
    registrar: RegisterStudentRegistrarInputType
    memo?: Maybe<Scalars['String']>
}

export type RegisterStudentRegistrarInputType = {
    organisationName: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
}

export type RegisterStudentStudentInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
    address?: Maybe<RegisterStudentAddresInputType>
}

export type StudentAvailabilityDaysType = {
    __typename?: 'StudentAvailabilityDaysType'
    monday: StudentAvailabilityDayType
    tuesday: StudentAvailabilityDayType
    wednesday: StudentAvailabilityDayType
    thursday: StudentAvailabilityDayType
    friday: StudentAvailabilityDayType
    saturday: StudentAvailabilityDayType
    sunday: StudentAvailabilityDayType
}

export type StudentAvailabilityDayType = {
    __typename?: 'StudentAvailabilityDayType'
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

export type StudentAvailabilityType = {
    __typename?: 'StudentAvailabilityType'
    availability?: Maybe<StudentAvailabilityDaysType>
    availabilityNotes?: Maybe<Scalars['String']>
}

export type StudentBackgroundType = {
    __typename?: 'StudentBackgroundType'
    foundVia?: Maybe<StudentFoundViaEnum>
    foundViaOther?: Maybe<Scalars['String']>
    wentToTaalhuisBefore?: Maybe<Scalars['Boolean']>
    wentToTaalhuisBeforeReason?: Maybe<Scalars['String']>
    wentToTaalhuisBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Array<StudentNetworkEnum>>
    participationLadder?: Maybe<Scalars['Int']>
}

export enum StudentCivicIntegrationRequirementEnum {
    No = 'NO',
    Yes = 'YES',
    CurrentlyWorkingOnIntegration = 'CURRENTLY_WORKING_ON_INTEGRATION',
}

export enum StudentCivicIntegrationRequirementReasonEnum {
    Finished = 'FINISHED',
    FromEuCountry = 'FROM_EU_COUNTRY',
    ExemptedOrZroute = 'EXEMPTED_OR_ZROUTE',
}

export type StudentCivicIntegrationType = {
    __typename?: 'StudentCivicIntegrationType'
    civicIntegrationRequirement?: Maybe<StudentCivicIntegrationRequirementEnum>
    civicIntegrationRequirementReason?: Maybe<StudentCivicIntegrationRequirementReasonEnum>
    civicIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
}

export enum StudentContactPreferenceEnum {
    Phonecall = 'PHONECALL',
    Whatsapp = 'WHATSAPP',
    Email = 'EMAIL',
    Other = 'OTHER',
}

export type StudentContactType = {
    __typename?: 'StudentContactType'
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    contactPersonTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<StudentContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
}

export type StudentCourseType = {
    __typename?: 'StudentCourseType'
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<StudentFollowingCourseTeacherEnum>
    courseGroup?: Maybe<StudentFollowingCourseGroupEnum>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type StudentDocumentDownloadType = {
    __typename?: 'StudentDocumentDownloadType'
    base64data: Scalars['String']
}

export type StudentDocumentType = {
    __typename?: 'StudentDocumentType'
    id: Scalars['String']
    filename: Scalars['String']
    dateCreated: Scalars['String']
}

export enum StudentDossierEventEnum {
    FINAL_TALK = 'FINAL_TALK',
    REMARK = 'REMARK',
    FOLLOW_UP_TALK = 'FOLLOW_UP_TALK',
    INFO_FOR_STORYTELLING = 'INFO_FOR_STORYTELLING',
    INTAKE = 'INTAKE',
}

export type StudentDossierEventType = {
    __typename?: 'StudentDossierEventType'
    id: Scalars['String']
    event: StudentDossierEventEnum
    eventDate: Scalars['String']
    eventDescription: Scalars['String']
    createdByAanbiederEmployee: AanbiederEmployeeType
}

export enum StudentDutchLastKnownLevelEnum {
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
    Unknown = 'UNKNOWN',
}

export enum StudentDutchNtLevelEnum {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
}

export type StudentDutchNtType = {
    __typename?: 'StudentDutchNTType'
    dutchNTLevel?: Maybe<StudentDutchNtLevelEnum>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<StudentDutchLastKnownLevelEnum>
}

export type StudentEducationType = {
    __typename?: 'StudentEducationType'
    lastFollowedEducation?: Maybe<StudentLastFollowedEducationEnum>
    didGraduate?: Maybe<Scalars['Boolean']>
    followingEducationRightNow?: Maybe<StudentFollowingEducationRightNowEnum>
    followingEducationRightNowYesStartDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesLevel?: Maybe<StudentFollowingEducationRightNowLevelEnum>
    followingEducationRightNowYesInstitute?: Maybe<Scalars['String']>
    followingEducationRightNowYesProvidesCertificate?: Maybe<Scalars['Boolean']>
    followingEducationRightNowNoEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowNoLevel?: Maybe<Scalars['String']>
    followingEducationRightNowNoGotCertificate?: Maybe<Scalars['Boolean']>
}

export enum StudentFamilyCompositionEnum {
    MarriedPartner = 'MARRIED_PARTNER',
    Single = 'SINGLE',
    Divorced = 'DIVORCED',
    Widow = 'WIDOW',
}

export enum StudentFollowingCourseGroupEnum {
    Individually = 'INDIVIDUALLY',
    Group = 'GROUP',
}

export enum StudentFollowingCourseTeacherEnum {
    Professional = 'PROFESSIONAL',
    Volunteer = 'VOLUNTEER',
    Both = 'BOTH',
}

export enum StudentFollowingEducationRightNowEnum {
    Yes = 'YES',
    No = 'NO',
    NoButDidEarlier = 'NO_BUT_DID_EARLIER',
}

export enum StudentFollowingEducationRightNowLevelEnum {
    LanguageCourse = 'LANGUAGE_COURSE',
    Bo = 'BO',
    Hbo = 'HBO',
    Wo = 'WO',
    Other = 'OTHER',
}

export enum StudentFoundViaEnum {
    VolunteerCenter = 'VOLUNTEER_CENTER',
    LibraryWebsite = 'LIBRARY_WEBSITE',
    SocialMedia = 'SOCIAL_MEDIA',
    Newspaper = 'NEWSPAPER',
    ViaVia = 'VIA_VIA',
    Other = 'OTHER',
}

export enum StudentGenderEnum {
    Male = 'MALE',
    Female = 'FEMALE',
    X = 'X',
}

export type StudentGeneralType = {
    __typename?: 'StudentGeneralType'
    countryOfOrigin?: Maybe<Scalars['String']>
    nativeLanguage?: Maybe<Scalars['String']>
    otherLanguages?: Maybe<Scalars['String']>
    familyComposition?: Maybe<Array<StudentFamilyCompositionEnum>>
    childrenCount?: Maybe<Scalars['Int']>
    childrenDatesOfBirth?: Maybe<Scalars['String']>
}

export enum StudentJobDaytimeActivitiesEnum {
    SearchingForJob = 'SEARCHING_FOR_JOB',
    ReIntegration = 'RE_INTEGRATION',
    School = 'SCHOOL',
    VolunteerJob = 'VOLUNTEER_JOB',
    Job = 'JOB',
    Other = 'OTHER',
}

export type StudentJobType = {
    __typename?: 'StudentJobType'
    trainedForJob?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    dayTimeActivities?: Maybe<Array<StudentJobDaytimeActivitiesEnum>>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
}

export enum StudentLastFollowedEducationEnum {
    NoEducation = 'NO_EDUCATION',
    SomeYearsPo = 'SOME_YEARS_PO',
    Po = 'PO',
    Vo = 'VO',
    Mbo = 'MBO',
    Hbo = 'HBO',
    University = 'UNIVERSITY',
}

export enum StudentMotivationDesiredLearningMethodsEnum {
    InAGroup = 'IN_A_GROUP',
    OneOnOne = 'ONE_ON_ONE',
    HomeEnvironment = 'HOME_ENVIRONMENT',
    InLibraryOrOther = 'IN_LIBRARY_OR_OTHER',
    Online = 'ONLINE',
}

export enum StudentMotivationDesiredSkillsEnum {
    Kliktik = 'KLIKTIK',
    UsingWhatsapp = 'USING_WHATSAPP',
    UsingSkype = 'USING_SKYPE',
    DeviceFunctionalities = 'DEVICE_FUNCTIONALITIES',
    DigitalGovernment = 'DIGITAL_GOVERNMENT',
    ReserveBooksInLibrary = 'RESERVE_BOOKS_IN_LIBRARY',
    AdsOnMarktplaats = 'ADS_ON_MARKTPLAATS',
    ReadForChildren = 'READ_FOR_CHILDREN',
    UnderstandPrescriptions = 'UNDERSTAND_PRESCRIPTIONS',
    WriteApplicationLetter = 'WRITE_APPLICATION_LETTER',
    WritePostcardForFamily = 'WRITE_POSTCARD_FOR_FAMILY',
    DoAdministration = 'DO_ADMINISTRATION',
    CalculationsForRecipes = 'CALCULATIONS_FOR_RECIPES',
    Other = 'OTHER',
}

export type StudentMotivationType = {
    __typename?: 'StudentMotivationType'
    desiredSkills?: Maybe<Array<StudentMotivationDesiredSkillsEnum>>
    desiredSkillsOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    whyWantTheseSkills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    desiredLearningMethod?: Maybe<Array<StudentMotivationDesiredLearningMethodsEnum>>
    remarks?: Maybe<Scalars['String']>
}

export enum StudentNetworkEnum {
    HouseholdMembers = 'HOUSEHOLD_MEMBERS',
    Neighbors = 'NEIGHBORS',
    FamilyMembers = 'FAMILY_MEMBERS',
    AidWorkers = 'AID_WORKERS',
    FriendsAcquaintances = 'FRIENDS_ACQUAINTANCES',
    PeopleAtMosqueChurch = 'PEOPLE_AT_MOSQUE_CHURCH',
    AcquaintancesSpeakingOwnLanguage = 'ACQUAINTANCES_SPEAKING_OWN_LANGUAGE',
    AcquaintancesSpeakingDutch = 'ACQUAINTANCES_SPEAKING_DUTCH',
}

export type StudentPermissionType = {
    __typename?: 'StudentPermissionType'
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithAanbieders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
}

export type StudentPersonType = {
    __typename?: 'StudentPersonType'
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    gender?: Maybe<StudentGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
}

export enum StudentReadingTestResultEnum {
    CanNotRead = 'CAN_NOT_READ',
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
}

export type StudentReferrerType = {
    __typename?: 'StudentReferrerType'
    referringOrganization?: Maybe<StudentReferringOrganizationEnum>
    referringOrganizationOther?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
}

export enum StudentReferringOrganizationEnum {
    Uwv = 'UWV',
    SocialService = 'SOCIAL_SERVICE',
    Library = 'LIBRARY',
    WelfareWork = 'WELFARE_WORK',
    NeighborhoodTeam = 'NEIGHBORHOOD_TEAM',
    VolunteerOrganization = 'VOLUNTEER_ORGANIZATION',
    LanguageProvider = 'LANGUAGE_PROVIDER',
    Other = 'OTHER',
}

export type StudentRegistrarType = {
    __typename?: 'StudentRegistrarType'
    id: Scalars['String']
    organisationName: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
}

export enum StudentSpeakingLevelEnum {
    Beginner = 'BEGINNER',
    Reasonable = 'REASONABLE',
    Advanced = 'ADVANCED',
}

export type StudentType = {
    __typename?: 'StudentType'
    id: Scalars['String']
    dateCreated: Scalars['String']
    status: ParticipantStatusEnum
    memo?: Maybe<Scalars['String']>
    registrar?: Maybe<StudentRegistrarType>
    civicIntegrationDetails?: Maybe<StudentCivicIntegrationType>
    personDetails: StudentPersonType
    contactDetails?: Maybe<StudentContactType>
    generalDetails?: Maybe<StudentGeneralType>
    referrerDetails?: Maybe<StudentReferrerType>
    backgroundDetails?: Maybe<StudentBackgroundType>
    dutchNTDetails?: Maybe<StudentDutchNtType>
    speakingLevel?: Maybe<StudentSpeakingLevelEnum>
    educationDetails?: Maybe<StudentEducationType>
    courseDetails?: Maybe<StudentCourseType>
    jobDetails?: Maybe<StudentJobType>
    motivationDetails?: Maybe<StudentMotivationType>
    availabilityDetails?: Maybe<StudentAvailabilityType>
    readingTestResult?: Maybe<StudentReadingTestResultEnum>
    writingTestResult?: Maybe<StudentWritingTestResultEnum>
    permissionDetails: StudentPermissionType
}

export enum StudentWritingTestResultEnum {
    CanNotWrite = 'CAN_NOT_WRITE',
    WriteNawDetails = 'WRITE_NAW_DETAILS',
    WriteSimpleTexts = 'WRITE_SIMPLE_TEXTS',
    WriteSimpleLetters = 'WRITE_SIMPLE_LETTERS',
}

export type TaalhuisAddressType = {
    __typename?: 'TaalhuisAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type TaalhuisEmployeeType = {
    __typename?: 'TaalhuisEmployeeType'
    id: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<TaalhuisUserRoleType>
}

export type TaalhuisType = {
    __typename?: 'TaalhuisType'
    id: Scalars['String']
    name: Scalars['String']
    address?: Maybe<TaalhuisAddressType>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
}

export type TaalhuisUserRoleType = {
    __typename?: 'TaalhuisUserRoleType'
    id: Scalars['String']
    name: UserRoleEnum
}

export type TestResultType = {
    __typename?: 'TestResultType'
    id: Scalars['String']
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam: Scalars['String']
    examDate: Scalars['String']
    examMemo?: Maybe<Scalars['String']>
    examResult?: Maybe<Scalars['String']>
}

export type UpdateAanbiederAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type UpdateAanbiederEmployeeInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    availability?: Maybe<CreateAanbiederEmployeeAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    email: Scalars['String']
    userGroupIds: Array<Scalars['String']>
    gender?: Maybe<AanbiederEmployeeGenderEnum>
    dateOfBirth?: Maybe<Scalars['String']>
    address?: Maybe<AanbiederEmployeeAddressInputType>
    contactTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<AanbiederEmployeeContactPreferenceEnum>
    contactPreferenceOther?: Maybe<Scalars['String']>
    targetGroupPreference?: Maybe<Array<AanbiederEmployeeTargetGroupPreferenceEnum>>
    volunteringPreference?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<AanbiederEmployeeCurrentEducationEnum>
    currentEducationYes?: Maybe<CreateAanbiederEmployeeCurrentEducationYesInputType>
    currentEdicationNoButDidFollow?: Maybe<CreateAanbiederEmployeeCurrentEducationNoButDidFollowInputType>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<AanbiederEmployeeProfessionalismEnum>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    isVOGChecked?: Maybe<Scalars['Boolean']>
    userId: Scalars['String']
}

export type UpdateBiscEmployeeInputType = {
    biscEmployeeId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type UpdateGroupInputType = {
    groupId: Scalars['String']
    name: Scalars['String']
    typeCourse: GroupTypeCourseEnum
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal: Scalars['Boolean']
    detailsTotalClassHours: Scalars['Int']
    detailsCertificateWillBeAwarded: Scalars['Boolean']
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availability?: Maybe<CreateGroupAvailabilityInputType>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation: Scalars['String']
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    aanbiederEmployeeIds?: Maybe<Array<Scalars['String']>>
}

export type UpdateGroupParticipationInputType = {
    participationId: Scalars['String']
    presenceEngagements?: Maybe<Scalars['String']>
    presenceStartDate?: Maybe<Scalars['DateTime']>
    presenceEndDate?: Maybe<Scalars['DateTime']>
    presenceEndParticipationReason?: Maybe<ParticipationPresenceEndParticipationReasonEnum>
}

export type UpdateLearningNeedInputType = {
    learningNeedId: Scalars['String']
    learningNeedDescription: Scalars['String']
    learningNeedMotivation: Scalars['String']
    desiredOutComesGoal: Scalars['String']
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer: Scalars['String']
    offerAdvisedOffer: Scalars['String']
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
}

export type UpdateParticipationInputType = {
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<ParticipationOfferCourseEnum>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<LearningNeedTopicEnum>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<LearningNeedApplicationEnum>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<LearningNeedLevelEnum>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<ParticipationGroupFormationEnum>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['DateTime']>
    detailsEndDate?: Maybe<Scalars['DateTime']>
    detailsEngagements?: Maybe<Scalars['String']>
    participationId: Scalars['String']
    presenceStartDate?: Maybe<Scalars['DateTime']>
    presenceEndDate?: Maybe<Scalars['DateTime']>
    presenceEndParticipationReason?: Maybe<ParticipationPresenceEndParticipationReasonEnum>
}

export type UpdateStudentDossierEventInputType = {
    studentDossierEventId: Scalars['String']
    event: StudentDossierEventEnum
    eventDate: Scalars['String']
    eventDescription: Scalars['String']
}

export type UpdateStudentInputType = {
    civicIntegrationDetails?: Maybe<CreateStudentCivicIntegrationInputType>
    personDetails: CreateStudentPersonInputType
    contactDetails?: Maybe<CreateStudentContactInputType>
    generalDetails?: Maybe<CreateStudentGeneralInputType>
    referrerDetails?: Maybe<CreateStudentReferrerInputType>
    backgroundDetails?: Maybe<CreateStudentBackgroundInputType>
    dutchNTDetails?: Maybe<CreateStudentDutchNtInputType>
    speakingLevel?: Maybe<StudentSpeakingLevelEnum>
    educationDetails?: Maybe<CreateStudentEducationInputType>
    courseDetails?: Maybe<CreateStudentCourseInputType>
    jobDetails?: Maybe<CreateStudentJobInputType>
    motivationDetails?: Maybe<CreateStudentMotivationInputType>
    availabilityDetails?: Maybe<CreateStudentAvailabilityInputType>
    readingTestResult?: Maybe<StudentReadingTestResultEnum>
    writingTestResult?: Maybe<StudentWritingTestResultEnum>
    permissionDetails: CreateStudentPermissionInputType
    studentId: Scalars['String']
}

export type UpdateTaalhuisAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type UpdateTaalhuisEmployeeInputType = {
    userId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type UpdateTestResultInputType = {
    testResultId: Scalars['String']
    outComesGoal: Scalars['String']
    outComesTopic: LearningNeedTopicEnum
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: LearningNeedApplicationEnum
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: LearningNeedLevelEnum
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam: Scalars['String']
    examDate: Scalars['String']
    examMemo?: Maybe<Scalars['String']>
}

export enum UserEnvironmentEnum {
    Bisc = 'BISC',
    Taalhuis = 'TAALHUIS',
    Aanbieder = 'AANBIEDER',
}

export enum UserRoleEnum {
    AanbiederCoordinator = 'AANBIEDER_COORDINATOR',
    AanbiederMentor = 'AANBIEDER_MENTOR',
    AanbiederVolunteer = 'AANBIEDER_VOLUNTEER',
    TaalhuisCoordinator = 'TAALHUIS_COORDINATOR',
    TaalhuisEmployee = 'TAALHUIS_EMPLOYEE',
}

export type UserType = {
    __typename?: 'UserType'
    id: Scalars['String']
    username: Scalars['String']
}
