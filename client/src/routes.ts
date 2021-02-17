export const routes = {
    unauthorized: {
        index: '/auth',
        login: '/auth/login',
        forgotpassword: '/auth/forgotpassword',
        setpassword: '/auth/set-password',

        // TODO: delete - for design review/check only
        translationsExample: '/auth/translations-example',
        kitchensink: '/auth/kitchensink',
    },
    authorized: {
        index: '/',
        persons: `/persons`,
        addPerson: `/persons/add-person`,
        addPersonToProgram: `/persons/add-person-to-program`,
        programs: `/programs/programs`,
        myPrograms: `/programs/my-programs`,
    },
}
