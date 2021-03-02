import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

interface CreatePersonInput {
    givenName: string
    additionalName?: string
    familyName: string
    telephoneId?: string
    emailId: string
}

type PersonEntity = {
    id: string
    givenName: string
    additionalName?: string
    familyName: string
    telephone?: string
    email: string
}

@Injectable()
export class PersonRepository extends CCRepository {
    public async findPersons() {
        const result = await this.sdk.persons()

        return result?.people?.edges
    }

    public async createPerson(input: CreatePersonInput) {
        const result = await this.sdk.createPerson({
            input: {
                givenName: input.givenName,
                additionalName: input.additionalName,
                familyName: input.familyName,
                telephones: input.telephoneId ? [input.telephoneId] : [],
                emails: [input.emailId],
            },
        })

        const personObject = result?.createPerson?.person
        assertNotNil(personObject, `Failed to create person`)

        personObject.id = this.makeURLfromID(personObject.id)

        return this.returnNonNullable(personObject)
    }

    public async findById(personId: string): Promise<PersonEntity | null> {
        const results = await this.sdk.findPersonById({ id: this.stripURLfromID(personId) })

        const person = results.person

        if (!person) {
            return null
        }

        const givenName = person.givenName
        assertNotNil(givenName)
        const familyName = person.familyName
        assertNotNil(familyName)

        const telephone = person.telephones?.edges?.pop()?.node?.telephone
        const email = person.emails?.edges?.pop()?.node?.email
        assertNotNil(email)

        const personEntity: PersonEntity = {
            id: this.makeURLfromID(person.id),
            givenName,
            additionalName: person.additionalName ?? undefined,
            familyName,
            telephone: telephone ?? undefined,
            email: email,
        }

        return personEntity
    }
}
