import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** The `Iterable` scalar type represents an array or a Traversable with any kind of data. */
    Iterable: any
}

export type Query = {
    __typename?: 'Query'
    node?: Maybe<Node>
    address?: Maybe<Address>
    addresses?: Maybe<AddressConnection>
    availability?: Maybe<Availability>
    availabilities?: Maybe<AvailabilityConnection>
    availabilityDay?: Maybe<AvailabilityDay>
    availabilityDays?: Maybe<AvailabilityDayConnection>
    currentEducationNoButDidFollow?: Maybe<CurrentEducationNoButDidFollow>
    currentEducationNoButDidFollows?: Maybe<CurrentEducationNoButDidFollowConnection>
    currentEducationYes?: Maybe<CurrentEducationYes>
    document?: Maybe<Document>
    documents?: Maybe<DocumentConnection>
    employee?: Maybe<Employee>
    employees?: Maybe<EmployeeConnection>
    group?: Maybe<Group>
    groups?: Maybe<GroupConnection>
    activeGroups?: Maybe<GroupConnection>
    futureGroups?: Maybe<GroupConnection>
    completedGroups?: Maybe<GroupConnection>
    participantsOfTheGroups?: Maybe<GroupConnection>
    languageHouse?: Maybe<LanguageHouse>
    languageHouses?: Maybe<LanguageHouseConnection>
    learningNeed?: Maybe<LearningNeed>
    learningNeeds?: Maybe<LearningNeedConnection>
    participation?: Maybe<Participation>
    participations?: Maybe<ParticipationConnection>
    provider?: Maybe<Provider>
    providers?: Maybe<ProviderConnection>
    registerStudent?: Maybe<RegisterStudent>
    registerStudents?: Maybe<RegisterStudentConnection>
    registerStudentRegistrar?: Maybe<RegisterStudentRegistrar>
    registerStudentRegistrars?: Maybe<RegisterStudentRegistrarConnection>
    registration?: Maybe<Registration>
    registrations?: Maybe<RegistrationConnection>
    report?: Maybe<Report>
    reports?: Maybe<ReportConnection>
    student?: Maybe<Student>
    students?: Maybe<StudentConnection>
    activeStudents?: Maybe<StudentConnection>
    newRefferedStudent?: Maybe<Student>
    completedStudents?: Maybe<StudentConnection>
    studentAvailability?: Maybe<StudentAvailability>
    studentAvailabilities?: Maybe<StudentAvailabilityConnection>
    studentBackground?: Maybe<StudentBackground>
    studentBackgrounds?: Maybe<StudentBackgroundConnection>
    studentCivicIntegration?: Maybe<StudentCivicIntegration>
    studentCivicIntegrations?: Maybe<StudentCivicIntegrationConnection>
    studentContact?: Maybe<StudentContact>
    studentContacts?: Maybe<StudentContactConnection>
    studentCourse?: Maybe<StudentCourse>
    studentCourses?: Maybe<StudentCourseConnection>
    studentDossierEvent?: Maybe<StudentDossierEvent>
    studentDossierEvents?: Maybe<StudentDossierEventConnection>
    studentDutchNT?: Maybe<StudentDutchNt>
    studentDutchNTs?: Maybe<StudentDutchNtConnection>
    studentEducation?: Maybe<StudentEducation>
    studentEducations?: Maybe<StudentEducationConnection>
    studentGeneral?: Maybe<StudentGeneral>
    studentGenerals?: Maybe<StudentGeneralConnection>
    studentIntakeDetail?: Maybe<StudentIntakeDetail>
    studentIntakeDetails?: Maybe<StudentIntakeDetailConnection>
    studentJob?: Maybe<StudentJob>
    studentJobs?: Maybe<StudentJobConnection>
    studentMotivation?: Maybe<StudentMotivation>
    studentMotivations?: Maybe<StudentMotivationConnection>
    studentPermission?: Maybe<StudentPermission>
    studentPermissions?: Maybe<StudentPermissionConnection>
    studentPerson?: Maybe<StudentPerson>
    studentPeople?: Maybe<StudentPersonConnection>
    studentReferrer?: Maybe<StudentReferrer>
    studentReferrers?: Maybe<StudentReferrerConnection>
    testResult?: Maybe<TestResult>
    testResults?: Maybe<TestResultConnection>
    user?: Maybe<User>
    users?: Maybe<UserConnection>
    auditTrail?: Maybe<AuditTrail>
    auditTrails?: Maybe<AuditTrailConnection>
    changeLog?: Maybe<ChangeLog>
    changeLogs?: Maybe<ChangeLogConnection>
}

export type QueryNodeArgs = {
    id: Scalars['ID']
}

export type QueryAddressArgs = {
    id: Scalars['ID']
}

export type QueryAddressesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryAvailabilityArgs = {
    id: Scalars['ID']
}

export type QueryAvailabilitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryAvailabilityDayArgs = {
    id: Scalars['ID']
}

export type QueryAvailabilityDaysArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryCurrentEducationNoButDidFollowArgs = {
    id: Scalars['ID']
}

export type QueryCurrentEducationNoButDidFollowsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryCurrentEducationYesArgs = {
    id: Scalars['ID']
}

export type QueryDocumentArgs = {
    id: Scalars['ID']
}

export type QueryDocumentsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryEmployeeArgs = {
    id: Scalars['ID']
}

export type QueryEmployeesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    languageHouseId?: Maybe<Scalars['String']>
    languageHouseId_list?: Maybe<Array<Maybe<Scalars['String']>>>
    providerId?: Maybe<Scalars['String']>
    providerId_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryGroupArgs = {
    id: Scalars['ID']
}

export type QueryGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederId_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryActiveGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederId_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryFutureGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederId_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryCompletedGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederId_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryParticipantsOfTheGroupsArgs = {
    id: Scalars['ID']
}

export type QueryLanguageHouseArgs = {
    id: Scalars['ID']
}

export type QueryLanguageHousesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryLearningNeedArgs = {
    id: Scalars['ID']
}

export type QueryLearningNeedsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    studentId_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryParticipationArgs = {
    id: Scalars['ID']
}

export type QueryParticipationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    learningNeedId?: Maybe<Scalars['String']>
    learningNeedId_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryProviderArgs = {
    id: Scalars['ID']
}

export type QueryProvidersArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryRegisterStudentArgs = {
    id: Scalars['ID']
}

export type QueryRegisterStudentsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryRegisterStudentRegistrarArgs = {
    id: Scalars['ID']
}

export type QueryRegisterStudentRegistrarsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryRegistrationArgs = {
    id: Scalars['ID']
}

export type QueryRegistrationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryReportArgs = {
    id: Scalars['ID']
}

export type QueryReportsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentArgs = {
    id: Scalars['ID']
}

export type QueryStudentsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryActiveStudentsArgs = {
    id: Scalars['ID']
}

export type QueryNewRefferedStudentArgs = {
    id: Scalars['ID']
}

export type QueryCompletedStudentsArgs = {
    id: Scalars['ID']
}

export type QueryStudentAvailabilityArgs = {
    id: Scalars['ID']
}

export type QueryStudentAvailabilitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentBackgroundArgs = {
    id: Scalars['ID']
}

export type QueryStudentBackgroundsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentCivicIntegrationArgs = {
    id: Scalars['ID']
}

export type QueryStudentCivicIntegrationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentContactArgs = {
    id: Scalars['ID']
}

export type QueryStudentContactsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentCourseArgs = {
    id: Scalars['ID']
}

export type QueryStudentCoursesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentDossierEventArgs = {
    id: Scalars['ID']
}

export type QueryStudentDossierEventsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    studentId_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryStudentDutchNtArgs = {
    id: Scalars['ID']
}

export type QueryStudentDutchNTsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentEducationArgs = {
    id: Scalars['ID']
}

export type QueryStudentEducationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentGeneralArgs = {
    id: Scalars['ID']
}

export type QueryStudentGeneralsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentIntakeDetailArgs = {
    id: Scalars['ID']
}

export type QueryStudentIntakeDetailsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentJobArgs = {
    id: Scalars['ID']
}

export type QueryStudentJobsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentMotivationArgs = {
    id: Scalars['ID']
}

export type QueryStudentMotivationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentPermissionArgs = {
    id: Scalars['ID']
}

export type QueryStudentPermissionsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentPersonArgs = {
    id: Scalars['ID']
}

export type QueryStudentPeopleArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryStudentReferrerArgs = {
    id: Scalars['ID']
}

export type QueryStudentReferrersArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryTestResultArgs = {
    id: Scalars['ID']
}

export type QueryTestResultsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryUserArgs = {
    id: Scalars['ID']
}

export type QueryUsersArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryAuditTrailArgs = {
    id: Scalars['ID']
}

export type QueryAuditTrailsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<AuditTrailFilter_Order>
    request?: Maybe<Scalars['String']>
    request_list?: Maybe<Array<Maybe<Scalars['String']>>>
    user?: Maybe<Scalars['String']>
    user_list?: Maybe<Array<Maybe<Scalars['String']>>>
    subject?: Maybe<Scalars['String']>
    subject_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resourceType?: Maybe<Scalars['String']>
    endpoint?: Maybe<Scalars['String']>
    endpoint_list?: Maybe<Array<Maybe<Scalars['String']>>>
    contentType?: Maybe<Scalars['String']>
    contentType_list?: Maybe<Array<Maybe<Scalars['String']>>>
    content?: Maybe<Scalars['String']>
    content_list?: Maybe<Array<Maybe<Scalars['String']>>>
    session?: Maybe<Scalars['String']>
    session_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated?: Maybe<AuditTrailFilter_DateCreated>
    dateModified?: Maybe<AuditTrailFilter_DateModified>
}

export type QueryChangeLogArgs = {
    id: Scalars['ID']
}

export type QueryChangeLogsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ChangeLogFilter_Order>
    action?: Maybe<Scalars['String']>
    action_list?: Maybe<Array<Maybe<Scalars['String']>>>
    objectId?: Maybe<Scalars['String']>
    objectId_list?: Maybe<Array<Maybe<Scalars['String']>>>
    objectClass?: Maybe<Scalars['String']>
    objectClass_list?: Maybe<Array<Maybe<Scalars['String']>>>
    version?: Maybe<Scalars['Int']>
    version_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    dateCreated?: Maybe<ChangeLogFilter_DateCreated>
    dateModified?: Maybe<ChangeLogFilter_DateModified>
}

/** A node, according to the Relay specification. */
export type Node = {
    /** The id of this node. */
    id: Scalars['ID']
}

