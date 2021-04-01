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
    telephone?: string | null
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
        assertNotNil(person, `Person ${employee.person} not found for employee ${employee.id}`)
        assertNotNil(person.emailId, `Person ${person.id} does not have an emailId set, but it should`)

        // TODO: This is duplicated in UpdateAanbiederEmployeeService
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
