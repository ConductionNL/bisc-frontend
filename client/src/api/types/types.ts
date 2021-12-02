interface BaseEntity {
    id: string
    '@dateCreated': string
    '@dateModified': string
}

export type Maybe<T> = T | null

export interface MutationError {
    data: MutationErrorField
    message: string
    path: string
    type: string
}

export interface PaginatedResult<T> {
    results: T[]
    limit: number
    page: number
    pages: number
    start: number
    total: number
}

export interface MutationErrorField {
    [key: string]: MutationErrorField | string
}

export enum OrganizationTypeEnum {
    Bisc = 'bisc',
    Taalhuis = 'taalhuis',
    Aanbieder = 'aanbieder',
}

export interface Telephone {
    id: string
    name: string
    telephone: string
    dateCreated: string
    dateModified: string
}

export interface Address {
    id: string
    name: string
    bagnummeraanduiding: null
    street: string
    houseNumber: string
    houseNumberSuffix: string
    postalCode: string
    region: null
    locality: string
    country: string
    postOfficeBoxNumber: null
    dateCreated: string
    dateModified: string
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    X = 'X',
}

export enum ContactPreference {
    Phonecall = 'PHONECALL',
    Whatsapp = 'WHATSAPP',
    Email = 'EMAIL',
    Other = 'OTHER',
}

export enum MaritalStatus {
    MarriedPartner = 'MARRIED_PARTNER',
    Single = 'SINGLE',
    Divorced = 'DIVORCED',
    Widow = 'WIDOW',
}

export enum Availability {
    MondayMorning = 'MONDAY_MORNING',
    MondayAfternoon = 'MONDAY_AFTERNOON',
    MondayEvening = 'MONDAY_EVENING',
    TuesdayMorning = 'TUESDAY_MORNING',
    TuesdayAfternoon = 'TUESDAY_AFTERNOON',
    TuesdayEvening = 'TUESDAY_EVENING',
    WednesdayMorning = 'WEDNESDAY_MORNING',
    WednesdayAfternoon = 'WEDNESDAY_AFTERNOON',
    WednesdayEvening = 'WEDNESDAY_EVENING',
    ThursdayMorning = 'THURSDAY_MORNING',
    ThursdayAfternoon = 'THURSDAY_AFTERNOON',
    ThursdayEvening = 'THURSDAY_EVENING',
    FridayMorning = 'FRIDAY_MORNING',
    FridayAfternoon = 'FRIDAY_AFTERNOON',
    FridayEvening = 'FRIDAY_EVENING',
    SaturdayMorning = 'SATURDAY_MORNING',
    SaturdayAfternoon = 'SATURDAY_AFTERNOON',
    SaturdayEvening = 'SATURDAY_EVENING',
    SundayMorning = 'SUNDAY_MORNING',
    SundayAfternoon = 'SUNDAY_AFTERNOON',
    SundayEvening = 'SUNDAY_EVENING',
}

export enum IntakeReferringOrganization {
    Uwv = 'UWV',
    SocialService = 'SOCIAL_SERVICE',
    Library = 'LIBRARY',
    WelfareWork = 'WELFARE_WORK',
    NeighborhoodTeam = 'NEIGHBORHOOD_TEAM',
    VolunteerOrganization = 'VOLUNTEER_ORGANIZATION',
    LanguageProvider = 'LANGUAGE_PROVIDER',
    Other = 'OTHER',
}

export enum IntakeFoundVia {
    VolunteerCenter = 'VOLUNTEER_CENTER',
    LibraryWebsite = 'LIBRARY_WEBSITE',
    SocialMedia = 'SOCIAL_MEDIA',
    Newspaper = 'NEWSPAPER',
    ViaVia = 'VIA_VIA',
    Other = 'OTHER',
}

