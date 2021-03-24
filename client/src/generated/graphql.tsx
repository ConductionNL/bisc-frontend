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
}

export type TaalhuisUserRoleType = {
    __typename?: 'TaalhuisUserRoleType'
    id: Scalars['String']
    name: Scalars['String']
}

export type UserType = {
    __typename?: 'UserType'
    id: Scalars['String']
    username: Scalars['String']
}

export type RawReturnType = {
    __typename?: 'RawReturnType'
    accessToken: Scalars['String']
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

export enum UserEnvironmentEnum {
    Bisc = 'BISC',
    Taalhuis = 'TAALHUIS',
    Aanbieder = 'AANBIEDER',
}

export type AanbiederUserRoleType = {
    __typename?: 'AanbiederUserRoleType'
    id: Scalars['String']
    name: Scalars['String']
}

export type AanbiederEmployeeType = {
    __typename?: 'AanbiederEmployeeType'
    id: Scalars['String']
    givenName: Scalars['String']
    additionalName: Scalars['String']
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
    dateCreated: Scalars['String']
    dateModified: Scalars['String']
    userRoles: Array<AanbiederUserRoleType>
}

export type AanbiederAddressType = {
    __typename?: 'AanbiederAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
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

export type PersonType = {
    __typename?: 'PersonType'
    id: Scalars['String']
    name: Scalars['String']
}

export type PersonEdgeType = {
    __typename?: 'PersonEdgeType'
    node: PersonType
}

export type ProgramType = {
    __typename?: 'ProgramType'
    id: Scalars['String']
    name: Scalars['String']
}

export type ProgramEdgeType = {
    __typename?: 'ProgramEdgeType'
    node: ProgramType
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

export type StudentType = {
    __typename?: 'StudentType'
    id: Scalars['String']
    dateCreated: Scalars['String']
    status: ParticipantStatusEnum
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    memo?: Maybe<Scalars['String']>
    registrar?: Maybe<StudentRegistrarType>
}

export enum ParticipantStatusEnum {
    Pending = 'pending',
    Accepted = 'accepted',
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

export type TaalhuisAddressType = {
    __typename?: 'TaalhuisAddressType'
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
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

export type Query = {
    __typename?: 'Query'
    persons: Array<PersonEdgeType>
    programs: Array<ProgramEdgeType>
    myPrograms: Array<ProgramType>
    currentUser: ContextUserType
    taalhuizen: Array<TaalhuisType>
    taalhuis: TaalhuisType
    userRolesByTaalhuisId: Array<TaalhuisUserRoleType>
    taalhuisEmployees: Array<TaalhuisEmployeeType>
    taalhuisEmployee: TaalhuisEmployeeType
    aanbieders: Array<AanbiederType>
    aanbieder: AanbiederType
    aanbiederEmployees: Array<AanbiederEmployeeType>
    userRolesByAanbiederId: Array<AanbiederUserRoleType>
    registrations: Array<StudentType>
    registration: StudentType
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

export type QueryUserRolesByAanbiederIdArgs = {
    aanbiederId: Scalars['String']
}

export type QueryRegistrationsArgs = {
    taalhuisId: Scalars['String']
}

export type QueryRegistrationArgs = {
    studentId: Scalars['String']
}

export type Mutation = {
    __typename?: 'Mutation'
    addPerson: PersonEdgeType
    enrollPersonInProgram: Scalars['Boolean']
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
    deleteAanbiederEmployee: Scalars['Boolean']
    registerStudent: Scalars['Boolean']
    deleteRegistration: Scalars['Boolean']
    acceptRegistration: StudentType
}

export type MutationAddPersonArgs = {
    name: Scalars['String']
}

export type MutationEnrollPersonInProgramArgs = {
    personId: Scalars['String']
    programId: Scalars['String']
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

export type CreateTaalhuisAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type UpdateTaalhuisAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
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

export type UpdateTaalhuisEmployeeInputType = {
    userId: Scalars['String']
    userGroupId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone?: Maybe<Scalars['String']>
}

export type CreateAanbiederAddressInputType = {
    street: Scalars['String']
    houseNumber: Scalars['String']
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode: Scalars['String']
    locality: Scalars['String']
}

export type UpdateAanbiederAddressInputType = {
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
}

export type CreateAanbiederEmployeeInputType = {
    aanbiederId: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    telephone: Scalars['String']
    email: Scalars['String']
    userGroupIds: Array<Scalars['String']>
}

export type RegisterStudentInputType = {
    taalhuisId: Scalars['String']
    student: RegisterStudentStudentInputType
    registrar: RegisterStudentRegistrarInputType
    memo?: Maybe<Scalars['String']>
}

export type RegisterStudentStudentInputType = {
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
    address?: Maybe<RegisterStudentAddresInputType>
}

export type RegisterStudentAddresInputType = {
    street?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
}

export type RegisterStudentRegistrarInputType = {
    organisationName: Scalars['String']
    givenName: Scalars['String']
    additionalName?: Maybe<Scalars['String']>
    familyName: Scalars['String']
    email: Scalars['String']
    telephone: Scalars['String']
}

export type AddPersonMutationVariables = Exact<{
    name: Scalars['String']
}>

export type AddPersonMutation = { __typename?: 'Mutation' } & {
    addPerson: { __typename?: 'PersonEdgeType' } & {
        node: { __typename?: 'PersonType' } & Pick<PersonType, 'id' | 'name'>
    }
}

export type ChangePasswordMutationVariables = Exact<{
    currentPassword: Scalars['String']
    newPassword: Scalars['String']
}>

export type ChangePasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'changePassword'>

export type CreateAanbiederMutationVariables = Exact<{
    address: CreateAanbiederAddressInputType
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type CreateAanbiederMutation = { __typename?: 'Mutation' } & {
    createAanbieder: { __typename?: 'AanbiederType' } & Pick<
        AanbiederType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'AanbiederAddressType' } & Pick<
                    AanbiederAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type CreateTaalhuisMutationVariables = Exact<{
    address: CreateTaalhuisAddressInputType
    name: Scalars['String']
    email: Scalars['String']
    phoneNumber: Scalars['String']
}>

export type CreateTaalhuisMutation = { __typename?: 'Mutation' } & {
    createTaalhuis: { __typename?: 'TaalhuisType' } & Pick<
        TaalhuisType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'TaalhuisAddressType' } & Pick<
                    TaalhuisAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type CreateTaalhuisEmployeeMutationVariables = Exact<{
    input: CreateTaalhuisEmployeeInputType
}>

export type CreateTaalhuisEmployeeMutation = { __typename?: 'Mutation' } & {
    createTaalhuisEmployee: { __typename?: 'TaalhuisEmployeeType' } & Pick<
        TaalhuisEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
}

export type DeleteAanbiederMutationVariables = Exact<{
    id: Scalars['String']
}>

export type DeleteAanbiederMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteAanbieder'>

export type DeleteTaalhuisMutationVariables = Exact<{
    id: Scalars['String']
}>

export type DeleteTaalhuisMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteTaalhuis'>

export type DeleteTaalhuisEmployeeMutationVariables = Exact<{
    userId: Scalars['String']
}>

export type DeleteTaalhuisEmployeeMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteTaalhuisEmployee'>

export type EnrollPersonInProgramMutationVariables = Exact<{
    personId: Scalars['String']
    programId: Scalars['String']
}>

export type EnrollPersonInProgramMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'enrollPersonInProgram'>

export type LoginMutationVariables = Exact<{
    username: Scalars['String']
    password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
    login: { __typename?: 'RawReturnType' } & Pick<RawReturnType, 'accessToken'>
}

export type RequestPasswordResetMutationVariables = Exact<{
    email: Scalars['String']
}>

export type RequestPasswordResetMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'requestPasswordReset'>

export type ResetPasswordMutationVariables = Exact<{
    email: Scalars['String']
    token: Scalars['String']
    password: Scalars['String']
}>

export type ResetPasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'resetPassword'>

export type UpdateAanbiederMutationVariables = Exact<{
    id: Scalars['String']
    address: UpdateAanbiederAddressInputType
    name: Scalars['String']
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type UpdateAanbiederMutation = { __typename?: 'Mutation' } & {
    updateAanbieder: { __typename?: 'AanbiederType' } & Pick<
        AanbiederType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'AanbiederAddressType' } & Pick<
                    AanbiederAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type UpdateTaalhuisMutationVariables = Exact<{
    id: Scalars['String']
    address: UpdateTaalhuisAddressInputType
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    phoneNumber?: Maybe<Scalars['String']>
}>

export type UpdateTaalhuisMutation = { __typename?: 'Mutation' } & {
    updateTaalhuis: { __typename?: 'TaalhuisType' } & Pick<
        TaalhuisType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'TaalhuisAddressType' } & Pick<
                    TaalhuisAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type UpdateTaalhuisEmployeeMutationVariables = Exact<{
    input: UpdateTaalhuisEmployeeInputType
}>

export type UpdateTaalhuisEmployeeMutation = { __typename?: 'Mutation' } & {
    updateTaalhuisEmployee: { __typename?: 'TaalhuisEmployeeType' } & Pick<
        TaalhuisEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
}

export type AanbiederQueryVariables = Exact<{
    id: Scalars['String']
}>

export type AanbiederQuery = { __typename?: 'Query' } & {
    aanbieder: { __typename?: 'AanbiederType' } & Pick<
        AanbiederType,
        'id' | 'name' | 'email' | 'telephone' | 'type'
    > & {
            address?: Maybe<
                { __typename?: 'AanbiederAddressType' } & Pick<
                    AanbiederAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type AanbiederEmployeesQueryVariables = Exact<{
    aanbiederId: Scalars['String']
}>

export type AanbiederEmployeesQuery = { __typename?: 'Query' } & {
    aanbiederEmployees: Array<
        { __typename?: 'AanbiederEmployeeType' } & Pick<
            AanbiederEmployeeType,
            | 'id'
            | 'givenName'
            | 'additionalName'
            | 'familyName'
            | 'email'
            | 'telephone'
            | 'dateCreated'
            | 'dateModified'
        > & { userRoles: Array<{ __typename?: 'AanbiederUserRoleType' } & Pick<AanbiederUserRoleType, 'id' | 'name'>> }
    >
}

export type AanbiedersQueryVariables = Exact<{ [key: string]: never }>

export type AanbiedersQuery = { __typename?: 'Query' } & {
    aanbieders: Array<
        { __typename?: 'AanbiederType' } & Pick<AanbiederType, 'id' | 'name' | 'email' | 'telephone' | 'type'> & {
                address?: Maybe<
                    { __typename?: 'AanbiederAddressType' } & Pick<
                        AanbiederAddressType,
                        'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                    >
                >
            }
    >
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { __typename?: 'Query' } & {
    currentUser: { __typename?: 'ContextUserType' } & Pick<
        ContextUserType,
        | 'id'
        | 'username'
        | 'givenName'
        | 'additionalName'
        | 'familyName'
        | 'userEnvironment'
        | 'organizationId'
        | 'organizationName'
        | 'dateCreated'
        | 'dateModified'
    > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
}

export type MyProgramsQueryVariables = Exact<{ [key: string]: never }>

export type MyProgramsQuery = { __typename?: 'Query' } & {
    myPrograms: Array<{ __typename?: 'ProgramType' } & Pick<ProgramType, 'id' | 'name'>>
}

export type PersonsQueryVariables = Exact<{ [key: string]: never }>

export type PersonsQuery = { __typename?: 'Query' } & {
    persons: Array<
        { __typename?: 'PersonEdgeType' } & { node: { __typename?: 'PersonType' } & Pick<PersonType, 'id' | 'name'> }
    >
}

export type ProgramsQueryVariables = Exact<{ [key: string]: never }>

export type ProgramsQuery = { __typename?: 'Query' } & {
    programs: Array<
        { __typename?: 'ProgramEdgeType' } & { node: { __typename?: 'ProgramType' } & Pick<ProgramType, 'id' | 'name'> }
    >
}

export type RegistrationsQueryVariables = Exact<{
    taalhuisId: Scalars['String']
}>

export type RegistrationsQuery = { __typename?: 'Query' } & {
    registrations: Array<
        { __typename?: 'StudentType' } & Pick<
            StudentType,
            'id' | 'dateCreated' | 'status' | 'givenName' | 'additionalName' | 'familyName'
        > & {
                registrar?: Maybe<
                    { __typename?: 'StudentRegistrarType' } & Pick<StudentRegistrarType, 'organisationName'>
                >
            }
    >
}

export type TaalhuisQueryVariables = Exact<{
    taalhuisId: Scalars['String']
}>

export type TaalhuisQuery = { __typename?: 'Query' } & {
    taalhuis: { __typename?: 'TaalhuisType' } & Pick<TaalhuisType, 'id' | 'name' | 'email' | 'telephone' | 'type'> & {
            address?: Maybe<
                { __typename?: 'TaalhuisAddressType' } & Pick<
                    TaalhuisAddressType,
                    'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
}

export type TaalhuisEmployeeQueryVariables = Exact<{
    userId: Scalars['String']
}>

export type TaalhuisEmployeeQuery = { __typename?: 'Query' } & {
    taalhuisEmployee: { __typename?: 'TaalhuisEmployeeType' } & Pick<
        TaalhuisEmployeeType,
        'id' | 'givenName' | 'additionalName' | 'familyName' | 'email' | 'telephone' | 'dateCreated' | 'dateModified'
    > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
}

export type TaalhuisEmployeesQueryVariables = Exact<{
    taalhuisId: Scalars['String']
}>

export type TaalhuisEmployeesQuery = { __typename?: 'Query' } & {
    taalhuisEmployees: Array<
        { __typename?: 'TaalhuisEmployeeType' } & Pick<
            TaalhuisEmployeeType,
            | 'id'
            | 'givenName'
            | 'additionalName'
            | 'familyName'
            | 'email'
            | 'telephone'
            | 'dateCreated'
            | 'dateModified'
        > & { userRoles: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>> }
    >
}

export type TaalhuizenQueryVariables = Exact<{ [key: string]: never }>

export type TaalhuizenQuery = { __typename?: 'Query' } & {
    taalhuizen: Array<
        { __typename?: 'TaalhuisType' } & Pick<TaalhuisType, 'id' | 'name' | 'email' | 'telephone' | 'type'> & {
                address?: Maybe<
                    { __typename?: 'TaalhuisAddressType' } & Pick<
                        TaalhuisAddressType,
                        'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                    >
                >
            }
    >
}

export type UserRolesByTaalhuisIdQueryVariables = Exact<{
    taalhuisId: Scalars['String']
}>

export type UserRolesByTaalhuisIdQuery = { __typename?: 'Query' } & {
    userRolesByTaalhuisId: Array<{ __typename?: 'TaalhuisUserRoleType' } & Pick<TaalhuisUserRoleType, 'id' | 'name'>>
}

export const AddPersonDocument = gql`
    mutation addPerson($name: String!) {
        addPerson(name: $name) {
            node {
                id
                name
            }
        }
    }
`

/**
 * __useAddPersonMutation__
 *
 * To run a mutation, you first call `useAddPersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPersonMutation, { data, loading, error }] = useAddPersonMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddPersonMutation(
    baseOptions?: Apollo.MutationHookOptions<AddPersonMutation, AddPersonMutationVariables>
) {
    return Apollo.useMutation<AddPersonMutation, AddPersonMutationVariables>(AddPersonDocument, baseOptions)
}
export type AddPersonMutationHookResult = ReturnType<typeof useAddPersonMutation>
export type AddPersonMutationResult = Apollo.MutationResult<AddPersonMutation>
export type AddPersonMutationOptions = Apollo.BaseMutationOptions<AddPersonMutation, AddPersonMutationVariables>
export const ChangePasswordDocument = gql`
    mutation changePassword($currentPassword: String!, $newPassword: String!) {
        changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
    }
`

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>
) {
    return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
        ChangePasswordDocument,
        baseOptions
    )
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>
export const CreateAanbiederDocument = gql`
    mutation createAanbieder(
        $address: CreateAanbiederAddressInputType!
        $name: String!
        $email: String
        $phoneNumber: String
    ) {
        createAanbieder(address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useCreateAanbiederMutation__
 *
 * To run a mutation, you first call `useCreateAanbiederMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAanbiederMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAanbiederMutation, { data, loading, error }] = useCreateAanbiederMutation({
 *   variables: {
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCreateAanbiederMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateAanbiederMutation, CreateAanbiederMutationVariables>
) {
    return Apollo.useMutation<CreateAanbiederMutation, CreateAanbiederMutationVariables>(
        CreateAanbiederDocument,
        baseOptions
    )
}
export type CreateAanbiederMutationHookResult = ReturnType<typeof useCreateAanbiederMutation>
export type CreateAanbiederMutationResult = Apollo.MutationResult<CreateAanbiederMutation>
export type CreateAanbiederMutationOptions = Apollo.BaseMutationOptions<
    CreateAanbiederMutation,
    CreateAanbiederMutationVariables
>
export const CreateTaalhuisDocument = gql`
    mutation createTaalhuis(
        $address: CreateTaalhuisAddressInputType!
        $name: String!
        $email: String!
        $phoneNumber: String!
    ) {
        createTaalhuis(address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useCreateTaalhuisMutation__
 *
 * To run a mutation, you first call `useCreateTaalhuisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaalhuisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaalhuisMutation, { data, loading, error }] = useCreateTaalhuisMutation({
 *   variables: {
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCreateTaalhuisMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateTaalhuisMutation, CreateTaalhuisMutationVariables>
) {
    return Apollo.useMutation<CreateTaalhuisMutation, CreateTaalhuisMutationVariables>(
        CreateTaalhuisDocument,
        baseOptions
    )
}
export type CreateTaalhuisMutationHookResult = ReturnType<typeof useCreateTaalhuisMutation>
export type CreateTaalhuisMutationResult = Apollo.MutationResult<CreateTaalhuisMutation>
export type CreateTaalhuisMutationOptions = Apollo.BaseMutationOptions<
    CreateTaalhuisMutation,
    CreateTaalhuisMutationVariables
>
export const CreateTaalhuisEmployeeDocument = gql`
    mutation createTaalhuisEmployee($input: CreateTaalhuisEmployeeInputType!) {
        createTaalhuisEmployee(input: $input) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useCreateTaalhuisEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateTaalhuisEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaalhuisEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaalhuisEmployeeMutation, { data, loading, error }] = useCreateTaalhuisEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaalhuisEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateTaalhuisEmployeeMutation, CreateTaalhuisEmployeeMutationVariables>
) {
    return Apollo.useMutation<CreateTaalhuisEmployeeMutation, CreateTaalhuisEmployeeMutationVariables>(
        CreateTaalhuisEmployeeDocument,
        baseOptions
    )
}
export type CreateTaalhuisEmployeeMutationHookResult = ReturnType<typeof useCreateTaalhuisEmployeeMutation>
export type CreateTaalhuisEmployeeMutationResult = Apollo.MutationResult<CreateTaalhuisEmployeeMutation>
export type CreateTaalhuisEmployeeMutationOptions = Apollo.BaseMutationOptions<
    CreateTaalhuisEmployeeMutation,
    CreateTaalhuisEmployeeMutationVariables
>
export const DeleteAanbiederDocument = gql`
    mutation deleteAanbieder($id: String!) {
        deleteAanbieder(id: $id)
    }
`

/**
 * __useDeleteAanbiederMutation__
 *
 * To run a mutation, you first call `useDeleteAanbiederMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAanbiederMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAanbiederMutation, { data, loading, error }] = useDeleteAanbiederMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAanbiederMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteAanbiederMutation, DeleteAanbiederMutationVariables>
) {
    return Apollo.useMutation<DeleteAanbiederMutation, DeleteAanbiederMutationVariables>(
        DeleteAanbiederDocument,
        baseOptions
    )
}
export type DeleteAanbiederMutationHookResult = ReturnType<typeof useDeleteAanbiederMutation>
export type DeleteAanbiederMutationResult = Apollo.MutationResult<DeleteAanbiederMutation>
export type DeleteAanbiederMutationOptions = Apollo.BaseMutationOptions<
    DeleteAanbiederMutation,
    DeleteAanbiederMutationVariables
>
export const DeleteTaalhuisDocument = gql`
    mutation deleteTaalhuis($id: String!) {
        deleteTaalhuis(id: $id)
    }
`

/**
 * __useDeleteTaalhuisMutation__
 *
 * To run a mutation, you first call `useDeleteTaalhuisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaalhuisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaalhuisMutation, { data, loading, error }] = useDeleteTaalhuisMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaalhuisMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteTaalhuisMutation, DeleteTaalhuisMutationVariables>
) {
    return Apollo.useMutation<DeleteTaalhuisMutation, DeleteTaalhuisMutationVariables>(
        DeleteTaalhuisDocument,
        baseOptions
    )
}
export type DeleteTaalhuisMutationHookResult = ReturnType<typeof useDeleteTaalhuisMutation>
export type DeleteTaalhuisMutationResult = Apollo.MutationResult<DeleteTaalhuisMutation>
export type DeleteTaalhuisMutationOptions = Apollo.BaseMutationOptions<
    DeleteTaalhuisMutation,
    DeleteTaalhuisMutationVariables
>
export const DeleteTaalhuisEmployeeDocument = gql`
    mutation deleteTaalhuisEmployee($userId: String!) {
        deleteTaalhuisEmployee(userId: $userId)
    }
`

/**
 * __useDeleteTaalhuisEmployeeMutation__
 *
 * To run a mutation, you first call `useDeleteTaalhuisEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaalhuisEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaalhuisEmployeeMutation, { data, loading, error }] = useDeleteTaalhuisEmployeeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteTaalhuisEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteTaalhuisEmployeeMutation, DeleteTaalhuisEmployeeMutationVariables>
) {
    return Apollo.useMutation<DeleteTaalhuisEmployeeMutation, DeleteTaalhuisEmployeeMutationVariables>(
        DeleteTaalhuisEmployeeDocument,
        baseOptions
    )
}
export type DeleteTaalhuisEmployeeMutationHookResult = ReturnType<typeof useDeleteTaalhuisEmployeeMutation>
export type DeleteTaalhuisEmployeeMutationResult = Apollo.MutationResult<DeleteTaalhuisEmployeeMutation>
export type DeleteTaalhuisEmployeeMutationOptions = Apollo.BaseMutationOptions<
    DeleteTaalhuisEmployeeMutation,
    DeleteTaalhuisEmployeeMutationVariables
>
export const EnrollPersonInProgramDocument = gql`
    mutation enrollPersonInProgram($personId: String!, $programId: String!) {
        enrollPersonInProgram(personId: $personId, programId: $programId)
    }
`

/**
 * __useEnrollPersonInProgramMutation__
 *
 * To run a mutation, you first call `useEnrollPersonInProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollPersonInProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollPersonInProgramMutation, { data, loading, error }] = useEnrollPersonInProgramMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      programId: // value for 'programId'
 *   },
 * });
 */
export function useEnrollPersonInProgramMutation(
    baseOptions?: Apollo.MutationHookOptions<EnrollPersonInProgramMutation, EnrollPersonInProgramMutationVariables>
) {
    return Apollo.useMutation<EnrollPersonInProgramMutation, EnrollPersonInProgramMutationVariables>(
        EnrollPersonInProgramDocument,
        baseOptions
    )
}
export type EnrollPersonInProgramMutationHookResult = ReturnType<typeof useEnrollPersonInProgramMutation>
export type EnrollPersonInProgramMutationResult = Apollo.MutationResult<EnrollPersonInProgramMutation>
export type EnrollPersonInProgramMutationOptions = Apollo.BaseMutationOptions<
    EnrollPersonInProgramMutation,
    EnrollPersonInProgramMutationVariables
>
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            accessToken
        }
    }
`

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($email: String!) {
        requestPasswordReset(email: $email)
    }
`

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(
    baseOptions?: Apollo.MutationHookOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>
) {
    return Apollo.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(
        RequestPasswordResetDocument,
        baseOptions
    )
}
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>
export type RequestPasswordResetMutationResult = Apollo.MutationResult<RequestPasswordResetMutation>
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<
    RequestPasswordResetMutation,
    RequestPasswordResetMutationVariables
>
export const ResetPasswordDocument = gql`
    mutation resetPassword($email: String!, $token: String!, $password: String!) {
        resetPassword(email: $email, token: $token, password: $password)
    }
`

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>
) {
    return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions)
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
>
export const UpdateAanbiederDocument = gql`
    mutation updateAanbieder(
        $id: String!
        $address: UpdateAanbiederAddressInputType!
        $name: String!
        $email: String
        $phoneNumber: String
    ) {
        updateAanbieder(id: $id, address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useUpdateAanbiederMutation__
 *
 * To run a mutation, you first call `useUpdateAanbiederMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAanbiederMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAanbiederMutation, { data, loading, error }] = useUpdateAanbiederMutation({
 *   variables: {
 *      id: // value for 'id'
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdateAanbiederMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateAanbiederMutation, UpdateAanbiederMutationVariables>
) {
    return Apollo.useMutation<UpdateAanbiederMutation, UpdateAanbiederMutationVariables>(
        UpdateAanbiederDocument,
        baseOptions
    )
}
export type UpdateAanbiederMutationHookResult = ReturnType<typeof useUpdateAanbiederMutation>
export type UpdateAanbiederMutationResult = Apollo.MutationResult<UpdateAanbiederMutation>
export type UpdateAanbiederMutationOptions = Apollo.BaseMutationOptions<
    UpdateAanbiederMutation,
    UpdateAanbiederMutationVariables
>
export const UpdateTaalhuisDocument = gql`
    mutation updateTaalhuis(
        $id: String!
        $address: UpdateTaalhuisAddressInputType!
        $name: String
        $email: String
        $phoneNumber: String
    ) {
        updateTaalhuis(id: $id, address: $address, name: $name, email: $email, phoneNumber: $phoneNumber) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useUpdateTaalhuisMutation__
 *
 * To run a mutation, you first call `useUpdateTaalhuisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaalhuisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaalhuisMutation, { data, loading, error }] = useUpdateTaalhuisMutation({
 *   variables: {
 *      id: // value for 'id'
 *      address: // value for 'address'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdateTaalhuisMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateTaalhuisMutation, UpdateTaalhuisMutationVariables>
) {
    return Apollo.useMutation<UpdateTaalhuisMutation, UpdateTaalhuisMutationVariables>(
        UpdateTaalhuisDocument,
        baseOptions
    )
}
export type UpdateTaalhuisMutationHookResult = ReturnType<typeof useUpdateTaalhuisMutation>
export type UpdateTaalhuisMutationResult = Apollo.MutationResult<UpdateTaalhuisMutation>
export type UpdateTaalhuisMutationOptions = Apollo.BaseMutationOptions<
    UpdateTaalhuisMutation,
    UpdateTaalhuisMutationVariables
>
export const UpdateTaalhuisEmployeeDocument = gql`
    mutation updateTaalhuisEmployee($input: UpdateTaalhuisEmployeeInputType!) {
        updateTaalhuisEmployee(input: $input) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useUpdateTaalhuisEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateTaalhuisEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaalhuisEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaalhuisEmployeeMutation, { data, loading, error }] = useUpdateTaalhuisEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaalhuisEmployeeMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateTaalhuisEmployeeMutation, UpdateTaalhuisEmployeeMutationVariables>
) {
    return Apollo.useMutation<UpdateTaalhuisEmployeeMutation, UpdateTaalhuisEmployeeMutationVariables>(
        UpdateTaalhuisEmployeeDocument,
        baseOptions
    )
}
export type UpdateTaalhuisEmployeeMutationHookResult = ReturnType<typeof useUpdateTaalhuisEmployeeMutation>
export type UpdateTaalhuisEmployeeMutationResult = Apollo.MutationResult<UpdateTaalhuisEmployeeMutation>
export type UpdateTaalhuisEmployeeMutationOptions = Apollo.BaseMutationOptions<
    UpdateTaalhuisEmployeeMutation,
    UpdateTaalhuisEmployeeMutationVariables
>
export const AanbiederDocument = gql`
    query aanbieder($id: String!) {
        aanbieder(id: $id) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useAanbiederQuery__
 *
 * To run a query within a React component, call `useAanbiederQuery` and pass it any options that fit your needs.
 * When your component renders, `useAanbiederQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAanbiederQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAanbiederQuery(baseOptions: Apollo.QueryHookOptions<AanbiederQuery, AanbiederQueryVariables>) {
    return Apollo.useQuery<AanbiederQuery, AanbiederQueryVariables>(AanbiederDocument, baseOptions)
}
export function useAanbiederLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<AanbiederQuery, AanbiederQueryVariables>
) {
    return Apollo.useLazyQuery<AanbiederQuery, AanbiederQueryVariables>(AanbiederDocument, baseOptions)
}
export type AanbiederQueryHookResult = ReturnType<typeof useAanbiederQuery>
export type AanbiederLazyQueryHookResult = ReturnType<typeof useAanbiederLazyQuery>
export type AanbiederQueryResult = Apollo.QueryResult<AanbiederQuery, AanbiederQueryVariables>
export const AanbiederEmployeesDocument = gql`
    query aanbiederEmployees($aanbiederId: String!) {
        aanbiederEmployees(aanbiederId: $aanbiederId) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useAanbiederEmployeesQuery__
 *
 * To run a query within a React component, call `useAanbiederEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAanbiederEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAanbiederEmployeesQuery({
 *   variables: {
 *      aanbiederId: // value for 'aanbiederId'
 *   },
 * });
 */
export function useAanbiederEmployeesQuery(
    baseOptions: Apollo.QueryHookOptions<AanbiederEmployeesQuery, AanbiederEmployeesQueryVariables>
) {
    return Apollo.useQuery<AanbiederEmployeesQuery, AanbiederEmployeesQueryVariables>(
        AanbiederEmployeesDocument,
        baseOptions
    )
}
export function useAanbiederEmployeesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<AanbiederEmployeesQuery, AanbiederEmployeesQueryVariables>
) {
    return Apollo.useLazyQuery<AanbiederEmployeesQuery, AanbiederEmployeesQueryVariables>(
        AanbiederEmployeesDocument,
        baseOptions
    )
}
export type AanbiederEmployeesQueryHookResult = ReturnType<typeof useAanbiederEmployeesQuery>
export type AanbiederEmployeesLazyQueryHookResult = ReturnType<typeof useAanbiederEmployeesLazyQuery>
export type AanbiederEmployeesQueryResult = Apollo.QueryResult<
    AanbiederEmployeesQuery,
    AanbiederEmployeesQueryVariables
>
export const AanbiedersDocument = gql`
    query aanbieders {
        aanbieders {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useAanbiedersQuery__
 *
 * To run a query within a React component, call `useAanbiedersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAanbiedersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAanbiedersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAanbiedersQuery(baseOptions?: Apollo.QueryHookOptions<AanbiedersQuery, AanbiedersQueryVariables>) {
    return Apollo.useQuery<AanbiedersQuery, AanbiedersQueryVariables>(AanbiedersDocument, baseOptions)
}
export function useAanbiedersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<AanbiedersQuery, AanbiedersQueryVariables>
) {
    return Apollo.useLazyQuery<AanbiedersQuery, AanbiedersQueryVariables>(AanbiedersDocument, baseOptions)
}
export type AanbiedersQueryHookResult = ReturnType<typeof useAanbiedersQuery>
export type AanbiedersLazyQueryHookResult = ReturnType<typeof useAanbiedersLazyQuery>
export type AanbiedersQueryResult = Apollo.QueryResult<AanbiedersQuery, AanbiedersQueryVariables>
export const CurrentUserDocument = gql`
    query currentUser {
        currentUser {
            id
            username
            givenName
            additionalName
            familyName
            userEnvironment
            organizationId
            organizationName
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
    baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
    return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions)
}
export function useCurrentUserLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
    return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions)
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>
export const MyProgramsDocument = gql`
    query myPrograms {
        myPrograms {
            id
            name
        }
    }
`

/**
 * __useMyProgramsQuery__
 *
 * To run a query within a React component, call `useMyProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProgramsQuery(baseOptions?: Apollo.QueryHookOptions<MyProgramsQuery, MyProgramsQueryVariables>) {
    return Apollo.useQuery<MyProgramsQuery, MyProgramsQueryVariables>(MyProgramsDocument, baseOptions)
}
export function useMyProgramsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MyProgramsQuery, MyProgramsQueryVariables>
) {
    return Apollo.useLazyQuery<MyProgramsQuery, MyProgramsQueryVariables>(MyProgramsDocument, baseOptions)
}
export type MyProgramsQueryHookResult = ReturnType<typeof useMyProgramsQuery>
export type MyProgramsLazyQueryHookResult = ReturnType<typeof useMyProgramsLazyQuery>
export type MyProgramsQueryResult = Apollo.QueryResult<MyProgramsQuery, MyProgramsQueryVariables>
export const PersonsDocument = gql`
    query persons {
        persons {
            node {
                id
                name
            }
        }
    }
`

/**
 * __usePersonsQuery__
 *
 * To run a query within a React component, call `usePersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonsQuery(baseOptions?: Apollo.QueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
    return Apollo.useQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions)
}
export function usePersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
    return Apollo.useLazyQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions)
}
export type PersonsQueryHookResult = ReturnType<typeof usePersonsQuery>
export type PersonsLazyQueryHookResult = ReturnType<typeof usePersonsLazyQuery>
export type PersonsQueryResult = Apollo.QueryResult<PersonsQuery, PersonsQueryVariables>
export const ProgramsDocument = gql`
    query programs {
        programs {
            node {
                id
                name
            }
        }
    }
`

/**
 * __useProgramsQuery__
 *
 * To run a query within a React component, call `useProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProgramsQuery(baseOptions?: Apollo.QueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
    return Apollo.useQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, baseOptions)
}
export function useProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
    return Apollo.useLazyQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, baseOptions)
}
export type ProgramsQueryHookResult = ReturnType<typeof useProgramsQuery>
export type ProgramsLazyQueryHookResult = ReturnType<typeof useProgramsLazyQuery>
export type ProgramsQueryResult = Apollo.QueryResult<ProgramsQuery, ProgramsQueryVariables>
export const RegistrationsDocument = gql`
    query registrations($taalhuisId: String!) {
        registrations(taalhuisId: $taalhuisId) {
            id
            dateCreated
            status
            givenName
            additionalName
            familyName
            registrar {
                organisationName
            }
        }
    }
`

/**
 * __useRegistrationsQuery__
 *
 * To run a query within a React component, call `useRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegistrationsQuery({
 *   variables: {
 *      taalhuisId: // value for 'taalhuisId'
 *   },
 * });
 */
export function useRegistrationsQuery(
    baseOptions: Apollo.QueryHookOptions<RegistrationsQuery, RegistrationsQueryVariables>
) {
    return Apollo.useQuery<RegistrationsQuery, RegistrationsQueryVariables>(RegistrationsDocument, baseOptions)
}
export function useRegistrationsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<RegistrationsQuery, RegistrationsQueryVariables>
) {
    return Apollo.useLazyQuery<RegistrationsQuery, RegistrationsQueryVariables>(RegistrationsDocument, baseOptions)
}
export type RegistrationsQueryHookResult = ReturnType<typeof useRegistrationsQuery>
export type RegistrationsLazyQueryHookResult = ReturnType<typeof useRegistrationsLazyQuery>
export type RegistrationsQueryResult = Apollo.QueryResult<RegistrationsQuery, RegistrationsQueryVariables>
export const TaalhuisDocument = gql`
    query taalhuis($taalhuisId: String!) {
        taalhuis(taalhuisId: $taalhuisId) {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useTaalhuisQuery__
 *
 * To run a query within a React component, call `useTaalhuisQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaalhuisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaalhuisQuery({
 *   variables: {
 *      taalhuisId: // value for 'taalhuisId'
 *   },
 * });
 */
export function useTaalhuisQuery(baseOptions: Apollo.QueryHookOptions<TaalhuisQuery, TaalhuisQueryVariables>) {
    return Apollo.useQuery<TaalhuisQuery, TaalhuisQueryVariables>(TaalhuisDocument, baseOptions)
}
export function useTaalhuisLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TaalhuisQuery, TaalhuisQueryVariables>) {
    return Apollo.useLazyQuery<TaalhuisQuery, TaalhuisQueryVariables>(TaalhuisDocument, baseOptions)
}
export type TaalhuisQueryHookResult = ReturnType<typeof useTaalhuisQuery>
export type TaalhuisLazyQueryHookResult = ReturnType<typeof useTaalhuisLazyQuery>
export type TaalhuisQueryResult = Apollo.QueryResult<TaalhuisQuery, TaalhuisQueryVariables>
export const TaalhuisEmployeeDocument = gql`
    query taalhuisEmployee($userId: String!) {
        taalhuisEmployee(userId: $userId) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useTaalhuisEmployeeQuery__
 *
 * To run a query within a React component, call `useTaalhuisEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaalhuisEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaalhuisEmployeeQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useTaalhuisEmployeeQuery(
    baseOptions: Apollo.QueryHookOptions<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>
) {
    return Apollo.useQuery<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>(TaalhuisEmployeeDocument, baseOptions)
}
export function useTaalhuisEmployeeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>
) {
    return Apollo.useLazyQuery<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>(
        TaalhuisEmployeeDocument,
        baseOptions
    )
}
export type TaalhuisEmployeeQueryHookResult = ReturnType<typeof useTaalhuisEmployeeQuery>
export type TaalhuisEmployeeLazyQueryHookResult = ReturnType<typeof useTaalhuisEmployeeLazyQuery>
export type TaalhuisEmployeeQueryResult = Apollo.QueryResult<TaalhuisEmployeeQuery, TaalhuisEmployeeQueryVariables>
export const TaalhuisEmployeesDocument = gql`
    query taalhuisEmployees($taalhuisId: String!) {
        taalhuisEmployees(taalhuisId: $taalhuisId) {
            id
            givenName
            additionalName
            familyName
            email
            telephone
            dateCreated
            dateModified
            userRoles {
                id
                name
            }
        }
    }
`

/**
 * __useTaalhuisEmployeesQuery__
 *
 * To run a query within a React component, call `useTaalhuisEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaalhuisEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaalhuisEmployeesQuery({
 *   variables: {
 *      taalhuisId: // value for 'taalhuisId'
 *   },
 * });
 */
export function useTaalhuisEmployeesQuery(
    baseOptions: Apollo.QueryHookOptions<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>
) {
    return Apollo.useQuery<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>(
        TaalhuisEmployeesDocument,
        baseOptions
    )
}
export function useTaalhuisEmployeesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>
) {
    return Apollo.useLazyQuery<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>(
        TaalhuisEmployeesDocument,
        baseOptions
    )
}
export type TaalhuisEmployeesQueryHookResult = ReturnType<typeof useTaalhuisEmployeesQuery>
export type TaalhuisEmployeesLazyQueryHookResult = ReturnType<typeof useTaalhuisEmployeesLazyQuery>
export type TaalhuisEmployeesQueryResult = Apollo.QueryResult<TaalhuisEmployeesQuery, TaalhuisEmployeesQueryVariables>
export const TaalhuizenDocument = gql`
    query taalhuizen {
        taalhuizen {
            id
            name
            address {
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
            email
            telephone
            type
        }
    }
`

/**
 * __useTaalhuizenQuery__
 *
 * To run a query within a React component, call `useTaalhuizenQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaalhuizenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaalhuizenQuery({
 *   variables: {
 *   },
 * });
 */
export function useTaalhuizenQuery(baseOptions?: Apollo.QueryHookOptions<TaalhuizenQuery, TaalhuizenQueryVariables>) {
    return Apollo.useQuery<TaalhuizenQuery, TaalhuizenQueryVariables>(TaalhuizenDocument, baseOptions)
}
export function useTaalhuizenLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<TaalhuizenQuery, TaalhuizenQueryVariables>
) {
    return Apollo.useLazyQuery<TaalhuizenQuery, TaalhuizenQueryVariables>(TaalhuizenDocument, baseOptions)
}
export type TaalhuizenQueryHookResult = ReturnType<typeof useTaalhuizenQuery>
export type TaalhuizenLazyQueryHookResult = ReturnType<typeof useTaalhuizenLazyQuery>
export type TaalhuizenQueryResult = Apollo.QueryResult<TaalhuizenQuery, TaalhuizenQueryVariables>
export const UserRolesByTaalhuisIdDocument = gql`
    query userRolesByTaalhuisId($taalhuisId: String!) {
        userRolesByTaalhuisId(taalhuisId: $taalhuisId) {
            id
            name
        }
    }
`

/**
 * __useUserRolesByTaalhuisIdQuery__
 *
 * To run a query within a React component, call `useUserRolesByTaalhuisIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesByTaalhuisIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesByTaalhuisIdQuery({
 *   variables: {
 *      taalhuisId: // value for 'taalhuisId'
 *   },
 * });
 */
export function useUserRolesByTaalhuisIdQuery(
    baseOptions: Apollo.QueryHookOptions<UserRolesByTaalhuisIdQuery, UserRolesByTaalhuisIdQueryVariables>
) {
    return Apollo.useQuery<UserRolesByTaalhuisIdQuery, UserRolesByTaalhuisIdQueryVariables>(
        UserRolesByTaalhuisIdDocument,
        baseOptions
    )
}
export function useUserRolesByTaalhuisIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UserRolesByTaalhuisIdQuery, UserRolesByTaalhuisIdQueryVariables>
) {
    return Apollo.useLazyQuery<UserRolesByTaalhuisIdQuery, UserRolesByTaalhuisIdQueryVariables>(
        UserRolesByTaalhuisIdDocument,
        baseOptions
    )
}
export type UserRolesByTaalhuisIdQueryHookResult = ReturnType<typeof useUserRolesByTaalhuisIdQuery>
export type UserRolesByTaalhuisIdLazyQueryHookResult = ReturnType<typeof useUserRolesByTaalhuisIdLazyQuery>
export type UserRolesByTaalhuisIdQueryResult = Apollo.QueryResult<
    UserRolesByTaalhuisIdQuery,
    UserRolesByTaalhuisIdQueryVariables
>
