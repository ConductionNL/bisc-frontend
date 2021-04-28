import isObject from 'lodash/isObject'
import forIn from 'lodash/forIn'

export function omitDeep(obj: any, omitKey: string) {
    forIn(obj, function (value, key) {
        if (isObject(value)) {
            omitDeep(value, omitKey)
        } else if (key === omitKey) {
            delete obj[key]
        }
    })
}
