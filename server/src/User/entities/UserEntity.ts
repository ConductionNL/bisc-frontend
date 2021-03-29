import { UserGroupEntity } from 'src/CommonGroundAPI/uc/GroupRepository'

export enum UserEnvironmentEnum {
    BISC = 'BISC',
    TAALHUIS = 'TAALHUIS',
    AANBIEDER = 'AANBIEDER',
}

export class UserEntity {
    public id!: string
    public username!: string
    public person!: string
    public dateCreated!: string
    public dateModified!: string
    public userRoles!: UserGroupEntity[]
}

export class UserEdge {
    public node!: UserEntity
}

export class ContextUser extends UserEntity {
    public userEnvironment!: UserEnvironmentEnum
    public organizationId!: string | null
    public organizationName!: string | null
    public givenName!: string
    public additionalName!: string | null
    public familyName!: string
}