export type Address = Node & {
    __typename?: 'Address'
    id: Scalars['ID']
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

/** Connection for Address. */
export type AddressConnection = {
    __typename?: 'AddressConnection'
    edges?: Maybe<Array<Maybe<AddressEdge>>>
    pageInfo: AddressPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Address. */
export type AddressEdge = {
    __typename?: 'AddressEdge'
    node?: Maybe<Address>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AddressPageInfo = {
    __typename?: 'AddressPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Availability = Node & {
    __typename?: 'Availability'
    id: Scalars['ID']
    monday: AvailabilityDay
    tuesday: AvailabilityDay
    wednesday: AvailabilityDay
    thursday: AvailabilityDay
    friday: AvailabilityDay
    saturday: AvailabilityDay
    sunday: AvailabilityDay
}

export type AvailabilityDay = Node & {
    __typename?: 'AvailabilityDay'
    id: Scalars['ID']
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
}

/** Connection for Availability. */
export type AvailabilityConnection = {
    __typename?: 'AvailabilityConnection'
    edges?: Maybe<Array<Maybe<AvailabilityEdge>>>
    pageInfo: AvailabilityPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Availability. */
export type AvailabilityEdge = {
    __typename?: 'AvailabilityEdge'
    node?: Maybe<Availability>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AvailabilityPageInfo = {
    __typename?: 'AvailabilityPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Connection for AvailabilityDay. */
export type AvailabilityDayConnection = {
    __typename?: 'AvailabilityDayConnection'
    edges?: Maybe<Array<Maybe<AvailabilityDayEdge>>>
    pageInfo: AvailabilityDayPageInfo
    totalCount: Scalars['Int']
}

/** Edge of AvailabilityDay. */
export type AvailabilityDayEdge = {
    __typename?: 'AvailabilityDayEdge'
    node?: Maybe<AvailabilityDay>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AvailabilityDayPageInfo = {
    __typename?: 'AvailabilityDayPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type CurrentEducationNoButDidFollow = Node & {
    __typename?: 'CurrentEducationNoButDidFollow'
    id: Scalars['ID']
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
}

/** Connection for CurrentEducationNoButDidFollow. */
export type CurrentEducationNoButDidFollowConnection = {
    __typename?: 'CurrentEducationNoButDidFollowConnection'
    edges?: Maybe<Array<Maybe<CurrentEducationNoButDidFollowEdge>>>
    pageInfo: CurrentEducationNoButDidFollowPageInfo
    totalCount: Scalars['Int']
}

/** Edge of CurrentEducationNoButDidFollow. */
export type CurrentEducationNoButDidFollowEdge = {
    __typename?: 'CurrentEducationNoButDidFollowEdge'
    node?: Maybe<CurrentEducationNoButDidFollow>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type CurrentEducationNoButDidFollowPageInfo = {
    __typename?: 'CurrentEducationNoButDidFollowPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type CurrentEducationYes = Node & {
    __typename?: 'CurrentEducationYes'
    id: Scalars['ID']
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
}

export type Document = Node & {
    __typename?: 'Document'
    id: Scalars['ID']
    base64Data: Scalars['String']
    /** the name of the file */
    filename: Scalars['String']
    resource: Scalars['String']
    aanbiederEmployeeId?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    aanbiederEmployeeDocumentId?: Maybe<Scalars['String']>
    studentDocumentId?: Maybe<Scalars['String']>
}

/** Connection for Document. */
export type DocumentConnection = {
    __typename?: 'DocumentConnection'
    edges?: Maybe<Array<Maybe<DocumentEdge>>>
    pageInfo: DocumentPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Document. */
export type DocumentEdge = {
    __typename?: 'DocumentEdge'
    node?: Maybe<Document>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type DocumentPageInfo = {
    __typename?: 'DocumentPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Employee = Node & {
    __typename?: 'Employee'
    id: Scalars['ID']
    /** The Name of this Employee. */
    givenName: Scalars['String']
    /** The PrefixName of this Employee. */
    additionalName?: Maybe<Scalars['String']>
    /** The LastName of this Employee. */
    familyName: Scalars['String']
    /** The Telephone of this Employee. */
    telephone?: Maybe<Scalars['String']>
    /** The Availability Note of this Employee. */
    availabilityNotes?: Maybe<Scalars['String']>
    /** The Email of this Employee. */
    email: Scalars['String']
    /** The Gender of this Employee. **Male**, **Female**, **X** */
    gender?: Maybe<Scalars['String']>
    /** Date of birth of this Employee. */
    dateOfBirth?: Maybe<Scalars['String']>
    /** Contact Telephone of this Employee. */
    contactTelephone?: Maybe<Scalars['String']>
    /** Contact Preference of this Employee.**PHONECALL**, **WHATSAPP**, **EMAIL**, **OTHER** */
    contactPreference?: Maybe<Scalars['String']>
    /** Target Preference of this Employee. **NT1**, **NT2** */
    targetGroupPreferences?: Maybe<Scalars['Iterable']>
    /**
     * Volunteering Preference of this Employee.
     *
     *  @Assert\Length(
     *     max = 255
     * )
     */
    volunteeringPreference?: Maybe<Scalars['String']>
    /** The address of this Employee. */
    address?: Maybe<Scalars['Iterable']>
    userGroupIds?: Maybe<Scalars['Iterable']>
    contactPreferenceOther?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    /** Shouldn't this be a string to provide the reason for the experience with the target group? */
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<Scalars['String']>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<Scalars['String']>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<Scalars['String']>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    /** Whether the employee has submitted a police certificate */
    isVOGChecked?: Maybe<Scalars['Boolean']>
    /** The provider this employee works for */
    providerId?: Maybe<Scalars['String']>
    /** The language house this employee works for */
    languageHouseId?: Maybe<Scalars['String']>
    /** The availability for this employee */
    availability?: Maybe<Scalars['Iterable']>
    currentEducationYes?: Maybe<Scalars['Iterable']>
    currentEducationNoButDidFollow?: Maybe<Scalars['Iterable']>
    biscEmployeeId?: Maybe<Scalars['String']>
    userGroupId?: Maybe<Scalars['String']>
    userId?: Maybe<Scalars['String']>
}

/** Connection for Employee. */
export type EmployeeConnection = {
    __typename?: 'EmployeeConnection'
    edges?: Maybe<Array<Maybe<EmployeeEdge>>>
    pageInfo: EmployeePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Employee. */
export type EmployeeEdge = {
    __typename?: 'EmployeeEdge'
    node?: Maybe<Employee>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type EmployeePageInfo = {
    __typename?: 'EmployeePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Group = Node & {
    __typename?: 'Group'
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
    typeCourse?: Maybe<Scalars['String']>
    outComesGoal?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['String']>
    detailsTotalClassHours?: Maybe<Scalars['Int']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation?: Maybe<Scalars['String']>
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    aanbiederEmployeeIds?: Maybe<Scalars['Iterable']>
    outComesTopic?: Maybe<Scalars['String']>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<Scalars['String']>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevelOther?: Maybe<Scalars['String']>
    availability?: Maybe<Scalars['Iterable']>
    outComesLevel?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    groupId?: Maybe<Scalars['String']>
}

/** Connection for Group. */
export type GroupConnection = {
    __typename?: 'GroupConnection'
    edges?: Maybe<Array<Maybe<GroupEdge>>>
    pageInfo: GroupPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Group. */
export type GroupEdge = {
    __typename?: 'GroupEdge'
    node?: Maybe<Group>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type GroupPageInfo = {
    __typename?: 'GroupPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type LanguageHouse = Node & {
    __typename?: 'LanguageHouse'
    id: Scalars['ID']
    /** The Name of this Taalhuis. */
    name: Scalars['String']
    /** The Telephone of this Provider. */
    phoneNumber?: Maybe<Scalars['String']>
    /** The Email of this Provider. */
    email?: Maybe<Scalars['String']>
    /** The address of this Taalhuis. */
    address?: Maybe<Scalars['Iterable']>
    /** Type LanguageHouse */
    type?: Maybe<Scalars['String']>
}

/** Connection for LanguageHouse. */
export type LanguageHouseConnection = {
    __typename?: 'LanguageHouseConnection'
    edges?: Maybe<Array<Maybe<LanguageHouseEdge>>>
    pageInfo: LanguageHousePageInfo
    totalCount: Scalars['Int']
}

/** Edge of LanguageHouse. */
export type LanguageHouseEdge = {
    __typename?: 'LanguageHouseEdge'
    node?: Maybe<LanguageHouse>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type LanguageHousePageInfo = {
    __typename?: 'LanguageHousePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type LearningNeed = Node & {
    __typename?: 'LearningNeed'
    id: Scalars['ID']
    learningNeedDescription: Scalars['String']
    learningNeedMotivation: Scalars['String']
    desiredOutComesGoal: Scalars['String']
    desiredOutComesTopic: Scalars['String']
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication: Scalars['String']
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel: Scalars['String']
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer: Scalars['String']
    offerAdvisedOffer: Scalars['String']
    offerDifference: Scalars['String']
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
    participations?: Maybe<Scalars['Iterable']>
    studentId?: Maybe<Scalars['String']>
    /** The id of the objectEntity of an eav/learning_need. */
    learningNeedId?: Maybe<Scalars['String']>
    /** The url of the objectEntity of an eav/learning_need '@eav'. */
    learningNeedUrl?: Maybe<Scalars['String']>
}

/** Connection for LearningNeed. */
export type LearningNeedConnection = {
    __typename?: 'LearningNeedConnection'
    edges?: Maybe<Array<Maybe<LearningNeedEdge>>>
    pageInfo: LearningNeedPageInfo
    totalCount: Scalars['Int']
}

/** Edge of LearningNeed. */
export type LearningNeedEdge = {
    __typename?: 'LearningNeedEdge'
    node?: Maybe<LearningNeed>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type LearningNeedPageInfo = {
    __typename?: 'LearningNeedPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Participation = Node & {
    __typename?: 'Participation'
    id: Scalars['ID']
    status?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<Scalars['String']>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<Scalars['String']>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<Scalars['String']>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<Scalars['String']>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<Scalars['String']>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    detailsEngagements?: Maybe<Scalars['String']>
    /** The id of the objectEntity of an eav/learning_need. */
    learningNeedId?: Maybe<Scalars['String']>
    /** The url of the objectEntity of an eav/learning_need '@eav'. */
    learningNeedUrl?: Maybe<Scalars['String']>
    participationId?: Maybe<Scalars['String']>
    presenceEngagements?: Maybe<Scalars['String']>
    presenceStartDate?: Maybe<Scalars['String']>
    presenceEndDate?: Maybe<Scalars['String']>
    presenceEndParticipationReason?: Maybe<Scalars['String']>
    aanbiederEmployeeId?: Maybe<Scalars['String']>
    groupId?: Maybe<Scalars['String']>
}

/** Connection for Participation. */
export type ParticipationConnection = {
    __typename?: 'ParticipationConnection'
    edges?: Maybe<Array<Maybe<ParticipationEdge>>>
    pageInfo: ParticipationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Participation. */
export type ParticipationEdge = {
    __typename?: 'ParticipationEdge'
    node?: Maybe<Participation>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ParticipationPageInfo = {
    __typename?: 'ParticipationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Provider = Node & {
    __typename?: 'Provider'
    id: Scalars['ID']
    /** The Name of this Provider. */
    name: Scalars['String']
    /** The Telephone of this Provider. */
    phoneNumber?: Maybe<Scalars['String']>
    /** The Email of this Provider. */
    email?: Maybe<Scalars['String']>
    /** The address of this Aanbieder. */
    address?: Maybe<Scalars['Iterable']>
    /** Type Aanbieder */
    type?: Maybe<Scalars['String']>
}

/** Connection for Provider. */
export type ProviderConnection = {
    __typename?: 'ProviderConnection'
    edges?: Maybe<Array<Maybe<ProviderEdge>>>
    pageInfo: ProviderPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Provider. */
export type ProviderEdge = {
    __typename?: 'ProviderEdge'
    node?: Maybe<Provider>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ProviderPageInfo = {
    __typename?: 'ProviderPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type RegisterStudent = Node & {
    __typename?: 'RegisterStudent'
    id: Scalars['ID']
    address?: Maybe<AddressConnection>
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type RegisterStudentAddressArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

/** Connection for RegisterStudent. */
export type RegisterStudentConnection = {
    __typename?: 'RegisterStudentConnection'
    edges?: Maybe<Array<Maybe<RegisterStudentEdge>>>
    pageInfo: RegisterStudentPageInfo
    totalCount: Scalars['Int']
}

/** Edge of RegisterStudent. */
export type RegisterStudentEdge = {
    __typename?: 'RegisterStudentEdge'
    node?: Maybe<RegisterStudent>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type RegisterStudentPageInfo = {
    __typename?: 'RegisterStudentPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type RegisterStudentRegistrar = Node & {
    __typename?: 'RegisterStudentRegistrar'
    id: Scalars['ID']
    _id: Scalars['Int']
    organizationName: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
}

/** Connection for RegisterStudentRegistrar. */
export type RegisterStudentRegistrarConnection = {
    __typename?: 'RegisterStudentRegistrarConnection'
    edges?: Maybe<Array<Maybe<RegisterStudentRegistrarEdge>>>
    pageInfo: RegisterStudentRegistrarPageInfo
    totalCount: Scalars['Int']
}

/** Edge of RegisterStudentRegistrar. */
export type RegisterStudentRegistrarEdge = {
    __typename?: 'RegisterStudentRegistrarEdge'
    node?: Maybe<RegisterStudentRegistrar>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type RegisterStudentRegistrarPageInfo = {
    __typename?: 'RegisterStudentRegistrarPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Registration = Node & {
    __typename?: 'Registration'
    id: Scalars['ID']
    _id: Scalars['Int']
    languageHouseId: Scalars['String']
    memo?: Maybe<Scalars['String']>
    student?: Maybe<RegisterStudent>
    registrar?: Maybe<RegisterStudentRegistrar>
    studentId?: Maybe<Scalars['String']>
}

/** Connection for Registration. */
export type RegistrationConnection = {
    __typename?: 'RegistrationConnection'
    edges?: Maybe<Array<Maybe<RegistrationEdge>>>
    pageInfo: RegistrationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Registration. */
export type RegistrationEdge = {
    __typename?: 'RegistrationEdge'
    node?: Maybe<Registration>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type RegistrationPageInfo = {
    __typename?: 'RegistrationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Report = Node & {
    __typename?: 'Report'
    id: Scalars['ID']
    /** The language house the report applies to */
    languageHouseId?: Maybe<Scalars['String']>
    /** The provider this report applies to */
    providerId?: Maybe<Scalars['String']>
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
    /** The filename of the report */
    filename?: Maybe<Scalars['String']>
    /** A base64 encoded string containing the file's contents */
    base64data?: Maybe<Scalars['String']>
}

/** Connection for Report. */
export type ReportConnection = {
    __typename?: 'ReportConnection'
    edges?: Maybe<Array<Maybe<ReportEdge>>>
    pageInfo: ReportPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Report. */
export type ReportEdge = {
    __typename?: 'ReportEdge'
    node?: Maybe<Report>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ReportPageInfo = {
    __typename?: 'ReportPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Student = Node & {
    __typename?: 'Student'
    id: Scalars['ID']
    status?: Maybe<Scalars['String']>
    memo?: Maybe<Scalars['String']>
    registrar?: Maybe<Scalars['Iterable']>
    civicIntegrationDetails?: Maybe<Scalars['Iterable']>
    personDetails?: Maybe<Scalars['Iterable']>
    contactDetails?: Maybe<Scalars['Iterable']>
    generalDetails?: Maybe<Scalars['Iterable']>
    referrerDetails?: Maybe<Scalars['Iterable']>
    backgroundDetails?: Maybe<Scalars['Iterable']>
    dutchNTDetails?: Maybe<Scalars['Iterable']>
    speakingLevel?: Maybe<Scalars['String']>
    educationDetails?: Maybe<Scalars['Iterable']>
    courseDetails?: Maybe<Scalars['Iterable']>
    jobDetails?: Maybe<Scalars['Iterable']>
    motivationDetails?: Maybe<Scalars['Iterable']>
    availabilityDetails?: Maybe<Scalars['Iterable']>
    readingTestResult?: Maybe<Scalars['String']>
    writingTestResult?: Maybe<Scalars['String']>
    permissionDetails?: Maybe<Scalars['Iterable']>
    intakeDetail?: Maybe<Scalars['String']>
    languageHouseId?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
}

/** Connection for Student. */
export type StudentConnection = {
    __typename?: 'StudentConnection'
    edges?: Maybe<Array<Maybe<StudentEdge>>>
    pageInfo: StudentPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Student. */
export type StudentEdge = {
    __typename?: 'StudentEdge'
    node?: Maybe<Student>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentPageInfo = {
    __typename?: 'StudentPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentAvailability = Node & {
    __typename?: 'StudentAvailability'
    id: Scalars['ID']
    availability?: Maybe<Availability>
    availabilityNotes?: Maybe<Scalars['String']>
}

/** Connection for StudentAvailability. */
export type StudentAvailabilityConnection = {
    __typename?: 'StudentAvailabilityConnection'
    edges?: Maybe<Array<Maybe<StudentAvailabilityEdge>>>
    pageInfo: StudentAvailabilityPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentAvailability. */
export type StudentAvailabilityEdge = {
    __typename?: 'StudentAvailabilityEdge'
    node?: Maybe<StudentAvailability>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentAvailabilityPageInfo = {
    __typename?: 'StudentAvailabilityPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentBackground = Node & {
    __typename?: 'StudentBackground'
    id: Scalars['ID']
    foundVia?: Maybe<Scalars['String']>
    foundViaOther?: Maybe<Scalars['String']>
    wentToTaalhuisBefore?: Maybe<Scalars['Boolean']>
    wentToTaalhuisBeforeReason?: Maybe<Scalars['String']>
    wentToTaalhuisBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Scalars['Iterable']>
    participationLadder?: Maybe<Scalars['Int']>
}

/** Connection for StudentBackground. */
export type StudentBackgroundConnection = {
    __typename?: 'StudentBackgroundConnection'
    edges?: Maybe<Array<Maybe<StudentBackgroundEdge>>>
    pageInfo: StudentBackgroundPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentBackground. */
export type StudentBackgroundEdge = {
    __typename?: 'StudentBackgroundEdge'
    node?: Maybe<StudentBackground>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentBackgroundPageInfo = {
    __typename?: 'StudentBackgroundPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentCivicIntegration = Node & {
    __typename?: 'StudentCivicIntegration'
    id: Scalars['ID']
    civicIntegrationRequirement?: Maybe<Scalars['String']>
    civicIntegrationRequirementReason?: Maybe<Scalars['String']>
    civivIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
}

/** Connection for StudentCivicIntegration. */
export type StudentCivicIntegrationConnection = {
    __typename?: 'StudentCivicIntegrationConnection'
    edges?: Maybe<Array<Maybe<StudentCivicIntegrationEdge>>>
    pageInfo: StudentCivicIntegrationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentCivicIntegration. */
export type StudentCivicIntegrationEdge = {
    __typename?: 'StudentCivicIntegrationEdge'
    node?: Maybe<StudentCivicIntegration>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentCivicIntegrationPageInfo = {
    __typename?: 'StudentCivicIntegrationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentContact = Node & {
    __typename?: 'StudentContact'
    id: Scalars['ID']
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    contactPersonTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<Scalars['String']>
    contactPreferenceOther?: Maybe<Scalars['String']>
}

/** Connection for StudentContact. */
export type StudentContactConnection = {
    __typename?: 'StudentContactConnection'
    edges?: Maybe<Array<Maybe<StudentContactEdge>>>
    pageInfo: StudentContactPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentContact. */
export type StudentContactEdge = {
    __typename?: 'StudentContactEdge'
    node?: Maybe<StudentContact>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentContactPageInfo = {
    __typename?: 'StudentContactPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentCourse = Node & {
    __typename?: 'StudentCourse'
    id: Scalars['ID']
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<Scalars['String']>
    courseGroup?: Maybe<Scalars['String']>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
}

/** Connection for StudentCourse. */
export type StudentCourseConnection = {
    __typename?: 'StudentCourseConnection'
    edges?: Maybe<Array<Maybe<StudentCourseEdge>>>
    pageInfo: StudentCoursePageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentCourse. */
export type StudentCourseEdge = {
    __typename?: 'StudentCourseEdge'
    node?: Maybe<StudentCourse>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentCoursePageInfo = {
    __typename?: 'StudentCoursePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentDossierEvent = Node & {
    __typename?: 'StudentDossierEvent'
    id: Scalars['ID']
    /** The Event of this Student. */
    event: Scalars['String']
    /** date of this student Dossier. */
    eventDate: Scalars['String']
    /** description of this student Dossier. */
    eventDescription: Scalars['String']
    /** studentId of this student Dossier. */
    studentId: Scalars['String']
    studentDossierEventId?: Maybe<Scalars['String']>
}

/** Connection for StudentDossierEvent. */
export type StudentDossierEventConnection = {
    __typename?: 'StudentDossierEventConnection'
    edges?: Maybe<Array<Maybe<StudentDossierEventEdge>>>
    pageInfo: StudentDossierEventPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentDossierEvent. */
export type StudentDossierEventEdge = {
    __typename?: 'StudentDossierEventEdge'
    node?: Maybe<StudentDossierEvent>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentDossierEventPageInfo = {
    __typename?: 'StudentDossierEventPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentDutchNt = Node & {
    __typename?: 'StudentDutchNT'
    id: Scalars['ID']
    dutchNTLevel?: Maybe<Scalars['String']>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<Scalars['String']>
}

/** Connection for StudentDutchNT. */
export type StudentDutchNtConnection = {
    __typename?: 'StudentDutchNTConnection'
    edges?: Maybe<Array<Maybe<StudentDutchNtEdge>>>
    pageInfo: StudentDutchNtPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentDutchNT. */
export type StudentDutchNtEdge = {
    __typename?: 'StudentDutchNTEdge'
    node?: Maybe<StudentDutchNt>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentDutchNtPageInfo = {
    __typename?: 'StudentDutchNTPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentEducation = Node & {
    __typename?: 'StudentEducation'
    id: Scalars['ID']
    lastFollowedEducation?: Maybe<Scalars['String']>
    didGraduate?: Maybe<Scalars['Boolean']>
    followingEducationRightNow?: Maybe<Scalars['String']>
    followingEducationRightNowYesStartDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesLevel?: Maybe<Scalars['String']>
    followingEducationRightNowYesInstitute?: Maybe<Scalars['String']>
    followingEducationRightNowYesProvidesCertificate?: Maybe<Scalars['Boolean']>
    followingEducationRightNowNoEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowNoLevel?: Maybe<Scalars['String']>
    followingEducationRightNowNoGotCertificate?: Maybe<Scalars['Boolean']>
}

/** Connection for StudentEducation. */
export type StudentEducationConnection = {
    __typename?: 'StudentEducationConnection'
    edges?: Maybe<Array<Maybe<StudentEducationEdge>>>
    pageInfo: StudentEducationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentEducation. */
export type StudentEducationEdge = {
    __typename?: 'StudentEducationEdge'
    node?: Maybe<StudentEducation>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentEducationPageInfo = {
    __typename?: 'StudentEducationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentGeneral = Node & {
    __typename?: 'StudentGeneral'
    id: Scalars['ID']
    countryOfOrigin?: Maybe<Scalars['String']>
    nativeLanguage?: Maybe<Scalars['String']>
    otherLanguages?: Maybe<Scalars['String']>
    familiComposition?: Maybe<Scalars['Iterable']>
    childrenCount?: Maybe<Scalars['Int']>
    childrenDatesOfBirth?: Maybe<Scalars['String']>
}

/** Connection for StudentGeneral. */
export type StudentGeneralConnection = {
    __typename?: 'StudentGeneralConnection'
    edges?: Maybe<Array<Maybe<StudentGeneralEdge>>>
    pageInfo: StudentGeneralPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentGeneral. */
export type StudentGeneralEdge = {
    __typename?: 'StudentGeneralEdge'
    node?: Maybe<StudentGeneral>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentGeneralPageInfo = {
    __typename?: 'StudentGeneralPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentIntakeDetail = Node & {
    __typename?: 'StudentIntakeDetail'
    id: Scalars['ID']
    studentId?: Maybe<Scalars['String']>
    lastName?: Maybe<Scalars['String']>
    middleName?: Maybe<Scalars['String']>
    nickname?: Maybe<Scalars['String']>
    gender?: Maybe<Scalars['String']>
    dateOfBirth?: Maybe<Scalars['String']>
    streetAndHouseNumber?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    place?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
    phoneNumberContactPerson?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    availability?: Maybe<Scalars['Iterable']>
}

/** Connection for StudentIntakeDetail. */
export type StudentIntakeDetailConnection = {
    __typename?: 'StudentIntakeDetailConnection'
    edges?: Maybe<Array<Maybe<StudentIntakeDetailEdge>>>
    pageInfo: StudentIntakeDetailPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentIntakeDetail. */
export type StudentIntakeDetailEdge = {
    __typename?: 'StudentIntakeDetailEdge'
    node?: Maybe<StudentIntakeDetail>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentIntakeDetailPageInfo = {
    __typename?: 'StudentIntakeDetailPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentJob = Node & {
    __typename?: 'StudentJob'
    id: Scalars['ID']
    trainedForJob?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    dayTimeActivities?: Maybe<Scalars['Iterable']>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
}

/** Connection for StudentJob. */
export type StudentJobConnection = {
    __typename?: 'StudentJobConnection'
    edges?: Maybe<Array<Maybe<StudentJobEdge>>>
    pageInfo: StudentJobPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentJob. */
export type StudentJobEdge = {
    __typename?: 'StudentJobEdge'
    node?: Maybe<StudentJob>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentJobPageInfo = {
    __typename?: 'StudentJobPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentMotivation = Node & {
    __typename?: 'StudentMotivation'
    id: Scalars['ID']
    desiredSkills: Scalars['Iterable']
    desiredSkillsOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    whyWantTheseSkills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    desiredLearingMethod: Scalars['Iterable']
    remarks?: Maybe<Scalars['String']>
}

/** Connection for StudentMotivation. */
export type StudentMotivationConnection = {
    __typename?: 'StudentMotivationConnection'
    edges?: Maybe<Array<Maybe<StudentMotivationEdge>>>
    pageInfo: StudentMotivationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentMotivation. */
export type StudentMotivationEdge = {
    __typename?: 'StudentMotivationEdge'
    node?: Maybe<StudentMotivation>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentMotivationPageInfo = {
    __typename?: 'StudentMotivationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentPermission = Node & {
    __typename?: 'StudentPermission'
    id: Scalars['ID']
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithAanbieders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
}

/** Connection for StudentPermission. */
export type StudentPermissionConnection = {
    __typename?: 'StudentPermissionConnection'
    edges?: Maybe<Array<Maybe<StudentPermissionEdge>>>
    pageInfo: StudentPermissionPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentPermission. */
export type StudentPermissionEdge = {
    __typename?: 'StudentPermissionEdge'
    node?: Maybe<StudentPermission>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentPermissionPageInfo = {
    __typename?: 'StudentPermissionPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentPerson = Node & {
    __typename?: 'StudentPerson'
    id: Scalars['ID']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    gender?: Maybe<Scalars['String']>
    dateOfBirth?: Maybe<Scalars['String']>
}

/** Connection for StudentPerson. */
export type StudentPersonConnection = {
    __typename?: 'StudentPersonConnection'
    edges?: Maybe<Array<Maybe<StudentPersonEdge>>>
    pageInfo: StudentPersonPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentPerson. */
export type StudentPersonEdge = {
    __typename?: 'StudentPersonEdge'
    node?: Maybe<StudentPerson>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentPersonPageInfo = {
    __typename?: 'StudentPersonPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StudentReferrer = Node & {
    __typename?: 'StudentReferrer'
    id: Scalars['ID']
    referringOrganization?: Maybe<Scalars['String']>
    referringOrganizationOther?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
}

/** Connection for StudentReferrer. */
export type StudentReferrerConnection = {
    __typename?: 'StudentReferrerConnection'
    edges?: Maybe<Array<Maybe<StudentReferrerEdge>>>
    pageInfo: StudentReferrerPageInfo
    totalCount: Scalars['Int']
}

/** Edge of StudentReferrer. */
export type StudentReferrerEdge = {
    __typename?: 'StudentReferrerEdge'
    node?: Maybe<StudentReferrer>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StudentReferrerPageInfo = {
    __typename?: 'StudentReferrerPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type TestResult = Node & {
    __typename?: 'TestResult'
    id: Scalars['ID']
    participationId: Scalars['String']
    outComesGoal: Scalars['String']
    outComesTopic: Scalars['String']
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: Scalars['String']
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: Scalars['String']
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam: Scalars['String']
    examDate: Scalars['String']
    examMemo?: Maybe<Scalars['String']>
    testResultId?: Maybe<Scalars['String']>
}

/** Connection for TestResult. */
export type TestResultConnection = {
    __typename?: 'TestResultConnection'
    edges?: Maybe<Array<Maybe<TestResultEdge>>>
    pageInfo: TestResultPageInfo
    totalCount: Scalars['Int']
}

/** Edge of TestResult. */
export type TestResultEdge = {
    __typename?: 'TestResultEdge'
    node?: Maybe<TestResult>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type TestResultPageInfo = {
    __typename?: 'TestResultPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type User = Node & {
    __typename?: 'User'
    id: Scalars['ID']
    /** The Email of this User. */
    email?: Maybe<Scalars['String']>
    /** The Username of this User */
    username?: Maybe<Scalars['String']>
    /** The Password of this User. */
    password?: Maybe<Scalars['String']>
    /** The Token for password reset */
    token?: Maybe<Scalars['String']>
}

/** Connection for User. */
export type UserConnection = {
    __typename?: 'UserConnection'
    edges?: Maybe<Array<Maybe<UserEdge>>>
    pageInfo: UserPageInfo
    totalCount: Scalars['Int']
}

/** Edge of User. */
export type UserEdge = {
    __typename?: 'UserEdge'
    node?: Maybe<User>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type UserPageInfo = {
    __typename?: 'UserPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** An resource representing a log line. */
export type AuditTrail = Node & {
    __typename?: 'AuditTrail'
    id: Scalars['ID']
    /** The id of the request within that application */
    request?: Maybe<Scalars['String']>
    /** The user on behalf of wich the request was made */
    user?: Maybe<Scalars['String']>
    /** ??? */
    subject?: Maybe<Scalars['String']>
    /** The procces on behalf of wich the request was made */
    process?: Maybe<Scalars['String']>
    /** The moment this request was created */
    dataElements?: Maybe<Scalars['Iterable']>
    /** The moment this request was created */
    dataSubjects?: Maybe<Scalars['Iterable']>
    /** The resource that was requested */
    resource?: Maybe<Scalars['String']>
    /** The type of the resource that was requested */
    resourceType?: Maybe<Scalars['String']>
    /** The moment this request was created */
    route?: Maybe<Scalars['String']>
    /** The endpoint that the request was made to */
    endpoint?: Maybe<Scalars['String']>
    /** The method that was used */
    method?: Maybe<Scalars['String']>
    /** The contentType that was reqousted */
    accept?: Maybe<Scalars['String']>
    /** The contentType that was suplieds */
    contentType?: Maybe<Scalars['String']>
    /** The moment this request was created */
    content?: Maybe<Scalars['String']>
    /** The moment this request was created */
    ip?: Maybe<Scalars['String']>
    /** The moment this request was created */
    session: Scalars['String']
    /** The headers supplied by client */
    headers: Scalars['Iterable']
    /** The status code returned to client */
    statusCode?: Maybe<Scalars['Int']>
    /** Whether or not the reqousted endpoint was found */
    notFound?: Maybe<Scalars['Boolean']>
    /** Whether or not the client was allowed to the reqousted endpoint */
    forbidden?: Maybe<Scalars['Boolean']>
    /** Whether or not there where any problems */
    ok?: Maybe<Scalars['Boolean']>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

export type AuditTrailFilter_Order = {
    application?: Maybe<Scalars['String']>
    request?: Maybe<Scalars['String']>
    user?: Maybe<Scalars['String']>
    subject?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    resourceType?: Maybe<Scalars['String']>
    endpoint?: Maybe<Scalars['String']>
    contentType?: Maybe<Scalars['String']>
    content?: Maybe<Scalars['String']>
    session?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type AuditTrailFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type AuditTrailFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for AuditTrail. */
export type AuditTrailConnection = {
    __typename?: 'AuditTrailConnection'
    edges?: Maybe<Array<Maybe<AuditTrailEdge>>>
    pageInfo: AuditTrailPageInfo
    totalCount: Scalars['Int']
}

/** Edge of AuditTrail. */
export type AuditTrailEdge = {
    __typename?: 'AuditTrailEdge'
    node?: Maybe<AuditTrail>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AuditTrailPageInfo = {
    __typename?: 'AuditTrailPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** An resource representing a log line. */
export type ChangeLog = Node & {
    __typename?: 'ChangeLog'
    id: Scalars['ID']
    /** The moment this request was created */
    session?: Maybe<Scalars['String']>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
    action: Scalars['String']
    objectClass: Scalars['String']
    objectId?: Maybe<Scalars['String']>
    username?: Maybe<Scalars['String']>
    data?: Maybe<Scalars['Iterable']>
    version: Scalars['Int']
}

export type ChangeLogFilter_Order = {
    action?: Maybe<Scalars['String']>
    objectId?: Maybe<Scalars['String']>
    objectClass?: Maybe<Scalars['String']>
    version?: Maybe<Scalars['String']>
    username?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type ChangeLogFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ChangeLogFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for ChangeLog. */
export type ChangeLogConnection = {
    __typename?: 'ChangeLogConnection'
    edges?: Maybe<Array<Maybe<ChangeLogEdge>>>
    pageInfo: ChangeLogPageInfo
    totalCount: Scalars['Int']
}

/** Edge of ChangeLog. */
export type ChangeLogEdge = {
    __typename?: 'ChangeLogEdge'
    node?: Maybe<ChangeLog>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ChangeLogPageInfo = {
    __typename?: 'ChangeLogPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Mutation = {
    __typename?: 'Mutation'
    /** Deletes a Address. */
    deleteAddress?: Maybe<DeleteAddressPayload>
    /** Updates a Address. */
    updateAddress?: Maybe<UpdateAddressPayload>
    /** Creates a Address. */
    createAddress?: Maybe<CreateAddressPayload>
    /** Deletes a Availability. */
    deleteAvailability?: Maybe<DeleteAvailabilityPayload>
    /** Updates a Availability. */
    updateAvailability?: Maybe<UpdateAvailabilityPayload>
    /** Creates a Availability. */
    createAvailability?: Maybe<CreateAvailabilityPayload>
    /** Deletes a AvailabilityDay. */
    deleteAvailabilityDay?: Maybe<DeleteAvailabilityDayPayload>
    /** Updates a AvailabilityDay. */
    updateAvailabilityDay?: Maybe<UpdateAvailabilityDayPayload>
    /** Creates a AvailabilityDay. */
    createAvailabilityDay?: Maybe<CreateAvailabilityDayPayload>
    /** Deletes a CurrentEducationNoButDidFollow. */
    deleteCurrentEducationNoButDidFollow?: Maybe<DeleteCurrentEducationNoButDidFollowPayload>
    /** Updates a CurrentEducationNoButDidFollow. */
    updateCurrentEducationNoButDidFollow?: Maybe<UpdateCurrentEducationNoButDidFollowPayload>
    /** Creates a CurrentEducationNoButDidFollow. */
    createCurrentEducationNoButDidFollow?: Maybe<CreateCurrentEducationNoButDidFollowPayload>
    /** Deletes a CurrentEducationYes. */
    deleteCurrentEducationYes?: Maybe<DeleteCurrentEducationYesPayload>
    /** Updates a CurrentEducationYes. */
    updateCurrentEducationYes?: Maybe<UpdateCurrentEducationYesPayload>
    /** Creates a CurrentEducationYes. */
    createCurrentEducationYes?: Maybe<CreateCurrentEducationYesPayload>
    /** Creates a Document. */
    createDocument?: Maybe<CreateDocumentPayload>
    /** Updates a Document. */
    updateDocument?: Maybe<UpdateDocumentPayload>
    /** Removes a Document. */
    removeDocument?: Maybe<RemoveDocumentPayload>
    /** Creates a Employee. */
    createEmployee?: Maybe<CreateEmployeePayload>
    /** Updates a Employee. */
    updateEmployee?: Maybe<UpdateEmployeePayload>
    /** Removes a Employee. */
    removeEmployee?: Maybe<RemoveEmployeePayload>
    /** Creates a Group. */
    createGroup?: Maybe<CreateGroupPayload>
    /** Updates a Group. */
    updateGroup?: Maybe<UpdateGroupPayload>
    /** Removes a Group. */
    removeGroup?: Maybe<RemoveGroupPayload>
    /** ChangeTeachersOfThes a Group. */
    changeTeachersOfTheGroup?: Maybe<ChangeTeachersOfTheGroupPayload>
    /** Creates a LanguageHouse. */
    createLanguageHouse?: Maybe<CreateLanguageHousePayload>
    /** Updates a LanguageHouse. */
    updateLanguageHouse?: Maybe<UpdateLanguageHousePayload>
    /** Removes a LanguageHouse. */
    removeLanguageHouse?: Maybe<RemoveLanguageHousePayload>
    /** Creates a LearningNeed. */
    createLearningNeed?: Maybe<CreateLearningNeedPayload>
    /** Updates a LearningNeed. */
    updateLearningNeed?: Maybe<UpdateLearningNeedPayload>
    /** Removes a LearningNeed. */
    removeLearningNeed?: Maybe<RemoveLearningNeedPayload>
    /** Creates a Participation. */
    createParticipation?: Maybe<CreateParticipationPayload>
    /** Updates a Participation. */
    updateParticipation?: Maybe<UpdateParticipationPayload>
    /** Removes a Participation. */
    removeParticipation?: Maybe<RemoveParticipationPayload>
    /** AddMentorTos a Participation. */
    addMentorToParticipation?: Maybe<AddMentorToParticipationPayload>
    /** RemoveMentorFroms a Participation. */
    removeMentorFromParticipation?: Maybe<RemoveMentorFromParticipationPayload>
    /** UpdateMentors a Participation. */
    updateMentorParticipation?: Maybe<UpdateMentorParticipationPayload>
    /** AddGroupTos a Participation. */
    addGroupToParticipation?: Maybe<AddGroupToParticipationPayload>
    /** UpdateGroups a Participation. */
    updateGroupParticipation?: Maybe<UpdateGroupParticipationPayload>
    /** RemoveGroupFroms a Participation. */
    removeGroupFromParticipation?: Maybe<RemoveGroupFromParticipationPayload>
    /** Creates a Provider. */
    createProvider?: Maybe<CreateProviderPayload>
    /** Updates a Provider. */
    updateProvider?: Maybe<UpdateProviderPayload>
    /** Removes a Provider. */
    removeProvider?: Maybe<RemoveProviderPayload>
    /** Deletes a RegisterStudent. */
    deleteRegisterStudent?: Maybe<DeleteRegisterStudentPayload>
    /** Updates a RegisterStudent. */
    updateRegisterStudent?: Maybe<UpdateRegisterStudentPayload>
    /** Creates a RegisterStudent. */
    createRegisterStudent?: Maybe<CreateRegisterStudentPayload>
    /** Deletes a RegisterStudentRegistrar. */
    deleteRegisterStudentRegistrar?: Maybe<DeleteRegisterStudentRegistrarPayload>
    /** Updates a RegisterStudentRegistrar. */
    updateRegisterStudentRegistrar?: Maybe<UpdateRegisterStudentRegistrarPayload>
    /** Creates a RegisterStudentRegistrar. */
    createRegisterStudentRegistrar?: Maybe<CreateRegisterStudentRegistrarPayload>
    /** Creates a Registration. */
    createRegistration?: Maybe<CreateRegistrationPayload>
    /** Updates a Registration. */
    updateRegistration?: Maybe<UpdateRegistrationPayload>
    /** Removes a Registration. */
    removeRegistration?: Maybe<RemoveRegistrationPayload>
    /** Accepts a Registration. */
    acceptRegistration?: Maybe<AcceptRegistrationPayload>
    /** Creates a Report. */
    createReport?: Maybe<CreateReportPayload>
    /** DownloadParticipantss a Report. */
    downloadParticipantsReport?: Maybe<DownloadParticipantsReportPayload>
    /** Updates a Report. */
    updateReport?: Maybe<UpdateReportPayload>
    /** Removes a Report. */
    removeReport?: Maybe<RemoveReportPayload>
    /** Creates a Student. */
    createStudent?: Maybe<CreateStudentPayload>
    /** Updates a Student. */
    updateStudent?: Maybe<UpdateStudentPayload>
    /** Removes a Student. */
    removeStudent?: Maybe<RemoveStudentPayload>
    /** Deletes a StudentAvailability. */
    deleteStudentAvailability?: Maybe<DeleteStudentAvailabilityPayload>
    /** Updates a StudentAvailability. */
    updateStudentAvailability?: Maybe<UpdateStudentAvailabilityPayload>
    /** Creates a StudentAvailability. */
    createStudentAvailability?: Maybe<CreateStudentAvailabilityPayload>
    /** Deletes a StudentBackground. */
    deleteStudentBackground?: Maybe<DeleteStudentBackgroundPayload>
    /** Updates a StudentBackground. */
    updateStudentBackground?: Maybe<UpdateStudentBackgroundPayload>
    /** Creates a StudentBackground. */
    createStudentBackground?: Maybe<CreateStudentBackgroundPayload>
    /** Deletes a StudentCivicIntegration. */
    deleteStudentCivicIntegration?: Maybe<DeleteStudentCivicIntegrationPayload>
    /** Updates a StudentCivicIntegration. */
    updateStudentCivicIntegration?: Maybe<UpdateStudentCivicIntegrationPayload>
    /** Creates a StudentCivicIntegration. */
    createStudentCivicIntegration?: Maybe<CreateStudentCivicIntegrationPayload>
    /** Deletes a StudentContact. */
    deleteStudentContact?: Maybe<DeleteStudentContactPayload>
    /** Updates a StudentContact. */
    updateStudentContact?: Maybe<UpdateStudentContactPayload>
    /** Creates a StudentContact. */
    createStudentContact?: Maybe<CreateStudentContactPayload>
    /** Deletes a StudentCourse. */
    deleteStudentCourse?: Maybe<DeleteStudentCoursePayload>
    /** Updates a StudentCourse. */
    updateStudentCourse?: Maybe<UpdateStudentCoursePayload>
    /** Creates a StudentCourse. */
    createStudentCourse?: Maybe<CreateStudentCoursePayload>
    /** Creates a StudentDossierEvent. */
    createStudentDossierEvent?: Maybe<CreateStudentDossierEventPayload>
    /** Updates a StudentDossierEvent. */
    updateStudentDossierEvent?: Maybe<UpdateStudentDossierEventPayload>
    /** Removes a StudentDossierEvent. */
    removeStudentDossierEvent?: Maybe<RemoveStudentDossierEventPayload>
    /** Deletes a StudentDutchNT. */
    deleteStudentDutchNT?: Maybe<DeleteStudentDutchNtPayload>
    /** Updates a StudentDutchNT. */
    updateStudentDutchNT?: Maybe<UpdateStudentDutchNtPayload>
    /** Creates a StudentDutchNT. */
    createStudentDutchNT?: Maybe<CreateStudentDutchNtPayload>
    /** Deletes a StudentEducation. */
    deleteStudentEducation?: Maybe<DeleteStudentEducationPayload>
    /** Updates a StudentEducation. */
    updateStudentEducation?: Maybe<UpdateStudentEducationPayload>
    /** Creates a StudentEducation. */
    createStudentEducation?: Maybe<CreateStudentEducationPayload>
    /** Deletes a StudentGeneral. */
    deleteStudentGeneral?: Maybe<DeleteStudentGeneralPayload>
    /** Updates a StudentGeneral. */
    updateStudentGeneral?: Maybe<UpdateStudentGeneralPayload>
    /** Creates a StudentGeneral. */
    createStudentGeneral?: Maybe<CreateStudentGeneralPayload>
    /** Deletes a StudentIntakeDetail. */
    deleteStudentIntakeDetail?: Maybe<DeleteStudentIntakeDetailPayload>
    /** Updates a StudentIntakeDetail. */
    updateStudentIntakeDetail?: Maybe<UpdateStudentIntakeDetailPayload>
    /** Creates a StudentIntakeDetail. */
    createStudentIntakeDetail?: Maybe<CreateStudentIntakeDetailPayload>
    /** Deletes a StudentJob. */
    deleteStudentJob?: Maybe<DeleteStudentJobPayload>
    /** Updates a StudentJob. */
    updateStudentJob?: Maybe<UpdateStudentJobPayload>
    /** Creates a StudentJob. */
    createStudentJob?: Maybe<CreateStudentJobPayload>
    /** Deletes a StudentMotivation. */
    deleteStudentMotivation?: Maybe<DeleteStudentMotivationPayload>
    /** Updates a StudentMotivation. */
    updateStudentMotivation?: Maybe<UpdateStudentMotivationPayload>
    /** Creates a StudentMotivation. */
    createStudentMotivation?: Maybe<CreateStudentMotivationPayload>
    /** Deletes a StudentPermission. */
    deleteStudentPermission?: Maybe<DeleteStudentPermissionPayload>
    /** Updates a StudentPermission. */
    updateStudentPermission?: Maybe<UpdateStudentPermissionPayload>
    /** Creates a StudentPermission. */
    createStudentPermission?: Maybe<CreateStudentPermissionPayload>
    /** Deletes a StudentPerson. */
    deleteStudentPerson?: Maybe<DeleteStudentPersonPayload>
    /** Updates a StudentPerson. */
    updateStudentPerson?: Maybe<UpdateStudentPersonPayload>
    /** Creates a StudentPerson. */
    createStudentPerson?: Maybe<CreateStudentPersonPayload>
    /** Deletes a StudentReferrer. */
    deleteStudentReferrer?: Maybe<DeleteStudentReferrerPayload>
    /** Updates a StudentReferrer. */
    updateStudentReferrer?: Maybe<UpdateStudentReferrerPayload>
    /** Creates a StudentReferrer. */
    createStudentReferrer?: Maybe<CreateStudentReferrerPayload>
    /** Deletes a TestResult. */
    deleteTestResult?: Maybe<DeleteTestResultPayload>
    /** Updates a TestResult. */
    updateTestResult?: Maybe<UpdateTestResultPayload>
    /** Creates a TestResult. */
    createTestResult?: Maybe<CreateTestResultPayload>
    /** Creates a User. */
    createUser?: Maybe<CreateUserPayload>
    /** Updates a User. */
    updateUser?: Maybe<UpdateUserPayload>
    /** Removes a User. */
    removeUser?: Maybe<RemoveUserPayload>
    /** Logins a User. */
    loginUser?: Maybe<LoginUserPayload>
    /** RequestPasswordResets a User. */
    requestPasswordResetUser?: Maybe<RequestPasswordResetUserPayload>
    /** ResetPasswords a User. */
    resetPasswordUser?: Maybe<ResetPasswordUserPayload>
    /** Deletes a AuditTrail. */
    deleteAuditTrail?: Maybe<DeleteAuditTrailPayload>
    /** Updates a AuditTrail. */
    updateAuditTrail?: Maybe<UpdateAuditTrailPayload>
    /** Creates a AuditTrail. */
    createAuditTrail?: Maybe<CreateAuditTrailPayload>
    /** Deletes a ChangeLog. */
    deleteChangeLog?: Maybe<DeleteChangeLogPayload>
    /** Updates a ChangeLog. */
    updateChangeLog?: Maybe<UpdateChangeLogPayload>
    /** Creates a ChangeLog. */
    createChangeLog?: Maybe<CreateChangeLogPayload>
}

export type MutationDeleteAddressArgs = {
    input: DeleteAddressInput
}

export type MutationUpdateAddressArgs = {
    input: UpdateAddressInput
}

export type MutationCreateAddressArgs = {
    input: CreateAddressInput
}

export type MutationDeleteAvailabilityArgs = {
    input: DeleteAvailabilityInput
}

export type MutationUpdateAvailabilityArgs = {
    input: UpdateAvailabilityInput
}

export type MutationCreateAvailabilityArgs = {
    input: CreateAvailabilityInput
}

export type MutationDeleteAvailabilityDayArgs = {
    input: DeleteAvailabilityDayInput
}

export type MutationUpdateAvailabilityDayArgs = {
    input: UpdateAvailabilityDayInput
}

export type MutationCreateAvailabilityDayArgs = {
    input: CreateAvailabilityDayInput
}

export type MutationDeleteCurrentEducationNoButDidFollowArgs = {
    input: DeleteCurrentEducationNoButDidFollowInput
}

export type MutationUpdateCurrentEducationNoButDidFollowArgs = {
    input: UpdateCurrentEducationNoButDidFollowInput
}

export type MutationCreateCurrentEducationNoButDidFollowArgs = {
    input: CreateCurrentEducationNoButDidFollowInput
}

export type MutationDeleteCurrentEducationYesArgs = {
    input: DeleteCurrentEducationYesInput
}

export type MutationUpdateCurrentEducationYesArgs = {
    input: UpdateCurrentEducationYesInput
}

export type MutationCreateCurrentEducationYesArgs = {
    input: CreateCurrentEducationYesInput
}

export type MutationCreateDocumentArgs = {
    input: CreateDocumentInput
}

export type MutationUpdateDocumentArgs = {
    input: UpdateDocumentInput
}

export type MutationRemoveDocumentArgs = {
    input: RemoveDocumentInput
}

export type MutationCreateEmployeeArgs = {
    input: CreateEmployeeInput
}

export type MutationUpdateEmployeeArgs = {
    input: UpdateEmployeeInput
}

export type MutationRemoveEmployeeArgs = {
    input: RemoveEmployeeInput
}

export type MutationCreateGroupArgs = {
    input: CreateGroupInput
}

export type MutationUpdateGroupArgs = {
    input: UpdateGroupInput
}

export type MutationRemoveGroupArgs = {
    input: RemoveGroupInput
}

export type MutationChangeTeachersOfTheGroupArgs = {
    input: ChangeTeachersOfTheGroupInput
}

export type MutationCreateLanguageHouseArgs = {
    input: CreateLanguageHouseInput
}

export type MutationUpdateLanguageHouseArgs = {
    input: UpdateLanguageHouseInput
}

export type MutationRemoveLanguageHouseArgs = {
    input: RemoveLanguageHouseInput
}

export type MutationCreateLearningNeedArgs = {
    input: CreateLearningNeedInput
}

export type MutationUpdateLearningNeedArgs = {
    input: UpdateLearningNeedInput
}

export type MutationRemoveLearningNeedArgs = {
    input: RemoveLearningNeedInput
}

export type MutationCreateParticipationArgs = {
    input: CreateParticipationInput
}

export type MutationUpdateParticipationArgs = {
    input: UpdateParticipationInput
}

export type MutationRemoveParticipationArgs = {
    input: RemoveParticipationInput
}

export type MutationAddMentorToParticipationArgs = {
    input: AddMentorToParticipationInput
}

export type MutationRemoveMentorFromParticipationArgs = {
    input: RemoveMentorFromParticipationInput
}

export type MutationUpdateMentorParticipationArgs = {
    input: UpdateMentorParticipationInput
}

export type MutationAddGroupToParticipationArgs = {
    input: AddGroupToParticipationInput
}

export type MutationUpdateGroupParticipationArgs = {
    input: UpdateGroupParticipationInput
}

export type MutationRemoveGroupFromParticipationArgs = {
    input: RemoveGroupFromParticipationInput
}

export type MutationCreateProviderArgs = {
    input: CreateProviderInput
}

export type MutationUpdateProviderArgs = {
    input: UpdateProviderInput
}

export type MutationRemoveProviderArgs = {
    input: RemoveProviderInput
}

export type MutationDeleteRegisterStudentArgs = {
    input: DeleteRegisterStudentInput
}

export type MutationUpdateRegisterStudentArgs = {
    input: UpdateRegisterStudentInput
}

export type MutationCreateRegisterStudentArgs = {
    input: CreateRegisterStudentInput
}

export type MutationDeleteRegisterStudentRegistrarArgs = {
    input: DeleteRegisterStudentRegistrarInput
}

export type MutationUpdateRegisterStudentRegistrarArgs = {
    input: UpdateRegisterStudentRegistrarInput
}

export type MutationCreateRegisterStudentRegistrarArgs = {
    input: CreateRegisterStudentRegistrarInput
}

export type MutationCreateRegistrationArgs = {
    input: CreateRegistrationInput
}

export type MutationUpdateRegistrationArgs = {
    input: UpdateRegistrationInput
}

export type MutationRemoveRegistrationArgs = {
    input: RemoveRegistrationInput
}

export type MutationAcceptRegistrationArgs = {
    input: AcceptRegistrationInput
}

export type MutationCreateReportArgs = {
    input: CreateReportInput
}

export type MutationDownloadParticipantsReportArgs = {
    input: DownloadParticipantsReportInput
}

export type MutationUpdateReportArgs = {
    input: UpdateReportInput
}

export type MutationRemoveReportArgs = {
    input: RemoveReportInput
}

export type MutationCreateStudentArgs = {
    input: CreateStudentInput
}

export type MutationUpdateStudentArgs = {
    input: UpdateStudentInput
}

export type MutationRemoveStudentArgs = {
    input: RemoveStudentInput
}

export type MutationDeleteStudentAvailabilityArgs = {
    input: DeleteStudentAvailabilityInput
}

export type MutationUpdateStudentAvailabilityArgs = {
    input: UpdateStudentAvailabilityInput
}

export type MutationCreateStudentAvailabilityArgs = {
    input: CreateStudentAvailabilityInput
}

export type MutationDeleteStudentBackgroundArgs = {
    input: DeleteStudentBackgroundInput
}

export type MutationUpdateStudentBackgroundArgs = {
    input: UpdateStudentBackgroundInput
}

export type MutationCreateStudentBackgroundArgs = {
    input: CreateStudentBackgroundInput
}

export type MutationDeleteStudentCivicIntegrationArgs = {
    input: DeleteStudentCivicIntegrationInput
}

export type MutationUpdateStudentCivicIntegrationArgs = {
    input: UpdateStudentCivicIntegrationInput
}

export type MutationCreateStudentCivicIntegrationArgs = {
    input: CreateStudentCivicIntegrationInput
}

export type MutationDeleteStudentContactArgs = {
    input: DeleteStudentContactInput
}

export type MutationUpdateStudentContactArgs = {
    input: UpdateStudentContactInput
}

export type MutationCreateStudentContactArgs = {
    input: CreateStudentContactInput
}

export type MutationDeleteStudentCourseArgs = {
    input: DeleteStudentCourseInput
}

export type MutationUpdateStudentCourseArgs = {
    input: UpdateStudentCourseInput
}

export type MutationCreateStudentCourseArgs = {
    input: CreateStudentCourseInput
}

export type MutationCreateStudentDossierEventArgs = {
    input: CreateStudentDossierEventInput
}

export type MutationUpdateStudentDossierEventArgs = {
    input: UpdateStudentDossierEventInput
}

export type MutationRemoveStudentDossierEventArgs = {
    input: RemoveStudentDossierEventInput
}

export type MutationDeleteStudentDutchNtArgs = {
    input: DeleteStudentDutchNtInput
}

export type MutationUpdateStudentDutchNtArgs = {
    input: UpdateStudentDutchNtInput
}

export type MutationCreateStudentDutchNtArgs = {
    input: CreateStudentDutchNtInput
}

export type MutationDeleteStudentEducationArgs = {
    input: DeleteStudentEducationInput
}

export type MutationUpdateStudentEducationArgs = {
    input: UpdateStudentEducationInput
}

export type MutationCreateStudentEducationArgs = {
    input: CreateStudentEducationInput
}

export type MutationDeleteStudentGeneralArgs = {
    input: DeleteStudentGeneralInput
}

export type MutationUpdateStudentGeneralArgs = {
    input: UpdateStudentGeneralInput
}

export type MutationCreateStudentGeneralArgs = {
    input: CreateStudentGeneralInput
}

export type MutationDeleteStudentIntakeDetailArgs = {
    input: DeleteStudentIntakeDetailInput
}

export type MutationUpdateStudentIntakeDetailArgs = {
    input: UpdateStudentIntakeDetailInput
}

export type MutationCreateStudentIntakeDetailArgs = {
    input: CreateStudentIntakeDetailInput
}

export type MutationDeleteStudentJobArgs = {
    input: DeleteStudentJobInput
}

export type MutationUpdateStudentJobArgs = {
    input: UpdateStudentJobInput
}

export type MutationCreateStudentJobArgs = {
    input: CreateStudentJobInput
}

export type MutationDeleteStudentMotivationArgs = {
    input: DeleteStudentMotivationInput
}

export type MutationUpdateStudentMotivationArgs = {
    input: UpdateStudentMotivationInput
}

export type MutationCreateStudentMotivationArgs = {
    input: CreateStudentMotivationInput
}

export type MutationDeleteStudentPermissionArgs = {
    input: DeleteStudentPermissionInput
}

export type MutationUpdateStudentPermissionArgs = {
    input: UpdateStudentPermissionInput
}

export type MutationCreateStudentPermissionArgs = {
    input: CreateStudentPermissionInput
}

export type MutationDeleteStudentPersonArgs = {
    input: DeleteStudentPersonInput
}

export type MutationUpdateStudentPersonArgs = {
    input: UpdateStudentPersonInput
}

export type MutationCreateStudentPersonArgs = {
    input: CreateStudentPersonInput
}

export type MutationDeleteStudentReferrerArgs = {
    input: DeleteStudentReferrerInput
}

export type MutationUpdateStudentReferrerArgs = {
    input: UpdateStudentReferrerInput
}

export type MutationCreateStudentReferrerArgs = {
    input: CreateStudentReferrerInput
}

export type MutationDeleteTestResultArgs = {
    input: DeleteTestResultInput
}

export type MutationUpdateTestResultArgs = {
    input: UpdateTestResultInput
}

export type MutationCreateTestResultArgs = {
    input: CreateTestResultInput
}

export type MutationCreateUserArgs = {
    input: CreateUserInput
}

export type MutationUpdateUserArgs = {
    input: UpdateUserInput
}

export type MutationRemoveUserArgs = {
    input: RemoveUserInput
}

export type MutationLoginUserArgs = {
    input: LoginUserInput
}

export type MutationRequestPasswordResetUserArgs = {
    input: RequestPasswordResetUserInput
}

export type MutationResetPasswordUserArgs = {
    input: ResetPasswordUserInput
}

export type MutationDeleteAuditTrailArgs = {
    input: DeleteAuditTrailInput
}

export type MutationUpdateAuditTrailArgs = {
    input: UpdateAuditTrailInput
}

export type MutationCreateAuditTrailArgs = {
    input: CreateAuditTrailInput
}

export type MutationDeleteChangeLogArgs = {
    input: DeleteChangeLogInput
}

export type MutationUpdateChangeLogArgs = {
    input: UpdateChangeLogInput
}

export type MutationCreateChangeLogArgs = {
    input: CreateChangeLogInput
}

export type DeleteAddressInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteAddressPayload = {
    __typename?: 'deleteAddressPayload'
    address?: Maybe<Address>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateAddressInput = {
    id: Scalars['ID']
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateAddressPayload = {
    __typename?: 'updateAddressPayload'
    address?: Maybe<Address>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateAddressInput = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateAddressPayload = {
    __typename?: 'createAddressPayload'
    address?: Maybe<Address>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteAvailabilityInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteAvailabilityPayload = {
    __typename?: 'deleteAvailabilityPayload'
    availability?: Maybe<Availability>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateAvailabilityInput = {
    id: Scalars['ID']
    monday?: Maybe<Scalars['String']>
    tuesday?: Maybe<Scalars['String']>
    wednesday?: Maybe<Scalars['String']>
    thursday?: Maybe<Scalars['String']>
    friday?: Maybe<Scalars['String']>
    saturday?: Maybe<Scalars['String']>
    sunday?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateAvailabilityPayload = {
    __typename?: 'updateAvailabilityPayload'
    availability?: Maybe<Availability>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateAvailabilityInput = {
    monday: Scalars['String']
    tuesday: Scalars['String']
    wednesday: Scalars['String']
    thursday: Scalars['String']
    friday: Scalars['String']
    saturday: Scalars['String']
    sunday: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateAvailabilityPayload = {
    __typename?: 'createAvailabilityPayload'
    availability?: Maybe<Availability>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteAvailabilityDayInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteAvailabilityDayPayload = {
    __typename?: 'deleteAvailabilityDayPayload'
    availabilityDay?: Maybe<AvailabilityDay>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateAvailabilityDayInput = {
    id: Scalars['ID']
    morning?: Maybe<Scalars['Boolean']>
    afternoon?: Maybe<Scalars['Boolean']>
    evening?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateAvailabilityDayPayload = {
    __typename?: 'updateAvailabilityDayPayload'
    availabilityDay?: Maybe<AvailabilityDay>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateAvailabilityDayInput = {
    morning: Scalars['Boolean']
    afternoon: Scalars['Boolean']
    evening: Scalars['Boolean']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateAvailabilityDayPayload = {
    __typename?: 'createAvailabilityDayPayload'
    availabilityDay?: Maybe<AvailabilityDay>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteCurrentEducationNoButDidFollowInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteCurrentEducationNoButDidFollowPayload = {
    __typename?: 'deleteCurrentEducationNoButDidFollowPayload'
    currentEducationNoButDidFollow?: Maybe<CurrentEducationNoButDidFollow>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateCurrentEducationNoButDidFollowInput = {
    id: Scalars['ID']
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateCurrentEducationNoButDidFollowPayload = {
    __typename?: 'updateCurrentEducationNoButDidFollowPayload'
    currentEducationNoButDidFollow?: Maybe<CurrentEducationNoButDidFollow>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateCurrentEducationNoButDidFollowInput = {
    dateUntil?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    gotCertificate?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateCurrentEducationNoButDidFollowPayload = {
    __typename?: 'createCurrentEducationNoButDidFollowPayload'
    currentEducationNoButDidFollow?: Maybe<CurrentEducationNoButDidFollow>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteCurrentEducationYesInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteCurrentEducationYesPayload = {
    __typename?: 'deleteCurrentEducationYesPayload'
    currentEducationYes?: Maybe<CurrentEducationYes>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateCurrentEducationYesInput = {
    id: Scalars['ID']
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateCurrentEducationYesPayload = {
    __typename?: 'updateCurrentEducationYesPayload'
    currentEducationYes?: Maybe<CurrentEducationYes>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateCurrentEducationYesInput = {
    dateSince?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    doesProvideCertificate?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateCurrentEducationYesPayload = {
    __typename?: 'createCurrentEducationYesPayload'
    currentEducationYes?: Maybe<CurrentEducationYes>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateDocumentInput = {
    base64Data: Scalars['String']
    /** the name of the file */
    filename: Scalars['String']
    resource: Scalars['String']
    aanbiederEmployeeId?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    aanbiederEmployeeDocumentId?: Maybe<Scalars['String']>
    studentDocumentId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateDocumentPayload = {
    __typename?: 'createDocumentPayload'
    document?: Maybe<Document>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateDocumentInput = {
    id: Scalars['ID']
    base64Data?: Maybe<Scalars['String']>
    /** the name of the file */
    filename?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    aanbiederEmployeeId?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    aanbiederEmployeeDocumentId?: Maybe<Scalars['String']>
    studentDocumentId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateDocumentPayload = {
    __typename?: 'updateDocumentPayload'
    document?: Maybe<Document>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveDocumentInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveDocumentPayload = {
    __typename?: 'removeDocumentPayload'
    document?: Maybe<Document>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateEmployeeInput = {
    /** The Name of this Employee. */
    givenName: Scalars['String']
    /** The PrefixName of this Employee. */
    additionalName?: Maybe<Scalars['String']>
    /** The LastName of this Employee. */
    familyName: Scalars['String']
    /** The Telephone of this Employee. */
    telephone?: Maybe<Scalars['String']>
    /** The Availability Note of this Employee. */
    availabilityNotes?: Maybe<Scalars['String']>
    /** The Email of this Employee. */
    email: Scalars['String']
    /** The Gender of this Employee. **Male**, **Female**, **X** */
    gender?: Maybe<Scalars['String']>
    /** Date of birth of this Employee. */
    dateOfBirth?: Maybe<Scalars['String']>
    /** Contact Telephone of this Employee. */
    contactTelephone?: Maybe<Scalars['String']>
    /** Contact Preference of this Employee.**PHONECALL**, **WHATSAPP**, **EMAIL**, **OTHER** */
    contactPreference?: Maybe<Scalars['String']>
    /** Target Preference of this Employee. **NT1**, **NT2** */
    targetGroupPreferences?: Maybe<Scalars['Iterable']>
    /**
     * Volunteering Preference of this Employee.
     *
     *  @Assert\Length(
     *     max = 255
     * )
     */
    volunteeringPreference?: Maybe<Scalars['String']>
    /** The address of this Employee. */
    address?: Maybe<Scalars['Iterable']>
    userGroupIds?: Maybe<Scalars['Iterable']>
    contactPreferenceOther?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    /** Shouldn't this be a string to provide the reason for the experience with the target group? */
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<Scalars['String']>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<Scalars['String']>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<Scalars['String']>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    /** Whether the employee has submitted a police certificate */
    isVOGChecked?: Maybe<Scalars['Boolean']>
    /** The provider this employee works for */
    providerId?: Maybe<Scalars['String']>
    /** The language house this employee works for */
    languageHouseId?: Maybe<Scalars['String']>
    /** The availability for this employee */
    availability?: Maybe<Scalars['Iterable']>
    currentEducationYes?: Maybe<Scalars['Iterable']>
    currentEducationNoButDidFollow?: Maybe<Scalars['Iterable']>
    biscEmployeeId?: Maybe<Scalars['String']>
    userGroupId?: Maybe<Scalars['String']>
    userId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateEmployeePayload = {
    __typename?: 'createEmployeePayload'
    employee?: Maybe<Employee>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateEmployeeInput = {
    id: Scalars['ID']
    /** The Name of this Employee. */
    givenName?: Maybe<Scalars['String']>
    /** The PrefixName of this Employee. */
    additionalName?: Maybe<Scalars['String']>
    /** The LastName of this Employee. */
    familyName?: Maybe<Scalars['String']>
    /** The Telephone of this Employee. */
    telephone?: Maybe<Scalars['String']>
    /** The Availability Note of this Employee. */
    availabilityNotes?: Maybe<Scalars['String']>
    /** The Email of this Employee. */
    email?: Maybe<Scalars['String']>
    /** The Gender of this Employee. **Male**, **Female**, **X** */
    gender?: Maybe<Scalars['String']>
    /** Date of birth of this Employee. */
    dateOfBirth?: Maybe<Scalars['String']>
    /** Contact Telephone of this Employee. */
    contactTelephone?: Maybe<Scalars['String']>
    /** Contact Preference of this Employee.**PHONECALL**, **WHATSAPP**, **EMAIL**, **OTHER** */
    contactPreference?: Maybe<Scalars['String']>
    /** Target Preference of this Employee. **NT1**, **NT2** */
    targetGroupPreferences?: Maybe<Scalars['Iterable']>
    /**
     * Volunteering Preference of this Employee.
     *
     *  @Assert\Length(
     *     max = 255
     * )
     */
    volunteeringPreference?: Maybe<Scalars['String']>
    /** The address of this Employee. */
    address?: Maybe<Scalars['Iterable']>
    userGroupIds?: Maybe<Scalars['Iterable']>
    contactPreferenceOther?: Maybe<Scalars['String']>
    gotHereVia?: Maybe<Scalars['String']>
    hasExperienceWithTargetGroup?: Maybe<Scalars['Boolean']>
    /** Shouldn't this be a string to provide the reason for the experience with the target group? */
    experienceWithTargetGroupYesReason?: Maybe<Scalars['Boolean']>
    currentEducation?: Maybe<Scalars['String']>
    doesCurrentlyFollowCourse?: Maybe<Scalars['Boolean']>
    currentlyFollowingCourseName?: Maybe<Scalars['String']>
    currentlyFollowingCourseInstitute?: Maybe<Scalars['String']>
    currentlyFollowingCourseTeacherProfessionalism?: Maybe<Scalars['String']>
    currentlyFollowingCourseCourseProfessionalism?: Maybe<Scalars['String']>
    doesCurrentlyFollowingCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    otherRelevantCertificates?: Maybe<Scalars['String']>
    /** Whether the employee has submitted a police certificate */
    isVOGChecked?: Maybe<Scalars['Boolean']>
    /** The provider this employee works for */
    providerId?: Maybe<Scalars['String']>
    /** The language house this employee works for */
    languageHouseId?: Maybe<Scalars['String']>
    /** The availability for this employee */
    availability?: Maybe<Scalars['Iterable']>
    currentEducationYes?: Maybe<Scalars['Iterable']>
    currentEducationNoButDidFollow?: Maybe<Scalars['Iterable']>
    biscEmployeeId?: Maybe<Scalars['String']>
    userGroupId?: Maybe<Scalars['String']>
    userId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateEmployeePayload = {
    __typename?: 'updateEmployeePayload'
    employee?: Maybe<Employee>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveEmployeeInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveEmployeePayload = {
    __typename?: 'removeEmployeePayload'
    employee?: Maybe<Employee>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateGroupInput = {
    name?: Maybe<Scalars['String']>
    typeCourse?: Maybe<Scalars['String']>
    outComesGoal?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['String']>
    detailsTotalClassHours?: Maybe<Scalars['Int']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation?: Maybe<Scalars['String']>
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    aanbiederEmployeeIds?: Maybe<Scalars['Iterable']>
    outComesTopic?: Maybe<Scalars['String']>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<Scalars['String']>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevelOther?: Maybe<Scalars['String']>
    availability?: Maybe<Scalars['Iterable']>
    outComesLevel?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    groupId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateGroupPayload = {
    __typename?: 'createGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateGroupInput = {
    id: Scalars['ID']
    name?: Maybe<Scalars['String']>
    typeCourse?: Maybe<Scalars['String']>
    outComesGoal?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['String']>
    detailsTotalClassHours?: Maybe<Scalars['Int']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    availabilityNotes?: Maybe<Scalars['String']>
    generalLocation?: Maybe<Scalars['String']>
    generalParticipantsMin?: Maybe<Scalars['Int']>
    generalParticipantsMax?: Maybe<Scalars['Int']>
    generalEvaluation?: Maybe<Scalars['String']>
    aanbiederEmployeeIds?: Maybe<Scalars['Iterable']>
    outComesTopic?: Maybe<Scalars['String']>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<Scalars['String']>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevelOther?: Maybe<Scalars['String']>
    availability?: Maybe<Scalars['Iterable']>
    outComesLevel?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    groupId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateGroupPayload = {
    __typename?: 'updateGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveGroupInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveGroupPayload = {
    __typename?: 'removeGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

export type ChangeTeachersOfTheGroupInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type ChangeTeachersOfTheGroupPayload = {
    __typename?: 'changeTeachersOfTheGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateLanguageHouseInput = {
    /** The Name of this Taalhuis. */
    name: Scalars['String']
    /** The Telephone of this Provider. */
    phoneNumber?: Maybe<Scalars['String']>
    /** The Email of this Provider. */
    email?: Maybe<Scalars['String']>
    /** The address of this Taalhuis. */
    address?: Maybe<Scalars['Iterable']>
    /** Type LanguageHouse */
    type?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateLanguageHousePayload = {
    __typename?: 'createLanguageHousePayload'
    languageHouse?: Maybe<LanguageHouse>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateLanguageHouseInput = {
    id: Scalars['ID']
    /** The Name of this Taalhuis. */
    name?: Maybe<Scalars['String']>
    /** The Telephone of this Provider. */
    phoneNumber?: Maybe<Scalars['String']>
    /** The Email of this Provider. */
    email?: Maybe<Scalars['String']>
    /** The address of this Taalhuis. */
    address?: Maybe<Scalars['Iterable']>
    /** Type LanguageHouse */
    type?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateLanguageHousePayload = {
    __typename?: 'updateLanguageHousePayload'
    languageHouse?: Maybe<LanguageHouse>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveLanguageHouseInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveLanguageHousePayload = {
    __typename?: 'removeLanguageHousePayload'
    languageHouse?: Maybe<LanguageHouse>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateLearningNeedInput = {
    learningNeedDescription: Scalars['String']
    learningNeedMotivation: Scalars['String']
    desiredOutComesGoal: Scalars['String']
    desiredOutComesTopic: Scalars['String']
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication: Scalars['String']
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel: Scalars['String']
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer: Scalars['String']
    offerAdvisedOffer: Scalars['String']
    offerDifference: Scalars['String']
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
    participations?: Maybe<Scalars['Iterable']>
    studentId?: Maybe<Scalars['String']>
    /** The id of the objectEntity of an eav/learning_need. */
    learningNeedId?: Maybe<Scalars['String']>
    /** The url of the objectEntity of an eav/learning_need '@eav'. */
    learningNeedUrl?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateLearningNeedPayload = {
    __typename?: 'createLearningNeedPayload'
    learningNeed?: Maybe<LearningNeed>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateLearningNeedInput = {
    id: Scalars['ID']
    learningNeedDescription?: Maybe<Scalars['String']>
    learningNeedMotivation?: Maybe<Scalars['String']>
    desiredOutComesGoal?: Maybe<Scalars['String']>
    desiredOutComesTopic?: Maybe<Scalars['String']>
    desiredOutComesTopicOther?: Maybe<Scalars['String']>
    desiredOutComesApplication?: Maybe<Scalars['String']>
    desiredOutComesApplicationOther?: Maybe<Scalars['String']>
    desiredOutComesLevel?: Maybe<Scalars['String']>
    desiredOutComesLevelOther?: Maybe<Scalars['String']>
    offerDesiredOffer?: Maybe<Scalars['String']>
    offerAdvisedOffer?: Maybe<Scalars['String']>
    offerDifference?: Maybe<Scalars['String']>
    offerDifferenceOther?: Maybe<Scalars['String']>
    offerEngagements?: Maybe<Scalars['String']>
    participations?: Maybe<Scalars['Iterable']>
    studentId?: Maybe<Scalars['String']>
    /** The id of the objectEntity of an eav/learning_need. */
    learningNeedId?: Maybe<Scalars['String']>
    /** The url of the objectEntity of an eav/learning_need '@eav'. */
    learningNeedUrl?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateLearningNeedPayload = {
    __typename?: 'updateLearningNeedPayload'
    learningNeed?: Maybe<LearningNeed>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveLearningNeedInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveLearningNeedPayload = {
    __typename?: 'removeLearningNeedPayload'
    learningNeed?: Maybe<LearningNeed>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateParticipationInput = {
    status?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<Scalars['String']>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<Scalars['String']>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<Scalars['String']>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<Scalars['String']>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<Scalars['String']>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    detailsEngagements?: Maybe<Scalars['String']>
    /** The id of the objectEntity of an eav/learning_need. */
    learningNeedId?: Maybe<Scalars['String']>
    /** The url of the objectEntity of an eav/learning_need '@eav'. */
    learningNeedUrl?: Maybe<Scalars['String']>
    participationId?: Maybe<Scalars['String']>
    presenceEngagements?: Maybe<Scalars['String']>
    presenceStartDate?: Maybe<Scalars['String']>
    presenceEndDate?: Maybe<Scalars['String']>
    presenceEndParticipationReason?: Maybe<Scalars['String']>
    aanbiederEmployeeId?: Maybe<Scalars['String']>
    groupId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateParticipationPayload = {
    __typename?: 'createParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateParticipationInput = {
    id: Scalars['ID']
    status?: Maybe<Scalars['String']>
    aanbiederId?: Maybe<Scalars['String']>
    aanbiederName?: Maybe<Scalars['String']>
    aanbiederNote?: Maybe<Scalars['String']>
    offerName?: Maybe<Scalars['String']>
    offerCourse?: Maybe<Scalars['String']>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<Scalars['String']>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<Scalars['String']>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<Scalars['String']>
    outComesLevelOther?: Maybe<Scalars['String']>
    detailsIsFormal?: Maybe<Scalars['Boolean']>
    detailsGroupFormation?: Maybe<Scalars['String']>
    detailsTotalClassHours?: Maybe<Scalars['Float']>
    detailsCertificateWillBeAwarded?: Maybe<Scalars['Boolean']>
    detailsStartDate?: Maybe<Scalars['String']>
    detailsEndDate?: Maybe<Scalars['String']>
    detailsEngagements?: Maybe<Scalars['String']>
    /** The id of the objectEntity of an eav/learning_need. */
    learningNeedId?: Maybe<Scalars['String']>
    /** The url of the objectEntity of an eav/learning_need '@eav'. */
    learningNeedUrl?: Maybe<Scalars['String']>
    participationId?: Maybe<Scalars['String']>
    presenceEngagements?: Maybe<Scalars['String']>
    presenceStartDate?: Maybe<Scalars['String']>
    presenceEndDate?: Maybe<Scalars['String']>
    presenceEndParticipationReason?: Maybe<Scalars['String']>
    aanbiederEmployeeId?: Maybe<Scalars['String']>
    groupId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateParticipationPayload = {
    __typename?: 'updateParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveParticipationInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveParticipationPayload = {
    __typename?: 'removeParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type AddMentorToParticipationInput = {
    participationId: Scalars['ID']
    aanbiederEmployeeId: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type AddMentorToParticipationPayload = {
    __typename?: 'addMentorToParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveMentorFromParticipationInput = {
    participationId: Scalars['ID']
    aanbiederEmployeeId: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveMentorFromParticipationPayload = {
    __typename?: 'removeMentorFromParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateMentorParticipationInput = {
    participationId: Scalars['ID']
    presenceEngagements?: Maybe<Scalars['String']>
    presenceStartDate?: Maybe<Scalars['String']>
    presenceEndDate?: Maybe<Scalars['String']>
    presenceEndParticipationReason?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateMentorParticipationPayload = {
    __typename?: 'updateMentorParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type AddGroupToParticipationInput = {
    participationId: Scalars['ID']
    groupId: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type AddGroupToParticipationPayload = {
    __typename?: 'addGroupToParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateGroupParticipationInput = {
    participationId: Scalars['ID']
    presenceEngagements?: Maybe<Scalars['String']>
    presenceStartDate?: Maybe<Scalars['String']>
    presenceEndDate?: Maybe<Scalars['String']>
    presenceEndParticipationReason?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateGroupParticipationPayload = {
    __typename?: 'updateGroupParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveGroupFromParticipationInput = {
    participationId: Scalars['ID']
    groupId: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveGroupFromParticipationPayload = {
    __typename?: 'removeGroupFromParticipationPayload'
    participation?: Maybe<Participation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateProviderInput = {
    /** The Name of this Provider. */
    name: Scalars['String']
    /** The Telephone of this Provider. */
    phoneNumber?: Maybe<Scalars['String']>
    /** The Email of this Provider. */
    email?: Maybe<Scalars['String']>
    /** The address of this Aanbieder. */
    address?: Maybe<Scalars['Iterable']>
    /** Type Aanbieder */
    type?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateProviderPayload = {
    __typename?: 'createProviderPayload'
    provider?: Maybe<Provider>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateProviderInput = {
    id: Scalars['ID']
    /** The Name of this Provider. */
    name?: Maybe<Scalars['String']>
    /** The Telephone of this Provider. */
    phoneNumber?: Maybe<Scalars['String']>
    /** The Email of this Provider. */
    email?: Maybe<Scalars['String']>
    /** The address of this Aanbieder. */
    address?: Maybe<Scalars['Iterable']>
    /** Type Aanbieder */
    type?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateProviderPayload = {
    __typename?: 'updateProviderPayload'
    provider?: Maybe<Provider>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveProviderInput = {
    id: Scalars['ID']
    /** The Name of this Provider. */
    name: Scalars['String']
    /** The Telephone of this Provider. */
    phoneNumber?: Maybe<Scalars['String']>
    /** The Email of this Provider. */
    email?: Maybe<Scalars['String']>
    /** The address of this Aanbieder. */
    address?: Maybe<Scalars['Iterable']>
    /** Type Aanbieder */
    type?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveProviderPayload = {
    __typename?: 'removeProviderPayload'
    provider?: Maybe<Provider>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteRegisterStudentInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteRegisterStudentPayload = {
    __typename?: 'deleteRegisterStudentPayload'
    registerStudent?: Maybe<RegisterStudent>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateRegisterStudentInput = {
    id: Scalars['ID']
    address?: Maybe<Array<Maybe<Scalars['String']>>>
    givenName?: Maybe<Scalars['String']>
    additionalName?: Maybe<Scalars['String']>
    familyName?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateRegisterStudentPayload = {
    __typename?: 'updateRegisterStudentPayload'
    registerStudent?: Maybe<RegisterStudent>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateRegisterStudentInput = {
    address?: Maybe<Array<Maybe<Scalars['String']>>>
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateRegisterStudentPayload = {
    __typename?: 'createRegisterStudentPayload'
    registerStudent?: Maybe<RegisterStudent>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteRegisterStudentRegistrarInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteRegisterStudentRegistrarPayload = {
    __typename?: 'deleteRegisterStudentRegistrarPayload'
    registerStudentRegistrar?: Maybe<RegisterStudentRegistrar>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateRegisterStudentRegistrarInput = {
    id: Scalars['ID']
    organizationName?: Maybe<Scalars['String']>
    givenName?: Maybe<Scalars['String']>
    additionalName?: Maybe<Scalars['String']>
    familyName?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateRegisterStudentRegistrarPayload = {
    __typename?: 'updateRegisterStudentRegistrarPayload'
    registerStudentRegistrar?: Maybe<RegisterStudentRegistrar>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateRegisterStudentRegistrarInput = {
    organizationName: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateRegisterStudentRegistrarPayload = {
    __typename?: 'createRegisterStudentRegistrarPayload'
    registerStudentRegistrar?: Maybe<RegisterStudentRegistrar>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateRegistrationInput = {
    languageHouseId: Scalars['String']
    memo?: Maybe<Scalars['String']>
    student?: Maybe<Scalars['String']>
    registrar?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateRegistrationPayload = {
    __typename?: 'createRegistrationPayload'
    registration?: Maybe<Registration>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateRegistrationInput = {
    id: Scalars['ID']
    languageHouseId?: Maybe<Scalars['String']>
    memo?: Maybe<Scalars['String']>
    student?: Maybe<Scalars['String']>
    registrar?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateRegistrationPayload = {
    __typename?: 'updateRegistrationPayload'
    registration?: Maybe<Registration>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveRegistrationInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveRegistrationPayload = {
    __typename?: 'removeRegistrationPayload'
    registration?: Maybe<Registration>
    clientMutationId?: Maybe<Scalars['String']>
}

export type AcceptRegistrationInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type AcceptRegistrationPayload = {
    __typename?: 'acceptRegistrationPayload'
    registration?: Maybe<Registration>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateReportInput = {
    /** The language house the report applies to */
    languageHouseId?: Maybe<Scalars['String']>
    /** The provider this report applies to */
    providerId?: Maybe<Scalars['String']>
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
    /** The filename of the report */
    filename?: Maybe<Scalars['String']>
    /** A base64 encoded string containing the file's contents */
    base64data?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateReportPayload = {
    __typename?: 'createReportPayload'
    report?: Maybe<Report>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DownloadParticipantsReportInput = {
    languageHouseId?: Maybe<Scalars['String']>
    providerId?: Maybe<Scalars['String']>
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DownloadParticipantsReportPayload = {
    __typename?: 'downloadParticipantsReportPayload'
    report?: Maybe<Report>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateReportInput = {
    id: Scalars['ID']
    /** The language house the report applies to */
    languageHouseId?: Maybe<Scalars['String']>
    /** The provider this report applies to */
    providerId?: Maybe<Scalars['String']>
    dateFrom?: Maybe<Scalars['String']>
    dateUntil?: Maybe<Scalars['String']>
    /** The filename of the report */
    filename?: Maybe<Scalars['String']>
    /** A base64 encoded string containing the file's contents */
    base64data?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateReportPayload = {
    __typename?: 'updateReportPayload'
    report?: Maybe<Report>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveReportInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveReportPayload = {
    __typename?: 'removeReportPayload'
    report?: Maybe<Report>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentInput = {
    status?: Maybe<Scalars['String']>
    memo?: Maybe<Scalars['String']>
    registrar?: Maybe<Scalars['Iterable']>
    civicIntegrationDetails?: Maybe<Scalars['Iterable']>
    personDetails?: Maybe<Scalars['Iterable']>
    contactDetails?: Maybe<Scalars['Iterable']>
    generalDetails?: Maybe<Scalars['Iterable']>
    referrerDetails?: Maybe<Scalars['Iterable']>
    backgroundDetails?: Maybe<Scalars['Iterable']>
    dutchNTDetails?: Maybe<Scalars['Iterable']>
    speakingLevel?: Maybe<Scalars['String']>
    educationDetails?: Maybe<Scalars['Iterable']>
    courseDetails?: Maybe<Scalars['Iterable']>
    jobDetails?: Maybe<Scalars['Iterable']>
    motivationDetails?: Maybe<Scalars['Iterable']>
    availabilityDetails?: Maybe<Scalars['Iterable']>
    readingTestResult?: Maybe<Scalars['String']>
    writingTestResult?: Maybe<Scalars['String']>
    permissionDetails?: Maybe<Scalars['Iterable']>
    intakeDetails?: Maybe<Scalars['String']>
    languageHouseId?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentPayload = {
    __typename?: 'createStudentPayload'
    student?: Maybe<Student>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentInput = {
    id: Scalars['ID']
    status?: Maybe<Scalars['String']>
    memo?: Maybe<Scalars['String']>
    registrar?: Maybe<Scalars['Iterable']>
    civicIntegrationDetails?: Maybe<Scalars['Iterable']>
    personDetails?: Maybe<Scalars['Iterable']>
    contactDetails?: Maybe<Scalars['Iterable']>
    generalDetails?: Maybe<Scalars['Iterable']>
    referrerDetails?: Maybe<Scalars['Iterable']>
    backgroundDetails?: Maybe<Scalars['Iterable']>
    dutchNTDetails?: Maybe<Scalars['Iterable']>
    speakingLevel?: Maybe<Scalars['String']>
    educationDetails?: Maybe<Scalars['Iterable']>
    courseDetails?: Maybe<Scalars['Iterable']>
    jobDetails?: Maybe<Scalars['Iterable']>
    motivationDetails?: Maybe<Scalars['Iterable']>
    availabilityDetails?: Maybe<Scalars['Iterable']>
    readingTestResult?: Maybe<Scalars['String']>
    writingTestResult?: Maybe<Scalars['String']>
    permissionDetails?: Maybe<Scalars['Iterable']>
    intakeDetails?: Maybe<Scalars['String']>
    languageHouseId?: Maybe<Scalars['String']>
    studentId?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentPayload = {
    __typename?: 'updateStudentPayload'
    student?: Maybe<Student>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveStudentInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveStudentPayload = {
    __typename?: 'removeStudentPayload'
    student?: Maybe<Student>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentAvailabilityInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentAvailabilityPayload = {
    __typename?: 'deleteStudentAvailabilityPayload'
    studentAvailability?: Maybe<StudentAvailability>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentAvailabilityInput = {
    id: Scalars['ID']
    availability?: Maybe<Scalars['String']>
    availabilityNotes?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentAvailabilityPayload = {
    __typename?: 'updateStudentAvailabilityPayload'
    studentAvailability?: Maybe<StudentAvailability>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentAvailabilityInput = {
    availability?: Maybe<Scalars['String']>
    availabilityNotes?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentAvailabilityPayload = {
    __typename?: 'createStudentAvailabilityPayload'
    studentAvailability?: Maybe<StudentAvailability>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentBackgroundInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentBackgroundPayload = {
    __typename?: 'deleteStudentBackgroundPayload'
    studentBackground?: Maybe<StudentBackground>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentBackgroundInput = {
    id: Scalars['ID']
    foundVia?: Maybe<Scalars['String']>
    foundViaOther?: Maybe<Scalars['String']>
    wentToTaalhuisBefore?: Maybe<Scalars['Boolean']>
    wentToTaalhuisBeforeReason?: Maybe<Scalars['String']>
    wentToTaalhuisBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Scalars['Iterable']>
    participationLadder?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentBackgroundPayload = {
    __typename?: 'updateStudentBackgroundPayload'
    studentBackground?: Maybe<StudentBackground>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentBackgroundInput = {
    foundVia?: Maybe<Scalars['String']>
    foundViaOther?: Maybe<Scalars['String']>
    wentToTaalhuisBefore?: Maybe<Scalars['Boolean']>
    wentToTaalhuisBeforeReason?: Maybe<Scalars['String']>
    wentToTaalhuisBeforeYear?: Maybe<Scalars['Float']>
    network?: Maybe<Scalars['Iterable']>
    participationLadder?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentBackgroundPayload = {
    __typename?: 'createStudentBackgroundPayload'
    studentBackground?: Maybe<StudentBackground>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentCivicIntegrationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentCivicIntegrationPayload = {
    __typename?: 'deleteStudentCivicIntegrationPayload'
    studentCivicIntegration?: Maybe<StudentCivicIntegration>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentCivicIntegrationInput = {
    id: Scalars['ID']
    civicIntegrationRequirement?: Maybe<Scalars['String']>
    civicIntegrationRequirementReason?: Maybe<Scalars['String']>
    civivIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentCivicIntegrationPayload = {
    __typename?: 'updateStudentCivicIntegrationPayload'
    studentCivicIntegration?: Maybe<StudentCivicIntegration>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentCivicIntegrationInput = {
    civicIntegrationRequirement?: Maybe<Scalars['String']>
    civicIntegrationRequirementReason?: Maybe<Scalars['String']>
    civivIntegrationRequirementFinishDate?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentCivicIntegrationPayload = {
    __typename?: 'createStudentCivicIntegrationPayload'
    studentCivicIntegration?: Maybe<StudentCivicIntegration>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentContactInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentContactPayload = {
    __typename?: 'deleteStudentContactPayload'
    studentContact?: Maybe<StudentContact>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentContactInput = {
    id: Scalars['ID']
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    contactPersonTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<Scalars['String']>
    contactPreferenceOther?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentContactPayload = {
    __typename?: 'updateStudentContactPayload'
    studentContact?: Maybe<StudentContact>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentContactInput = {
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    contactPersonTelephone?: Maybe<Scalars['String']>
    contactPreference?: Maybe<Scalars['String']>
    contactPreferenceOther?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentContactPayload = {
    __typename?: 'createStudentContactPayload'
    studentContact?: Maybe<StudentContact>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentCourseInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentCoursePayload = {
    __typename?: 'deleteStudentCoursePayload'
    studentCourse?: Maybe<StudentCourse>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentCourseInput = {
    id: Scalars['ID']
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<Scalars['String']>
    courseGroup?: Maybe<Scalars['String']>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentCoursePayload = {
    __typename?: 'updateStudentCoursePayload'
    studentCourse?: Maybe<StudentCourse>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentCourseInput = {
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<Scalars['String']>
    courseGroup?: Maybe<Scalars['String']>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentCoursePayload = {
    __typename?: 'createStudentCoursePayload'
    studentCourse?: Maybe<StudentCourse>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentDossierEventInput = {
    /** The Event of this Student. */
    event: Scalars['String']
    /** date of this student Dossier. */
    eventDate: Scalars['String']
    /** description of this student Dossier. */
    eventDescription: Scalars['String']
    /** studentId of this student Dossier. */
    studentId: Scalars['String']
    studentDossierEventId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentDossierEventPayload = {
    __typename?: 'createStudentDossierEventPayload'
    studentDossierEvent?: Maybe<StudentDossierEvent>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentDossierEventInput = {
    id: Scalars['ID']
    /** The Event of this Student. */
    event?: Maybe<Scalars['String']>
    /** date of this student Dossier. */
    eventDate?: Maybe<Scalars['String']>
    /** description of this student Dossier. */
    eventDescription?: Maybe<Scalars['String']>
    /** studentId of this student Dossier. */
    studentId?: Maybe<Scalars['String']>
    studentDossierEventId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentDossierEventPayload = {
    __typename?: 'updateStudentDossierEventPayload'
    studentDossierEvent?: Maybe<StudentDossierEvent>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveStudentDossierEventInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveStudentDossierEventPayload = {
    __typename?: 'removeStudentDossierEventPayload'
    studentDossierEvent?: Maybe<StudentDossierEvent>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentDutchNtInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentDutchNtPayload = {
    __typename?: 'deleteStudentDutchNTPayload'
    studentDutchNT?: Maybe<StudentDutchNt>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentDutchNtInput = {
    id: Scalars['ID']
    dutchNTLevel?: Maybe<Scalars['String']>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentDutchNtPayload = {
    __typename?: 'updateStudentDutchNTPayload'
    studentDutchNT?: Maybe<StudentDutchNt>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentDutchNtInput = {
    dutchNTLevel?: Maybe<Scalars['String']>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentDutchNtPayload = {
    __typename?: 'createStudentDutchNTPayload'
    studentDutchNT?: Maybe<StudentDutchNt>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentEducationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentEducationPayload = {
    __typename?: 'deleteStudentEducationPayload'
    studentEducation?: Maybe<StudentEducation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentEducationInput = {
    id: Scalars['ID']
    lastFollowedEducation?: Maybe<Scalars['String']>
    didGraduate?: Maybe<Scalars['Boolean']>
    followingEducationRightNow?: Maybe<Scalars['String']>
    followingEducationRightNowYesStartDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesLevel?: Maybe<Scalars['String']>
    followingEducationRightNowYesInstitute?: Maybe<Scalars['String']>
    followingEducationRightNowYesProvidesCertificate?: Maybe<Scalars['Boolean']>
    followingEducationRightNowNoEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowNoLevel?: Maybe<Scalars['String']>
    followingEducationRightNowNoGotCertificate?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentEducationPayload = {
    __typename?: 'updateStudentEducationPayload'
    studentEducation?: Maybe<StudentEducation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentEducationInput = {
    lastFollowedEducation?: Maybe<Scalars['String']>
    didGraduate?: Maybe<Scalars['Boolean']>
    followingEducationRightNow?: Maybe<Scalars['String']>
    followingEducationRightNowYesStartDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesLevel?: Maybe<Scalars['String']>
    followingEducationRightNowYesInstitute?: Maybe<Scalars['String']>
    followingEducationRightNowYesProvidesCertificate?: Maybe<Scalars['Boolean']>
    followingEducationRightNowNoEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowNoLevel?: Maybe<Scalars['String']>
    followingEducationRightNowNoGotCertificate?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentEducationPayload = {
    __typename?: 'createStudentEducationPayload'
    studentEducation?: Maybe<StudentEducation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentGeneralInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentGeneralPayload = {
    __typename?: 'deleteStudentGeneralPayload'
    studentGeneral?: Maybe<StudentGeneral>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentGeneralInput = {
    id: Scalars['ID']
    countryOfOrigin?: Maybe<Scalars['String']>
    nativeLanguage?: Maybe<Scalars['String']>
    otherLanguages?: Maybe<Scalars['String']>
    familiComposition?: Maybe<Scalars['Iterable']>
    childrenCount?: Maybe<Scalars['Int']>
    childrenDatesOfBirth?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentGeneralPayload = {
    __typename?: 'updateStudentGeneralPayload'
    studentGeneral?: Maybe<StudentGeneral>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentGeneralInput = {
    countryOfOrigin?: Maybe<Scalars['String']>
    nativeLanguage?: Maybe<Scalars['String']>
    otherLanguages?: Maybe<Scalars['String']>
    familiComposition?: Maybe<Scalars['Iterable']>
    childrenCount?: Maybe<Scalars['Int']>
    childrenDatesOfBirth?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentGeneralPayload = {
    __typename?: 'createStudentGeneralPayload'
    studentGeneral?: Maybe<StudentGeneral>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentIntakeDetailInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentIntakeDetailPayload = {
    __typename?: 'deleteStudentIntakeDetailPayload'
    studentIntakeDetail?: Maybe<StudentIntakeDetail>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentIntakeDetailInput = {
    id: Scalars['ID']
    studentId?: Maybe<Scalars['String']>
    lastName?: Maybe<Scalars['String']>
    middleName?: Maybe<Scalars['String']>
    nickname?: Maybe<Scalars['String']>
    gender?: Maybe<Scalars['String']>
    dateOfBirth?: Maybe<Scalars['String']>
    streetAndHouseNumber?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    place?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
    phoneNumberContactPerson?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    availability?: Maybe<Scalars['Iterable']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentIntakeDetailPayload = {
    __typename?: 'updateStudentIntakeDetailPayload'
    studentIntakeDetail?: Maybe<StudentIntakeDetail>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentIntakeDetailInput = {
    studentId?: Maybe<Scalars['String']>
    lastName?: Maybe<Scalars['String']>
    middleName?: Maybe<Scalars['String']>
    nickname?: Maybe<Scalars['String']>
    gender?: Maybe<Scalars['String']>
    dateOfBirth?: Maybe<Scalars['String']>
    streetAndHouseNumber?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    place?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
    phoneNumberContactPerson?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    availability?: Maybe<Scalars['Iterable']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentIntakeDetailPayload = {
    __typename?: 'createStudentIntakeDetailPayload'
    studentIntakeDetail?: Maybe<StudentIntakeDetail>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentJobInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentJobPayload = {
    __typename?: 'deleteStudentJobPayload'
    studentJob?: Maybe<StudentJob>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentJobInput = {
    id: Scalars['ID']
    trainedForJob?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    dayTimeActivities?: Maybe<Scalars['Iterable']>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentJobPayload = {
    __typename?: 'updateStudentJobPayload'
    studentJob?: Maybe<StudentJob>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentJobInput = {
    trainedForJob?: Maybe<Scalars['String']>
    lastJob?: Maybe<Scalars['String']>
    dayTimeActivities?: Maybe<Scalars['Iterable']>
    dayTimeActivitiesOther?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentJobPayload = {
    __typename?: 'createStudentJobPayload'
    studentJob?: Maybe<StudentJob>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentMotivationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentMotivationPayload = {
    __typename?: 'deleteStudentMotivationPayload'
    studentMotivation?: Maybe<StudentMotivation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentMotivationInput = {
    id: Scalars['ID']
    desiredSkills?: Maybe<Scalars['Iterable']>
    desiredSkillsOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    whyWantTheseSkills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    desiredLearingMethod?: Maybe<Scalars['Iterable']>
    remarks?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentMotivationPayload = {
    __typename?: 'updateStudentMotivationPayload'
    studentMotivation?: Maybe<StudentMotivation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentMotivationInput = {
    desiredSkills: Scalars['Iterable']
    desiredSkillsOther?: Maybe<Scalars['String']>
    hasTriedThisBefore?: Maybe<Scalars['Boolean']>
    hasTriedThisBeforeExplanation?: Maybe<Scalars['String']>
    whyWantTheseSkills?: Maybe<Scalars['String']>
    whyWantThisNow?: Maybe<Scalars['String']>
    desiredLearingMethod: Scalars['Iterable']
    remarks?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentMotivationPayload = {
    __typename?: 'createStudentMotivationPayload'
    studentMotivation?: Maybe<StudentMotivation>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentPermissionInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentPermissionPayload = {
    __typename?: 'deleteStudentPermissionPayload'
    studentPermission?: Maybe<StudentPermission>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentPermissionInput = {
    id: Scalars['ID']
    didSignPermissionForm?: Maybe<Scalars['Boolean']>
    hasPermissionToShareDataWithAanbieders?: Maybe<Scalars['Boolean']>
    hasPermissionToShareDataWithLibraries?: Maybe<Scalars['Boolean']>
    hasPermissionToSendInformationAboutLibraries?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentPermissionPayload = {
    __typename?: 'updateStudentPermissionPayload'
    studentPermission?: Maybe<StudentPermission>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentPermissionInput = {
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithAanbieders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentPermissionPayload = {
    __typename?: 'createStudentPermissionPayload'
    studentPermission?: Maybe<StudentPermission>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentPersonInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentPersonPayload = {
    __typename?: 'deleteStudentPersonPayload'
    studentPerson?: Maybe<StudentPerson>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentPersonInput = {
    id: Scalars['ID']
    givenName?: Maybe<Scalars['String']>
    additionalName?: Maybe<Scalars['String']>
    familyName?: Maybe<Scalars['String']>
    gender?: Maybe<Scalars['String']>
    dateOfBirth?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentPersonPayload = {
    __typename?: 'updateStudentPersonPayload'
    studentPerson?: Maybe<StudentPerson>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentPersonInput = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    gender?: Maybe<Scalars['String']>
    dateOfBirth?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentPersonPayload = {
    __typename?: 'createStudentPersonPayload'
    studentPerson?: Maybe<StudentPerson>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentReferrerInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteStudentReferrerPayload = {
    __typename?: 'deleteStudentReferrerPayload'
    studentReferrer?: Maybe<StudentReferrer>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentReferrerInput = {
    id: Scalars['ID']
    referringOrganization?: Maybe<Scalars['String']>
    referringOrganizationOther?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateStudentReferrerPayload = {
    __typename?: 'updateStudentReferrerPayload'
    studentReferrer?: Maybe<StudentReferrer>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentReferrerInput = {
    referringOrganization?: Maybe<Scalars['String']>
    referringOrganizationOther?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateStudentReferrerPayload = {
    __typename?: 'createStudentReferrerPayload'
    studentReferrer?: Maybe<StudentReferrer>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteTestResultInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteTestResultPayload = {
    __typename?: 'deleteTestResultPayload'
    testResult?: Maybe<TestResult>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateTestResultInput = {
    id: Scalars['ID']
    participationId?: Maybe<Scalars['String']>
    outComesGoal?: Maybe<Scalars['String']>
    outComesTopic?: Maybe<Scalars['String']>
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication?: Maybe<Scalars['String']>
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel?: Maybe<Scalars['String']>
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam?: Maybe<Scalars['String']>
    examDate?: Maybe<Scalars['String']>
    examMemo?: Maybe<Scalars['String']>
    testResultId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateTestResultPayload = {
    __typename?: 'updateTestResultPayload'
    testResult?: Maybe<TestResult>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateTestResultInput = {
    participationId: Scalars['String']
    outComesGoal: Scalars['String']
    outComesTopic: Scalars['String']
    outComesTopicOther?: Maybe<Scalars['String']>
    outComesApplication: Scalars['String']
    outComesApplicationOther?: Maybe<Scalars['String']>
    outComesLevel: Scalars['String']
    outComesLevelOther?: Maybe<Scalars['String']>
    examUsedExam: Scalars['String']
    examDate: Scalars['String']
    examMemo?: Maybe<Scalars['String']>
    testResultId?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateTestResultPayload = {
    __typename?: 'createTestResultPayload'
    testResult?: Maybe<TestResult>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateUserInput = {
    /** The Email of this User. */
    email?: Maybe<Scalars['String']>
    /** The Username of this User */
    username?: Maybe<Scalars['String']>
    /** The Password of this User. */
    password?: Maybe<Scalars['String']>
    /** The Token for password reset */
    token?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateUserPayload = {
    __typename?: 'createUserPayload'
    user?: Maybe<User>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
    id: Scalars['ID']
    /** The Email of this User. */
    email?: Maybe<Scalars['String']>
    /** The Username of this User */
    username?: Maybe<Scalars['String']>
    /** The Password of this User. */
    password?: Maybe<Scalars['String']>
    /** The Token for password reset */
    token?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateUserPayload = {
    __typename?: 'updateUserPayload'
    user?: Maybe<User>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveUserInput = {
    /** the identifier */
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RemoveUserPayload = {
    __typename?: 'removeUserPayload'
    user?: Maybe<User>
    clientMutationId?: Maybe<Scalars['String']>
}

export type LoginUserInput = {
    username: Scalars['String']
    password: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type LoginUserPayload = {
    __typename?: 'loginUserPayload'
    user?: Maybe<User>
    clientMutationId?: Maybe<Scalars['String']>
}

export type RequestPasswordResetUserInput = {
    email: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type RequestPasswordResetUserPayload = {
    __typename?: 'requestPasswordResetUserPayload'
    user?: Maybe<User>
    clientMutationId?: Maybe<Scalars['String']>
}

export type ResetPasswordUserInput = {
    email: Scalars['String']
    password: Scalars['String']
    token: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type ResetPasswordUserPayload = {
    __typename?: 'resetPasswordUserPayload'
    user?: Maybe<User>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type DeleteAuditTrailInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type DeleteAuditTrailPayload = {
    __typename?: 'deleteAuditTrailPayload'
    auditTrail?: Maybe<AuditTrail>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type UpdateAuditTrailInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type UpdateAuditTrailPayload = {
    __typename?: 'updateAuditTrailPayload'
    auditTrail?: Maybe<AuditTrail>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type CreateAuditTrailInput = {
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type CreateAuditTrailPayload = {
    __typename?: 'createAuditTrailPayload'
    auditTrail?: Maybe<AuditTrail>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type DeleteChangeLogInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type DeleteChangeLogPayload = {
    __typename?: 'deleteChangeLogPayload'
    changeLog?: Maybe<ChangeLog>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type UpdateChangeLogInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type UpdateChangeLogPayload = {
    __typename?: 'updateChangeLogPayload'
    changeLog?: Maybe<ChangeLog>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type CreateChangeLogInput = {
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type CreateChangeLogPayload = {
    __typename?: 'createChangeLogPayload'
    changeLog?: Maybe<ChangeLog>
    clientMutationId?: Maybe<Scalars['String']>
}

export type LoginUserMutationVariables = Exact<{
    input: LoginUserInput
}>

export type LoginUserMutation = { __typename?: 'Mutation' } & {
    loginUser?: Maybe<
        { __typename?: 'loginUserPayload' } & Pick<LoginUserPayload, 'clientMutationId'> & {
                user?: Maybe<{ __typename?: 'User' } & Pick<User, 'email' | 'id' | 'password' | 'token' | 'username'>>
            }
    >
}

export type RequestPasswordResetUserMutationVariables = Exact<{
    input: RequestPasswordResetUserInput
}>

export type RequestPasswordResetUserMutation = { __typename?: 'Mutation' } & {
    requestPasswordResetUser?: Maybe<
        { __typename?: 'requestPasswordResetUserPayload' } & Pick<
            RequestPasswordResetUserPayload,
            'clientMutationId'
        > & { user?: Maybe<{ __typename?: 'User' } & Pick<User, 'email' | 'id' | 'password' | 'token' | 'username'>> }
    >
}

export type ResetPasswordUserMutationVariables = Exact<{
    input: ResetPasswordUserInput
}>

export type ResetPasswordUserMutation = { __typename?: 'Mutation' } & {
    resetPasswordUser?: Maybe<
        { __typename?: 'resetPasswordUserPayload' } & Pick<ResetPasswordUserPayload, 'clientMutationId'> & {
                user?: Maybe<{ __typename?: 'User' } & Pick<User, 'email' | 'id' | 'password' | 'token' | 'username'>>
            }
    >
}

export type LanguageHousesQueryVariables = Exact<{ [key: string]: never }>

export type LanguageHousesQuery = { __typename?: 'Query' } & {
    languageHouses?: Maybe<
        { __typename?: 'LanguageHouseConnection' } & {
            edges?: Maybe<
                Array<
                    Maybe<
                        { __typename?: 'LanguageHouseEdge' } & {
                            node?: Maybe<
                                { __typename?: 'LanguageHouse' } & Pick<
                                    LanguageHouse,
                                    'id' | 'name' | 'address' | 'email' | 'phoneNumber' | 'type'
                                >
                            >
                        }
                    >
                >
            >
        }
    >
}

export type ProvidersQueryVariables = Exact<{ [key: string]: never }>

export type ProvidersQuery = { __typename?: 'Query' } & {
    providers?: Maybe<
        { __typename?: 'ProviderConnection' } & {
            edges?: Maybe<
                Array<
                    Maybe<
                        { __typename?: 'ProviderEdge' } & {
                            node?: Maybe<
                                { __typename?: 'Provider' } & Pick<
                                    Provider,
                                    'id' | 'name' | 'phoneNumber' | 'email' | 'address' | 'type'
                                >
                            >
                        }
                    >
                >
            >
        }
    >
}

export const LoginUserDocument = gql`
    mutation loginUser($input: loginUserInput!) {
        loginUser(input: $input) {
            clientMutationId
            user {
                email
                id
                password
                token
                username
            }
        }
    }
`

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(
    baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>
) {
    return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, baseOptions)
}
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>
export const RequestPasswordResetUserDocument = gql`
    mutation requestPasswordResetUser($input: requestPasswordResetUserInput!) {
        requestPasswordResetUser(input: $input) {
            clientMutationId
            user {
                email
                id
                password
                token
                username
            }
        }
    }
`

/**
 * __useRequestPasswordResetUserMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetUserMutation, { data, loading, error }] = useRequestPasswordResetUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestPasswordResetUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RequestPasswordResetUserMutation,
        RequestPasswordResetUserMutationVariables
    >
) {
    return Apollo.useMutation<RequestPasswordResetUserMutation, RequestPasswordResetUserMutationVariables>(
        RequestPasswordResetUserDocument,
        baseOptions
    )
}
export type RequestPasswordResetUserMutationHookResult = ReturnType<typeof useRequestPasswordResetUserMutation>
export type RequestPasswordResetUserMutationResult = Apollo.MutationResult<RequestPasswordResetUserMutation>
export type RequestPasswordResetUserMutationOptions = Apollo.BaseMutationOptions<
    RequestPasswordResetUserMutation,
    RequestPasswordResetUserMutationVariables
>
export const ResetPasswordUserDocument = gql`
    mutation resetPasswordUser($input: resetPasswordUserInput!) {
        resetPasswordUser(input: $input) {
            clientMutationId
            user {
                email
                id
                password
                token
                username
            }
        }
    }
`

/**
 * __useResetPasswordUserMutation__
 *
 * To run a mutation, you first call `useResetPasswordUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordUserMutation, { data, loading, error }] = useResetPasswordUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordUserMutation(
    baseOptions?: Apollo.MutationHookOptions<ResetPasswordUserMutation, ResetPasswordUserMutationVariables>
) {
    return Apollo.useMutation<ResetPasswordUserMutation, ResetPasswordUserMutationVariables>(
        ResetPasswordUserDocument,
        baseOptions
    )
}
export type ResetPasswordUserMutationHookResult = ReturnType<typeof useResetPasswordUserMutation>
export type ResetPasswordUserMutationResult = Apollo.MutationResult<ResetPasswordUserMutation>
export type ResetPasswordUserMutationOptions = Apollo.BaseMutationOptions<
    ResetPasswordUserMutation,
    ResetPasswordUserMutationVariables
>
export const LanguageHousesDocument = gql`
    query languageHouses {
        languageHouses {
            edges {
                node {
                    id
                    name
                    address
                    email
                    phoneNumber
                    type
                }
            }
        }
    }
`

/**
 * __useLanguageHousesQuery__
 *
 * To run a query within a React component, call `useLanguageHousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguageHousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguageHousesQuery({
 *   variables: {
 *   },
 * });
 */
export function useLanguageHousesQuery(
    baseOptions?: Apollo.QueryHookOptions<LanguageHousesQuery, LanguageHousesQueryVariables>
) {
    return Apollo.useQuery<LanguageHousesQuery, LanguageHousesQueryVariables>(LanguageHousesDocument, baseOptions)
}
export function useLanguageHousesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<LanguageHousesQuery, LanguageHousesQueryVariables>
) {
    return Apollo.useLazyQuery<LanguageHousesQuery, LanguageHousesQueryVariables>(LanguageHousesDocument, baseOptions)
}
export type LanguageHousesQueryHookResult = ReturnType<typeof useLanguageHousesQuery>
export type LanguageHousesLazyQueryHookResult = ReturnType<typeof useLanguageHousesLazyQuery>
export type LanguageHousesQueryResult = Apollo.QueryResult<LanguageHousesQuery, LanguageHousesQueryVariables>
export const ProvidersDocument = gql`
    query providers {
        providers {
            edges {
                node {
                    id
                    name
                    phoneNumber
                    email
                    address
                    type
                }
            }
        }
    }
`

/**
 * __useProvidersQuery__
 *
 * To run a query within a React component, call `useProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useProvidersQuery(baseOptions?: Apollo.QueryHookOptions<ProvidersQuery, ProvidersQueryVariables>) {
    return Apollo.useQuery<ProvidersQuery, ProvidersQueryVariables>(ProvidersDocument, baseOptions)
}
export function useProvidersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<ProvidersQuery, ProvidersQueryVariables>
) {
    return Apollo.useLazyQuery<ProvidersQuery, ProvidersQueryVariables>(ProvidersDocument, baseOptions)
}
export type ProvidersQueryHookResult = ReturnType<typeof useProvidersQuery>
export type ProvidersLazyQueryHookResult = ReturnType<typeof useProvidersLazyQuery>
export type ProvidersQueryResult = Apollo.QueryResult<ProvidersQuery, ProvidersQueryVariables>