export enum IntakeNetwork {
    HouseholdMembers = 'HOUSEHOLD_MEMBERS',
    Neighbors = 'NEIGHBORS',
    FamilyMembers = 'FAMILY_MEMBERS',
    AidWorkers = 'AID_WORKERS',
    FriendsAcquaintances = 'FRIENDS_ACQUAINTANCES',
    PeopleAtMosqueChurch = 'PEOPLE_AT_MOSQUE_CHURCH',
    AcquaintancesSpeakingOwnLanguage = 'ACQUAINTANCES_SPEAKING_OWN_LANGUAGE',
    AcquaintancesSpeakingDutch = 'ACQUAINTANCES_SPEAKING_DUTCH',
}

export enum IntakeParticipationLadder {
    One = '1 geïsoleerd',
    Two = '2 sociale contacten buiten huis',
    Three = '3 deelname georganiseerde activiteiten',
    Four = '4 vrijwilligers werk/maatschappelijke activering',
    Five = '5 betaald werk met ondersteuning',
    Six = '6 betaald werk',
}

export enum IntakeDayTimeActivities {
    SearchingForJob = 'SEARCHING_FOR_JOB',
    ReIntegration = 'RE_INTEGRATION',
    School = 'SCHOOL',
    VolunteerJob = 'VOLUNTEER_JOB',
    Job = 'JOB',
    Other = 'OTHER',
}

