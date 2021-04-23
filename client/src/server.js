const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    # Exposes a URL that specifies the behaviour of this scalar.
    directive @specifiedBy(
        # The URL that specifies the behaviour of this scalar.
        url: String!
    ) on SCALAR
    type ProviderAddressType {
        street: String!
        houseNumber: String!
        houseNumberSuffix: String
        postalCode: String!
        locality: String!
    }

    input ProviderEmployeeAddressInputType {
        street: String
        houseNumber: String
        houseNumberSuffix: String
        postalCode: String
        locality: String
    }

    type ProviderEmployeeAddressType {
        street: String
        houseNumber: String
        houseNumberSuffix: String
        postalCode: String
        locality: String
    }

    type ProviderEmployeeAvailabilityDaysType {
        monday: ProviderEmployeeAvailabilityDayType!
        tuesday: ProviderEmployeeAvailabilityDayType!
        wednesday: ProviderEmployeeAvailabilityDayType!
        thursday: ProviderEmployeeAvailabilityDayType!
        friday: ProviderEmployeeAvailabilityDayType!
        saturday: ProviderEmployeeAvailabilityDayType!
        sunday: ProviderEmployeeAvailabilityDayType!
    }

    type ProviderEmployeeAvailabilityDayType {
        morning: Boolean!
        afternoon: Boolean!
        evening: Boolean!
    }

    enum ProviderEmployeeContactPreferenceEnum {
        PHONECALL
        WHATSAPP
        EMAIL
        OTHER
    }

    enum ProviderEmployeeCurrentEducationEnum {
        YES
        NO
        NO_BUT_DID_FOLLOW
    }

    type ProviderEmployeeCurrentEducationNoButDidFollowType {
        dateUntil: String
        level: String
        gotCertificate: Boolean
    }

    type ProviderEmployeeCurrentEducationYesType {
        dateSince: String
        name: String
        doesProvideCertificate: Boolean
    }

    type ProviderEmployeeDocumentDownloadType {
        base64data: String!
    }

    type ProviderEmployeeDocumentType {
        id: String!
        filename: String!
        dateCreated: String!
    }

    enum ProviderEmployeeGenderEnum {
        MALE
        FEMALE
        X
    }

    enum ProviderEmployeeProfessionalismEnum {
        PROFESSIONAL
        VOLUNTEER
        BOTH
    }

    enum ProviderEmployeeTargetGroupPreferenceEnum {
        NT1
        NT2
    }

    type ProviderEmployeeType {
        userId: String!
        dateCreated: String!
        dateModified: String!
        userRoles: [ProviderUserRoleType!]!
        givenName: String!
        additionalName: String
        familyName: String!
        telephone: String
        availability: ProviderEmployeeAvailabilityDaysType
        availabilityNotes: String
        email: String!
        gender: ProviderEmployeeGenderEnum
        dateOfBirth: String
        address: ProviderEmployeeAddressType
        contactTelephone: String
        contactPreference: ProviderEmployeeContactPreferenceEnum
        contactPreferenceOther: String
        targetGroupPreference: [ProviderEmployeeTargetGroupPreferenceEnum!]
        volunteringPreference: String
        gotHereVia: String
        hasExperienceWithTargetGroup: Boolean
        experienceWithTargetGroupYesReason: Boolean
        currentEducation: ProviderEmployeeCurrentEducationEnum
        currentEducationYes: ProviderEmployeeCurrentEducationYesType
        currentEdicationNoButDidFollow: ProviderEmployeeCurrentEducationNoButDidFollowType
        doesCurrentlyFollowCourse: Boolean
        currentlyFollowingCourseName: String
        currentlyFollowingCourseInstitute: String
        currentlyFollowingCourseTeacherProfessionalism: ProviderEmployeeProfessionalismEnum
        currentlyFollowingCourseCourseProfessionalism: ProviderEmployeeProfessionalismEnum
        doesCurrentlyFollowingCourseProvideCertificate: Boolean
        otherRelevantCertificates: String
        isVOGChecked: Boolean
    }

    type ProviderType {
        id: String!
        name: String!
        address: ProviderAddressType
        email: String
        telephone: String
        type: String
    }

    type ProviderUserRoleType {
        id: String!
        name: UserRoleEnum!
    }

    input AddOrRemoveMentorToParticipationInputType {
        participationId: String!
        providerEmployeeId: String!
    }

    input AddOrRemoveParticipationToGroupInputType {
        participationId: String!
        groupId: String!
    }

    type BiscEmployeeType {
        id: String!
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String
        dateCreated: String!
        dateModified: String!
    }

    type ContextUserType {
        id: String!
        username: String!
        givenName: String!
        additionalName: String
        familyName: String!
        userEnvironment: UserEnvironmentEnum!
        organizationId: String
        organizationName: String
        dateCreated: String!
        dateModified: String!
        userRoles: [LanguageHouseUserRoleType!]!
    }

    input CreateProviderAddressInputType {
        street: String!
        houseNumber: String!
        houseNumberSuffix: String
        postalCode: String!
        locality: String!
    }

    input CreateProviderEmployeeAvailabilityDayInputType {
        morning: Boolean!
        afternoon: Boolean!
        evening: Boolean!
    }

    input CreateProviderEmployeeAvailabilityInputType {
        monday: CreateProviderEmployeeAvailabilityDayInputType!
        tuesday: CreateProviderEmployeeAvailabilityDayInputType!
        wednesday: CreateProviderEmployeeAvailabilityDayInputType!
        thursday: CreateProviderEmployeeAvailabilityDayInputType!
        friday: CreateProviderEmployeeAvailabilityDayInputType!
        saturday: CreateProviderEmployeeAvailabilityDayInputType!
        sunday: CreateProviderEmployeeAvailabilityDayInputType!
    }

    input CreateProviderEmployeeCurrentEducationNoButDidFollowInputType {
        dateUntil: String
        level: String
        gotCertificate: Boolean
    }

    input CreateProviderEmployeeCurrentEducationYesInputType {
        dateSince: String
        name: String
        doesProvideCertificate: Boolean
    }

    input CreateProviderEmployeeDocumentInputType {
        providerEmployeeId: String!
        filename: String!
        base64data: String!
    }

    input CreateProviderEmployeeInputType {
        givenName: String!
        additionalName: String
        familyName: String!
        telephone: String
        availability: CreateProviderEmployeeAvailabilityInputType
        availabilityNotes: String
        email: String!
        userGroupIds: [String!]!
        gender: ProviderEmployeeGenderEnum
        dateOfBirth: String
        address: ProviderEmployeeAddressInputType
        contactTelephone: String
        contactPreference: ProviderEmployeeContactPreferenceEnum
        contactPreferenceOther: String
        targetGroupPreference: [ProviderEmployeeTargetGroupPreferenceEnum!]
        volunteringPreference: String
        gotHereVia: String
        hasExperienceWithTargetGroup: Boolean
        experienceWithTargetGroupYesReason: Boolean
        currentEducation: ProviderEmployeeCurrentEducationEnum
        currentEducationYes: CreateProviderEmployeeCurrentEducationYesInputType
        currentEdicationNoButDidFollow: CreateProviderEmployeeCurrentEducationNoButDidFollowInputType
        doesCurrentlyFollowCourse: Boolean
        currentlyFollowingCourseName: String
        currentlyFollowingCourseInstitute: String
        currentlyFollowingCourseTeacherProfessionalism: ProviderEmployeeProfessionalismEnum
        currentlyFollowingCourseCourseProfessionalism: ProviderEmployeeProfessionalismEnum
        doesCurrentlyFollowingCourseProvideCertificate: Boolean
        otherRelevantCertificates: String
        isVOGChecked: Boolean
        providerId: String!
    }

    input CreateBiscEmployeeInputType {
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String
    }

    input CreateGroupAvailabilityDayInputType {
        morning: Boolean!
        afternoon: Boolean!
        evening: Boolean!
    }

    input CreateGroupAvailabilityInputType {
        monday: CreateGroupAvailabilityDayInputType!
        tuesday: CreateGroupAvailabilityDayInputType!
        wednesday: CreateGroupAvailabilityDayInputType!
        thursday: CreateGroupAvailabilityDayInputType!
        friday: CreateGroupAvailabilityDayInputType!
        saturday: CreateGroupAvailabilityDayInputType!
        sunday: CreateGroupAvailabilityDayInputType!
    }

    input CreateGroupInputType {
        providerId: String!
        name: String!
        typeCourse: GroupTypeCourseEnum!
        outComesGoal: String!
        outComesTopic: LearningNeedTopicEnum!
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum!
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum!
        outComesLevelOther: String
        detailsIsFormal: Boolean!
        detailsTotalClassHours: Int!
        detailsCertificateWillBeAwarded: Boolean!
        detailsStartDate: String
        detailsEndDate: String
        availability: CreateGroupAvailabilityInputType
        availabilityNotes: String
        generalLocation: String!
        generalParticipantsMin: Int
        generalParticipantsMax: Int
        generalEvaluation: String
        providerEmployeeIds: [String!]
    }

    input CreateLearningNeedInputType {
        studentId: String!
        learningNeedDescription: String!
        learningNeedMotivation: String!
        desiredOutComesGoal: String!
        desiredOutComesTopic: LearningNeedTopicEnum!
        desiredOutComesTopicOther: String
        desiredOutComesApplication: LearningNeedApplicationEnum!
        desiredOutComesApplicationOther: String
        desiredOutComesLevel: LearningNeedLevelEnum!
        desiredOutComesLevelOther: String
        offerDesiredOffer: String!
        offerAdvisedOffer: String!
        offerDifference: LearningNeedOfferDifferenceEnum!
        offerDifferenceOther: String
        offerEngagements: String
    }

    input CreateParticipationInputType {
        providerId: String
        providerName: String
        providerNote: String
        offerName: String
        offerCourse: ParticipationOfferCourseEnum
        outComesGoal: String
        outComesTopic: LearningNeedTopicEnum
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum
        outComesLevelOther: String
        detailsIsFormal: Boolean
        detailsGroupFormation: ParticipationGroupFormationEnum
        detailsTotalClassHours: Float
        detailsCertificateWillBeAwarded: Boolean
        detailsStartDate: DateTime
        detailsEndDate: DateTime
        detailsEngagements: String
        learningNeedId: String!
    }

    input CreateStudentAvailabilityDayInputType {
        morning: Boolean!
        afternoon: Boolean!
        evening: Boolean!
    }

    input CreateStudentAvailabilityDaysInputType {
        monday: CreateStudentAvailabilityDayInputType!
        tuesday: CreateStudentAvailabilityDayInputType!
        wednesday: CreateStudentAvailabilityDayInputType!
        thursday: CreateStudentAvailabilityDayInputType!
        friday: CreateStudentAvailabilityDayInputType!
        saturday: CreateStudentAvailabilityDayInputType!
        sunday: CreateStudentAvailabilityDayInputType!
    }

    input CreateStudentAvailabilityInputType {
        availability: CreateStudentAvailabilityDaysInputType
        availabilityNotes: String
    }

    input CreateStudentBackgroundInputType {
        foundVia: StudentFoundViaEnum
        foundViaOther: String
        wentToLanguageHouseBefore: Boolean
        wentToLanguageHouseBeforeReason: String
        wentToLanguageHouseBeforeYear: Float
        network: [StudentNetworkEnum!]
        participationLadder: Int
    }

    input CreateStudentCivicIntegrationInputType {
        civicIntegrationRequirement: StudentCivicIntegrationRequirementEnum
        civicIntegrationRequirementReason: StudentCivicIntegrationRequirementReasonEnum
        civicIntegrationRequirementFinishDate: String
    }

    input CreateStudentContactInputType {
        street: String
        postalCode: String
        locality: String
        houseNumber: String
        houseNumberSuffix: String
        email: String
        telephone: String
        contactPersonTelephone: String
        contactPreference: StudentContactPreferenceEnum
        contactPreferenceOther: String
    }

    input CreateStudentCourseInputType {
        isFollowingCourseRightNow: Boolean
        courseName: String
        courseTeacher: StudentFollowingCourseTeacherEnum
        courseGroup: StudentFollowingCourseGroupEnum
        amountOfHours: Int
        doesCourseProvideCertificate: Boolean
    }

    input CreateStudentDocumentInputType {
        studentId: String!
        filename: String!
        base64data: String!
    }

    input CreateStudentDossierEventInputType {
        studentId: String!
        event: StudentDossierEventEnum!
        eventDate: String!
        eventDescription: String!
    }

    input CreateStudentDutchNTInputType {
        dutchNTLevel: StudentDutchNTLevelEnum
        inNetherlandsSinceYear: Float
        languageInDailyLife: String
        knowsLatinAlphabet: Boolean
        lastKnownLevel: StudentDutchLastKnownLevelEnum
    }

    input CreateStudentEducationInputType {
        lastFollowedEducation: StudentLastFollowedEducationEnum
        didGraduate: Boolean
        followingEducationRightNow: StudentFollowingEducationRightNowEnum
        followingEducationRightNowYesStartDate: String
        followingEducationRightNowYesEndDate: String
        followingEducationRightNowYesLevel: StudentFollowingEducationRightNowLevelEnum
        followingEducationRightNowYesInstitute: String
        followingEducationRightNowYesProvidesCertificate: Boolean
        followingEducationRightNowNoEndDate: String
        followingEducationRightNowNoLevel: String
        followingEducationRightNowNoGotCertificate: Boolean
    }

    input CreateStudentGeneralInputType {
        countryOfOrigin: String
        nativeLanguage: String
        otherLanguages: String
        familyComposition: [StudentFamilyCompositionEnum!]
        childrenCount: Int
        childrenDatesOfBirth: String
    }

    input CreateStudentInputType {
        civicIntegrationDetails: CreateStudentCivicIntegrationInputType
        personDetails: CreateStudentPersonInputType!
        contactDetails: CreateStudentContactInputType
        generalDetails: CreateStudentGeneralInputType
        referrerDetails: CreateStudentReferrerInputType
        backgroundDetails: CreateStudentBackgroundInputType
        dutchNTDetails: CreateStudentDutchNTInputType
        speakingLevel: StudentSpeakingLevelEnum
        educationDetails: CreateStudentEducationInputType
        courseDetails: CreateStudentCourseInputType
        jobDetails: CreateStudentJobInputType
        motivationDetails: CreateStudentMotivationInputType
        availabilityDetails: CreateStudentAvailabilityInputType
        readingTestResult: StudentReadingTestResultEnum
        writingTestResult: StudentWritingTestResultEnum
        permissionDetails: CreateStudentPermissionInputType!
        languageHouseId: String!
    }

    input CreateStudentJobInputType {
        trainedForJob: String
        lastJob: String
        dayTimeActivities: [StudentJobDaytimeActivitiesEnum!]
        dayTimeActivitiesOther: String
    }

    input CreateStudentMotivationInputType {
        desiredSkills: [StudentMotivationDesiredSkillsEnum!]
        desiredSkillsOther: String
        hasTriedThisBefore: Boolean
        hasTriedThisBeforeExplanation: String
        whyWantTheseSkills: String
        whyWantThisNow: String
        desiredLearningMethod: [StudentMotivationDesiredLearningMethodsEnum!]
        remarks: String
    }

    input CreateStudentPermissionInputType {
        didSignPermissionForm: Boolean!
        hasPermissionToShareDataWithProviders: Boolean!
        hasPermissionToShareDataWithLibraries: Boolean!
        hasPermissionToSendInformationAboutLibraries: Boolean!
    }

    input CreateStudentPersonInputType {
        givenName: String!
        additionalName: String
        familyName: String!
        gender: StudentGenderEnum
        dateOfBirth: String
    }

    input CreateStudentReferrerInputType {
        referringOrganization: StudentReferringOrganizationEnum
        referringOrganizationOther: String
        email: String
    }

    input CreateLanguageHouseAddressInputType {
        street: String!
        houseNumber: String!
        houseNumberSuffix: String
        postalCode: String!
        locality: String!
    }

    input CreateLanguageHouseEmployeeInputType {
        languageHouseId: String!
        userGroupId: String!
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String
    }

    input CreateTestResultInputType {
        participationId: String!
        outComesGoal: String!
        outComesTopic: LearningNeedTopicEnum!
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum!
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum!
        outComesLevelOther: String
        examUsedExam: String!
        examDate: String!
        examMemo: String
    }

    # A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
    scalar DateTime

    input DownloadDesiredLearningOutcomesReportInputType {
        languageHouseId: String!
        dateFrom: String
        dateUntil: String
    }

    input DownloadParticipantsReportInputType {
        languageHouseId: String!
        dateFrom: String
        dateUntil: String
    }

    type DownloadReportType {
        filename: String!
        base64data: String!
    }

    input DownloadVolunteersReportInputType {
        providerId: String!
        dateFrom: String
        dateUntil: String
    }

    type GroupAvailabilityDaysType {
        monday: GroupAvailabilityDayType!
        tuesday: GroupAvailabilityDayType!
        wednesday: GroupAvailabilityDayType!
        thursday: GroupAvailabilityDayType!
        friday: GroupAvailabilityDayType!
        saturday: GroupAvailabilityDayType!
        sunday: GroupAvailabilityDayType!
    }

    type GroupAvailabilityDayType {
        morning: Boolean!
        afternoon: Boolean!
        evening: Boolean!
    }

    type GroupType {
        id: String!
        name: String!
        providerName: String!
        typeCourse: GroupTypeCourseEnum!
        outComesGoal: String!
        outComesTopic: LearningNeedTopicEnum!
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum!
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum!
        outComesLevelOther: String
        detailsIsFormal: Boolean!
        detailsTotalClassHours: Int!
        detailsCertificateWillBeAwarded: Boolean!
        detailsStartDate: String
        detailsEndDate: String
        availability: GroupAvailabilityDaysType
        availabilityNotes: String
        generalLocation: String!
        generalParticipantsMin: Int
        generalParticipantsMax: Int
        generalEvaluation: String
        providerEmployees: [ProviderEmployeeType!]
    }

    enum GroupTypeCourseEnum {
        LANGUAGE
        MATH
        DIGITAL
        OTHER
    }

    enum LearningNeedApplicationEnum {
        FAMILY_AND_PARENTING
        LABOR_MARKET_AND_WORK
        HEALTH_AND_WELLBEING
        ADMINISTRATION_AND_FINANCE
        HOUSING_AND_NEIGHBORHOOD
        SELFRELIANCE
        OTHER
    }

    enum LearningNeedLevelEnum {
        INFLOW
        NLQF1
        NLQF2
        NLQF3
        NLQF4
        OTHER
    }

    enum LearningNeedOfferDifferenceEnum {
        NO
        YES_DISTANCE
        YES_WAITINGLIST
        YES_OTHER
    }

    enum LearningNeedTopicEnum {
        DUTCH_READING
        DUTCH_WRITING
        MATH_NUMBERS
        MATH_PROPORTION
        MATH_GEOMETRY
        MATH_LINKS
        DIGITAL_USING_ICT_SYSTEMS
        DIGITAL_SEARCHING_INFORMATION
        DIGITAL_PROCESSING_INFORMATION
        DIGITAL_COMMUNICATION
        KNOWLEDGE
        SKILLS
        ATTITUDE
        BEHAVIOUR
        OTHER
    }

    type LearningNeedType {
        id: String!
        learningNeedDescription: String!
        learningNeedMotivation: String!
        desiredOutComesGoal: String!
        desiredOutComesTopic: LearningNeedTopicEnum!
        desiredOutComesTopicOther: String
        desiredOutComesApplication: LearningNeedApplicationEnum!
        desiredOutComesApplicationOther: String
        desiredOutComesLevel: LearningNeedLevelEnum!
        desiredOutComesLevelOther: String
        offerDesiredOffer: String!
        offerAdvisedOffer: String!
        offerDifference: LearningNeedOfferDifferenceEnum!
        offerDifferenceOther: String
        offerEngagements: String
        participations: [ParticipationType!]!
    }

    type Mutation {
        login(username: String!, password: String!): RawReturnType!
        requestPasswordReset(email: String!): Boolean!
        resetPassword(email: String!, token: String!, password: String!): Boolean!
        changePassword(currentPassword: String!, newPassword: String!): Boolean!
        createLanguageHouse(
            address: CreateLanguageHouseAddressInputType
            name: String!
            email: String
            phoneNumber: String
        ): LanguageHouseType!
        updateLanguageHouse(
            id: String!
            address: UpdateLanguageHouseAddressInputType
            name: String
            email: String
            phoneNumber: String
        ): LanguageHouseType!
        deleteLanguageHouse(id: String!): Boolean!
        createLanguageHouseEmployee(input: CreateLanguageHouseEmployeeInputType!): LanguageHouseEmployeeType!
        deleteLanguageHouseEmployee(userId: String!): Boolean!
        updateLanguageHouseEmployee(input: UpdateLanguageHouseEmployeeInputType!): LanguageHouseEmployeeType!
        createProvider(
            address: CreateProviderAddressInputType
            name: String!
            email: String
            phoneNumber: String
        ): ProviderType!
        updateProvider(
            id: String!
            address: UpdateProviderAddressInputType
            name: String
            email: String
            phoneNumber: String
        ): ProviderType!
        deleteProvider(id: String!): Boolean!
        createProviderEmployee(input: CreateProviderEmployeeInputType!): ProviderEmployeeType!
        updateProviderEmployee(input: UpdateProviderEmployeeInputType!): ProviderEmployeeType!
        deleteProviderEmployee(userId: String!): Boolean!
        registerStudent(input: RegisterStudentInputType!): Boolean!
        deleteRegistration(studentId: String!): Boolean!
        acceptRegistration(studentId: String!): StudentType!
        createStudent(input: CreateStudentInputType!): StudentType!
        updateStudent(input: UpdateStudentInputType!): StudentType!
        createLearningNeed(input: CreateLearningNeedInputType!): LearningNeedType!
        updateLearningNeed(input: UpdateLearningNeedInputType!): LearningNeedType!
        deleteLearningNeed(learningNeedId: String!): Boolean!
        createParticipation(input: CreateParticipationInputType!): ParticipationType!
        createBiscEmployee(input: CreateBiscEmployeeInputType!): BiscEmployeeType!
        updateBiscEmployee(input: UpdateBiscEmployeeInputType!): BiscEmployeeType!
        deleteBiscEmployee(biscEmployeeId: String!): Boolean!
        downloadParticipantsReport(input: DownloadParticipantsReportInputType!): DownloadReportType!
        downloadDesiredLearningOutcomesReport(
            input: DownloadDesiredLearningOutcomesReportInputType!
        ): DownloadReportType!
        downloadVolunteersReport(input: DownloadVolunteersReportInputType!): DownloadReportType!
        createProviderEmployeeDocument(input: CreateProviderEmployeeDocumentInputType!): ProviderEmployeeDocumentType!
        downloadProviderEmployeeDocument(providerEmployeeDocumentId: String!): ProviderEmployeeDocumentDownloadType!
        deleteProviderEmployeeDocument(providerEmployeeDocumentId: String!): Boolean!
        createStudentDocument(input: CreateStudentDocumentInputType!): StudentDocumentType!
        downloadStudentDocument(studentDocumentId: String!): StudentDocumentDownloadType!
        deleteStudentDocument(studentDocumentId: String!): Boolean!
        createStudentDossierEvent(input: CreateStudentDossierEventInputType!): StudentDossierEventType!
        updateStudentDossierEvent(input: UpdateStudentDossierEventInputType!): StudentDossierEventType!
        deleteStudentDossierEvent(studentDossierEventId: String!): Boolean!
        deleteParticipation(participationId: String!): Boolean!
        updateParticipation(input: UpdateParticipationInputType!): ParticipationType!
        createTestResult(input: CreateTestResultInputType!): TestResultType!
        updateTestResult(input: UpdateTestResultInputType!): TestResultType!
        deleteTestResult(testResultId: String!): Boolean!
        createGroup(input: CreateGroupInputType!): GroupType!
        updateGroup(input: UpdateGroupInputType!): GroupType!
        addMentorToParticipation(input: AddOrRemoveMentorToParticipationInputType!): ProviderEmployeeType!
        removeMentorFromParticipation(input: AddOrRemoveMentorToParticipationInputType!): Boolean!
        addParticipationToGroup(input: AddOrRemoveParticipationToGroupInputType!): ParticipationType!
        updateGroupParticipation(input: UpdateGroupParticipationInputType!): ParticipationType!
        removeParticipationFromGroup(input: AddOrRemoveParticipationToGroupInputType!): Boolean!
    }

    enum ParticipantStatusEnum {
        pending
        accepted
    }

    enum ParticipationGroupFormationEnum {
        INDIVIDUALLY
        IN_A_GROUP
    }

    enum ParticipationOfferCourseEnum {
        LANGUAGE
        MATH
        DIGITAL
        OTHER
    }

    enum ParticipationPresenceEndParticipationReasonEnum {
        MOVED
        JOB
        ILLNESS
        DEATH
        COMPLETED_SUCCESSFULLY
        FAMILY_CIRCUMSTANCES
        DOES_NOT_MEET_EXPECTATIONS
        OTHER
    }

    enum ParticipationStatusEnum {
        ACTIVE
        COMPLETED
        REFERRED
    }

    type ParticipationType {
        id: String!
        status: ParticipationStatusEnum!
        providerId: String
        providerName: String
        providerNote: String
        offerName: String
        offerCourse: ParticipationOfferCourseEnum
        outComesGoal: String
        outComesTopic: LearningNeedTopicEnum
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum
        outComesLevelOther: String
        detailsIsFormal: Boolean
        detailsGroupFormation: ParticipationGroupFormationEnum
        detailsTotalClassHours: Float
        detailsCertificateWillBeAwarded: Boolean
        detailsStartDate: DateTime
        detailsEndDate: DateTime
        detailsEngagements: String
    }

    type Query {
        currentUser: ContextUserType!
        languageHouses: [LanguageHouseType!]!
        languageHouse(languageHouseId: String!): LanguageHouseType!
        userRolesByLanguageHouseId(languageHouseId: String!): [LanguageHouseUserRoleType!]!
        languageHouseEmployees(languageHouseId: String!): [LanguageHouseEmployeeType!]!
        languageHouseEmployee(userId: String!): LanguageHouseEmployeeType!
        providers: [ProviderType!]!
        provider(id: String!): ProviderType!
        providerEmployees(providerId: String!): [ProviderEmployeeType!]!
        providerEmployee(userId: String!): ProviderEmployeeType!
        userRolesByProviderId(providerId: String!): [ProviderUserRoleType!]!
        registrations(languageHouseId: String!): [StudentType!]!
        registration(studentId: String!): StudentType!
        students(languageHouseId: String!): [StudentType!]!
        student(studentId: String!): StudentType!
        learningNeeds(studentId: String!): [LearningNeedType!]!
        learningNeed(learningNeedId: String!): LearningNeedType!
        biscEmployee(biscEmployeeId: String!): BiscEmployeeType!
        biscEmployees: [BiscEmployeeType!]!
        providerEmployeeDocument(providerEmployeeDocumentId: String!): ProviderEmployeeDocumentType!
        providerEmployeeDocuments(providerEmployeeId: String!): [ProviderEmployeeDocumentType!]!
        studentDocument(studentDocumentId: String!): StudentDocumentType!
        studentDocuments(studentId: String!): [StudentDocumentType!]!
        studentDossierEvent(studentDossierEventId: String!): StudentDossierEventType!
        studentDossierEvents(studentId: String!): [StudentDossierEventType!]!
        participations(learningNeedId: String!): [ParticipationType!]!
        participation(participationId: String!): ParticipationType!
        testResults(participationId: String!): [TestResultType!]!
        testResult(testResultId: String!): TestResultType!
        providerEmployeeMentees(anbiederEmployeeId: String!): [StudentType!]!
        group(groupId: String!): GroupType!
        activeGroups(providerId: String!): [GroupType!]!
        completedGroups(providerId: String!): [GroupType!]!
        futureGroups(providerId: String!): [GroupType!]!
        groupStudents(groupId: String!): [StudentType!]!
        newReferredStudents(providerId: String!): [StudentType!]!
        activeStudents(providerId: String!): [StudentType!]!
        completedStudents(providerId: String!): [StudentType!]!
    }

    type RawReturnType {
        accessToken: String!
    }

    input RegisterStudentAddresInputType {
        street: String
        postalCode: String
        locality: String
        houseNumber: String
        houseNumberSuffix: String
    }

    input RegisterStudentInputType {
        languageHouseId: String!
        student: RegisterStudentStudentInputType!
        registrar: RegisterStudentRegistrarInputType!
        memo: String
    }

    input RegisterStudentRegistrarInputType {
        organisationName: String!
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String!
    }

    input RegisterStudentStudentInputType {
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String!
        address: RegisterStudentAddresInputType
    }

    type StudentAvailabilityDaysType {
        monday: StudentAvailabilityDayType!
        tuesday: StudentAvailabilityDayType!
        wednesday: StudentAvailabilityDayType!
        thursday: StudentAvailabilityDayType!
        friday: StudentAvailabilityDayType!
        saturday: StudentAvailabilityDayType!
        sunday: StudentAvailabilityDayType!
    }

    type StudentAvailabilityDayType {
        morning: Boolean!
        afternoon: Boolean!
        evening: Boolean!
    }

    type StudentAvailabilityType {
        availability: StudentAvailabilityDaysType
        availabilityNotes: String
    }

    type StudentBackgroundType {
        foundVia: StudentFoundViaEnum
        foundViaOther: String
        wentToLanguageHouseBefore: Boolean
        wentToLanguageHouseBeforeReason: String
        wentToLanguageHouseBeforeYear: Float
        network: [StudentNetworkEnum!]
        participationLadder: Int
    }

    enum StudentCivicIntegrationRequirementEnum {
        NO
        YES
        CURRENTLY_WORKING_ON_INTEGRATION
    }

    enum StudentCivicIntegrationRequirementReasonEnum {
        FINISHED
        FROM_EU_COUNTRY
        EXEMPTED_OR_ZROUTE
    }

    type StudentCivicIntegrationType {
        civicIntegrationRequirement: StudentCivicIntegrationRequirementEnum
        civicIntegrationRequirementReason: StudentCivicIntegrationRequirementReasonEnum
        civicIntegrationRequirementFinishDate: String
    }

    enum StudentContactPreferenceEnum {
        PHONECALL
        WHATSAPP
        EMAIL
        OTHER
    }

    type StudentContactType {
        street: String
        postalCode: String
        locality: String
        houseNumber: String
        houseNumberSuffix: String
        email: String
        telephone: String
        contactPersonTelephone: String
        contactPreference: StudentContactPreferenceEnum
        contactPreferenceOther: String
    }

    type StudentCourseType {
        isFollowingCourseRightNow: Boolean
        courseName: String
        courseTeacher: StudentFollowingCourseTeacherEnum
        courseGroup: StudentFollowingCourseGroupEnum
        amountOfHours: Int
        doesCourseProvideCertificate: Boolean
    }

    type StudentDocumentDownloadType {
        base64data: String!
    }

    type StudentDocumentType {
        id: String!
        filename: String!
        dateCreated: String!
    }

    enum StudentDossierEventEnum {
        FINAL_TALK
        REMARK
        FOLLOW_UP_TALK
        INFO_FOR_STORYTELLING
        INTAKE
    }

    type StudentDossierEventType {
        id: String!
        event: StudentDossierEventEnum!
        eventDate: String!
        eventDescription: String!
        createdByProviderEmployee: ProviderEmployeeType!
    }

    enum StudentDutchLastKnownLevelEnum {
        A0
        A1
        A2
        B1
        B2
        C1
        C2
        UNKNOWN
    }

    enum StudentDutchNTLevelEnum {
        NT1
        NT2
    }

    type StudentDutchNTType {
        dutchNTLevel: StudentDutchNTLevelEnum
        inNetherlandsSinceYear: Float
        languageInDailyLife: String
        knowsLatinAlphabet: Boolean
        lastKnownLevel: StudentDutchLastKnownLevelEnum
    }

    type StudentEducationType {
        lastFollowedEducation: StudentLastFollowedEducationEnum
        didGraduate: Boolean
        followingEducationRightNow: StudentFollowingEducationRightNowEnum
        followingEducationRightNowYesStartDate: String
        followingEducationRightNowYesEndDate: String
        followingEducationRightNowYesLevel: StudentFollowingEducationRightNowLevelEnum
        followingEducationRightNowYesInstitute: String
        followingEducationRightNowYesProvidesCertificate: Boolean
        followingEducationRightNowNoEndDate: String
        followingEducationRightNowNoLevel: String
        followingEducationRightNowNoGotCertificate: Boolean
    }

    enum StudentFamilyCompositionEnum {
        MARRIED_PARTNER
        SINGLE
        DIVORCED
        WIDOW
    }

    enum StudentFollowingCourseGroupEnum {
        INDIVIDUALLY
        GROUP
    }

    enum StudentFollowingCourseTeacherEnum {
        PROFESSIONAL
        VOLUNTEER
        BOTH
    }

    enum StudentFollowingEducationRightNowEnum {
        YES
        NO
        NO_BUT_DID_EARLIER
    }

    enum StudentFollowingEducationRightNowLevelEnum {
        LANGUAGE_COURSE
        BO
        HBO
        WO
        OTHER
    }

    enum StudentFoundViaEnum {
        VOLUNTEER_CENTER
        LIBRARY_WEBSITE
        SOCIAL_MEDIA
        NEWSPAPER
        VIA_VIA
        OTHER
    }

    enum StudentGenderEnum {
        MALE
        FEMALE
        X
    }

    type StudentGeneralType {
        countryOfOrigin: String
        nativeLanguage: String
        otherLanguages: String
        familyComposition: [StudentFamilyCompositionEnum!]
        childrenCount: Int
        childrenDatesOfBirth: String
    }

    enum StudentJobDaytimeActivitiesEnum {
        SEARCHING_FOR_JOB
        RE_INTEGRATION
        SCHOOL
        VOLUNTEER_JOB
        JOB
        OTHER
    }

    type StudentJobType {
        trainedForJob: String
        lastJob: String
        dayTimeActivities: [StudentJobDaytimeActivitiesEnum!]
        dayTimeActivitiesOther: String
    }

    enum StudentLastFollowedEducationEnum {
        NO_EDUCATION
        SOME_YEARS_PO
        PO
        VO
        MBO
        HBO
        UNIVERSITY
    }

    enum StudentMotivationDesiredLearningMethodsEnum {
        IN_A_GROUP
        ONE_ON_ONE
        HOME_ENVIRONMENT
        IN_LIBRARY_OR_OTHER
        ONLINE
    }

    enum StudentMotivationDesiredSkillsEnum {
        KLIKTIK
        USING_WHATSAPP
        USING_SKYPE
        DEVICE_FUNCTIONALITIES
        DIGITAL_GOVERNMENT
        RESERVE_BOOKS_IN_LIBRARY
        ADS_ON_MARKTPLAATS
        READ_FOR_CHILDREN
        UNDERSTAND_PRESCRIPTIONS
        WRITE_APPLICATION_LETTER
        WRITE_POSTCARD_FOR_FAMILY
        DO_ADMINISTRATION
        CALCULATIONS_FOR_RECIPES
        OTHER
    }

    type StudentMotivationType {
        desiredSkills: [StudentMotivationDesiredSkillsEnum!]
        desiredSkillsOther: String
        hasTriedThisBefore: Boolean
        hasTriedThisBeforeExplanation: String
        whyWantTheseSkills: String
        whyWantThisNow: String
        desiredLearningMethod: [StudentMotivationDesiredLearningMethodsEnum!]
        remarks: String
    }

    enum StudentNetworkEnum {
        HOUSEHOLD_MEMBERS
        NEIGHBORS
        FAMILY_MEMBERS
        AID_WORKERS
        FRIENDS_ACQUAINTANCES
        PEOPLE_AT_MOSQUE_CHURCH
        ACQUAINTANCES_SPEAKING_OWN_LANGUAGE
        ACQUAINTANCES_SPEAKING_DUTCH
    }

    type StudentPermissionType {
        didSignPermissionForm: Boolean!
        hasPermissionToShareDataWithProviders: Boolean!
        hasPermissionToShareDataWithLibraries: Boolean!
        hasPermissionToSendInformationAboutLibraries: Boolean!
    }

    type StudentPersonType {
        givenName: String!
        additionalName: String
        familyName: String!
        gender: StudentGenderEnum
        dateOfBirth: String
    }

    enum StudentReadingTestResultEnum {
        CAN_NOT_READ
        A0
        A1
        A2
        B1
        B2
        C1
        C2
    }

    type StudentReferrerType {
        referringOrganization: StudentReferringOrganizationEnum
        referringOrganizationOther: String
        email: String
    }

    enum StudentReferringOrganizationEnum {
        UWV
        SOCIAL_SERVICE
        LIBRARY
        WELFARE_WORK
        NEIGHBORHOOD_TEAM
        VOLUNTEER_ORGANIZATION
        LANGUAGE_PROVIDER
        OTHER
    }

    type StudentRegistrarType {
        id: String!
        organisationName: String!
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String!
    }

    enum StudentSpeakingLevelEnum {
        BEGINNER
        REASONABLE
        ADVANCED
    }

    type StudentType {
        id: String!
        dateCreated: String!
        status: ParticipantStatusEnum!
        memo: String
        registrar: StudentRegistrarType
        civicIntegrationDetails: StudentCivicIntegrationType
        personDetails: StudentPersonType!
        contactDetails: StudentContactType
        generalDetails: StudentGeneralType
        referrerDetails: StudentReferrerType
        backgroundDetails: StudentBackgroundType
        dutchNTDetails: StudentDutchNTType
        speakingLevel: StudentSpeakingLevelEnum
        educationDetails: StudentEducationType
        courseDetails: StudentCourseType
        jobDetails: StudentJobType
        motivationDetails: StudentMotivationType
        availabilityDetails: StudentAvailabilityType
        readingTestResult: StudentReadingTestResultEnum
        writingTestResult: StudentWritingTestResultEnum
        permissionDetails: StudentPermissionType!
    }

    enum StudentWritingTestResultEnum {
        CAN_NOT_WRITE
        WRITE_NAW_DETAILS
        WRITE_SIMPLE_TEXTS
        WRITE_SIMPLE_LETTERS
    }

    type LanguageHouseAddressType {
        street: String!
        houseNumber: String!
        houseNumberSuffix: String
        postalCode: String!
        locality: String!
    }

    type LanguageHouseEmployeeType {
        id: String!
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String
        dateCreated: String!
        dateModified: String!
        userRoles: [LanguageHouseUserRoleType!]!
    }

    type LanguageHouseType {
        id: String!
        name: String!
        address: LanguageHouseAddressType
        email: String
        telephone: String
        type: String
    }

    type LanguageHouseUserRoleType {
        id: String!
        name: UserRoleEnum!
    }

    type TestResultType {
        id: String!
        outComesGoal: String
        outComesTopic: LearningNeedTopicEnum!
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum!
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum!
        outComesLevelOther: String
        examUsedExam: String!
        examDate: String!
        examMemo: String
        examResult: String
    }

    input UpdateProviderAddressInputType {
        street: String
        houseNumber: String
        houseNumberSuffix: String
        postalCode: String
        locality: String
    }

    input UpdateProviderEmployeeInputType {
        givenName: String!
        additionalName: String
        familyName: String!
        telephone: String
        availability: CreateProviderEmployeeAvailabilityInputType
        availabilityNotes: String
        email: String!
        userGroupIds: [String!]!
        gender: ProviderEmployeeGenderEnum
        dateOfBirth: String
        address: ProviderEmployeeAddressInputType
        contactTelephone: String
        contactPreference: ProviderEmployeeContactPreferenceEnum
        contactPreferenceOther: String
        targetGroupPreference: [ProviderEmployeeTargetGroupPreferenceEnum!]
        volunteringPreference: String
        gotHereVia: String
        hasExperienceWithTargetGroup: Boolean
        experienceWithTargetGroupYesReason: Boolean
        currentEducation: ProviderEmployeeCurrentEducationEnum
        currentEducationYes: CreateProviderEmployeeCurrentEducationYesInputType
        currentEdicationNoButDidFollow: CreateProviderEmployeeCurrentEducationNoButDidFollowInputType
        doesCurrentlyFollowCourse: Boolean
        currentlyFollowingCourseName: String
        currentlyFollowingCourseInstitute: String
        currentlyFollowingCourseTeacherProfessionalism: ProviderEmployeeProfessionalismEnum
        currentlyFollowingCourseCourseProfessionalism: ProviderEmployeeProfessionalismEnum
        doesCurrentlyFollowingCourseProvideCertificate: Boolean
        otherRelevantCertificates: String
        isVOGChecked: Boolean
        userId: String!
    }

    input UpdateBiscEmployeeInputType {
        biscEmployeeId: String!
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String
    }

    input UpdateGroupInputType {
        groupId: String!
        name: String!
        typeCourse: GroupTypeCourseEnum!
        outComesGoal: String!
        outComesTopic: LearningNeedTopicEnum!
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum!
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum!
        outComesLevelOther: String
        detailsIsFormal: Boolean!
        detailsTotalClassHours: Int!
        detailsCertificateWillBeAwarded: Boolean!
        detailsStartDate: String
        detailsEndDate: String
        availability: CreateGroupAvailabilityInputType
        availabilityNotes: String
        generalLocation: String!
        generalParticipantsMin: Int
        generalParticipantsMax: Int
        generalEvaluation: String
        providerEmployeeIds: [String!]
    }

    input UpdateGroupParticipationInputType {
        participationId: String!
        presenceEngagements: String
        presenceStartDate: DateTime
        presenceEndDate: DateTime
        presenceEndParticipationReason: ParticipationPresenceEndParticipationReasonEnum
    }

    input UpdateLearningNeedInputType {
        learningNeedId: String!
        learningNeedDescription: String!
        learningNeedMotivation: String!
        desiredOutComesGoal: String!
        desiredOutComesTopic: LearningNeedTopicEnum!
        desiredOutComesTopicOther: String
        desiredOutComesApplication: LearningNeedApplicationEnum!
        desiredOutComesApplicationOther: String
        desiredOutComesLevel: LearningNeedLevelEnum!
        desiredOutComesLevelOther: String
        offerDesiredOffer: String!
        offerAdvisedOffer: String!
        offerDifference: LearningNeedOfferDifferenceEnum!
        offerDifferenceOther: String
        offerEngagements: String
    }

    input UpdateParticipationInputType {
        providerId: String
        providerName: String
        providerNote: String
        offerName: String
        offerCourse: ParticipationOfferCourseEnum
        outComesGoal: String
        outComesTopic: LearningNeedTopicEnum
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum
        outComesLevelOther: String
        detailsIsFormal: Boolean
        detailsGroupFormation: ParticipationGroupFormationEnum
        detailsTotalClassHours: Float
        detailsCertificateWillBeAwarded: Boolean
        detailsStartDate: DateTime
        detailsEndDate: DateTime
        detailsEngagements: String
        participationId: String!
        presenceStartDate: DateTime
        presenceEndDate: DateTime
        presenceEndParticipationReason: ParticipationPresenceEndParticipationReasonEnum
    }

    input UpdateStudentDossierEventInputType {
        studentDossierEventId: String!
        event: StudentDossierEventEnum!
        eventDate: String!
        eventDescription: String!
    }

    input UpdateStudentInputType {
        civicIntegrationDetails: CreateStudentCivicIntegrationInputType
        personDetails: CreateStudentPersonInputType!
        contactDetails: CreateStudentContactInputType
        generalDetails: CreateStudentGeneralInputType
        referrerDetails: CreateStudentReferrerInputType
        backgroundDetails: CreateStudentBackgroundInputType
        dutchNTDetails: CreateStudentDutchNTInputType
        speakingLevel: StudentSpeakingLevelEnum
        educationDetails: CreateStudentEducationInputType
        courseDetails: CreateStudentCourseInputType
        jobDetails: CreateStudentJobInputType
        motivationDetails: CreateStudentMotivationInputType
        availabilityDetails: CreateStudentAvailabilityInputType
        readingTestResult: StudentReadingTestResultEnum
        writingTestResult: StudentWritingTestResultEnum
        permissionDetails: CreateStudentPermissionInputType!
        studentId: String!
    }

    input UpdateLanguageHouseAddressInputType {
        street: String
        houseNumber: String
        houseNumberSuffix: String
        postalCode: String
        locality: String
    }

    input UpdateLanguageHouseEmployeeInputType {
        userId: String!
        userGroupId: String!
        givenName: String!
        additionalName: String
        familyName: String!
        email: String!
        telephone: String
    }

    input UpdateTestResultInputType {
        testResultId: String!
        outComesGoal: String!
        outComesTopic: LearningNeedTopicEnum!
        outComesTopicOther: String
        outComesApplication: LearningNeedApplicationEnum!
        outComesApplicationOther: String
        outComesLevel: LearningNeedLevelEnum!
        outComesLevelOther: String
        examUsedExam: String!
        examDate: String!
        examMemo: String
    }

    enum UserEnvironmentEnum {
        BISC
        TAALHUIS
        AANBIEDER
    }

    enum UserRoleEnum {
        AANBIEDER_COORDINATOR
        AANBIEDER_MENTOR
        AANBIEDER_VOLUNTEER
        TAALHUIS_COORDINATOR
        TAALHUIS_EMPLOYEE
    }

    type UserType {
        id: String!
        username: String!
    }
