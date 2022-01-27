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
                "@dateCreated": "2022-01-24T16:01:13+00:00",
                "@dateModified": "2022-01-24T16:01:13+00:00",
                "code": 1111,
                "team": null
            },
            {
                "id": "postal-code-id-for-1113",
                "@dateCreated": "2022-01-24T16:01:13+00:00",
                "@dateModified": "2022-01-24T16:01:13+00:00",
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

## How to list teams

A team is an organization with type `team`, while also providing the parent language house id using the `parentOrganization` field.

**Endpoint**

    GET /organizations?type=team&parentOrganization.id=id-of-parent-language-house-organization

**Example response**

```json
    [
        {
            ...
            "id": "id-of-team",
            "type": "team",
            "name": "A-Team",
            "team_postalCodes": [
                {
                    "id": "postal-code-id-for-1113",
                    "@dateCreated": "2022-01-24T16:01:13+00:00",
                    "@dateModified": "2022-01-24T16:01:13+00:00",
                    "code": 1113,
                    "team": {
                        ... inception
                    }
                }
            ]
            ...
        }
    ]
```


## How to create/update a new team

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

## How to read assigned postal codes of a team

**Endpoint**

    GET /organizations/:id

**Example response**

```json
    {
        ...
        "team_postalCodes": [
            {
                "id": "postal-code-id-for-1113",
                "@dateCreated": "2022-01-24T16:01:13+00:00",
                "@dateModified": "2022-01-24T16:01:13+00:00",
                "code": 1113,
                "team": {
                    ... inception
                }
            }
        ],
        ...
    }
```

## How to assign a member to a team

**Endpoint**

    PUT /organizations/:teamId

**Example payload**

Also post previously assigned members, otherwise members will be removed from the team.

```json
    {
        "id": "team-id",
        "name": "Current Team Name",
        "members": [
            "employee-id-1",
            "employee-id-2"
        ]
    }
```

## How to remove currently assigned members from a team

**Endpoint**

    PUT /organizations/:teamId

**Example payload**

You can leave out an id from the `members` array.

```json
    {
        "id": "team-id",
        "name": "Current Team Name",
        "members": [
            "employee-id-1"
        ]
    }
```

## How to read currently assigned members of a team

**Endpoint**

    GET /organizations/:teamId

**Example response**

```json
    {
        "id": "team-id",
        "members": [
            {
                "id": "employee-id-1",
                ...
            },
            {
                "id": "employee-id-2",
                ...
            }
        ]
    }
```

## How to read the teams of an employee from the TH env

To-do

## How to find teams of a TH, for the teams dropdown in the public registration

To-do

## How to provide a team on a student when submitting a public registration

To-do

## How to read + change a team on a student (from the TH env)

To-do

## How to read, change, assign and unassign a mentor on a student (from the TH env)

To-do

## How to read the list of mentees of a mentor

To-do
