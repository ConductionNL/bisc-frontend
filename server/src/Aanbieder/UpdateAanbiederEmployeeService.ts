import { Injectable, Logger } from '@nestjs/common'
import { AppError } from 'src/AppError'
import { assertNotNil } from 'src/AssertNotNil'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { ErrorCode } from 'src/ErrorCodes'
import { PasswordHashingService } from 'src/User/services/PasswordHashingService'
import { PasswordResetService } from 'src/User/services/PasswordResetService'
import { AanbiederEmployeeService } from './AanbiederEmployeeService'

export interface UpdateAanbiederEmployeeInput {
    userId: string

    givenName: string
    additionalName?: string
    familyName: string
    telephone?: string | null

    email: string
    userGroupIds: string[] // aka role
}

@Injectable()
export class UpdateAanbiederEmployeeService {
    private readonly logger = new Logger()

    public constructor(
        private emailRepository: EmailRepository,
        private organizationRepository: OrganizationRepository,
        private groupRepository: GroupRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private userRepository: UserRepository,
        private passwordHashingService: PasswordHashingService,
        private passwordResetService: PasswordResetService,
        private employeeRepository: EmployeeRepository,
        private aanbiederEmployeeService: AanbiederEmployeeService
    ) {}

    public async updateAanbiederEmployee(input: UpdateAanbiederEmployeeInput) {
        const user = await this.userRepository.findById(input.userId)
        assertNotNil(user, `User not found for ID ${input.userId}`)

        const isUsernameChanged = input.email !== user.username

        if (isUsernameChanged) {
            const existingUserWithGivenEmail = await this.userRepository.findByEmail(input.email)

            if (existingUserWithGivenEmail) {
                throw new AppError(ErrorCode.EntityAlreadyExists, {
                    entity: 'User',
                    field: 'email',
                    value: input.email,
                })
            }
        }

        const personId = user.person
        assertNotNil(personId, `PersonId not set for User ${input.userId}`)

        const employee = await this.employeeRepository.findByPersonId(personId)
        assertNotNil(employee, `Employee not found for Person ${personId}`)

        assertNotNil(employee.person)
        const person = await this.personRepository.findById(employee.person)
        if (!person) {
            throw new Error(`Person with id ${employee.person} does not exist.`)
        }

        assertNotNil(employee.organization)
        const aanbieder = await this.organizationRepository.getOne(employee.organization)

        assertNotNil(aanbieder.sourceOrganization)

        const groups = await this.groupRepository.findByOrganizationId(aanbieder.sourceOrganization)
        const linkedGroups: { id: string; name: string }[] = []
        for (const inputGroupId of input.userGroupIds) {
            const groupExists = groups.find(group => group.id === inputGroupId)

            if (!groupExists) {
                throw new Error(`Given UserGroup ${inputGroupId} does not exist for Aanbieder ${aanbieder.id}`)
            }

            linkedGroups.push(groupExists)
        }

        const existingTelephone = person.telephone
        const existingTelephoneId = person.telephoneId
        const inputTelephone = input.telephone
        let newTelephoneId: string | null = existingTelephoneId ? existingTelephoneId : null
        if (inputTelephone === null || inputTelephone === undefined) {
            // Want to remove a telephone
            if (existingTelephoneId) {
                await this.telephoneRepository.deleteTelephone(existingTelephoneId)
                newTelephoneId = null
            }
        } else {
            // Want to set a telephone
            if (existingTelephoneId) {
                if (existingTelephone !== inputTelephone) {
                    await this.telephoneRepository.updateTelephone({
                        id: existingTelephoneId,
                        telephone: inputTelephone,
                    })
                }
            } else {
                const newTelephone = await this.telephoneRepository.createTelephone(inputTelephone)
                newTelephoneId = newTelephone.id
            }
        }

        if (input.email && input.email !== person.email) {
            await this.emailRepository.updateEmail({
                id: person.emailId,
                email: input.email,
            })
        }

        await this.personRepository.updatePerson({
            id: person.id,
            emailId: person.emailId,
            telephoneId: newTelephoneId || undefined,
            familyName: input.familyName ?? person.familyName,
            givenName: input.givenName ?? person.givenName,
            additionalName: input.additionalName,
        })

        await this.userRepository.updateUser(user.id, isUsernameChanged ? input.email : undefined, input.userGroupIds)

        if (isUsernameChanged) {
            // TODO: Send email confirmation email
            // try {
            //     send email
            // } catch (error) {}
        }

        return this.aanbiederEmployeeService.findById(employee.id)
    }
}
