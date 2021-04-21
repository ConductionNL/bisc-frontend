import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql'
import gql from 'graphql-tag'
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
    attribute?: Maybe<Attribute>
    attributes?: Maybe<AttributeConnection>
    entity?: Maybe<Entity>
    entities?: Maybe<EntityConnection>
    objectCommunication?: Maybe<ObjectCommunication>
    objectCommunications?: Maybe<ObjectCommunicationConnection>
    objectEntity?: Maybe<ObjectEntity>
    objectEntities?: Maybe<ObjectEntityConnection>
    value?: Maybe<Value>
    values?: Maybe<ValueConnection>
    auditTrail?: Maybe<AuditTrail>
    auditTrails?: Maybe<AuditTrailConnection>
    changeLog?: Maybe<ChangeLog>
    changeLogs?: Maybe<ChangeLogConnection>
}

export type QueryNodeArgs = {
    id: Scalars['ID']
}

export type QueryAttributeArgs = {
    id: Scalars['ID']
}

export type QueryAttributesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    exclusiveMaximum?: Maybe<Scalars['Boolean']>
    exclusiveMinimum?: Maybe<Scalars['Boolean']>
    uniqueItems?: Maybe<Scalars['Boolean']>
    required?: Maybe<Scalars['Boolean']>
    nullable?: Maybe<Scalars['Boolean']>
    readOnly?: Maybe<Scalars['Boolean']>
    writeOnly?: Maybe<Scalars['Boolean']>
    deprecated?: Maybe<Scalars['Boolean']>
    order?: Maybe<AttributeFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
    format?: Maybe<Scalars['String']>
    format_list?: Maybe<Array<Maybe<Scalars['String']>>>
    multipleOf?: Maybe<Scalars['Int']>
    multipleOf_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    maximum?: Maybe<Scalars['Int']>
    maximum_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    exclusiveMaximum_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    minimum?: Maybe<Scalars['Int']>
    minimum_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    exclusiveMinimum_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    maxLength?: Maybe<Scalars['Int']>
    maxLength_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    minLength?: Maybe<Scalars['Int']>
    minLength_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    maxItems?: Maybe<Scalars['Int']>
    maxItems_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    minItems?: Maybe<Scalars['Int']>
    minItems_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    uniqueItems_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    maxProperties?: Maybe<Scalars['Int']>
    maxProperties_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    minProperties?: Maybe<Scalars['Int']>
    minProperties_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    required_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    enum?: Maybe<Scalars['Iterable']>
    enum_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    allOf?: Maybe<Scalars['Iterable']>
    allOf_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    anyOf?: Maybe<Scalars['Iterable']>
    anyOf_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    oneOf?: Maybe<Scalars['Iterable']>
    oneOf_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    defaultValue?: Maybe<Scalars['String']>
    defaultValue_list?: Maybe<Array<Maybe<Scalars['String']>>>
    nullable_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    readOnly_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    writeOnly_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    example?: Maybe<Scalars['String']>
    example_list?: Maybe<Array<Maybe<Scalars['String']>>>
    deprecated_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    minDate?: Maybe<Scalars['String']>
    minDate_list?: Maybe<Array<Maybe<Scalars['String']>>>
    maxDate?: Maybe<Scalars['String']>
    maxDate_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryEntityArgs = {
    id: Scalars['ID']
}

export type QueryEntitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<EntityFilter_Order>
    dateCreated?: Maybe<EntityFilter_DateCreated>
    dateModified?: Maybe<EntityFilter_DateModified>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryObjectCommunicationArgs = {
    id: Scalars['ID']
}

export type QueryObjectCommunicationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryObjectEntityArgs = {
    id: Scalars['ID']
}

export type QueryObjectEntitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ObjectEntityFilter_Order>
    uri?: Maybe<Scalars['String']>
}

export type QueryValueArgs = {
    id: Scalars['ID']
}

export type QueryValuesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    booleanValue?: Maybe<Scalars['Boolean']>
    order?: Maybe<ValueFilter_Order>
    dateTimeValue?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    uri?: Maybe<Scalars['String']>
    uri_list?: Maybe<Array<Maybe<Scalars['String']>>>
    value?: Maybe<Scalars['String']>
    value_list?: Maybe<Array<Maybe<Scalars['String']>>>
    integerValue?: Maybe<Scalars['Int']>
    integerValue_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    booleanValue_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    arrayValue?: Maybe<Scalars['Iterable']>
    arrayValue_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    dateTimeValue_list?: Maybe<Array<Maybe<Scalars['String']>>>
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

