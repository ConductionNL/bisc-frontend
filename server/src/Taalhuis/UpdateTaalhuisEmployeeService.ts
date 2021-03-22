import { Injectable, Logger } from '@nestjs/common'
import { AppError } from 'src/AppError'
import { assertNotNil } from 'src/AssertNotNil'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { ErrorCode } from 'src/ErrorCodes'
import { TaalhuisEmployeeService } from './TaalhuisEmployeeService'

export interface UpdateTaalhuisEmployeeInput {
    userId: string
    userGroupId: string
    givenName: string
    additionalName?: string
    familyName: string
    email: string
    telephone?: string
}

@Injectable()
export class UpdateTaalhuisEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private userRepository: UserRepository,
        private employeeRepository: EmployeeRepository,
        private personRepository: PersonRepository,
        private telephoneRepository: TelephoneRepository,
        private emailRepository: EmailRepository,
        private taalhuisEmployeeService: TaalhuisEmployeeService
    ) {}

    public async updateTaalhuisEmployee(input: UpdateTaalhuisEmployeeInput) {
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

        let telephone = null
        if (input.telephone && person.telephone !== input.telephone) {
            if (!person.telephone) {
                telephone = await this.telephoneRepository.createTelephone(input.telephone)
            } else {
                if (!person.telephoneId) {
                    throw new Error(`Person has a phone number but no Id, something went wrong.`)
                }
                telephone = await this.telephoneRepository.updateTelephone({
                    id: person.telephoneId,
                    telephone: input.telephone,
                })
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
            telephoneId: telephone?.id,
            familyName: input.familyName ?? person.familyName,
            givenName: input.givenName ?? person.givenName,
            additionalName: input.additionalName,
        })

        await this.userRepository.updateUser(user.id, isUsernameChanged ? input.email : undefined, [input.userGroupId])

        if (isUsernameChanged) {
            // TODO: Send email confirmation email
            // try {
            //     send email
            // } catch (error) {}
        }

        return this.taalhuisEmployeeService.findById(employee.id)
    }
}
