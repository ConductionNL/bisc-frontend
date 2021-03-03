import { Injectable } from '@nestjs/common'
import { CommonGroundAPIs } from './CommonGroundAPI/CommonGroundAPIsEnum'

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

export interface Dataloadable<T extends { id: string }> {
    findByIds(ids: readonly string[]): Promise<T[]>
}

@Injectable()
export abstract class BaseRepository {
    protected abstract commonGroundAPI: CommonGroundAPIs

    protected returnNonNullable<T>(object: T) {
        // TODO: Add type guard to make sure the fields are actually not null or undefined
        return object as NonNullableFields<NonNullable<typeof object>>
    }

    public makeURLfromID(id: string) {
        return `${this.commonGroundAPI}${id[0] === '/' ? '' : '/'}${id}`
    }

    public stripURLfromID(id: string) {
        return id.replace(`${this.commonGroundAPI}/`, '')
    }
}
