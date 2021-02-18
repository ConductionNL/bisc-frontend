export const routes = {
    unauthorized: {
        index: '/auth',
        login: '/auth/login',
    },
    authorized: {
        index: '/',
        persons: `/persons`,
        addPerson: `/persons/add-person`,
        addPersonToProgram: `/persons/add-person-to-program`,
        programs: `/programs/programs`,
        myPrograms: `/programs/my-programs`,
        profile: `/profile`,

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