/** Description */
export type Attribute = Node & {
    __typename?: 'Attribute'
    id: Scalars['ID']
    /** The name of the property as used in api calls */
    name?: Maybe<Scalars['String']>
    attributeValues?: Maybe<ValueConnection>
    entity?: Maybe<Entity>
    /** *Can only be used in combination with type integer* Specifies a number where the value should be a multiple of, e.g. a multiple of 2 would validate 2,4 and 6 but would prevent 5 */
    multipleOf?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* The maximum allowed value */
    maximum?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* Defines if the maximum is exclusive, e.g. a exclusive maximum of 5 would invalidate 5 but validate 4 */
    exclusiveMaximum?: Maybe<Scalars['Boolean']>
    /** *Can only be used in combination with type integer* The minimum allowed value */
    minimum?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* Defines if the minimum is exclusive, e.g. a exclusive minimum of 5 would invalidate 5 but validate 6 */
    exclusiveMinimum?: Maybe<Scalars['Boolean']>
    /** The maximum amount of characters in the value */
    maxLength?: Maybe<Scalars['Int']>
    /** The minimal amount of characters in the value */
    minLength?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* The maximum array length */
    maxItems?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* The minimum array length */
    minItems?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* Define whether or not values in an array should be unique */
    uniqueItems?: Maybe<Scalars['Boolean']>
    /** *Can only be used in combination with type object* The maximum amount of properties an object should contain */
    maxProperties?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type object* The minimum amount of properties an object should contain */
    minProperties?: Maybe<Scalars['Int']>
    /** Only whether or not this property is required */
    required?: Maybe<Scalars['Boolean']>
    /** An array of possible values, input is limited to this array] */
    enum?: Maybe<Scalars['Iterable']>
    /** The type of this property */
    type?: Maybe<Scalars['String']>
    /** An description of the value asked, supports markdown syntax as described by [CommonMark 0.27.](https://spec.commonmark.org/0.27/) */
    description?: Maybe<Scalars['String']>
    /** An default value for this value that will be used if a user doesn't supply a value */
    defaultValue?: Maybe<Scalars['String']>
    /** The swagger type of the property as used in api calls */
    format?: Maybe<Scalars['String']>
    /** Whether or not this property can be left empty */
    nullable?: Maybe<Scalars['Boolean']>
    /** Whether or not this property is read only */
    readOnly?: Maybe<Scalars['Boolean']>
    /** Whether or not this property is write only */
    writeOnly?: Maybe<Scalars['Boolean']>
    /** An example of the value that should be supplied */
    example?: Maybe<Scalars['String']>
    /** Whether or not this property has been deprecated and wil be removed in the future */
    deprecated?: Maybe<Scalars['Boolean']>
    /** The minimal date for value, either a date, datetime or duration (ISO_8601) */
    minDate?: Maybe<Scalars['String']>
    /** The maximum date for value, either a date, datetime or duration (ISO_8601) */
    maxDate?: Maybe<Scalars['String']>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Description */
export type AttributeAttributeValuesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    booleanValue?: Maybe<Scalars['Boolean']>
    order?: Maybe<ValueFilter_Order>
    dateTimeValue?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    uri?: Maybe<Scalars['String']>
    uri_list?: Maybe<Array<Maybe<Scalars['String']>>>
    value?: Maybe<Scalars['String']>
    value_list?: Maybe<Array<Maybe<Scalars['String']>>>
    integerValue?: Maybe<Scalars['Int']>
    integerValue_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    booleanValue_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    arrayValue?: Maybe<Scalars['Iterable']>
    arrayValue_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    dateTimeValue_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type ValueFilter_Order = {
    id?: Maybe<Scalars['String']>
    uri?: Maybe<Scalars['String']>
    value?: Maybe<Scalars['String']>
    integerValue?: Maybe<Scalars['String']>
    booleanValue?: Maybe<Scalars['String']>
    arrayValue?: Maybe<Scalars['String']>
    dateTimeValue?: Maybe<Scalars['String']>
}

/** Connection for Value. */
export type ValueConnection = {
    __typename?: 'ValueConnection'
    edges?: Maybe<Array<Maybe<ValueEdge>>>
    pageInfo: ValuePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Value. */
export type ValueEdge = {
    __typename?: 'ValueEdge'
    node?: Maybe<Value>
    cursor: Scalars['String']
}

/** Description. */
export type Value = Node & {
    __typename?: 'Value'
    id: Scalars['ID']
    /** An uri */
    uri: Scalars['String']
    /** The actual value */
    value?: Maybe<Scalars['String']>
    /** Integer if the value is type integer */
    integerValue?: Maybe<Scalars['Int']>
    /** Boolean if the value is type boolean */
    booleanValue?: Maybe<Scalars['Boolean']>
    /** Array if the value is type array */
    arrayValue?: Maybe<Scalars['Iterable']>
    /** DateTime if the value is type DateTime */
    dateTimeValue?: Maybe<Scalars['String']>
    attribute: Attribute
    objectEntity: ObjectEntity
}

/** Description */
export type ObjectEntity = Node & {
    __typename?: 'ObjectEntity'
    id: Scalars['ID']
    /** An uri */
    uri?: Maybe<Scalars['String']>
    entity?: Maybe<Entity>
    objectValues?: Maybe<ValueConnection>
}

/** Description */
export type ObjectEntityObjectValuesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    booleanValue?: Maybe<Scalars['Boolean']>
    order?: Maybe<ValueFilter_Order>
    dateTimeValue?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    uri?: Maybe<Scalars['String']>
    uri_list?: Maybe<Array<Maybe<Scalars['String']>>>
    value?: Maybe<Scalars['String']>
    value_list?: Maybe<Array<Maybe<Scalars['String']>>>
    integerValue?: Maybe<Scalars['Int']>
    integerValue_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    booleanValue_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    arrayValue?: Maybe<Scalars['Iterable']>
    arrayValue_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    dateTimeValue_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type Entity = Node & {
    __typename?: 'Entity'
    id: Scalars['ID']
    /** The type of this Entity */
    type: Scalars['String']
    /** The name of this Entity */
    name: Scalars['String']
    /** The description of this Entity */
    description?: Maybe<Scalars['String']>
    attributes?: Maybe<AttributeConnection>
    objectEntities?: Maybe<ObjectEntityConnection>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

export type EntityAttributesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    exclusiveMaximum?: Maybe<Scalars['Boolean']>
    exclusiveMinimum?: Maybe<Scalars['Boolean']>
    uniqueItems?: Maybe<Scalars['Boolean']>
    required?: Maybe<Scalars['Boolean']>
    nullable?: Maybe<Scalars['Boolean']>
    readOnly?: Maybe<Scalars['Boolean']>
    writeOnly?: Maybe<Scalars['Boolean']>
    deprecated?: Maybe<Scalars['Boolean']>
    order?: Maybe<AttributeFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
    format?: Maybe<Scalars['String']>
    format_list?: Maybe<Array<Maybe<Scalars['String']>>>
    multipleOf?: Maybe<Scalars['Int']>
    multipleOf_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    maximum?: Maybe<Scalars['Int']>
    maximum_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    exclusiveMaximum_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    minimum?: Maybe<Scalars['Int']>
    minimum_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    exclusiveMinimum_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    maxLength?: Maybe<Scalars['Int']>
    maxLength_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    minLength?: Maybe<Scalars['Int']>
    minLength_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    maxItems?: Maybe<Scalars['Int']>
    maxItems_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    minItems?: Maybe<Scalars['Int']>
    minItems_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    uniqueItems_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    maxProperties?: Maybe<Scalars['Int']>
    maxProperties_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    minProperties?: Maybe<Scalars['Int']>
    minProperties_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    required_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    enum?: Maybe<Scalars['Iterable']>
    enum_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    allOf?: Maybe<Scalars['Iterable']>
    allOf_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    anyOf?: Maybe<Scalars['Iterable']>
    anyOf_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    oneOf?: Maybe<Scalars['Iterable']>
    oneOf_list?: Maybe<Array<Maybe<Scalars['Iterable']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    defaultValue?: Maybe<Scalars['String']>
    defaultValue_list?: Maybe<Array<Maybe<Scalars['String']>>>
    nullable_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    readOnly_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    writeOnly_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    example?: Maybe<Scalars['String']>
    example_list?: Maybe<Array<Maybe<Scalars['String']>>>
    deprecated_list?: Maybe<Array<Maybe<Scalars['Boolean']>>>
    minDate?: Maybe<Scalars['String']>
    minDate_list?: Maybe<Array<Maybe<Scalars['String']>>>
    maxDate?: Maybe<Scalars['String']>
    maxDate_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type EntityObjectEntitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ObjectEntityFilter_Order>
    uri?: Maybe<Scalars['String']>
}

export type AttributeFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    format?: Maybe<Scalars['String']>
    multipleOf?: Maybe<Scalars['String']>
    maximum?: Maybe<Scalars['String']>
    exclusiveMaximum?: Maybe<Scalars['String']>
    minimum?: Maybe<Scalars['String']>
    exclusiveMinimum?: Maybe<Scalars['String']>
    maxLength?: Maybe<Scalars['String']>
    minLength?: Maybe<Scalars['String']>
    maxItems?: Maybe<Scalars['String']>
    minItems?: Maybe<Scalars['String']>
    uniqueItems?: Maybe<Scalars['String']>
    maxProperties?: Maybe<Scalars['String']>
    minProperties?: Maybe<Scalars['String']>
    required?: Maybe<Scalars['String']>
    enum?: Maybe<Scalars['String']>
    allOf?: Maybe<Scalars['String']>
    anyOf?: Maybe<Scalars['String']>
    oneOf?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    defaultValue?: Maybe<Scalars['String']>
    nullable?: Maybe<Scalars['String']>
    readOnly?: Maybe<Scalars['String']>
    writeOnly?: Maybe<Scalars['String']>
    example?: Maybe<Scalars['String']>
    deprecated?: Maybe<Scalars['String']>
    minDate?: Maybe<Scalars['String']>
    maxDate?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Attribute. */
export type AttributeConnection = {
    __typename?: 'AttributeConnection'
    edges?: Maybe<Array<Maybe<AttributeEdge>>>
    pageInfo: AttributePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Attribute. */
export type AttributeEdge = {
    __typename?: 'AttributeEdge'
    node?: Maybe<Attribute>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AttributePageInfo = {
    __typename?: 'AttributePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type ObjectEntityFilter_Order = {
    id?: Maybe<Scalars['String']>
    uri?: Maybe<Scalars['String']>
}

/** Connection for ObjectEntity. */
export type ObjectEntityConnection = {
    __typename?: 'ObjectEntityConnection'
    edges?: Maybe<Array<Maybe<ObjectEntityEdge>>>
    pageInfo: ObjectEntityPageInfo
    totalCount: Scalars['Int']
}

/** Edge of ObjectEntity. */
export type ObjectEntityEdge = {
    __typename?: 'ObjectEntityEdge'
    node?: Maybe<ObjectEntity>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ObjectEntityPageInfo = {
    __typename?: 'ObjectEntityPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type ValuePageInfo = {
    __typename?: 'ValuePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type EntityFilter_Order = {
    id?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type EntityFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type EntityFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Entity. */
export type EntityConnection = {
    __typename?: 'EntityConnection'
    edges?: Maybe<Array<Maybe<EntityEdge>>>
    pageInfo: EntityPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Entity. */
export type EntityEdge = {
    __typename?: 'EntityEdge'
    node?: Maybe<Entity>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type EntityPageInfo = {
    __typename?: 'EntityPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Description */
export type ObjectCommunication = Node & {
    __typename?: 'ObjectCommunication'
    id: Scalars['ID']
    /** (get, post and put) The component code for the objectEntity we are getting, creating or updating */
    componentCode: Scalars['String']
    /** (get, post and put) The entity name for the objectEntity we are getting, creating or updating. (this actually needs to be the second value of the entity type, so in case of entity type: cc/people, this would/should be people) */
    entityName: Scalars['String']
    /** (get or put) The uuid of the objectEntity we are getting or updating */
    objectEntityId: Scalars['String']
    /** (get, post or put) The url of the extern object that has an Entity with Attributes in EAV. That we are getting, updating or creating a new EAV objectEntity for */
    self?: Maybe<Scalars['String']>
    /** (post or put) The values for creating or updating an extern object and the values for the Entity with Attributes in EAV for this extern object. */
    body?: Maybe<Scalars['Iterable']>
    /** If you want to do a get call through a post for some weird reason, use this boolean and set it to True */
    doGet?: Maybe<Scalars['Boolean']>
}

/** Connection for ObjectCommunication. */
export type ObjectCommunicationConnection = {
    __typename?: 'ObjectCommunicationConnection'
    edges?: Maybe<Array<Maybe<ObjectCommunicationEdge>>>
    pageInfo: ObjectCommunicationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of ObjectCommunication. */
export type ObjectCommunicationEdge = {
    __typename?: 'ObjectCommunicationEdge'
    node?: Maybe<ObjectCommunication>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ObjectCommunicationPageInfo = {
    __typename?: 'ObjectCommunicationPageInfo'
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
    /** Deletes a Attribute. */
    deleteAttribute?: Maybe<DeleteAttributePayload>
    /** Updates a Attribute. */
    updateAttribute?: Maybe<UpdateAttributePayload>
    /** Creates a Attribute. */
    createAttribute?: Maybe<CreateAttributePayload>
    /** Deletes a Entity. */
    deleteEntity?: Maybe<DeleteEntityPayload>
    /** Updates a Entity. */
    updateEntity?: Maybe<UpdateEntityPayload>
    /** Creates a Entity. */
    createEntity?: Maybe<CreateEntityPayload>
    /** Deletes a ObjectCommunication. */
    deleteObjectCommunication?: Maybe<DeleteObjectCommunicationPayload>
    /** Updates a ObjectCommunication. */
    updateObjectCommunication?: Maybe<UpdateObjectCommunicationPayload>
    /** Creates a ObjectCommunication. */
    createObjectCommunication?: Maybe<CreateObjectCommunicationPayload>
    /** Deletes a ObjectEntity. */
    deleteObjectEntity?: Maybe<DeleteObjectEntityPayload>
    /** Updates a ObjectEntity. */
    updateObjectEntity?: Maybe<UpdateObjectEntityPayload>
    /** Creates a ObjectEntity. */
    createObjectEntity?: Maybe<CreateObjectEntityPayload>
    /** Deletes a Value. */
    deleteValue?: Maybe<DeleteValuePayload>
    /** Updates a Value. */
    updateValue?: Maybe<UpdateValuePayload>
    /** Creates a Value. */
    createValue?: Maybe<CreateValuePayload>
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

export type MutationDeleteAttributeArgs = {
    input: DeleteAttributeInput
}

export type MutationUpdateAttributeArgs = {
    input: UpdateAttributeInput
}

export type MutationCreateAttributeArgs = {
    input: CreateAttributeInput
}

export type MutationDeleteEntityArgs = {
    input: DeleteEntityInput
}

export type MutationUpdateEntityArgs = {
    input: UpdateEntityInput
}

export type MutationCreateEntityArgs = {
    input: CreateEntityInput
}

export type MutationDeleteObjectCommunicationArgs = {
    input: DeleteObjectCommunicationInput
}

export type MutationUpdateObjectCommunicationArgs = {
    input: UpdateObjectCommunicationInput
}

export type MutationCreateObjectCommunicationArgs = {
    input: CreateObjectCommunicationInput
}

export type MutationDeleteObjectEntityArgs = {
    input: DeleteObjectEntityInput
}

export type MutationUpdateObjectEntityArgs = {
    input: UpdateObjectEntityInput
}

export type MutationCreateObjectEntityArgs = {
    input: CreateObjectEntityInput
}

export type MutationDeleteValueArgs = {
    input: DeleteValueInput
}

export type MutationUpdateValueArgs = {
    input: UpdateValueInput
}

export type MutationCreateValueArgs = {
    input: CreateValueInput
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

/** Description */
export type DeleteAttributeInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type DeleteAttributePayload = {
    __typename?: 'deleteAttributePayload'
    attribute?: Maybe<Attribute>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type UpdateAttributeInput = {
    id: Scalars['ID']
    /** The name of the property as used in api calls */
    name?: Maybe<Scalars['String']>
    attributeValues?: Maybe<Array<Maybe<Scalars['String']>>>
    entity?: Maybe<Scalars['String']>
    /** *Can only be used in combination with type integer* Specifies a number where the value should be a multiple of, e.g. a multiple of 2 would validate 2,4 and 6 but would prevent 5 */
    multipleOf?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* The maximum allowed value */
    maximum?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* Defines if the maximum is exclusive, e.g. a exclusive maximum of 5 would invalidate 5 but validate 4 */
    exclusiveMaximum?: Maybe<Scalars['Boolean']>
    /** *Can only be used in combination with type integer* The minimum allowed value */
    minimum?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* Defines if the minimum is exclusive, e.g. a exclusive minimum of 5 would invalidate 5 but validate 6 */
    exclusiveMinimum?: Maybe<Scalars['Boolean']>
    /** The maximum amount of characters in the value */
    maxLength?: Maybe<Scalars['Int']>
    /** The minimal amount of characters in the value */
    minLength?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* The maximum array length */
    maxItems?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* The minimum array length */
    minItems?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* Define whether or not values in an array should be unique */
    uniqueItems?: Maybe<Scalars['Boolean']>
    /** *Can only be used in combination with type object* The maximum amount of properties an object should contain */
    maxProperties?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type object* The minimum amount of properties an object should contain */
    minProperties?: Maybe<Scalars['Int']>
    /** Only whether or not this property is required */
    required?: Maybe<Scalars['Boolean']>
    /** An array of possible values, input is limited to this array] */
    enum?: Maybe<Scalars['Iterable']>
    /** The type of this property */
    type?: Maybe<Scalars['String']>
    /** An description of the value asked, supports markdown syntax as described by [CommonMark 0.27.](https://spec.commonmark.org/0.27/) */
    description?: Maybe<Scalars['String']>
    /** An default value for this value that will be used if a user doesn't supply a value */
    defaultValue?: Maybe<Scalars['String']>
    /** The swagger type of the property as used in api calls */
    format?: Maybe<Scalars['String']>
    /** Whether or not this property can be left empty */
    nullable?: Maybe<Scalars['Boolean']>
    /** Whether or not this property is read only */
    readOnly?: Maybe<Scalars['Boolean']>
    /** Whether or not this property is write only */
    writeOnly?: Maybe<Scalars['Boolean']>
    /** An example of the value that should be supplied */
    example?: Maybe<Scalars['String']>
    /** Whether or not this property has been deprecated and wil be removed in the future */
    deprecated?: Maybe<Scalars['Boolean']>
    /** The minimal date for value, either a date, datetime or duration (ISO_8601) */
    minDate?: Maybe<Scalars['String']>
    /** The maximum date for value, either a date, datetime or duration (ISO_8601) */
    maxDate?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type UpdateAttributePayload = {
    __typename?: 'updateAttributePayload'
    attribute?: Maybe<Attribute>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type CreateAttributeInput = {
    /** The name of the property as used in api calls */
    name?: Maybe<Scalars['String']>
    attributeValues?: Maybe<Array<Maybe<Scalars['String']>>>
    entity?: Maybe<Scalars['String']>
    /** *Can only be used in combination with type integer* Specifies a number where the value should be a multiple of, e.g. a multiple of 2 would validate 2,4 and 6 but would prevent 5 */
    multipleOf?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* The maximum allowed value */
    maximum?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* Defines if the maximum is exclusive, e.g. a exclusive maximum of 5 would invalidate 5 but validate 4 */
    exclusiveMaximum?: Maybe<Scalars['Boolean']>
    /** *Can only be used in combination with type integer* The minimum allowed value */
    minimum?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type integer* Defines if the minimum is exclusive, e.g. a exclusive minimum of 5 would invalidate 5 but validate 6 */
    exclusiveMinimum?: Maybe<Scalars['Boolean']>
    /** The maximum amount of characters in the value */
    maxLength?: Maybe<Scalars['Int']>
    /** The minimal amount of characters in the value */
    minLength?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* The maximum array length */
    maxItems?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* The minimum array length */
    minItems?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type array* Define whether or not values in an array should be unique */
    uniqueItems?: Maybe<Scalars['Boolean']>
    /** *Can only be used in combination with type object* The maximum amount of properties an object should contain */
    maxProperties?: Maybe<Scalars['Int']>
    /** *Can only be used in combination with type object* The minimum amount of properties an object should contain */
    minProperties?: Maybe<Scalars['Int']>
    /** Only whether or not this property is required */
    required?: Maybe<Scalars['Boolean']>
    /** An array of possible values, input is limited to this array] */
    enum?: Maybe<Scalars['Iterable']>
    /** The type of this property */
    type?: Maybe<Scalars['String']>
    /** An description of the value asked, supports markdown syntax as described by [CommonMark 0.27.](https://spec.commonmark.org/0.27/) */
    description?: Maybe<Scalars['String']>
    /** An default value for this value that will be used if a user doesn't supply a value */
    defaultValue?: Maybe<Scalars['String']>
    /** The swagger type of the property as used in api calls */
    format?: Maybe<Scalars['String']>
    /** Whether or not this property can be left empty */
    nullable?: Maybe<Scalars['Boolean']>
    /** Whether or not this property is read only */
    readOnly?: Maybe<Scalars['Boolean']>
    /** Whether or not this property is write only */
    writeOnly?: Maybe<Scalars['Boolean']>
    /** An example of the value that should be supplied */
    example?: Maybe<Scalars['String']>
    /** Whether or not this property has been deprecated and wil be removed in the future */
    deprecated?: Maybe<Scalars['Boolean']>
    /** The minimal date for value, either a date, datetime or duration (ISO_8601) */
    minDate?: Maybe<Scalars['String']>
    /** The maximum date for value, either a date, datetime or duration (ISO_8601) */
    maxDate?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type CreateAttributePayload = {
    __typename?: 'createAttributePayload'
    attribute?: Maybe<Attribute>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteEntityInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteEntityPayload = {
    __typename?: 'deleteEntityPayload'
    entity?: Maybe<Entity>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateEntityInput = {
    id: Scalars['ID']
    /** The type of this Entity */
    type?: Maybe<Scalars['String']>
    /** The name of this Entity */
    name?: Maybe<Scalars['String']>
    /** The description of this Entity */
    description?: Maybe<Scalars['String']>
    attributes?: Maybe<Array<Maybe<Scalars['String']>>>
    objectEntities?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateEntityPayload = {
    __typename?: 'updateEntityPayload'
    entity?: Maybe<Entity>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateEntityInput = {
    /** The type of this Entity */
    type: Scalars['String']
    /** The name of this Entity */
    name: Scalars['String']
    /** The description of this Entity */
    description?: Maybe<Scalars['String']>
    attributes?: Maybe<Array<Maybe<Scalars['String']>>>
    objectEntities?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateEntityPayload = {
    __typename?: 'createEntityPayload'
    entity?: Maybe<Entity>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type DeleteObjectCommunicationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type DeleteObjectCommunicationPayload = {
    __typename?: 'deleteObjectCommunicationPayload'
    objectCommunication?: Maybe<ObjectCommunication>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type UpdateObjectCommunicationInput = {
    id: Scalars['ID']
    /** (get, post and put) The component code for the objectEntity we are getting, creating or updating */
    componentCode?: Maybe<Scalars['String']>
    /** (get, post and put) The entity name for the objectEntity we are getting, creating or updating. (this actually needs to be the second value of the entity type, so in case of entity type: cc/people, this would/should be people) */
    entityName?: Maybe<Scalars['String']>
    /** (get or put) The uuid of the objectEntity we are getting or updating */
    objectEntityId?: Maybe<Scalars['String']>
    /** (get, post or put) The url of the extern object that has an Entity with Attributes in EAV. That we are getting, updating or creating a new EAV objectEntity for */
    self?: Maybe<Scalars['String']>
    /** (post or put) The values for creating or updating an extern object and the values for the Entity with Attributes in EAV for this extern object. */
    body?: Maybe<Scalars['Iterable']>
    /** If you want to do a get call through a post for some weird reason, use this boolean and set it to True */
    doGet?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type UpdateObjectCommunicationPayload = {
    __typename?: 'updateObjectCommunicationPayload'
    objectCommunication?: Maybe<ObjectCommunication>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type CreateObjectCommunicationInput = {
    /** (get, post and put) The component code for the objectEntity we are getting, creating or updating */
    componentCode: Scalars['String']
    /** (get, post and put) The entity name for the objectEntity we are getting, creating or updating. (this actually needs to be the second value of the entity type, so in case of entity type: cc/people, this would/should be people) */
    entityName: Scalars['String']
    /** (get or put) The uuid of the objectEntity we are getting or updating */
    objectEntityId: Scalars['String']
    /** (get, post or put) The url of the extern object that has an Entity with Attributes in EAV. That we are getting, updating or creating a new EAV objectEntity for */
    self?: Maybe<Scalars['String']>
    /** (post or put) The values for creating or updating an extern object and the values for the Entity with Attributes in EAV for this extern object. */
    body?: Maybe<Scalars['Iterable']>
    /** If you want to do a get call through a post for some weird reason, use this boolean and set it to True */
    doGet?: Maybe<Scalars['Boolean']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type CreateObjectCommunicationPayload = {
    __typename?: 'createObjectCommunicationPayload'
    objectCommunication?: Maybe<ObjectCommunication>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type DeleteObjectEntityInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type DeleteObjectEntityPayload = {
    __typename?: 'deleteObjectEntityPayload'
    objectEntity?: Maybe<ObjectEntity>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type UpdateObjectEntityInput = {
    id: Scalars['ID']
    /** An uri */
    uri?: Maybe<Scalars['String']>
    entity?: Maybe<Scalars['String']>
    objectValues?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type UpdateObjectEntityPayload = {
    __typename?: 'updateObjectEntityPayload'
    objectEntity?: Maybe<ObjectEntity>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type CreateObjectEntityInput = {
    /** An uri */
    uri?: Maybe<Scalars['String']>
    entity?: Maybe<Scalars['String']>
    objectValues?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description */
export type CreateObjectEntityPayload = {
    __typename?: 'createObjectEntityPayload'
    objectEntity?: Maybe<ObjectEntity>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description. */
export type DeleteValueInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description. */
export type DeleteValuePayload = {
    __typename?: 'deleteValuePayload'
    value?: Maybe<Value>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description. */
export type UpdateValueInput = {
    id: Scalars['ID']
    /** An uri */
    uri?: Maybe<Scalars['String']>
    /** The actual value */
    value?: Maybe<Scalars['String']>
    /** Integer if the value is type integer */
    integerValue?: Maybe<Scalars['Int']>
    /** Boolean if the value is type boolean */
    booleanValue?: Maybe<Scalars['Boolean']>
    /** Array if the value is type array */
    arrayValue?: Maybe<Scalars['Iterable']>
    /** DateTime if the value is type DateTime */
    dateTimeValue?: Maybe<Scalars['String']>
    attribute?: Maybe<Scalars['String']>
    objectEntity?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description. */
export type UpdateValuePayload = {
    __typename?: 'updateValuePayload'
    value?: Maybe<Value>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description. */
export type CreateValueInput = {
    /** An uri */
    uri: Scalars['String']
    /** The actual value */
    value?: Maybe<Scalars['String']>
    /** Integer if the value is type integer */
    integerValue?: Maybe<Scalars['Int']>
    /** Boolean if the value is type boolean */
    booleanValue?: Maybe<Scalars['Boolean']>
    /** Array if the value is type array */
    arrayValue?: Maybe<Scalars['Iterable']>
    /** DateTime if the value is type DateTime */
    dateTimeValue?: Maybe<Scalars['String']>
    attribute: Scalars['String']
    objectEntity: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Description. */
export type CreateValuePayload = {
    __typename?: 'createValuePayload'
    value?: Maybe<Value>
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

export type CreateAttributeMutationVariables = Exact<{
    input: CreateAttributeInput
}>

export type CreateAttributeMutation = { __typename?: 'Mutation' } & {
    createAttribute?: Maybe<
        { __typename?: 'createAttributePayload' } & {
            attribute?: Maybe<{ __typename?: 'Attribute' } & Pick<Attribute, 'id' | 'name' | 'format'>>
        }
    >
}

export type CreateEntityMutationVariables = Exact<{
    input: CreateEntityInput
}>

export type CreateEntityMutation = { __typename?: 'Mutation' } & {
    createEntity?: Maybe<
        { __typename?: 'createEntityPayload' } & {
            entity?: Maybe<
                { __typename?: 'Entity' } & Pick<Entity, 'id' | 'type' | 'name' | 'description'> & {
                        attributes?: Maybe<
                            { __typename?: 'AttributeConnection' } & Pick<AttributeConnection, 'totalCount'> & {
                                    edges?: Maybe<
                                        Array<
                                            Maybe<
                                                { __typename?: 'AttributeEdge' } & {
                                                    node?: Maybe<
                                                        { __typename?: 'Attribute' } & Pick<
                                                            Attribute,
                                                            'id' | 'name' | 'format'
                                                        >
                                                    >
                                                }
                                            >
                                        >
                                    >
                                }
                        >
                    }
            >
        }
    >
}

export type EavEntitiesQueryVariables = Exact<{
    type?: Maybe<Scalars['String']>
}>

export type EavEntitiesQuery = { __typename?: 'Query' } & {
    entities?: Maybe<
        { __typename?: 'EntityConnection' } & {
            edges?: Maybe<
                Array<
                    Maybe<
                        { __typename?: 'EntityEdge' } & {
                            node?: Maybe<
                                { __typename?: 'Entity' } & Pick<Entity, 'id' | 'type' | 'name' | 'description'> & {
                                        objectEntities?: Maybe<
                                            { __typename?: 'ObjectEntityConnection' } & Pick<
                                                ObjectEntityConnection,
                                                'totalCount'
                                            > & {
                                                    edges?: Maybe<
                                                        Array<
                                                            Maybe<
                                                                { __typename?: 'ObjectEntityEdge' } & {
                                                                    node?: Maybe<
                                                                        { __typename?: 'ObjectEntity' } & Pick<
                                                                            ObjectEntity,
                                                                            'id' | 'uri'
                                                                        > & {
                                                                                entity?: Maybe<
                                                                                    { __typename?: 'Entity' } & Pick<
                                                                                        Entity,
                                                                                        'id' | 'type' | 'name'
                                                                                    >
                                                                                >
                                                                            }
                                                                    >
                                                                }
                                                            >
                                                        >
                                                    >
                                                }
                                        >
                                        attributes?: Maybe<
                                            { __typename?: 'AttributeConnection' } & {
                                                edges?: Maybe<
                                                    Array<
                                                        Maybe<
                                                            { __typename?: 'AttributeEdge' } & {
                                                                node?: Maybe<
                                                                    { __typename?: 'Attribute' } & Pick<
                                                                        Attribute,
                                                                        'id' | 'name'
                                                                    > & {
                                                                            attributeValues?: Maybe<
                                                                                {
                                                                                    __typename?: 'ValueConnection'
                                                                                } & Pick<ValueConnection, 'totalCount'>
                                                                            >
                                                                            entity?: Maybe<
                                                                                { __typename?: 'Entity' } & Pick<
                                                                                    Entity,
                                                                                    'id' | 'type' | 'name'
                                                                                >
                                                                            >
                                                                        }
                                                                >
                                                            }
                                                        >
                                                    >
                                                >
                                            }
                                        >
                                    }
                            >
                        }
                    >
                >
            >
        }
    >
}

export type UpdateEntityMutationVariables = Exact<{
    input: UpdateEntityInput
}>

export type UpdateEntityMutation = { __typename?: 'Mutation' } & {
    updateEntity?: Maybe<
        { __typename?: 'updateEntityPayload' } & {
            entity?: Maybe<
                { __typename?: 'Entity' } & Pick<Entity, 'id' | 'type' | 'name' | 'description'> & {
                        attributes?: Maybe<
                            { __typename?: 'AttributeConnection' } & Pick<AttributeConnection, 'totalCount'> & {
                                    edges?: Maybe<
                                        Array<
                                            Maybe<
                                                { __typename?: 'AttributeEdge' } & {
                                                    node?: Maybe<
                                                        { __typename?: 'Attribute' } & Pick<
                                                            Attribute,
                                                            'id' | 'name' | 'format'
                                                        >
                                                    >
                                                }
                                            >
                                        >
                                    >
                                }
                        >
                    }
            >
        }
    >
}

export const CreateAttributeDocument = gql`
    mutation createAttribute($input: createAttributeInput!) {
        createAttribute(input: $input) {
            attribute {
                id
                name
                format
            }
        }
    }
`
export const CreateEntityDocument = gql`
    mutation createEntity($input: createEntityInput!) {
        createEntity(input: $input) {
            entity {
                id
                type
                name
                description
                attributes {
                    totalCount
                    edges {
                        node {
                            id
                            name
                            format
                        }
                    }
                }
            }
        }
    }
`
export const EavEntitiesDocument = gql`
    query eavEntities($type: String) {
        entities(type: $type) {
            edges {
                node {
                    id
                    type
                    name
                    description
                    objectEntities {
                        edges {
                            node {
                                id
                                uri
                                entity {
                                    id
                                    type
                                    name
                                }
                            }
                        }
                        totalCount
                    }
                    attributes {
                        edges {
                            node {
                                id
                                name
                                attributeValues {
                                    totalCount
                                }
                                entity {
                                    id
                                    type
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
export const UpdateEntityDocument = gql`
    mutation updateEntity($input: updateEntityInput!) {
        updateEntity(input: $input) {
            entity {
                id
                type
                name
                description
                attributes {
                    totalCount
                    edges {
                        node {
                            id
                            name
                            format
                        }
                    }
                }
            }
        }
    }
`

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction()
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {
        createAttribute(
            variables: CreateAttributeMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateAttributeMutation> {
            return withWrapper(() =>
                client.request<CreateAttributeMutation>(print(CreateAttributeDocument), variables, requestHeaders)
            )
        },
        createEntity(
            variables: CreateEntityMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateEntityMutation> {
            return withWrapper(() =>
                client.request<CreateEntityMutation>(print(CreateEntityDocument), variables, requestHeaders)
            )
        },
        eavEntities(
            variables?: EavEntitiesQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<EavEntitiesQuery> {
            return withWrapper(() =>
                client.request<EavEntitiesQuery>(print(EavEntitiesDocument), variables, requestHeaders)
            )
        },
        updateEntity(
            variables: UpdateEntityMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<UpdateEntityMutation> {
            return withWrapper(() =>
                client.request<UpdateEntityMutation>(print(UpdateEntityDocument), variables, requestHeaders)
            )
        },
    }
}
export type Sdk = ReturnType<typeof getSdk>
