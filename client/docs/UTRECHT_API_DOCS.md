# TOP - Utrecht documentation

## How to assign unused postal codes to a language house

**Endpoint**

    PUT/POST /organizations/:id

**Example payload**

```json
    {
        ...
        "langougeHouse_postalCodes": [
            {
                "code": 1111
            },
            {
                "code": 1112
            }
        ],
        ...
    }
```

## How to update or remove postal codes of a language house

**Endpoint**

    PUT/POST /organizations/:id

**Example payload**

In this example, postal code 1111 is kept, 1112 is removed (because it's left out) and 1113 is new.

When you don't pass the `id` of a previously claimed postal code, you will get an error that the postal code already exists. This is useful when trying to claim existing postal codes in other language houses.

```json
    {
        ...
        "langougeHouse_postalCodes": [
            {
                "id": "postal-code-id-for-1111",
                "code": 1111
            },
            {
                "code": 1113
            }
        ],
        ...
    }
```

## How to read assigned postal codes of a language house

**Endpoint**

    GET /organizations/:id

**Example response**

```json
    {
        ...
        "langougeHouse_postalCodes": [
            {
                "id": "postal-code-id-for-1111",
                "code": 1111
            },
            {
                "id": "postal-code-id-for-1113",
                "code": 1113
            }
        ],
        ...
    }
```
