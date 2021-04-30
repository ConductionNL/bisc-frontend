export enum ProviderEmployeeCurrentEducationEnum {
    Yes = 'YES',
    No = 'NO',
    NoButDidFollow = 'NO_BUT_DID_FOLLOW',
}

export enum ProviderEmployeeGenderEnum {
    Male = 'MALE',
    Female = 'FEMALE',
    X = 'X',
}

export enum ProviderEmployeeProfessionalismEnum {
    Professional = 'PROFESSIONAL',
    Volunteer = 'VOLUNTEER',
    Both = 'BOTH',
}

export enum ProviderEmployeeTargetGroupPreferenceEnum {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
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

export enum StudentContactPreferenceEnum {
    Phonecall = 'PHONECALL',
    Whatsapp = 'WHATSAPP',
    Email = 'EMAIL',
    Other = 'OTHER',
}

export enum StudentDossierEventEnum {
    FinalTalk = 'FINAL_TALK',
    Remark = 'REMARK',
    FollowUpTalk = 'FOLLOW_UP_TALK',
    InfoForStorytelling = 'INFO_FOR_STORYTELLING',
    Intake = 'INTAKE',
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

export enum StudentJobDaytimeActivitiesEnum {
    SearchingForJob = 'SEARCHING_FOR_JOB',
    ReIntegration = 'RE_INTEGRATION',
    School = 'SCHOOL',
    VolunteerJob = 'VOLUNTEER_JOB',
    Job = 'JOB',
    Other = 'OTHER',
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

export enum StudentSpeakingLevelEnum {
    Beginner = 'BEGINNER',
    Reasonable = 'REASONABLE',
    Advanced = 'ADVANCED',
}

export enum StudentWritingTestResultEnum {
    CanNotWrite = 'CAN_NOT_WRITE',
    WriteNawDetails = 'WRITE_NAW_DETAILS',
    WriteSimpleTexts = 'WRITE_SIMPLE_TEXTS',
    WriteSimpleLetters = 'WRITE_SIMPLE_LETTERS',
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
