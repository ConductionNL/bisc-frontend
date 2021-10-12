import { User } from 'api/types/types'

class Name {
    public formattedFullname = (user: User) => {
        const fullName = [user.first_name, this.formattedLastName(user)].filter(part => !!part).join(' ')
        return fullName
    }

    public formattedLastName = (user: User) => {
        const familyName = [user.last_name].filter(part => !!part).join(', ')
        return familyName
    }
}

export const NameFormatters = new Name()
