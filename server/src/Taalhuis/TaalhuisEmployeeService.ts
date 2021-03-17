import { Injectable, Logger } from '@nestjs/common'
import { assert } from 'console'
import { assertNotNil } from 'src/AssertNotNil'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { TaalhuisEmployeeType } from './types/TaalhuisEmployeeType'

@Injectable()
export class TaalhuisEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private personRepository: PersonRepository,
        private employeeRepository: EmployeeRepository,
        private userRepository: UserRepository
    ) {}

    public async findByTaalhuisId(taalhuisId: string): Promise<TaalhuisEmployeeType[]> {
        const employeeResults = await this.employeeRepository.findByOrganizationId(taalhuisId)

        const taalhuisEmployees = await Promise.all(
            employeeResults.map(async employee => {
                const person = await this.personRepository.findById(employee.person)
                const user = await this.userRepository.findByPersonId(employee.person)

                assertNotNil(person, `Person not found for employee ${employee.id}`)
                assertNotNil(user, `User not found for person ${employee.person}`)

                return {
                    id: user.id,
                    email: person.email,
                    telephone: person.telephone,
                    givenName: person.givenName,
                    additionalName: person.additionalName,
                    familyName: person.familyName,
                    dateCreated: user.dateCreated,
                    dateModified: user.dateModified,
                    userRoles: user.userRoles,
                    person: employee.person,
                }
            })
        )

        return taalhuisEmployees
    }

    public async findByUserId(userId: string): Promise<TaalhuisEmployeeType> {
        const user = await this.userRepository.findById(userId)
        assertNotNil(user, `User not found for ID ${userId}`)

        const personId = user.person
        assertNotNil(personId, `PersonId not set for User ${userId}`)

        const employee = await this.employeeRepository.findByPersonId(personId)
        assertNotNil(employee, `Employee not found for Person ${personId}`)

        return this.findById(employee.id)
    }

    public async findById(employeeId: string): Promise<TaalhuisEmployeeType> {
        const employee = await this.employeeRepository.findById({ id: employeeId })

        assertNotNil(employee, `Employee with id ${employeeId} not found`)

        const person = await this.personRepository.findById(employee.person)
        const user = await this.userRepository.findByPersonId(employee.person)

        assertNotNil(person, `Person not found for employee ${employee.id}`)
        assertNotNil(user, `User not found for person ${employee.person}`)

        return {
            id: user.id,
            email: person.email,
            telephone: person.telephone,
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
            dateCreated: user.dateCreated,
            dateModified: user.dateModified,
            userRoles: user.userRoles,
            person: employee.person,
        }
    }
}
