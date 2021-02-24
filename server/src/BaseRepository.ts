import { Injectable } from '@nestjs/common'

type NonNullableFields<T, K extends keyof T = keyof T> = NonNullable<T> &
    {
        [P in K]-?: NonNullable<T[P]>
    }

// function hasRequiredFields<T, K extends keyof T>(
//     object: T,
//     requiredFields: string[]
// ): object is NonNullableFields<T, K> {
//     if (!object) {
//         return false
//     }

//     for (const field of requiredFields) {
//         if (object[field as K] === undefined || object[field as K] === null) {
//             return false
//         }
//     }

//     return true
// }

@Injectable()
export class BaseRepository {
    protected returnNonNullable<T>(object: T) {
        // TODO: Add type guard to make sure the fields are actually not null or undefined
        return object as NonNullableFields<NonNullable<typeof object>>
    }
}
