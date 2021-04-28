import { StudentContactPreferenceEnum, UserEnvironmentEnum, UserRoleEnum } from '../../../client/src/generated/graphql'
import { base64ExamplePdf } from './base64examplePDF'

export const mocks = {
    Query: () => ({
        currentUser: () => ({
            id: '123-jessedvrs',
            username: 'jessedvrs',
            givenName: 'Jesse',
            additionalName: 'de',
            familyName: 'Vries',
            userEnvironment: UserEnvironmentEnum.Taalhuis,
            organizationId: '123-organization',
            organizationName: 'organizationName',
            dateCreated: new Date(),
            dateModified: new Date(),
            userRoles: [{id: 1, name: UserRoleEnum.AanbiederCoordinator }],
        }),
        group: () => ({

                "id": "Hello World",
                "name": "Hello World",
                "providerName": "Hello World",
                "typeCourse": "DIGITAL",
                "outComesGoal": "Hello World",
                "outComesTopic": "DIGITAL_SEARCHING_INFORMATION",
                "outComesTopicOther": "Hello World",
                "outComesApplication": "LABOR_MARKET_AND_WORK",
                "outComesApplicationOther": "Hello World",
                "outComesLevel": "OTHER",
                "outComesLevelOther": "Hello World",
                "detailsIsFormal": true,
                "detailsTotalClassHours": 20,
                "detailsCertificateWillBeAwarded": true,
                "detailsStartDate": new Date().toString(),
                "detailsEndDate": new Date().toString(),
                "availability": {
                    "monday": {
                        "morning": false,
                        "afternoon": true,
                        "evening": false,
                        "__typename": "GroupAvailabilityDayType"
                    },
                    "tuesday": {
                        "morning": false,
                        "afternoon": true,
                        "evening": false,
                        "__typename": "GroupAvailabilityDayType"
                    },
                    "wednesday": {
                        "morning": true,
                        "afternoon": false,
                        "evening": true,
                        "__typename": "GroupAvailabilityDayType"
                    },
                    "thursday": {
                        "morning": true,
                        "afternoon": false,
                        "evening": false,
                        "__typename": "GroupAvailabilityDayType"
                    },
                    "friday": {
                        "morning": false,
                        "afternoon": false,
                        "evening": false,
                        "__typename": "GroupAvailabilityDayType"
                    },
                    "saturday": {
                        "morning": true,
                        "afternoon": true,
                        "evening": false,
                        "__typename": "GroupAvailabilityDayType"
                    },
                    "sunday": {
                        "morning": true,
                        "afternoon": true,
                        "evening": true,
                        "__typename": "GroupAvailabilityDayType"
                    },
                    "__typename": "GroupAvailabilityDaysType"
                },
                "availabilityNotes": "Hello World",
                "generalLocation": "Hello World",
                "generalParticipantsMin": 2,
                "generalParticipantsMax": -94,
                "generalEvaluation": "Hello World",
                "providerEmployees": [
                    {
                        "userId": "Hello World",
                        "dateCreated": new Date().toString(),
                        "dateModified": new Date().toString(),
                        "userRoles": [
                            {
                                "id": "Hello World",
                                "name": "AANBIEDER_COORDINATOR",
                                "__typename": "ProviderUserRoleType"
                            },
                            {
                                "id": "Hello World",
                                "name": "AANBIEDER_COORDINATOR",
                                "__typename": "ProviderUserRoleType"
                            }
                        ],
                        "givenName": "Hello World",
                        "additionalName": "Hello World",
                        "familyName": "Hello World",
                        "telephone": "Hello World",
                        "availability": {
                            "monday": {
                                "morning": true,
                                "afternoon": true,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "tuesday": {
                                "morning": true,
                                "afternoon": true,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "wednesday": {
                                "morning": true,
                                "afternoon": false,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "thursday": {
                                "morning": false,
                                "afternoon": false,
                                "evening": false,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "friday": {
                                "morning": false,
                                "afternoon": true,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "saturday": {
                                "morning": false,
                                "afternoon": true,
                                "evening": false,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "sunday": {
                                "morning": true,
                                "afternoon": false,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "__typename": "ProviderEmployeeAvailabilityDaysType"
                        },
                        "availabilityNotes": "Hello World",
                        "email": "Hello World",
                        "gender": "MALE",
                        "dateOfBirth": new Date().toString(),
                        "address": {
                            "street": "Hello World",
                            "houseNumber": "Hello World",
                            "houseNumberSuffix": "Hello World",
                            "postalCode": "Hello World",
                            "locality": "Hello World",
                            "__typename": "ProviderEmployeeAddressType"
                        },
                        "contactTelephone": "Hello World",
                        "contactPreference": "WHATSAPP",
                        "contactPreferenceOther": "Hello World",
                        "targetGroupPreference": [
                            "NT1",
                            "NT2"
                        ],
                        "volunteringPreference": "Hello World",
                        "gotHereVia": "Hello World",
                        "hasExperienceWithTargetGroup": false,
                        "experienceWithTargetGroupYesReason": false,
                        "currentEducation": "NO",
                        "currentEducationYes": {
                            "dateSince": new Date().toString(),
                            "name": "Hello World",
                            "doesProvideCertificate": true,
                            "__typename": "ProviderEmployeeCurrentEducationYesType"
                        },
                        "currentEdicationNoButDidFollow": {
                            "dateUntil": new Date().toString(),
                            "level": "Hello World",
                            "gotCertificate": false,
                            "__typename": "ProviderEmployeeCurrentEducationNoButDidFollowType"
                        },
                        "doesCurrentlyFollowCourse": true,
                        "currentlyFollowingCourseName": "Hello World",
                        "currentlyFollowingCourseInstitute": "Hello World",
                        "currentlyFollowingCourseTeacherProfessionalism": "BOTH",
                        "currentlyFollowingCourseCourseProfessionalism": "VOLUNTEER",
                        "doesCurrentlyFollowingCourseProvideCertificate": true,
                        "otherRelevantCertificates": "Hello World",
                        "isVOGChecked": false,
                        "__typename": "ProviderEmployeeType"
                    },
                    {
                        "userId": "Hello World",
                        "dateCreated": new Date().toString(),
                        "dateModified": new Date().toString(),
                        "userRoles": [
                            {
                                "id": "Hello World",
                                "name": "TAALHUIS_EMPLOYEE",
                                "__typename": "ProviderUserRoleType"
                            },
                            {
                                "id": "Hello World",
                                "name": "AANBIEDER_MENTOR",
                                "__typename": "ProviderUserRoleType"
                            }
                        ],
                        "givenName": "Hello World",
                        "additionalName": "Hello World",
                        "familyName": "Hello World",
                        "telephone": "Hello World",
                        "availability": {
                            "monday": {
                                "morning": false,
                                "afternoon": false,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "tuesday": {
                                "morning": true,
                                "afternoon": true,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "wednesday": {
                                "morning": false,
                                "afternoon": false,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "thursday": {
                                "morning": false,
                                "afternoon": true,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "friday": {
                                "morning": true,
                                "afternoon": true,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "saturday": {
                                "morning": true,
                                "afternoon": false,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "sunday": {
                                "morning": true,
                                "afternoon": true,
                                "evening": true,
                                "__typename": "ProviderEmployeeAvailabilityDayType"
                            },
                            "__typename": "ProviderEmployeeAvailabilityDaysType"
                        },
                        "availabilityNotes": "Hello World",
                        "email": "Hello World",
                        "gender": "X",
                        "dateOfBirth": new Date().toString(),
                        "address": {
                            "street": "Hello World",
                            "houseNumber": "Hello World",
                            "houseNumberSuffix": "Hello World",
                            "postalCode": "Hello World",
                            "locality": "Hello World",
                            "__typename": "ProviderEmployeeAddressType"
                        },
                        "contactTelephone": "Hello World",
                        "contactPreference": "WHATSAPP",
                        "contactPreferenceOther": "Hello World",
                        "targetGroupPreference": [
                            "NT2",
                            "NT1"
                        ],
                        "volunteringPreference": "Hello World",
                        "gotHereVia": "Hello World",
                        "hasExperienceWithTargetGroup": false,
                        "experienceWithTargetGroupYesReason": true,
                        "currentEducation": "YES",
                        "currentEducationYes": {
                            "dateSince": new Date().toString(),
                            "name": "Hello World",
                            "doesProvideCertificate": true,
                            "__typename": "ProviderEmployeeCurrentEducationYesType"
                        },
                        "currentEdicationNoButDidFollow": {
                            "dateUntil": new Date().toString(),
                            "level": "Hello World",
                            "gotCertificate": true,
                            "__typename": "ProviderEmployeeCurrentEducationNoButDidFollowType"
                        },
                        "doesCurrentlyFollowCourse": true,
                        "currentlyFollowingCourseName": "Hello World",
                        "currentlyFollowingCourseInstitute": "Hello World",
                        "currentlyFollowingCourseTeacherProfessionalism": "PROFESSIONAL",
                        "currentlyFollowingCourseCourseProfessionalism": "PROFESSIONAL",
                        "doesCurrentlyFollowingCourseProvideCertificate": true,
                        "otherRelevantCertificates": "Hello World",
                        "isVOGChecked": true,
                        "__typename": "ProviderEmployeeType"
                    }
                ],
                "__typename": "GroupType"
            
    })
    }),
    Mutation: () => ({
        downloadProviderEmployeeDocument: () => ({ data: { base64data: base64ExamplePdf } }),
        downloadStudentDocument: () => ({ data: { base64data: base64ExamplePdf } }),
        
    }),
    ProviderAddressType: () => addressFields,
    ProviderEmployeeAddressType: () => addressFields,
    LanguageHouseAddressType: () => addressFields,
    StudentContactType: () => ({
        ...addressFields,
        email: 'john@example.org',
        telephone: '0612345678',
        contactPersonTelephone: '0612345678',
        contactPreference: StudentContactPreferenceEnum.Other,
        contactPreferenceOther: 'Contactpersoon bellen',
    }),
}

const addressFields = {
    street: 'Prinsengracht',
    houseNumber: 197,
    houseNumberSuffix: 'D',
    postalCode: '1015DT',
    locality: 'Amsterdam'
}
