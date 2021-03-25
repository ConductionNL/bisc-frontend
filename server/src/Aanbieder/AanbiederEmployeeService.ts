import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { OrganizationRepository } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { EmployeeEntity, EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'

export interface AanbiederEmployeeEntity {
    id: string
    givenName: string
    additionalName?: string
    familyName: string
    email: string
    telephone?: string
    dateCreated: string
    dateModified: string
    userRoles: { id: string; name: string }[]
    aanbieder: {
        id: string
        name: string
    }
}

@Injectable()
export class AanbiederEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private personRepository: PersonRepository,
        private employeeRepository: EmployeeRepository,
        private userRepository: UserRepository,
        private organizationRepository: OrganizationRepository
    ) {}

    public async findByAanbiederId(aanbiederId: string): Promise<AanbiederEmployeeEntity[]> {
        const employeeResults = await this.employeeRepository.findByOrganizationId(aanbiederId)

        const aanbiederEmployees = await Promise.all(
            employeeResults.map(async employee => {
                const person = await this.personRepository.findById(employee.person)
                const user = await this.userRepository.findByPersonId(employee.person)

                assertNotNil(person, `Person not found for employee ${employee.id}`)
                assertNotNil(user, `User not found for person ${employee.person}`)

                const aanbieder = await this.findAanbieder(employee)

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
                    aanbieder,
                }
            })
        )

        return aanbiederEmployees
    }

    public async findByUserId(userId: string): Promise<AanbiederEmployeeEntity> {
        const user = await this.userRepository.findById(userId)
        assertNotNil(user, `User not found for ID ${userId}`)

        const personId = user.person
        assertNotNil(personId, `PersonId not set for User ${userId}`)

        const employee = await this.employeeRepository.findByPersonId(personId)
        assertNotNil(employee, `Employee not found for Person ${personId}`)

        return this.findById(employee.id)
    }

    public async findById(employeeId: string): Promise<AanbiederEmployeeEntity> {
        const employee = await this.employeeRepository.findById({ id: employeeId })

        assertNotNil(employee, `Employee with id ${employeeId} not found`)

        const person = await this.personRepository.findById(employee.person)
        const user = await this.userRepository.findByPersonId(employee.person)

        assertNotNil(person, `Person not found for employee ${employee.id}`)
        assertNotNil(user, `User not found for person ${employee.person}`)

        const aanbieder = await this.findAanbieder(employee)

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
            aanbieder,
        }
    }

    private async findAanbieder(employee: EmployeeEntity): Promise<AanbiederEmployeeEntity['aanbieder']> {
        const organization = await this.organizationRepository.getOne(employee.organization)
        assertNotNil(organization, `Aanbieder not found for Employee ${employee.id}`)

        return {
            id: organization.id,
            name: organization.name,
        }
    }
}
