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

export type UserType = {
    __typename?: 'UserType'
    id: Scalars['String']
    username: Scalars['String']
}

export type UserEdgeType = {
    __typename?: 'UserEdgeType'
    node: UserType
}

export type Query = {
    __typename?: 'Query'
    persons: Array<PersonEdgeType>
    programs: Array<ProgramEdgeType>
    myPrograms: Array<ProgramType>
}

export type Mutation = {
    __typename?: 'Mutation'
    addPerson: PersonEdgeType
    login: UserEdgeType
}

export type MutationAddPersonArgs = {
    name: Scalars['String']
}

export type MutationLoginArgs = {
    username: Scalars['String']
}

export type AddPersonMutationVariables = Exact<{
    name: Scalars['String']
}>

export type AddPersonMutation = { __typename?: 'Mutation' } & {
    addPerson: { __typename?: 'PersonEdgeType' } & {
        node: { __typename?: 'PersonType' } & Pick<PersonType, 'id' | 'name'>
    }
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
