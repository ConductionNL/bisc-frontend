import isObject from 'lodash/isObject'
import transform from 'lodash/transform'

/**
 * Id's can be provided by the API in either of these formats:
 * - "/<domain>/<uuid>"
 * - "<uuid>"
 *
 * This function takes an object of any possible structure,
 * and deepMaps over it to normalize all ids into the "<uuid>" format.
 * Because the API always takes "<uuid>" as an input.
 */
export const normalizeIds = <T = any>(data: T): T => {
    return deepMap(data, (value: any, key: string) => {

        // If the key is 'id' or ends with 'Id'
        if (key === 'id' || key.endsWith('Id')) {

            // If the value is a string
            if (typeof value === 'string') {

                // If the value contains a /
                if (value.indexOf('/') > -1) {

                    // Transform "/<domain>/<uuid>" into "<uuid>"
                    return value.split('/').pop()
                }
            }

        }

        return value
    })
}

function deepMap(obj: any, iterator: any, context?: any): any {
    return transform(obj, function(result: any, val, key) {
        result[key] = isObject(val)
            ? deepMap(val, iterator, context)
            : iterator.call(context, val, key, obj)
    })
}