export enum DesiredSkills {
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

export enum DesiredLearningMethod {
    InAGroup = 'IN_A_GROUP',
    OneOnOne = 'ONE_ON_ONE',
    HomeEnvironment = 'HOME_ENVIRONMENT',
    InLibraryOrOther = 'IN_LIBRARY_OR_OTHER',
    Online = 'ONLINE',
}

export enum DutchNTType {
    Nt1 = 'NT1',
    Nt2 = 'NT2',
}

export enum DutchNT2Level {
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
    Unknown = 'UNKNOWN',
}

export enum SpeakingLevel {
    Beginner = 'BEGINNER',
    Reasonable = 'REASONABLE',
    Advanced = 'ADVANCED',
}

export enum ReadingTestResult {
    CanNotRead = 'CAN_NOT_READ',
    A0 = 'A0',
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
}

export enum WritingTestResult {
    CanNotWrite = 'CAN_NOT_WRITE',
    WriteNawDetails = 'WRITE_NAW_DETAILS',
    WriteSimpleTexts = 'WRITE_SIMPLE_TEXTS',
    WriteSimpleLetters = 'WRITE_SIMPLE_LETTERS',
}

export enum EducationType {
    Course = 'COURSE',
    Education = 'EDUCATION',
}

export enum EducationLevel {
    Basisonderwijs = 'basisonderwijs',
    VMBOHAVOOfVWOOnderbouwOfMBO1 = 'vmbo havo of vwo-onderbouw of mbo-1',
    HAVOVWOOfMBOOverig = 'havo vwo of mbo (overig)',
    HBOOfWoBachelor = 'hbo of wo bachelor',
    HBOOfWoMasterOfDoctor = 'hbo of wo master of doctor',
}

export enum EducationGroupType {
    Individually = 'INDIVIDUALLY',
    Group = 'GROUP',
}

export enum EducationTeacherType {
    Professional = 'PROFESSIONAL',
    Volunteer = 'VOLUNTEER',
    Both = 'BOTH',
}

export enum EducationDoesCurrentlyFollowCourse {
    Yes = 'YES',
    No = 'NO',
    NoUntilDate = 'NO_UNTIL_DATE',
}

export enum EducationName {
    LastFollowedEducation = 'LAST_FOLLOWED_EDUCATION',
    CurrentEducation = 'CURRENT_EDUCATION',
    Course = 'COURSE',
}

export enum OfferType {
    Language = 'LANGUAGE',
    Math = 'MATHEMATICS',
    Digital = 'DIGITAL_SKILLS',
    Other = 'OTHER',
}

export interface Email {
    id: string
    name: string
    email: string
    dateCreated: string
    dateModified: string
}

export interface User {
    id: string
    email: string
    roles: string[]
    organization: Organization
    person: Person
}

export interface Organization {
    id: string
    name: string
    description: null
    type: OrganizationTypeEnum
    coc: null
    vatID: null
    parentOrganization: null
    subOrganizations: unknown[]
    telephones: Telephone[]
    addresses: Address[]
    socials: unknown[]
    emails: Email[]
    persons: unknown[]
    sourceOrganization: null
}

export interface Person {
    id: string
    givenName: string
    additionalName: string
    familyName: string
    gender: Gender
    birthplace: string
    birthday: string
    telephones: Telephone[]
    emails: Email[]
    addresses: Address[]
    contactPreference: ContactPreference
    contactPreferenceOther: string
    maritalStatus: MaritalStatus
    speakingLanguages: string
    primaryLanguage: string
    children: number
    referringOrganization: IntakeReferringOrganization
    referringOrganizationOther: string
    referringOrganizationEmail: string
    availability: Availability[]
    availabilityNotes: string
}

export interface Intake {
    id: string
    referringOrganization: IntakeReferringOrganization
    referringOrganizationEmail: string
    referringOrganizationOther: string
    foundVia: IntakeFoundVia
    foundViaOther: string
    wentToLanguageHouseBefore: boolean
    wentToLanguageHouseBeforeReason: string
    wentToLanguageHouseBeforeYear: number
    network: IntakeNetwork[]
    participationLadder: IntakeParticipationLadder
    dutchNTLevel: DutchNTType
    inNetherlandsSinceYear: number
    languageInDailyLife: string
    knowsLatinAlphabet: boolean
    lastKnownLevel: DutchNT2Level
    speakingLevel: SpeakingLevel
    trainedForJob: string
    lastJob: string
    desiredSkills: DesiredSkills[]
    desiredSkillsOther: string
    hasTriedThisBefore: boolean
    hasTriedThisBeforeExplanation: string
    whyWantTheseskills: string
    whyWantThisNow: string
    desiredLearningMethod: DesiredLearningMethod[]
    remarks: string
    dayTimeActivities: IntakeDayTimeActivities[]
    dayTimeActivitiesOther: string
    readingTestResult: ReadingTestResult
    writingTestResult: WritingTestResult
    didSignPermissionForm: boolean
    hasPermissionToSendInformationAboutLibraries: boolean
    hasPermissionToShareDataWithLibraries: boolean
    hasPermissionToShareDataWithProviders: boolean
}

export interface Education {
    id: string
    name: string
    type: EducationType
    level: EducationLevel
    degree: boolean
    degreeGranted: boolean
    doesCurrentlyFollowCourse: EducationDoesCurrentlyFollowCourse
    startDate: string
    endDate: string
    institution: string
    group: EducationGroupType
    teachertype: EducationTeacherType
    hours: number
}

export interface OrganizationEmployee {
    id: string
    languageHouse: string
    // person: Person & { user: Pick<User, 'email'> }
    person: Person & { user: {} } // TODO: temporary only, remove & uncomment/update above line when BE is fixed
    intake: Intake
    educations: Education[]
}

export interface Student extends BaseEntity {
    civicIntegration: CivicIntegration
    educations: Education[]
    person: Person
    learningNeeds: null
    languageHouse: Organization
    participations: null
    intake?: Maybe<Intake>
}

export interface Supplier {
    id: string
    type: OrganizationTypeEnum
    name: string
    addresses: Address[]
    telephones: Telephone[]
    emails: Email[]
}

export interface CivicIntegration {
    id: string
    reason: CivicIntegrationReason
    requirement: CivicIntegrationRequirement
    finishDate: string //'2021-04-23T00:00:00+00:00'
}

export enum CivicIntegrationRequirement {
    Yes = 'YES',
    No = 'NO',
    CurrentlyWorkingOnIntegration = 'CURRENTLY_WORKING_ON_INTEGRATION',
}

export enum CivicIntegrationReason {
    Finished = 'FINISHED',
    FromEuCountry = 'FROM_EU_COUNTRY',
    ExemptedOrZRoute = 'EXEMPTED_OR_ZROUTE',
}

export interface LearningNeed extends BaseEntity {
    student: Student
    advisedOffer: string
    description: string
    desiredOffer: string
    motivation: string
    offerDifference: OfferDifference
    offerDifferenceOther: string
    agreements: string
    learningResults: LearningResult[]
    participations: Participation[]
}

export interface LearningResult {
    id: string
    verb: string
    subject: LearningResultSubject
    subjectOther: string
    application: LearningResultApplication
    applicationOther: string
    level: LearningResultLevel
    levelOther: string
}

export interface Participation extends BaseEntity {
    agreement: string | null
    degree: boolean | null
    end: Date | null
    endParticipation: Date | null
    explanation: string | null
    formality: ParticipationFormality | null
    groupFormation: ParticipationGroupType | null
    learningNeed: LearningNeed
    learningResult: LearningResult | null
    offerName: string | null
    offerType: OfferType | null
    provider: Supplier
    providerOption: ParticipationProviderOption
    providerOther: string | null
    start: Date | null
    startParticipation: Date | null
    status: ParticipationStatus
    reasonEndParticipation: ParticipationEndReason | null
    // testResults: TestResult[] | null
}

export enum ParticipationGroupType {
    Individually = 'INDIVIDUALLY',
    Group = 'IN_A_GROUP',
}

export enum ParticipationEndReason {
    Moved = 'MOVED',
    Work = 'WORK',
    Health = 'ILLNESS+HEALTH',
    Deceased = 'DECEASED',
    CompletedSuccessfully = 'COMPLETED_SUCCESSFULLY',
    Family = 'FAMILY_CIRCUMSTANCES',
    DoesNotMeetExpectations = 'DOES_NOT_MEET_PARTICIPANT_EXPECTATIONS',
    Other = 'OTHER',
}

export enum ParticipationProviderOption {
    Provider = 'PROVIDER',
    Other = 'OTHER',
}

export enum ParticipationStatus {
    Referred = 'REFERRED',
}

export enum ParticipationFormality {
    Formal = 'FORMAL',
    NonFormal = 'INFORMAL',
}

export enum OfferDifference {
    No = 'NO',
    YesNotOfferedInTravelRange = 'YES_NOT_OFFERED_IN_TRAVEL_RANGE',
    YesQueue = 'YES_QUEUE',
    YesOther = 'YES_OTHER',
}

export enum LearningResultSubject {
    DutchRead = 'DUTCH_READ',
    DutchWrite = 'DUTCH_WRITE',
    MathematicsNumbers = 'MATHEMATICS_NUMBERS',
    MathematicsProportions = 'MATHEMATICS_PROPORTIONS',
    MathematicsMeasurementAndGeometry = 'MATHEMATICS_MEASUREMENT_AND_GEOMETRY',
    ThematicsRelations = 'THEMATICS_RELATIONS',
    DigitalSkillsUsingIctSystems = 'DIGITAL_SKILLS_USING_ICT_SYSTEMS',
    DigitalSkillsLookingForInformation = 'DIGITAL_SKILLS_LOOKING_FOR_INFORMATION',
    DigitalSkillsProcessingAndPresentingInformation = 'DIGITAL_SKILLS_PROCESSING_AND_PRESENTING_INFORMATION',
    DigitalSkillsCommunication = 'DIGITAL_SKILLS_COMMUNICATION',
    Knowledge = 'KNOWLEDGE',
    Skills = 'SKILLS',
    Attitude = 'ATTITUDE',
    Behaviour = 'BEHAVIOUR',
    Other = 'OTHER',
}

export enum LearningResultApplication {
    FamilyAndUpbringing = 'FAMILY_AND_UPBRINGING',
    LaborMarketAndWork = 'LABOR_MARKET_AND_WORK',
    HealthAndWellbeing = 'HEALTH_AND_WELLBEING',
    LivingAndNeighborhood = 'LIVING_AND_NEIGHBORHOOD',
    SelfSustainability = 'SELF_SUSTAINABILITY',
    Other = 'OTHER',
}

export enum LearningResultLevel {
    Influx = 'INFLUX',
    Nlqf1 = 'NLQF_1',
    Nlqf2 = 'NLQF_2',
    Nlqf3 = 'NLQF_3',
    Nlqf4 = 'NLQF_4',
    Other = 'OTHER',
}
