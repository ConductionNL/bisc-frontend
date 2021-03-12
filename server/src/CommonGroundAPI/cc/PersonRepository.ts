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

interface UpdatePersonInputType {
    id: string
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
    telephoneId?: string
    email: string
    emailId: string
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

    public async updatePerson(input: UpdatePersonInputType) {
        const result = await this.sdk.updatePerson({
            input: {
                id: this.stripURLfromID(input.id),
                givenName: input.givenName,
                additionalName: input.additionalName,
                familyName: input.familyName,
                telephones: input.telephoneId ? [input.telephoneId] : [],
                emails: [input.emailId],
            },
        })
        const person = result.updatePerson?.person
        assertNotNil(person, `Failed to update Person ${input.id}`)

        return { ...person, id: this.makeURLfromID(person.id) }
    }

    public async deletePerson(id: string) {
        const result = await this.sdk.deletePerson({ input: { id: this.stripURLfromID(id) } })

        return !!result
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

        // Telephone is not a required field, so we dont have assertNotNil() here
        const telephoneNode = person.telephones?.edges?.pop()?.node

        const telephone = telephoneNode ? telephoneNode.telephone : undefined
        const telephoneId = telephoneNode ? this.makeURLfromID(telephoneNode.id) : undefined

        const emailNode = person.emails?.edges?.pop()?.node
        assertNotNil(emailNode)

        const email = emailNode.email
        const emailId = this.makeURLfromID(emailNode.id)

        const personEntity: PersonEntity = {
            id: this.makeURLfromID(person.id),
            givenName,
            additionalName: person.additionalName ?? undefined,
            familyName,
            telephone,
            telephoneId,
            email,
            emailId,
        }

        return personEntity
    }
}
