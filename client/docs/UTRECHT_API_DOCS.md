# TOP - Utrecht documentation

## How to assign unused postal codes to a language house

**Endpoint**

    PUT/POST /organizations/:id

**Example payload**

```json
    {
        ...
        "languageHouse_postalCodes": [
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
        "languageHouse_postalCodes": [
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
        "languageHouse_postalCodes": [
            {
                "id": "postal-code-id-for-1111",
                "code": 1111,
                "team": null
            },
            {
                "id": "postal-code-id-for-1113",
                "code": 1113,
                "team": {
                    "id": "id-of-team",
                    ...
                }
            }
        ],
        ...
    }
```

## How to create/update a new team

In fact, a team is an organization with type `team`, while also providing the parent language house id using the `parentOrganization` field.

**Endpoint**

    POST/PUT /organizations

**Example payload**

```json

    {
        "name": "Team Lifely 1",
        "type": "team",
        "parentOrganization": "id-of-parent-language-house-organization",
        "addresses": [
            {
                "street": "Prinsengracht",
                "houseNumber": "197",
                "houseNumberSuffix": "D",
                "postalCode": "1015DT",
                "locality": "Amsterdam",
                "country": "NL"
            }
        ]
    }

```

## How to delete an existing team

Same as deleting language houses.


## How to assign postal codes to a team

**Endpoint**

    PUT/POST /organizations/:id

**Example payload**

As long as the postal codes are added to the parent language house, those postal codes can be assigned to teams (max 1).
Postal codes that are claimed by other teams, should not be selectable. To determine this, you can use the `team` field on the nested `languageHouse_postalCodes` objects on GET language house.

```json
    {
        ...
        "team_postalCodes": [
            "id-of-existing-postalcode-1",
            "id-of-existing-postalcode-2"
        ]
        ...
    }
```

## How to remove postal codes from a team

**Endpoint**

    PUT/POST /organizations/:id

**Example payload**

Just leave out unwanted id's.

```json
    {
        ...
        "team_postalCodes": [
            "id-of-existing-postalcode-1"
        ]
        ...
    }
```