`

const base64 =
    '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CmVuZG9iagoKOSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UcnVlVHlwZS9CYXNlRm9udC9CQUFBQUErQXJpYWwtQm9sZE1UCi9GaXJzdENoYXIgMAovTGFzdENoYXIgMTEKL1dpZHRoc1s3NTAgNzIyIDYxMCA4ODkgNTU2IDI3NyA2NjYgNjEwIDMzMyAyNzcgMjc3IDU1NiBdCi9Gb250RGVzY3JpcHRvciA3IDAgUgovVG9Vbmljb2RlIDggMCBSCj4+CmVuZG9iagoKMTAgMCBvYmoKPDwKL0YxIDkgMCBSCj4+CmVuZG9iagoKMTEgMCBvYmoKPDwvRm9udCAxMCAwIFIKL1Byb2NTZXRbL1BERi9UZXh0XT4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyAxMSAwIFIvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL0dyb3VwPDwvUy9UcmFuc3BhcmVuY3kvQ1MvRGV2aWNlUkdCL0kgdHJ1ZT4+L0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgoxMiAwIG9iago8PC9Db3VudCAxL0ZpcnN0IDEzIDAgUi9MYXN0IDEzIDAgUgo+PgplbmRvYmoKCjEzIDAgb2JqCjw8L1RpdGxlPEZFRkYwMDQ0MDA3NTAwNkQwMDZEMDA3OTAwMjAwMDUwMDA0NDAwNDYwMDIwMDA2NjAwNjkwMDZDMDA2NT4KL0Rlc3RbMSAwIFIvWFlaIDU2LjcgNzczLjMgMF0vUGFyZW50IDEyIDAgUj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgMTEgMCBSCi9NZWRpYUJveFsgMCAwIDU5NSA4NDIgXQovS2lkc1sgMSAwIFIgXQovQ291bnQgMT4+CmVuZG9iagoKMTQgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSCi9PdXRsaW5lcyAxMiAwIFIKPj4KZW5kb2JqCgoxNSAwIG9iago8PC9BdXRob3I8RkVGRjAwNDUwMDc2MDA2MTAwNkUwMDY3MDA2NTAwNkMwMDZGMDA3MzAwMjAwMDU2MDA2QzAwNjEwMDYzMDA2ODAwNkYwMDY3MDA2OTAwNjEwMDZFMDA2RTAwNjkwMDczPgovQ3JlYXRvcjxGRUZGMDA1NzAwNzIwMDY5MDA3NDAwNjUwMDcyPgovUHJvZHVjZXI8RkVGRjAwNEYwMDcwMDA2NTAwNkUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDJFMDA2RjAwNzIwMDY3MDAyMDAwMzIwMDJFMDAzMT4KL0NyZWF0aW9uRGF0ZShEOjIwMDcwMjIzMTc1NjM3KzAyJzAwJyk+PgplbmRvYmoKCnhyZWYKMCAxNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMTE5OTcgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMjI0IDAwMDAwIG4gCjAwMDAwMTIzMzAgMDAwMDAgbiAKMDAwMDAwMDI0NCAwMDAwMCBuIAowMDAwMDExMTU0IDAwMDAwIG4gCjAwMDAwMTExNzYgMDAwMDAgbiAKMDAwMDAxMTM2OCAwMDAwMCBuIAowMDAwMDExNzA5IDAwMDAwIG4gCjAwMDAwMTE5MTAgMDAwMDAgbiAKMDAwMDAxMTk0MyAwMDAwMCBuIAowMDAwMDEyMTQwIDAwMDAwIG4gCjAwMDAwMTIxOTYgMDAwMDAgbiAKMDAwMDAxMjQyOSAwMDAwMCBuIAowMDAwMDEyNDk0IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSAxNi9Sb290IDE0IDAgUgovSW5mbyAxNSAwIFIKL0lEIFsgPEY3RDc3QjNEMjJCOUY5MjgyOUQ0OUZGNUQ3OEI4RjI4Pgo8RjdENzdCM0QyMkI5RjkyODI5RDQ5RkY1RDc4QjhGMjg+IF0KPj4Kc3RhcnR4cmVmCjEyNzg3CiUlRU9GCg=='
const mocks = {
    Mutation: () => ({
        downloadProviderEmployeeDocument: () => ({ data: { base64data: base64 } }),
        downloadStudentDocument: () => ({ data: { base64data: base64 } }),
    }),
}
const server = new ApolloServer({
    typeDefs,
    mocks: mocks,
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
