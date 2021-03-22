import { Inject, Injectable } from '@nestjs/common'
import { isEmail } from 'class-validator'
import { assertNotNil } from 'src/AssertNotNil'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { Mailer, MailService } from 'src/Mail/MailService'
import { PasswordChangedMailTemplate } from 'src/Mail/Templates/PasswordChangedMailTemplate'
import { ContextUser, UserEntity, UserEnvironmentEnum } from '../entities/UserEntity'
import { OldUserRepository } from '../OldUserRepository'
import { PasswordHashingService } from './PasswordHashingService'

@Injectable()
export class UserService {
    public constructor(
        private oldUserRepository: OldUserRepository,
        private userRepository: UserRepository,
        private employeeRepository: EmployeeRepository,
        private organizationRepository: OrganizationRepository,
        private passwordChangedMailTemplate: PasswordChangedMailTemplate,
        private passwordHashingService: PasswordHashingService,
        private personRepository: PersonRepository,
        @Inject(MailService) private mailService: Mailer
    ) {}

    public async updateUserPassword(user: UserEntity, newPlainTextPassword: string) {
        // Sanity check
        if (!user.username || !isEmail(user.username)) {
            throw new Error(`Username value of User ${user.id} is not an emailaddress: "${user.username}"`)
        }

        const newPasswordHash = await this.passwordHashingService.hash(newPlainTextPassword)

        await this.oldUserRepository.updateUserPassword(user.id, newPasswordHash)

        const subject = 'Your BiSC Taalhuizen password was changed'

        await this.mailService.send({
            html: this.passwordChangedMailTemplate.make({
                subject,
                name: user.username,
            }),
            subject,
            to: user.username,
        })
    }

    public async findContextUserById(userId: string): Promise<ContextUser> {
        const user = await this.userRepository.findById(userId)
        assertNotNil(user, `User not found with ID ${userId}`)

        return this.findContextUserByUser(user)
    }

    public async findContextUserByEmail(email: string): Promise<ContextUser> {
        const user = await this.userRepository.findByEmail(email)
        assertNotNil(user, `User not found with username ${email}`)

        return this.findContextUserByUser(user)
    }

    private async findContextUserByUser(user: UserEntity): Promise<ContextUser> {
        assertNotNil(user.person, `User ID ${user.id} doesnt have a Person ID set`)

        const person = await this.personRepository.findById(user.person)
        assertNotNil(person, `Person ${user.person} not found`)

        const employee = await this.employeeRepository.findByPersonId(user.person)
        // TODO: What to do with BiSC user? We might need an organization for BiSC + employees
        // assertNotNil(employee, `Employee not found for User ${userId} and Person ${user.person}`)

        // TODO: This is just for testing. Assume BiSC user when no employee is found
        if (!employee) {
            return {
                id: user.id,
                givenName: person.givenName,
                additionalName: person.additionalName ?? null,
                familyName: person.familyName,
                username: user.username,
                person: user.person,
                dateCreated: user.dateCreated,
                dateModified: user.dateModified,
                userRoles: [],
                userEnvironment: UserEnvironmentEnum.BISC,
                organizationId: null,
                organizationName: null,
            }
        }

        assertNotNil(employee.organization, `Employee ${employee.id} does not have an organization`)

        const organization = await this.organizationRepository.getOne(employee.organization)

        return {
            id: user.id,
            givenName: person.givenName,
            additionalName: person.additionalName ?? null,
            familyName: person.familyName,
            username: user.username,
            person: user.person,
            dateCreated: user.dateCreated,
            dateModified: user.dateModified,
            userRoles: user.userRoles,
            userEnvironment: this.findUserEnvironmentForOrganizationType(organization.type),
            organizationId: organization.id,
            organizationName: organization.name,
        }
    }

    private findUserEnvironmentForOrganizationType(organizationType: OrganizationTypesEnum) {
        if (organizationType === OrganizationTypesEnum.TAALHUIS) {
            return UserEnvironmentEnum.TAALHUIS
        }
        if (organizationType === OrganizationTypesEnum.AANBIEDER) {
            return UserEnvironmentEnum.AANBIEDER
        }

        throw new Error(
            `Unexpected organizationType "${organizationType}", expected ${OrganizationTypesEnum.TAALHUIS} or ${OrganizationTypesEnum.AANBIEDER}`
        )
    }
}
